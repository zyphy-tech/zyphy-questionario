---
name: Questionário do site · Zyphy
description: Seis etapas sobre o negócio do cliente; no fim, um PDF que a pessoa leva e envia à Zyphy.
colors:
  ink-950: "#050B0B"
  ink-900: "#112222"
  ink-850: "#1E3535"
  petrol-700: "#0E3634"
  mist-50: "#E8F7F4"
  mist-100: "#E3EFED"
  mist-400: "#93ADAA"
  cyan-500: "#00CBCC"
  cyan-400: "#00E0E1"
  coral-300: "#FF8A80"
  sage-500: "#5E8884"
  sage-600: "#4F7A76"
  line: "rgba(227,239,237,.12)"
  error-ring: "rgba(255,138,128,.2)"
typography:
  display-h1:
    fontFamily: "'Sofia Sans Extra Condensed', 'Sofia Fallback', sans-serif"
    fontSize: "clamp(2.5rem, 13cqi, 3.5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0"
  display-title:
    fontFamily: "'Sofia Sans Extra Condensed', 'Sofia Fallback', sans-serif"
    fontSize: "clamp(2rem, 1.5rem + 1.5vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "0"
  display-h3:
    fontFamily: "'Sofia Sans Extra Condensed', 'Sofia Fallback', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "0"
  lead:
    fontFamily: "'Archivo', system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 0.9rem + 1vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.4
  question:
    fontFamily: "'Archivo', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "'Archivo', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "'Archivo', system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  control: "4px"
  screen: "12px"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  space-5: "24px"
  space-6: "32px"
  space-7: "48px"
  space-8: "64px"
components:
  button-primary:
    backgroundColor: "{colors.cyan-500}"
    textColor: "{colors.ink-950}"
    typography: "{typography.question}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.cyan-400}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.mist-100}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "12px 24px"
  field:
    backgroundColor: "{colors.ink-950}"
    textColor: "{colors.mist-100}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "12px 16px"
  option-row:
    backgroundColor: "{colors.ink-950}"
    textColor: "{colors.mist-100}"
    rounded: "{rounded.control}"
    height: "48px"
  card:
    backgroundColor: "{colors.ink-900}"
    rounded: "{rounded.screen}"
  plate:
    backgroundColor: "{colors.petrol-700}"
    textColor: "{colors.mist-50}"
    padding: "48px"
---

# Design System: Questionário do site · Zyphy

<!--
Gerado na CONSTRUCAO (2026-10-01) a partir de direcao.md, aprovada pelo
Weslley em 2026-10-01 (brief-questionario-v1.md §3, linhas 22–29). Este
arquivo é a única fonte de tokens do questionário; css/tokens.css é a
materialização dele. Todo valor herdado vem de zyphy-site/css/tokens.css
(linha citada em direcao.md). Mudou um token: muda aqui primeiro.
-->

## Overview

**Creative North Star: "A banda de contato do site, continuada"** (direcao.md,
"Ideia do hero").

No `zyphy-site`, o petróleo chapado aparece uma vez só, na banda de contato,
com o título em Sofia caixa alta. O questionário continua essa conversa: a
coluna da esquerda é essa banda reduzida a uma placa (mesmo petróleo, mesma
Sofia, mesma voz), e a coluna da direita é a folha de respostas em tinta
funda, com a primeira pergunta pronta para digitar.

A superfície é de tarefa (Operate com casca de marca): 28 perguntas, uma etapa
por vez. Legibilidade do campo e estado claro vêm antes de expressão. A marca
aparece em três lugares precisos: a placa petróleo, a letra de exibição (H1,
títulos de etapa, números das etapas) e o PDF.

**Key Characteristics:**
- Modo escuro, superfícies vizinhas sempre de tom diferente, sem sombra.
- Acento ciano raro: só ação e estado.
- Uma etapa por vez; ritmo regular de formulário (48px entre perguntas).
- Um único movimento: a barra da etapa atual desliza.
- PDF em papel branco, com a mesma letra e o petróleo.

## Colors

Uma família de tom petróleo (matiz ~180°), executada do fundo à placa, com um
acento ciano reservado para ação e estado.

### Primary
- **Ciano da marca** (cyan-500): botão principal (um por etapa), barra da
  etapa atual, marca da opção escolhida, caixa de confirmação marcada, anel de
  foco, caret, Z da marca. Nada mais: nem link, nem título, nem ícone.
- **Ciano de hover** (cyan-400): só o hover do botão principal.

### Secondary
- **Petróleo** (petrol-700): a placa da esquerda, a única superfície de cor
  chapada. No PDF, títulos de seção e o cabeçalho.

### Tertiary
- **Coral** (coral-300): erro, e a barra tracejada da etapa com obrigatória em
  branco. Anel do campo inválido em error-ring.

