---
title: "Por que o Meta Ads mostra menos vendas do que você fez — e como a API de Conversões ajuda"
description: "Bloqueadores, iPhone e cookies que expiram fazem o pixel perder conversões. Entenda o que é a API de Conversões (CAPI), quando ela faz diferença e os erros mais comuns na implementação."
date: 2026-11-25
tags: [Meta Ads, API de Conversões, Rastreamento]
draft: true
---

Se você anuncia no Meta Ads, provavelmente já passou por isso: o mês fecha, o caixa mostra 40 vendas e o Gerenciador de Anúncios mostra 22. A diferença não é erro de digitação — é rastreamento quebrado. E isso custa mais do que um relatório bonito: o algoritmo do Meta otimiza a entrega com base nas conversões que *enxerga*. Se ele vê metade, aprende com metade.

## Onde as conversões se perdem

O pixel do Meta é um código que roda **no navegador** de quem visita o seu site. Isso o deixa exposto a uma série de obstáculos:

- **Bloqueadores de anúncio e navegadores com proteção de rastreamento** impedem que o script do pixel carregue.
- **iPhone (iOS 14.5 em diante)**: quem recusa o rastreamento no aplicativo do Facebook ou do Instagram passa a ser medido de forma limitada.
- **Cookies com prazo curto**: o Safari, por exemplo, limita a vida de cookies criados por JavaScript. Quem clica no anúncio hoje e compra daqui a dez dias pode não ser mais reconhecido.
- **Páginas que fecham antes do pixel disparar**, como a página de obrigado que redireciona rápido demais.

Nenhum desses problemas é culpa sua. Mas todos eles têm o mesmo efeito: o Meta recebe menos sinais do que deveria.

## O que é a API de Conversões

A **API de Conversões** (ou CAPI, de *Conversions API*) é uma forma de enviar os mesmos eventos — visualização de página, lead, compra — **do seu servidor direto para o Meta**, sem depender do navegador do cliente.

Na prática, você passa a ter dois canais trabalhando juntos:

1. O **pixel**, que continua rodando no navegador.
2. O **servidor**, que manda uma cópia de cada evento importante.

Quando o pixel é bloqueado, o servidor cobre. Quando os dois chegam, o Meta descarta a duplicata — desde que a implementação esteja certa (já falo disso).

## O que muda no resultado

Não existe número mágico, e desconfie de quem promete "+30% de conversões". O que a CAPI faz é **recuperar sinais que já existiam e estavam se perdendo**. O ganho depende de quanto o seu pixel está perdendo hoje — e isso varia muito entre um e-commerce com público jovem no iPhone e uma clínica que recebe contatos pelo formulário.

O que eu costumo observar depois de uma implementação bem feita:

- o número de conversões no Gerenciador fica **mais próximo do real**;
- a **qualidade da correspondência de eventos** (o "Event Match Quality", no Gerenciador de Eventos) sobe;
- as campanhas otimizadas para conversão ficam **mais estáveis**, porque o algoritmo tem mais dados para aprender.

## Os três erros mais comuns

### 1. Duplicar eventos

Se o pixel e o servidor mandam a mesma compra e o Meta não consegue perceber que é a mesma, ela conta duas vezes. A solução é enviar o **mesmo `event_id`** (e o mesmo nome de evento) nos dois canais. Sem isso, os seus relatórios ficam inflados e o algoritmo aprende errado.

### 2. Mandar o evento "pelado"

O servidor não tem os cookies do navegador por padrão. Se você envia só "aconteceu uma compra", o Meta não sabe **quem** comprou. Para a correspondência funcionar, o evento precisa levar parâmetros como:

- e-mail e telefone **criptografados com SHA-256** (normalizados antes: minúsculas, sem espaços, telefone com DDI);
- os cookies `_fbp` e `_fbc` do visitante;
- IP e *user agent* do navegador.

Quanto mais desses dados, melhor a correspondência.

### 3. Esquecer a LGPD

Enviar dados pessoais para o Meta exige base legal e transparência. Sua política de privacidade precisa dizer isso, e o envio deve respeitar o consentimento do visitante quando ele for a base legal usada. Rastreamento bom é rastreamento que não vira problema jurídico.

## Como implementar

Existem alguns caminhos, do mais simples ao mais flexível:

- **Integração nativa da plataforma**: Shopify, WooCommerce, Nuvemshop e outras já têm CAPI embutida ou via plugin. Para muitos e-commerces, é por onde começar.
- **Google Tag Manager Server-Side**: um contêiner do GTM rodando em servidor próprio recebe os eventos do site e repassa para o Meta, o Google Ads e o GA4. É o que eu mais uso, porque centraliza tudo em um lugar.
- **Integração direta**: o seu sistema (CRM, backend ou uma automação no n8n) chama a API quando algo acontece — útil para eventos que nem passam pelo site, como uma venda fechada no WhatsApp.

## Por onde começar

Abra o **Gerenciador de Eventos** do Meta, clique no seu pixel e olhe a qualidade da correspondência dos eventos principais. Se aparecer "Ruim" ou "OK", ou se não houver nenhum evento chegando pelo servidor, há espaço claro para melhorar.

E se você quiser que eu olhe a sua conta e diga o que faria primeiro, é só me chamar.
