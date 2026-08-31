#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Busca um nome em todas as edicoes do Diario Oficial de Prudentopolis-PR.

Faz o trabalho pesado sozinho: descobre as edicoes, baixa os PDFs uma unica vez,
extrai o texto e procura o nome. Voce nao precisa abrir edicao por edicao.

Uso tipico (procurar desde 01/01/2024 ate hoje):

    python3 buscar_no_diario.py --nome "Rayane dos Santos Pedroso" --desde 2024-01-01

Outras opcoes uteis:

    --pasta PDFS        onde guardar/ler os PDFs (padrao: ./pdfs)
    --offline           nao baixa nada, so procura nos PDFs ja existentes na pasta
    --inicio N --fim N  faixa de numeros de edicao no modo forca-bruta
    --ocr               tenta OCR (ocrmypdf) nas edicoes que sao imagem pura
    --jobs N            downloads simultaneos (padrao: 4)

Saida:
    resultados.csv  -> uma linha por pagina onde o nome aparece
    indice.csv      -> todas as edicoes vistas (numero, data, url, status)

Requisitos: Python 3.8+. Para extrair texto, use um dos dois:
    - pdftotext (pacote poppler-utils)  -> sudo apt install poppler-utils
    - ou a biblioteca pypdf             -> pip install pypdf
