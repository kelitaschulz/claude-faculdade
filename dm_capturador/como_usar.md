# Como usar o Capturador de DMs

## Instalação

```bash
cd dm_capturador
pip install -r requirements.txt
```

## Uso básico

```bash
python capturar_links.py
```

O script vai pedir seu usuário e senha do Instagram. Se preferir, você pode exportar as variáveis de ambiente para não precisar digitar sempre:

```bash
export IG_USERNAME="seu_usuario"
export IG_PASSWORD="sua_senha"
python capturar_links.py
```

## O que ele faz

1. Loga no Instagram com sua conta
2. Lê as últimas 30 conversas de DM
3. Em cada conversa, analisa as últimas 50 mensagens
4. Extrai todos os links encontrados no texto
5. Baixa arquivos (imagens, vídeos, PDFs, ZIPs) diretamente
6. Salva tudo em `downloads/<nome_do_contato>/`
7. Gera um log em `links_capturados.txt`
8. Lembra quais mensagens já processou (arquivo `.dm_estado.json`) para não duplicar

## Estrutura de saída

```
dm_capturador/
├── downloads/
│   ├── criador1/
│   │   ├── video_abc123.mp4
│   │   └── arquivo_xyz.pdf
│   └── criador2/
│       └── imagem_abc.jpg
└── links_capturados.txt
```

## Dica: rodar automaticamente

Para capturar novos links todo dia sem precisar abrir o script manualmente, você pode agendar com cron (Mac/Linux):

```bash
crontab -e
# Adicionar a linha abaixo para rodar todo dia às 9h:
0 9 * * * cd /caminho/para/dm_capturador && IG_USERNAME=seu_user IG_PASSWORD=sua_senha python capturar_links.py
```

## Aviso importante

Este script usa a biblioteca `instagrapi`, que acessa a API privada do Instagram. Funciona para uso pessoal, mas **não é endossado pelo Instagram** e pode resultar em bloqueio temporário da conta se usado de forma excessiva. Use com moderação (não rode mais de uma vez por hora).
