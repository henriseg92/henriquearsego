# Como publicar um post no blog

1. Crie um arquivo `.md` em `content/blog/`. O nome do arquivo vira o endereço:
   `content/blog/meu-post.md` → `henriquearsego.com.br/blog/meu-post`
2. Comece o arquivo com o cabeçalho (frontmatter):

```
---
title: "Título do post"
description: "Resumo de 1–2 frases (aparece no Google e na prévia do WhatsApp)"
date: 2026-12-01
tags: [Meta Ads, Rastreamento]
cover: /blog/minha-imagem.jpg   # opcional — coloque a imagem em public/blog/
draft: true                     # opcional — true = não publica
---
```

3. Escreva o texto em Markdown abaixo do cabeçalho (`##` para subtítulos, `**negrito**`, listas com `-`).
4. `npm run dev` mostra também os rascunhos (marcados como "rascunho").
5. Para publicar: `draft: false` (ou apague a linha), commit e deploy.
   Posts com data no futuro só aparecem a partir daquele dia (no próximo build).