### Neutral
- **Tinta funda** (ink-950): fundo da página, fundo dos campos e das opções,
  faixa das etapas e rodapé no celular. Texto no PDF.
- **Tinta base** (ink-900): o cartão e a coluna das perguntas. Respostas no PDF.
- **Tinta elevada** (ink-850): não usada na v1.
- **Névoa clara** (mist-50): todo texto sobre a placa petróleo (11.9:1).
- **Névoa** (mist-100): texto principal; barra de etapa feita; borda da opção
  marcada.
- **Névoa média** (mist-400): texto secundário fora da placa (ajuda,
  "obrigatória", placeholder, número da pergunta); contorno do radio e da
  caixa vazios; borda do botão secundário; divisórias do PDF.
- **Sálvia** (sage-500): borda dos campos e das opções (3:1 de componente).
- **Sálvia funda** (sage-600): barra de etapa ainda não feita; rótulos e
  rodapé do PDF.
- **Linha** (line): divisória dentro da placa, abaixo das etapas e entre
  blocos da tela final.

### Named Rules
**The Rare Accent Rule.** Ciano só em ação e estado. Se um elemento ciano não
é clicável nem indica estado, ele sai.

**The Mist-On-Petrol Rule.** Sobre o petróleo, texto sempre em mist-50, nunca
mist-400 (o cinza-névoa sobre o petróleo lia apagado). Hierarquia na placa por
tamanho, peso e espaço.

**The Neighbour Rule.** Superfícies vizinhas nunca iguais: página 950 → cartão
900 → placa petróleo; campo 950 dentro da coluna 900.

## Typography

**Display Font:** Sofia Sans Extra Condensed 800 (com a reserva métrica
"Sofia Fallback", Impact calibrada)
**Body Font:** Archivo variável 100–900 (com system-ui)

**Character:** uma display comprimida em caixa alta que fala alto em pouco
espaço, e uma grotesca neutra que some na tarefa. Mesmos arquivos do site,
auto-hospedados, OFL, subset latino.

### Hierarchy
- **H1 da placa** (Sofia 800, 40–56px preso à largura da placa por cqi,
  entrelinha 1.0): duas frases, cada uma numa linha nova. Entrelinha 1.0
  porque "NEGÓCIO" e "LÊ" têm acento.
- **Título da etapa e da tela final** (Sofia 800, 32–40px, 0.9): segundo
  nível; nunca passa o H1.
- **Número da etapa e título de seção da prévia** (Sofia 800, 24px, 0.9).
- **Subtítulo** (Archivo 400, 20–24px, 1.4).
- **Enunciado da pergunta** (Archivo 600, 17px, 1.35): é o conteúdo que a
  pessoa lê 28 vezes.
- **Corpo, campos, opções** (Archivo 400, 17px, 1.6). Campo nunca abaixo de
  16px.
- **Ajuda, "obrigatória", erros, progresso, notas da placa, rodapé** (Archivo
  400/500, 15px, 1.5).
- **Marca "Zyphy"** (Archivo 800, tamanho do subtítulo, Z em ciano).

### Named Rules
**The Size-Not-Weight Rule.** Na Sofia, a hierarquia vem de tamanho e tom,
nunca de peso: só existe o 800.

**The Caps-Only-In-Sofia Rule.** Caixa alta só na Sofia (H1, títulos,
números). Todo o resto em caixa mista.

## Layout

- **Desktop (≥ 1100px):** cartão central de até 1160px, a 64px do topo. Seis
  etapas no topo, na largura do cartão; abaixo, placa (5/12) e perguntas
  (7/12), padding 48px nas duas. O bloco de progresso fecha a placa e é sticky
  no topo da coluna. Rodapé fora do cartão, alinhado à borda dele.
- **Tablet (600–1099px):** uma coluna, cartão de 760px. Ordem: etapas →
  progresso → placa → perguntas.
- **Celular (< 600px):** borda a borda, sem raio, padding lateral 20px. Ordem:
  etapas (950) → progresso (950) → placa (petróleo) → perguntas (900) →
  rodapé (950). Nada fixo na tela.
- **Ritmo:** escala de 4 em 4px. Dentro da pergunta 4/8/8px (enunciado →
  ajuda → campo → erro); entre perguntas 48px. Sem o respiro de banda do site
  (96–200px): isto é formulário, não página institucional.
- Uma etapa por vez, no máximo 7 perguntas na tela.

## Elevation & Depth

Sem sombra. A profundidade vem da troca de tom entre superfícies vizinhas
(950 → 900 → petróleo, degraus 1.20 e 1.25). O único halo é o anel do campo
inválido (error-ring, 3px), que é estado, não elevação.

### Named Rules
**The Tone-Not-Shadow Rule.** Se uma superfície precisa se separar da vizinha,
troque o tom; nunca adicione sombra.