"""

import argparse
import csv
import os
import re
import subprocess
import sys
import time
import unicodedata
from concurrent.futures import ThreadPoolExecutor
from datetime import date, datetime
from urllib.parse import urljoin
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

PORTAL = "https://diario.prudentopolis.pr.gov.br/"
BASE_PDF = "https://www.prudentopolis.pr.gov.br/uploads/diarioOficial/"
UA = "Mozilla/5.0 (compatible; busca-diario-oficial/1.0)"

# o site usa variacoes de nome de arquivo: Edicao-2830.pdf, Edicao-1600..pdf,
# Edicao-2354-A..pdf (edicao extra). Tentamos todas.
SUFIXOS = ["", "-A", "-B", "-C"]
EXTENSOES = [".pdf", "..pdf"]

MESES = {
    "janeiro": 1, "fevereiro": 2, "marco": 3, "abril": 4, "maio": 5, "junho": 6,
    "julho": 7, "agosto": 8, "setembro": 9, "outubro": 10, "novembro": 11,
    "dezembro": 12,
}

# palavras que indicam que a pagina trata de concurso/chamamento
TERMOS_CONCURSO = [
    "convoca", "nomea", "nomeia", "concurso publico", "posse", "homologa",
    "processo seletivo", "classificacao final", "aprovado", "edital",
]


# --------------------------------------------------------------------------
# texto
# --------------------------------------------------------------------------
def sem_acento(texto):
    nfkd = unicodedata.normalize("NFKD", texto)
    return "".join(c for c in nfkd if not unicodedata.combining(c))


def normalizar(texto):
    """minusculas, sem acento, sem hifenizacao de fim de linha."""
    t = sem_acento(texto).lower()
    t = t.replace("­", "")
    t = re.sub(r"-\s*\n\s*", "", t)      # palavra quebrada com hifen
    return t


def espremer(texto):
    """so letras e numeros - imune a quebra de linha, coluna e espaco estranho."""
    return re.sub(r"[^a-z0-9]", "", texto)


def colapsar(texto):
    return re.sub(r"\s+", " ", texto).strip()


# --------------------------------------------------------------------------
# extracao de PDF
# --------------------------------------------------------------------------
def tem_pdftotext():
    try:
        subprocess.run(["pdftotext", "-v"], capture_output=True, check=False)
        return True
    except (OSError, FileNotFoundError):
        return False


PDFTOTEXT = tem_pdftotext()
try:
    import pypdf  # noqa
    TEM_PYPDF = True
except BaseException:
    # BaseException de proposito: instalacoes quebradas de pypdf/cryptography
    # chegam a lancar PanicException, que nao e subclasse de Exception.
    TEM_PYPDF = False


def paginas_do_pdf(caminho):
    """Devolve lista de strings, uma por pagina. Lista vazia se nao der."""
    if PDFTOTEXT:
        try:
            saida = subprocess.run(
                ["pdftotext", "-layout", "-enc", "UTF-8", caminho, "-"],
                capture_output=True, check=True,
            ).stdout.decode("utf-8", "replace")
            return saida.split("\f")
        except subprocess.CalledProcessError:
            pass
    if TEM_PYPDF:
        try:
            leitor = pypdf.PdfReader(caminho)
            return [(p.extract_text() or "") for p in leitor.pages]
        except Exception as e:
            print("  ! falha ao ler %s: %s" % (os.path.basename(caminho), e))
            return []
    print("ERRO: instale poppler-utils (pdftotext) ou pypdf para extrair texto.",
          file=sys.stderr)
    sys.exit(2)


def ocr(caminho):
    """Roda ocrmypdf sobre o arquivo (in-place, via arquivo temporario)."""
    saida = caminho + ".ocr.pdf"
    try:
        subprocess.run(
            ["ocrmypdf", "-l", "por", "--skip-text", "--quiet", caminho, saida],
            check=True, capture_output=True,
        )
        os.replace(saida, caminho)
        return True
    except (OSError, subprocess.CalledProcessError):
        if os.path.exists(saida):
            os.remove(saida)
        return False


# --------------------------------------------------------------------------
# rede
# --------------------------------------------------------------------------
def http_get(url, timeout=60):
    req = Request(url, headers={"User-Agent": UA})
    with urlopen(req, timeout=timeout) as r:
        return r.read(), dict(r.headers)


def baixar(url, destino, tentativas=3):
    """Baixa se ainda nao existir. Devolve (ok, headers)."""
    if os.path.exists(destino) and os.path.getsize(destino) > 1000:
        return True, {}
    espera = 2
    for tentativa in range(tentativas):
        try:
            dados, headers = http_get(url)
            if not dados.startswith(b"%PDF"):
                return False, {}
            with open(destino, "wb") as f:
                f.write(dados)
            return True, headers
        except HTTPError as e:
            if e.code in (404, 403, 410):
                return False, {}
            if tentativa == tentativas - 1:
                return False, {}
            time.sleep(espera)
            espera *= 2
        except (URLError, OSError):
            if tentativa == tentativas - 1:
                return False, {}
            time.sleep(espera)
            espera *= 2
    return False, {}


def descobrir_pelo_portal(max_paginas=400):
    """Tenta ler a listagem do portal e colher os links dos PDFs."""
    encontrados = {}
    visitadas = set()
    fila = [PORTAL] + ["%s?page=%d" % (PORTAL, n) for n in range(2, max_paginas + 1)]
    vazias_seguidas = 0
    for url in fila:
        if url in visitadas:
            continue
        visitadas.add(url)
        try:
            corpo, _ = http_get(url, timeout=30)
        except Exception:
            break
        html = corpo.decode("utf-8", "replace")
        links = re.findall(r'href=["\']([^"\']*[Ee]dicao[^"\']*\.pdf)["\']', html)
        novos = 0
        for href in links:
            absoluto = urljoin(url, href)
            num = re.search(r"[Ee]dicao[-_]?(\d{3,5})", absoluto)
            if num:
                chave = int(num.group(1))
                if chave not in encontrados:
                    encontrados[chave] = absoluto
                    novos += 1
        vazias_seguidas = vazias_seguidas + 1 if novos == 0 else 0
        if vazias_seguidas >= 3:
            break
    return encontrados


def urls_forca_bruta(numero):
    for suf in SUFIXOS:
        for ext in EXTENSOES:
            yield "%sEdicao-%d%s%s" % (BASE_PDF, numero, suf, ext)


# --------------------------------------------------------------------------
# metadados da edicao
# --------------------------------------------------------------------------
def data_da_edicao(texto_p1, headers):
    t = normalizar(colapsar(texto_p1))[:4000]
    m = re.search(r"(\d{1,2})\s*de\s*([a-z]+)\s*de\s*(\d{4})", t)
    if m and m.group(2) in MESES:
        try:
            return date(int(m.group(3)), MESES[m.group(2)], int(m.group(1)))
        except ValueError:
            pass
    m = re.search(r"(\d{2})/(\d{2})/(\d{4})", t)
    if m:
        try:
            return date(int(m.group(3)), int(m.group(2)), int(m.group(1)))
        except ValueError:
            pass
    lm = headers.get("Last-Modified") if headers else None
    if lm:
        try:
            return datetime.strptime(lm, "%a, %d %b %Y %H:%M:%S %Z").date()
        except ValueError:
            pass
    return None


def numero_da_edicao(texto_p1, fallback):
    t = normalizar(colapsar(texto_p1))[:4000]
    m = re.search(r"edicao\s*n?[oº°.\s]*(\d{3,5})", t)
    return int(m.group(1)) if m else fallback


# --------------------------------------------------------------------------
# busca
# --------------------------------------------------------------------------
class Alvo:
    def __init__(self, nome, somente_exato=False):
        self.nome = nome
        self.somente_exato = somente_exato
        base = normalizar(nome)
        self.tokens = [t for t in re.split(r"\s+", base) if t]
        self.espremido = espremer(base)
        # variante sem preposicoes (dos, das, de, do, da, e)
        curtos = {"de", "do", "da", "dos", "das", "e"}
        self.espremido_curto = espremer("".join(
            t for t in self.tokens if t not in curtos))
        self.primeiro = self.tokens[0]
        self.ultimo = self.tokens[-1]

    def procurar(self, texto_pagina):
        """Devolve (tipo_do_acerto, trecho) ou None."""
        norm = normalizar(texto_pagina)
        colado = espremer(norm)
        if self.espremido and self.espremido in colado:
            return "exato", self._trecho(norm)
        if self.espremido_curto and self.espremido_curto in colado:
            return "sem preposicoes", self._trecho(norm)
        if self.somente_exato:
            return None
        # parcial: primeiro e ultimo nome perto um do outro (grafia diferente
        # do meio, nome abreviado, etc.)
        col = colapsar(norm)
        for m in re.finditer(re.escape(self.primeiro), col):
            janela = col[m.start(): m.start() + 120]
            if self.ultimo in janela:
                return "parcial", colapsar(
                    col[max(0, m.start() - 150): m.start() + 250])
        return None

    def _trecho(self, norm):
        col = colapsar(norm)
        padrao = r"\s*".join(re.escape(c) for c in self.espremido_curto or self.espremido)
        m = re.search(padrao, col)
        if m:
            return colapsar(col[max(0, m.start() - 200): m.end() + 300])
        i = col.find(self.primeiro)
        if i >= 0:
            return colapsar(col[max(0, i - 200): i + 400])
        return ""


def contexto_concurso(texto_pagina):
    t = normalizar(texto_pagina)
    return ", ".join(sorted({p for p in TERMOS_CONCURSO if p in t}))


# --------------------------------------------------------------------------
# principal
# --------------------------------------------------------------------------
def processar(caminho, url, numero_chute, alvo, headers, usar_ocr):
    paginas = paginas_do_pdf(caminho)
    total_texto = sum(len(p.strip()) for p in paginas)
    if usar_ocr and total_texto < 200:
        if ocr(caminho):
            paginas = paginas_do_pdf(caminho)
            total_texto = sum(len(p.strip()) for p in paginas)
    p1 = paginas[0] if paginas else ""
    info = {
        "numero": numero_da_edicao(p1, numero_chute),
        "data": data_da_edicao(p1, headers),
        "url": url,
        "arquivo": os.path.basename(caminho),
        "paginas": len(paginas),
        "so_imagem": total_texto < 200,
    }
    achados = []
    for i, pagina in enumerate(paginas, start=1):
        r = alvo.procurar(pagina)
        if r:
            tipo, trecho = r
            achados.append({
                "edicao": info["numero"],
                "data": info["data"].isoformat() if info["data"] else "",
                "pagina": i,
                "tipo": tipo,
                "concurso": contexto_concurso(pagina),
                "url": url,
                "trecho": trecho[:600],
            })
    return info, achados


def main():
    ap = argparse.ArgumentParser(description="Busca um nome no Diario Oficial de Prudentopolis-PR")
    ap.add_argument("--nome", default="Rayane dos Santos Pedroso")
    ap.add_argument("--pasta", default="pdfs")
    ap.add_argument("--desde", default="2024-01-01", help="AAAA-MM-DD (filtra o relatorio final)")
    ap.add_argument("--ate", default="", help="AAAA-MM-DD")
    ap.add_argument("--inicio", type=int, default=2700, help="numero inicial no modo forca-bruta")
    ap.add_argument("--fim", type=int, default=3600, help="numero final no modo forca-bruta")
    ap.add_argument("--param-falhas", type=int, default=40,
                    help="para depois de N numeros seguidos inexistentes")
    ap.add_argument("--offline", action="store_true", help="nao baixa nada")
    ap.add_argument("--sem-portal", action="store_true", help="pula a listagem e vai direto na forca-bruta")
    ap.add_argument("--somente-exato", action="store_true",
                    help="ignora acertos 'parcial' (primeiro+ultimo nome perto)")
    ap.add_argument("--ocr", action="store_true")
    ap.add_argument("--jobs", type=int, default=4)
    args = ap.parse_args()

    alvo = Alvo(args.nome, somente_exato=args.somente_exato)
    os.makedirs(args.pasta, exist_ok=True)
    desde = datetime.strptime(args.desde, "%Y-%m-%d").date() if args.desde else None
    ate = datetime.strptime(args.ate, "%Y-%m-%d").date() if args.ate else None

    print("Procurando: %s" % args.nome)
    print("Extrator: %s" % ("pdftotext" if PDFTOTEXT else ("pypdf" if TEM_PYPDF else "NENHUM")))

    tarefas = []  # (numero, url, caminho, headers)

    if args.offline:
        for arq in sorted(os.listdir(args.pasta)):
            if arq.lower().endswith(".pdf"):
                m = re.search(r"(\d{3,5})", arq)
                tarefas.append((int(m.group(1)) if m else 0,
                                "(local) " + arq,
                                os.path.join(args.pasta, arq), {}))
        print("Modo offline: %d PDFs na pasta %s" % (len(tarefas), args.pasta))
    else:
        catalogo = {}
        if not args.sem_portal:
            print("Lendo a listagem do portal...")
            try:
                catalogo = descobrir_pelo_portal()
            except Exception as e:
                print("  (listagem falhou: %s)" % e)
            print("  %d edicoes encontradas na listagem" % len(catalogo))

        def pegar(numero, url_conhecida=None):
            destino = os.path.join(args.pasta, "Edicao-%d.pdf" % numero)
            urls = [url_conhecida] if url_conhecida else list(urls_forca_bruta(numero))
            for u in urls:
                ok, headers = baixar(u, destino)
                if ok:
                    return (numero, u, destino, headers)
            return None

        if catalogo:
            alvos = sorted(catalogo.items())
            with ThreadPoolExecutor(max_workers=args.jobs) as ex:
                for r in ex.map(lambda kv: pegar(kv[0], kv[1]), alvos):
                    if r:
                        tarefas.append(r)
        else:
            print("Baixando por numero de edicao (%d a %d)..." % (args.inicio, args.fim))
            falhas = 0
            numero = args.inicio
            while numero <= args.fim and falhas < args.param_falhas:
                lote = list(range(numero, min(numero + args.jobs, args.fim + 1)))
                with ThreadPoolExecutor(max_workers=args.jobs) as ex:
                    resultados = list(ex.map(lambda n: pegar(n), lote))
                for r in resultados:
                    if r:
                        tarefas.append(r)
                        falhas = 0
                    else:
                        falhas += 1
                numero += len(lote)
                print("  ... %d edicoes baixadas (ultimo numero testado: %d)"
                      % (len(tarefas), numero - 1), end="\r")
            print()

    if not tarefas:
        print("Nenhuma edicao obtida. Verifique a conexao ou use --sem-portal.")
        return 1

    print("Lendo %d edicoes..." % len(tarefas))
    achados = []
    indice = []
    so_imagem = []
    for k, (numero, url, caminho, headers) in enumerate(sorted(tarefas), start=1):
        info, hits = processar(caminho, url, numero, alvo, headers, args.ocr)
        indice.append(info)
        if info["so_imagem"]:
            so_imagem.append(info)
        for h in hits:
            d = h["data"]
            if d:
                dd = datetime.strptime(d, "%Y-%m-%d").date()
                if desde and dd < desde:
                    continue
                if ate and dd > ate:
                    continue
            achados.append(h)
        if k % 25 == 0:
            print("  ... %d/%d" % (k, len(tarefas)), end="\r")
    print()

    with open("indice.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["edicao", "data", "paginas", "so_imagem", "arquivo", "url"])
        for i in sorted(indice, key=lambda x: x["numero"]):
            w.writerow([i["numero"],
                        i["data"].isoformat() if i["data"] else "",
                        i["paginas"], "sim" if i["so_imagem"] else "nao",
                        i["arquivo"], i["url"]])

    with open("resultados.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["edicao", "data", "pagina", "tipo_do_acerto",
                    "indicios_de_concurso", "url", "trecho"])
        for h in sorted(achados, key=lambda x: ({"exato": 0, "sem preposicoes": 1, "parcial": 2}[x["tipo"]], x["data"], x["edicao"], x["pagina"])):
            w.writerow([h["edicao"], h["data"], h["pagina"], h["tipo"],
                        h["concurso"], h["url"], h["trecho"]])

    print("=" * 72)
    if not achados:
        print("Nome NAO encontrado em nenhuma das %d edicoes lidas." % len(indice))
    else:
        print("%d ocorrencia(s) de '%s':\n" % (len(achados), args.nome))
        for h in sorted(achados, key=lambda x: ({"exato": 0, "sem preposicoes": 1, "parcial": 2}[x["tipo"]], x["data"], x["edicao"], x["pagina"])):
            print("Edicao %s | data %s | pagina %s | acerto %s"
                  % (h["edicao"], h["data"] or "?", h["pagina"], h["tipo"]))
            if h["concurso"]:
                print("  indicios de concurso: %s" % h["concurso"])
            print("  %s" % h["url"])
            print("  ...%s...\n" % h["trecho"][:400])
    if so_imagem:
        print("ATENCAO: %d edicao(oes) sem texto extraivel (PDF de imagem)."
              % len(so_imagem))
        print("  Rode de novo com --ocr (precisa de ocrmypdf) para conferir estas:")
        print("  " + ", ".join(str(i["numero"]) for i in so_imagem[:40]))
    print("\nArquivos gerados: resultados.csv e indice.csv")
    return 0


if __name__ == "__main__":
    sys.exit(main())
