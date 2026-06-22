"""
Capturador de links e arquivos de DMs do Instagram.

Requer: pip install instagrapi requests
Aviso: usa a API privada do Instagram (instagrapi). Use com conta própria e
com moderação para evitar bloqueio temporário.
"""

import os
import re
import json
import time
import requests
from pathlib import Path
from datetime import datetime
from instagrapi import Client
from instagrapi.exceptions import LoginRequired, BadPassword, TwoFactorRequired


PASTA_DOWNLOADS = Path("downloads")
ARQUIVO_ESTADO = Path(".dm_estado.json")
ARQUIVO_LOG = Path("links_capturados.txt")

URL_REGEX = re.compile(
    r"https?://[^\s\)\]\>\"\']+",
    re.IGNORECASE,
)


def carregar_estado() -> dict:
    if ARQUIVO_ESTADO.exists():
        return json.loads(ARQUIVO_ESTADO.read_text())
    return {"mensagens_processadas": []}


def salvar_estado(estado: dict):
    ARQUIVO_ESTADO.write_text(json.dumps(estado, indent=2))


def login(username: str, password: str) -> Client:
    cl = Client()
    session_file = Path(f".session_{username}.json")

    if session_file.exists():
        cl.load_settings(session_file)
        cl.login(username, password)
    else:
        try:
            cl.login(username, password)
        except TwoFactorRequired:
            code = input("Código 2FA: ").strip()
            cl.login(username, password, verification_code=code)

    cl.dump_settings(session_file)
    return cl


def baixar_arquivo(url: str, pasta: Path, nome_sugerido: str = "") -> Path | None:
    try:
        response = requests.get(url, timeout=30, stream=True)
        response.raise_for_status()

        content_type = response.headers.get("content-type", "")
        extensao = _extensao_por_content_type(content_type)

        nome = nome_sugerido or f"arquivo_{int(time.time())}"
        if not nome.endswith(extensao):
            nome = nome + extensao

        caminho = pasta / nome
        caminho.write_bytes(response.content)
        return caminho
    except Exception as e:
        print(f"  Erro ao baixar {url}: {e}")
        return None


def _extensao_por_content_type(ct: str) -> str:
    mapa = {
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/gif": ".gif",
        "image/webp": ".webp",
        "video/mp4": ".mp4",
        "application/pdf": ".pdf",
        "application/zip": ".zip",
        "text/html": ".html",
    }
    for tipo, ext in mapa.items():
        if tipo in ct:
            return ext
    return ".bin"


def _e_arquivo_direto(url: str) -> bool:
    extensoes = (".jpg", ".jpeg", ".png", ".gif", ".mp4", ".pdf", ".zip", ".webp", ".mov")
    return any(url.lower().split("?")[0].endswith(ext) for ext in extensoes)


def processar_thread(cl: Client, thread, estado: dict, pasta_base: Path) -> list[dict]:
    resultados = []
    thread_id = str(thread.id)
    nome_contato = thread.users[0].username if thread.users else "desconhecido"
    pasta_contato = pasta_base / nome_contato
    pasta_contato.mkdir(parents=True, exist_ok=True)

    mensagens = cl.direct_messages(thread_id, amount=50)

    for msg in mensagens:
        msg_id = str(msg.id)
        if msg_id in estado["mensagens_processadas"]:
            continue

        links_encontrados = []
        arquivos_baixados = []
        timestamp = msg.timestamp.isoformat() if msg.timestamp else ""

        # Links no texto
        if msg.text:
            for url in URL_REGEX.findall(msg.text):
                links_encontrados.append(url)
                if _e_arquivo_direto(url):
                    caminho = baixar_arquivo(url, pasta_contato)
                    if caminho:
                        arquivos_baixados.append(str(caminho))

        # Imagens/vídeos anexados diretamente
        if msg.clip:
            url_media = str(msg.clip.video_url or "")
            if url_media:
                nome = f"{nome_contato}_{msg_id}_video.mp4"
                caminho = baixar_arquivo(url_media, pasta_contato, nome)
                if caminho:
                    arquivos_baixados.append(str(caminho))

        if msg.visual_media:
            for item in (msg.visual_media.media.resources or []):
                url_media = str(item.video_url or item.thumbnail_url or "")
                if url_media:
                    nome = f"{nome_contato}_{msg_id}_media"
                    caminho = baixar_arquivo(url_media, pasta_contato, nome)
                    if caminho:
                        arquivos_baixados.append(str(caminho))

        if links_encontrados or arquivos_baixados:
            resultado = {
                "contato": nome_contato,
                "thread_id": thread_id,
                "msg_id": msg_id,
                "timestamp": timestamp,
                "links": links_encontrados,
                "arquivos": arquivos_baixados,
            }
            resultados.append(resultado)
            print(f"  [{nome_contato}] {len(links_encontrados)} link(s), {len(arquivos_baixados)} arquivo(s)")

        estado["mensagens_processadas"].append(msg_id)

    return resultados


def salvar_log(resultados: list[dict]):
    with ARQUIVO_LOG.open("a", encoding="utf-8") as f:
        f.write(f"\n=== Captura em {datetime.now().isoformat()} ===\n")
        for r in resultados:
            f.write(f"\n[{r['contato']}] {r['timestamp']}\n")
            for link in r["links"]:
                f.write(f"  LINK: {link}\n")
            for arq in r["arquivos"]:
                f.write(f"  ARQUIVO: {arq}\n")


def main():
    username = os.environ.get("IG_USERNAME") or input("Usuário Instagram: ").strip()
    password = os.environ.get("IG_PASSWORD") or input("Senha: ").strip()

    print("\nFazendo login...")
    cl = login(username, password)
    print("Login OK.")

    PASTA_DOWNLOADS.mkdir(exist_ok=True)
    estado = carregar_estado()

    print("\nBuscando threads de DM (pode demorar um pouco)...")
    threads = cl.direct_threads(amount=30)
    print(f"Encontradas {len(threads)} conversas.\n")

    todos_resultados = []
    for thread in threads:
        nome = thread.users[0].username if thread.users else "?"
        print(f"Processando: {nome}")
        resultados = processar_thread(cl, thread, estado, PASTA_DOWNLOADS)
        todos_resultados.extend(resultados)
        time.sleep(0.5)  # pausa para não acionar rate limit

    salvar_estado(estado)

    if todos_resultados:
        salvar_log(todos_resultados)
        total_links = sum(len(r["links"]) for r in todos_resultados)
        total_arquivos = sum(len(r["arquivos"]) for r in todos_resultados)
        print(f"\nPronto! {total_links} link(s) e {total_arquivos} arquivo(s) capturado(s).")
        print(f"Log salvo em: {ARQUIVO_LOG}")
        print(f"Arquivos baixados em: {PASTA_DOWNLOADS}/")
    else:
        print("\nNenhum link ou arquivo novo encontrado nas últimas 50 mensagens por conversa.")


if __name__ == "__main__":
    main()
