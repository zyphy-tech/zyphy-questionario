# Product

<!-- impeccable:product-schema 1 -->

<!--
Escrito na CONSTRUCAO (2026-10-01) pelo diretor de arte, a partir dos
documentos aprovados pelo Weslley: brief-questionario-v1.md, fatos-cliente.md,
perguntas.md e copy.md. Não houve entrevista: o agente roda em contexto
isolado, sem ferramenta de pergunta. Nada aqui é novo; cada item cita a
origem. Decisões continuam no brief (regra 1).
-->

## Platform

web

## Stack

HTML/CSS/JS vanilla, sem framework e sem build obrigatório (brief §2).
Hospedagem na Vercel, no time do Weslley, endereço `.vercel.app` (brief §2).
Biblioteca de PDF pdf-lib + fontkit no próprio site, carregada só no clique
(brief §3, linha 22).

## Users

Dono de PME que já conversou com a Zyphy e recebeu o link do questionário.
Ele decide se vale responder e, se responder, preenche 28 perguntas sobre o
próprio negócio (brief §1; perguntas.md).

## Product Purpose

Juntar, antes do projeto, o que a Zyphy precisa para escrever e programar o
site do cliente. Sucesso: a pessoa preenche e envia o PDF à Zyphy pelo
WhatsApp (brief §1).

## Positioning

A pessoa sai com um PDF do próprio negócio, nada fica guardado online, e quem
lê é quem vai programar o site (brief §1; F13, F34).

## Operating Context

- Link enviado pela Zyphy, normalmente pelo WhatsApp; a página fica fora do
  Google (noindex, brief §3).
- Uma etapa por vez, 6 etapas; rascunho no `localStorage` do navegador
  (brief §3; F34).
- Saída: PDF em papel branco, texto selecionável, enviado pelo
  compartilhamento do celular ou por download + `wa.me` (brief §3).

## Capabilities and Constraints

- Nada sai do navegador: sem envio de respostas, sem analytics, sem fonte ou
  script de terceiro (brief §3; F34).
- 28 perguntas + caixa de confirmação obrigatória (perguntas.md).
- Sem upload de arquivos nesta versão (brief §3).

## Brand Commitments

- Identidade do `zyphy-site`: paleta petróleo + ciano, Sofia Sans Extra
  Condensed e Archivo, modo escuro (brief §3).
- Tom próximo, "você" e "seu" (brief §3).
- Copy aprovado em `copy.md`; só entra afirmação do `fatos-cliente.md`.

## Evidence on Hand

Fatos F1–F35 em `fatos-cliente.md`. O questionário usa F1, F10, F13, F32,
F34 e F35. Não há depoimento, foto nem métrica nesta página.

## Product Principles

- Privacidade é visível: a página diz o que acontece com as respostas antes
  do primeiro campo.
- A pergunta é o conteúdo: legibilidade e estado claro antes de expressão.
- O PDF é da pessoa: ela leva o documento, a Zyphy só recebe se ela enviar.

## Accessibility & Inclusion

Padrão da Zyphy: contraste ≥ 4.5:1 em texto, foco visível em todo elemento
interativo, alvo de toque ≥ 44px, `prefers-reduced-motion` respeitado
(checklist QA do playbook).