## Shapes

Raio em hierarquia, não tudo igual: 12px no cartão (o único objeto com cara de
tela) e 4px em campo, opção, caixa e botão. Placa com raio só no canto de
baixo à esquerda (desktop). Borda de 1px (hairline) em campo e opção; foco em
contorno de 2px afastado 3px.

## Components

### Buttons
- **Shape:** cantos de 4px, 48px de altura.
- **Primary:** fundo ciano, texto ink-950, Archivo 600. Um por etapa:
  "Próximo: {etapa}", "Gerar o PDF", "Enviar pra Zyphy".
- **Hover / Focus:** hover em cyan-400 (200ms, só cor); foco com contorno
  ciano de 2px a 3px. Pressionar não move o botão.
- **Ghost:** transparente, borda 1px mist-400, texto mist-100; hover com borda
  mist-100. "Voltar" e "Baixar".
- **Link de texto:** sublinhado em mist-400 que vira mist-100 no hover.
- Sem seta nem ícone. Principal primeiro no DOM, à esquerda; no celular os dois
  na largura toda, principal em cima.
- **Espera:** "Gerar o PDF" fica aria-disabled e aria-busy enquanto o PDF é
  montado, com o texto de espera no mesmo lugar e sem mudar a largura.

### Cards / Containers
- **Corner Style:** 12px (cartão), 0 no celular.
- **Background:** ink-900 no cartão; petrol-700 na placa.
- **Shadow Strategy:** nenhuma (ver Elevation & Depth).
- **Internal Padding:** 48px (desktop e tablet), 20px de lateral no celular.

### Inputs / Fields
- **Style:** 48px, fundo ink-950, borda 1px sage-500, cantos de 4px, texto
  17px. Área de texto com mínimo de 128px, cresce com o texto. P4 (ano) com
  ~10ch e P15 (WhatsApp) com ~20ch: a largura diz o que cabe.
- **Focus:** borda e contorno ciano.
- **Error:** borda coral e anel error-ring de 3px; mensagem abaixo em coral,
  15px, 500.
- **Escolha única:** cada opção é uma linha clicável de 48px, fundo ink-950,
  borda sage-500; marca redonda de 20px com contorno mist-400. Marcada: ponto
  ciano e borda da linha em mist-100. Duas colunas a partir de 600px quando há
  4 opções ou mais.
- **Caixa de confirmação:** 24px, cantos de 4px, contorno mist-400; marcada,
  fundo ciano com visto em ink-950.
- **Campo do "Outro":** campo curto abaixo da grade de opções, 8px abaixo da
  última linha, rótulo 15px mist-400 acima. Aparece e some sem animação.

### Navigation
- **Etapas no topo:** seis botões em colunas iguais; barra de 2px em cima,
  número em Sofia 24px, rótulo em Archivo 500 15px (no celular, só o número;
  o rótulo fica para o leitor de tela). Estados em cor e forma: não feita
  (barra sage-600, texto mist-400), atual (barra ciano), feita (barra
  mist-100), falta responder (barra coral tracejada).

### Placa
Marca em texto, H1, subtítulo, corpo (17px), tamanho e privacidade (15px,
privacidade em 500), link da política, bloco de progresso. Tudo em mist-50.

### Prévia (tela final)
Estrutura do PDF em modo escuro, sem caixa: cabeçalho 15px mist-400, ficha em
duas colunas, seções em Sofia 24px, pergunta 17px/600, resposta 17px/400;
24px entre perguntas.

### Motion
Um comportamento só: a barra ciana da etapa atual desliza da etapa anterior
para a nova (transform, 240ms, ease-out do site). Mostra de onde a pessoa saiu
e para onde foi, inclusive a distância. Com movimento reduzido, aparece direto.
Transições de cor de 200ms no hover e no foco não contam como comportamento.

## Do's and Don'ts

### Do:
- **Do** usar só os tokens deste arquivo; nenhum valor de cor, fonte ou
  espaçamento fora de css/tokens.css.
- **Do** manter o texto sobre o petróleo em mist-50.
- **Do** pôr a ajuda acima do campo e o erro abaixo, alinhados à mesma borda.
- **Do** manter título e botão principal visíveis desde o primeiro quadro.

### Don't:
- **Don't** usar sombra, gradiente de fundo, arte abstrata, bolas
  decorativas, foto ou ícone genérico.
- **Don't** pôr ciano fora de ação e estado, nem seta nos botões.
- **Don't** animar a troca de etapa, a contagem, o erro ou o fim; nem rolar
  com suavização.
- **Don't** fixar nada na tela (botão, faixa, rodapé).
- **Don't** usar Inter, Roboto, Arial, Helvetica ou Space Grotesk, também no
  PDF.
- **Don't** pôr eyebrow sobre título nem rótulo à esquerda do campo.
