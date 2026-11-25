---
title: "Como saber de qual anúncio veio cada cliente que te chama no WhatsApp"
description: "O botão de WhatsApp é ótimo para converter e péssimo para medir. Veja quatro formas de ligar cada conversa à campanha que a gerou — da mais simples à mais completa."
date: 2026-11-25
tags: [WhatsApp, Rastreamento, Google Ads, Meta Ads, CRM]
draft: false
---

Para negócio local, o WhatsApp é o principal canal de venda. O cliente vê o anúncio, clica no botão verde e começa a conversar. Simples para ele — e um buraco negro para quem precisa medir.

O problema é que, no momento em que a pessoa sai do seu site e abre o WhatsApp, **a origem dela se perde**. A conversa chega sem nenhuma informação de qual campanha, anúncio ou palavra-chave trouxe aquele contato. Resultado: você sabe quanto gastou, sabe quanto vendeu, mas não sabe **o que funcionou**.

Abaixo estão quatro formas de resolver isso, em ordem de complexidade. Você não precisa de todas — precisa da que cabe no seu momento.

## 1. Medir o clique no botão

O primeiro passo é registrar cada clique em um link `wa.me` ou `api.whatsapp.com` como um evento no Google Tag Manager e enviar para o GA4, o Google Ads e o Meta.

**O que resolve:** você passa a saber quais campanhas geram mais intenção de contato.

**O que não resolve:** clique não é lead. Muita gente clica, abre o WhatsApp e não manda nada. Se você otimizar campanhas para "clique no WhatsApp", o algoritmo vai trazer mais gente que clica — não necessariamente gente que compra.

Mesmo assim, é a base de tudo e leva menos de uma hora para configurar.

## 2. Uma mensagem diferente para cada origem

O link do WhatsApp aceita uma mensagem pré-preenchida (`?text=`). Em vez de usar o mesmo texto em todo lugar, você varia conforme a origem:

- anúncio do Google: *"Olá! Vi o anúncio no Google e quero um orçamento."*
- anúncio do Instagram: *"Olá! Vim pelo Instagram e quero saber mais."*

Quem atende consegue identificar a origem só de olhar a primeira mensagem.

**O que resolve:** separa os canais com custo zero.

**O que não resolve:** depende de o cliente não apagar o texto, e não chega no nível da campanha ou do anúncio.

## 3. Um código único por visita

Aqui a coisa fica séria. Quando o visitante chega no site, um script guarda os parâmetros da visita — `utm_source`, `utm_campaign`, o `gclid` do Google Ads, o `fbclid` do Meta — e gera um **código curto**, como `#A7K2`. Esse código vai junto na mensagem pré-preenchida.

Quando a conversa chega, uma automação (eu uso o **n8n** com a API do WhatsApp) lê o código, busca os dados da visita e cria o contato no CRM **já com a origem completa**: canal, campanha, anúncio, palavra-chave.

**O que resolve:** cada lead tem nome, telefone e origem exata. Você finalmente consegue responder "qual campanha trouxe mais clientes?" com dados, e não com palpite.

## 4. Devolver as vendas para as plataformas

O último nível fecha o ciclo. Quando um lead vira cliente no CRM, essa informação volta para as plataformas de anúncio:

- no **Google Ads**, via importação de conversões off-line, usando o `gclid` guardado no passo anterior;
- no **Meta**, via API de Conversões, com o telefone e o e-mail do cliente criptografados.

A partir daí, o algoritmo deixa de otimizar para "gente que clica" e passa a otimizar para **gente parecida com quem comprou**. Para negócios em que o ticket é alto e a venda acontece na conversa — clínicas, imobiliárias, escritórios, serviços —, essa é a mudança que mais impacta o custo por cliente.

## E os anúncios de clique para o WhatsApp?

Os anúncios do Meta que abrem o WhatsApp direto (sem passar pelo site) já mostram quantas conversas cada anúncio iniciou. É um bom ponto de partida. Mas "conversa iniciada" ainda não é venda — para ensinar o Meta quais conversas viraram clientes, você continua precisando do passo 4.

## Qual escolher

- **Está começando e anuncia pouco?** Faça os passos 1 e 2 hoje mesmo.
- **Investe todo mês e tem alguém atendendo o WhatsApp?** O passo 3 se paga rápido, porque mostra onde cortar verba.
- **Tem CRM e volume de vendas?** O passo 4 é o que vai baixar o seu custo por cliente.

Se você quer montar isso no seu negócio e não sabe por onde começar, me chama — no WhatsApp, claro.
