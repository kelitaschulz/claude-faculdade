# KAEV Studio — materiais

Arquivos da KAEV Studio (Kélita) organizados para reuso.

## Estrutura

```
kaev/
├── timbrado/            Papel timbrado oficial da KAEV (fundo dos documentos)
│   └── KAEV_Timbre.pdf
├── contratos/           Contratos de clientes
│   ├── Contrato-Lucas-KAEV.pdf              (final, no timbrado)
│   ├── Contrato-Guilherme-Paim-assinado.pdf (arquivo assinado)
│   └── _fonte/          Fontes editáveis (HTML) dos contratos
│       └── contrato-lucas-texto.html
└── propostas/           Propostas comerciais em PDF
```

## Como um contrato é gerado (timbrado + texto)

O contrato final é o **texto sobreposto no timbrado**, mantendo o timbrado
nítido (vetorial). Passos:

1. Editar o texto em `contratos/_fonte/<cliente>-texto.html`
   (fundo transparente; margens `@page: 42mm 22mm 20mm 20mm` = área útil,
   livre do cabeçalho, do rodapé e da barra magenta à direita).
2. Renderizar o texto em PDF (Chromium headless `--print-to-pdf`).
3. Sobrepor cada página no `timbrado/KAEV_Timbre.pdf` com PyMuPDF
   (`page.show_pdf_page` do timbrado e depois do texto).

Contatos do rodapé do timbrado: (42) 99987-3392 · kaev.studio@gmail.com · @studiokaev
