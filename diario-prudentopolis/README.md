# Busca de nome no Diário Oficial de Prudentópolis-PR

Procura um nome em **todas** as edições do diário oficial do município, sem
precisar abrir edição por edição. Feito para checar convocação de concurso.

## Antes de rodar o script: tente a busca do próprio portal

O portal <https://diario.prudentopolis.pr.gov.br/> tem campo de busca. Se ele
fizer busca por **texto** (e não só por número/data da edição), digitar o nome
lá resolve em segundos. Vale tentar também no Google:

```
site:prudentopolis.pr.gov.br "Rayane dos Santos Pedroso"
```

O Google indexa só parte dos PDFs — por isso o script existe.

## O que o script faz

1. Descobre as edições (lê a listagem do portal; se não conseguir, tenta os
   números de edição direto em `https://www.prudentopolis.pr.gov.br/uploads/diarioOficial/Edicao-NNNN.pdf`).
2. Baixa cada PDF uma única vez (guarda em `pdfs/`, não rebaixa o que já tem).
3. Extrai o texto e procura o nome, tolerando:
   - MAIÚSCULAS, acentos e cedilha;
   - nome quebrado em duas linhas ou em duas colunas;
   - hifenização de fim de linha (`PEDRO-\nSO`);
   - nome sem as preposições (`Rayane Santos Pedroso`).
4. Gera dois arquivos:
   - **`resultados.csv`** — edição, data, página, tipo do acerto, indícios de
     concurso (convoca / nomeia / posse / edital…), URL e o trecho do texto;
   - **`indice.csv`** — todas as edições vistas, com número e data.

## Instalação

Precisa de Python 3.8+ e de um extrator de texto de PDF.

**Linux (Ubuntu/Debian)**
```bash
sudo apt install python3 poppler-utils
```

**macOS**
```bash
brew install python poppler
```

**Windows (ou se não quiser instalar o poppler)**
```bash
pip install pypdf
```

Opcional, para edições que são imagem escaneada:
```bash
sudo apt install ocrmypdf tesseract-ocr-por    # Linux
brew install ocrmypdf tesseract-lang           # macOS
```

## Uso

```bash
python3 buscar_no_diario.py --nome "Rayane dos Santos Pedroso" --desde 2024-01-01
```

Principais opções:

| opção | para que serve |
|---|---|
| `--nome "..."` | nome procurado |
| `--desde 2024-01-01` / `--ate 2026-08-31` | recorte de datas do relatório |
| `--pasta pdfs` | onde guardar/ler os PDFs |
| `--offline` | não baixa nada, só procura nos PDFs já na pasta |
| `--sem-portal` | pula a listagem e vai direto por número de edição |
| `--inicio 2700 --fim 3600` | faixa de números no modo por número |
| `--somente-exato` | descarta acertos parciais (menos ruído) |
| `--ocr` | roda OCR nas edições sem texto extraível |
| `--jobs 4` | downloads simultâneos |

A primeira execução baixa algumas centenas de PDFs e demora (10–40 min,
dependendo da conexão). As seguintes reaproveitam a pasta `pdfs/` e são rápidas.

Se o download não emplacar, rode com `--sem-portal`. Se ainda assim vier
"Nenhuma edição obtida", baixe os PDFs manualmente para a pasta `pdfs/` e use
`--offline`.

## Leitura do resultado

- `tipo_do_acerto = exato` — o nome completo está na página.
- `tipo_do_acerto = sem preposicoes` — bate ignorando "dos/das/de".
- `tipo_do_acerto = parcial` — primeiro e último nome aparecem perto um do
  outro; pode ser homônimo ou grafia diferente. Confira o trecho.
- `indicios_de_concurso` preenchido com `convoca`, `nomeia`, `posse` ou
  `concurso publico` é o sinal que interessa para convocação.

No fim, o script avisa quais edições são **PDF de imagem** (sem texto). Essas
não foram realmente pesquisadas — rode de novo com `--ocr`, ou abra só essas
poucas à mão.

## O que já se sabe

Uma busca pública indexada aponta uma ocorrência do nome na **Edição 2699**
(dezembro/2023), em contexto de **estágio** na Secretaria de Assistência
Social — não de concurso, e anterior à janela de 2024. Confirme abrindo o PDF:
<https://prudentopolis.pr.gov.br/uploads/diarioOficial/Edicao-2699.pdf>
