---
name: gerar-imagem
description: Gera imagens usando o modelo nano_banana_pro via MCP. Use quando o usuário pedir para criar, gerar ou renderizar uma imagem diretamente no chat.
---

Gere uma imagem usando o modelo nano_banana_pro via a ferramenta mcp__c0520146-0ff4-4977-bde4-2ba21fce7b1e__generate_image.

Sempre use:
- model: "nano_banana_pro"
- aspect_ratio: adequado ao pedido (1:1, 4:5, 16:9, 3:4)
- prompt: detalhado, em inglês, com estética, iluminação, câmera e cor especificados

Se der erro de créditos (Out of credits), informe o usuário imediatamente e sugira usar o Midjourney ou ChatGPT com o mesmo prompt.

Após gerar, mostre a imagem e pergunte se quer variações.
