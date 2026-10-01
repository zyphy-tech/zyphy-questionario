# Direção — Questionário do site (Zyphy)

- Data: 2026-10-01
- **Status: aprovada pelo Weslley em 2026-10-01**, com as decisões registradas em
  `brief-questionario-v1.md` §3 (linhas 22–32) e resumidas em "Decisões do
  Weslley" no fim deste arquivo.
- **Atualização de 2026-10-01 (depois da volta 2 do ciclo):** nova ordem no
  celular e no tablet (brief §3, linha 31). Mudam: "Ideia do hero" (primeira
  tela), "Layout › Tablet", "Layout › Celular", "Troca de etapa", "Rodapé",
  "Componentes › Placa", "Tela final" e a tabela de decisões. O desktop não muda.
- Modo: DIRECAO (fase 3), atualizada com as respostas aos pontos em aberto.
- Insumos: `brief-questionario-v1.md` (§3 Decisões travadas), `copy.md` (aprovado),
  `fatos-cliente.md`, `perguntas.md`, `refs/` + `refs/NOTAS.md`, e a identidade do
  `zyphy-site` lida em `css/tokens.css`, `css/styles.css`, `assets/` e
  `brief-zyphy-site-v3.md` (somente leitura).
- Origem dos valores: todo valor herdado cita `zyphy-site/css/tokens.css:linha`.
  O `DESIGN.md` do `zyphy-site` é uma extração que ainda "aguarda aprovação"
  (linha 3 dele); por isso a fonte citada aqui é o código, não ele.
- A direção não muda o copy. Onde este documento cita texto, é o do `copy.md`.

---

## Modo da superfície

Operate com casca de marca. O visitante completa uma tarefa longa (28 perguntas);
legibilidade do campo, estado claro e nenhum atrito vêm antes de expressão. A marca
aparece em três lugares precisos: a placa petróleo da esquerda, a letra de exibição
(H1, títulos de etapa, números das etapas) e o PDF.

---

## Ideia do hero

**A banda de contato do site, continuada.**

No `zyphy-site`, o petróleo chapado é usado uma vez só, na banda de contato
(`tokens.css:88` "a única banda de cor chapada"; `:99–101` "petróleo só no
contato"), e o título dela, em Sofia caixa alta, é "Conta pra gente o que está
travando." (`brief-zyphy-site-v3.md` §5.8). O H1 decidido do questionário começa
com as mesmas três palavras: "Conta pra gente sobre o seu negócio."

Então a coluna da esquerda é essa banda reduzida a uma placa: o mesmo petróleo, a
mesma Sofia caixa alta, a mesma voz. Quem chega pelo link reconhece a conversa que
já teve com a Zyphy. A coluna da direita é a folha de respostas, em tinta funda,
com a primeira pergunta ("Nome da empresa") já pronta para digitar. Não há tela de
abertura nem texto explicando a ferramenta (o que a ref-04 faz).

Antes de rolar, a primeira tela conta a história inteira:

- **quem pergunta e quem lê** — H1: "Conta pra gente sobre o seu negócio. Quem lê
  é quem vai programar o seu site." (F13);
- **quanto é** — as 6 etapas numeradas no topo;
- **o que a pessoa leva** — subtítulo: "Seis etapas sobre o seu negócio. No fim, o
  PDF é seu.";
- **o primeiro passo** — o campo P1 já aparece na primeira tela: no desktop
  (1366×768 e 1440×900), no tablet (768×1024) e no celular (360×800 e 375×812).
  No celular a primeira tela é: etapas, progresso, marca, H1, subtítulo, título
  da etapa 1, "Comece pelo básico." e a pergunta 1 com o campo inteiro (ver
  "Layout › Celular"). O resto da placa (corpo, quem lê, tamanho, privacidade e
  link) vai para depois das perguntas (brief §3, linha 31).

O H1 é tratado em dois blocos: cada frase começa numa linha nova, para "Quem lê é
quem vai programar o seu site." ser lida como frase própria. Sem palavra em
destaque de cor: as duas frases na cor do texto da placa.

---

## Tipografia

Herdada do `zyphy-site`, mesmos arquivos (auto-hospedados, OFL, subset latino),
copiados de `zyphy-site/assets/fonts/`. Não é dependência nova.

| Papel | Família | Origem |
|---|---|---|
| Exibição | `Sofia Sans Extra Condensed`, só peso 800, com a reserva métrica `Sofia Fallback` (Impact calibrada) | `tokens.css:26–33`, `:49–58`, `:174` |
| Texto e interface | `Archivo` variável (100–900) | `tokens.css:61–68`, `:175` |

Pesos usados (`tokens.css:177–180`): 400 texto e campo; 500 marca de "obrigatória",
rótulo das etapas, erros, avisos; 600 enunciado da pergunta e botões; 800 a marca
"Zyphy" em Archivo (como o `.brand` do site, `styles.css:60`) e toda a Sofia.

Regra herdada (`tokens.css:182–183`): na Sofia, a hierarquia vem de tamanho e tom,
nunca de peso.

### Escala

| Uso | Família | Tamanho | Entrelinha | Origem |
|---|---|---|---|---|
| H1 (placa) | Sofia 800, caixa alta | `clamp(2.5rem, 13cqi, 3.5rem)` — 40 a 56px, preso à largura da placa (contêiner) | **1.0** | novo |
| Título da etapa e da tela final | Sofia 800, caixa alta | `clamp(2rem, 1.5rem + 1.5vw, 2.5rem)` — 32 a 40px | 0.9 (`--lh-display`, `tokens.css:223`) | novo |
| Número da etapa no topo | Sofia 800, algarismo tabular | `1.5rem` (`--fs-h3`, `tokens.css:210`) | 0.9 | herdado |
| Subtítulo | Archivo 400 | `clamp(1.25rem,0.9rem + 1vw,1.5rem)` (`--fs-lead`, `:215`) | 1.4 (`--lh-lead`, `:226`) | herdado |
| Marca "Zyphy" | Archivo 800, Z em ciano | `--fs-lead` | — | `.zy-logo`, `styles.css:60–62` |
| Enunciado da pergunta | Archivo 600 | `1.0625rem` / 17px (`--fs-body`, `:216`) | 1.35 (`--lh-heading`, `:224`) | herdado |
| Corpo, campos, opções | Archivo 400 | 17px (`--fs-body`). Campo nunca abaixo de 16px (evita zoom no iOS) | 1.6 (`--lh-body`, `:225`) | herdado |
| Ajuda, "obrigatória", erros, progresso, notas da placa | Archivo 400/500 | `0.9375rem` / 15px (`--fs-small`, `:217`) | 1.5 | herdado |

Por que esses tamanhos:

- **H1 a 40–56px, não o tamanho do site (72–144px).** No site o H1 ocupa a tela;
  aqui ele mora numa coluna de ~330–410px e divide a primeira tela com a primeira
  pergunta. Preso à placa por `cqi`, como o site já faz (`tokens.css:194–198`).
- **H1 com entrelinha 1.0, não 0.9.** O 0.9 do site é para caixa alta sem acento
  (`tokens.css:220–222`); este H1 tem "NEGÓCIO" e "LÊ", e o acento em 0.9 encosta
  na linha de cima. Conferir no build com print em 360px.
- **Título da etapa menor que o H1.** É o segundo nível; se crescer até o `--fs-m`
  do site (72px em 1440) ele passa o H1.
- **Enunciado a 17px/600, não o `--fs-small` do formulário do site.** No site o
  rótulo é secundário (nome, e-mail). Aqui a pergunta é o conteúdo: é ela que a
  pessoa lê 28 vezes.

Caixa alta só na Sofia (H1, títulos, números). Todo o resto em caixa mista.

---

## Paleta

Só primitivos do `zyphy-site`. Nenhum valor novo de cor na página.

| Token (nome no site) | Hex | Papel no questionário | Origem |
|---|---|---|---|
| `--ink-950` | `#050B0B` | fundo da página; fundo dos campos e das opções; faixa das etapas no celular | `tokens.css:85` |
| `--ink-900` | `#112222` | o cartão e a coluna das perguntas | `tokens.css:86` |
| `--ink-850` | `#1E3535` | não usado na v1 | `tokens.css:87` |
| `--petrol-700` | `#0E3634` | a placa da esquerda — a única superfície de cor chapada (abaixo de 1100px, a mesma placa em duas faixas: cabeçalho e fim da placa) | `tokens.css:88` |
| `--mist-50` | `#E8F7F4` | todo texto sobre a placa (11.9:1) | `tokens.css:89` |
| `--mist-100` | `#E3EFED` | texto principal; barra de etapa feita | `tokens.css:90` |
| `--mist-400` | `#93ADAA` | texto secundário fora da placa (ajuda, "obrigatória", placeholder); contorno do radio/checkbox vazio; borda do botão secundário | `tokens.css:91` |
| `--cyan-500` | `#00CBCC` | acento: botão principal, etapa atual, opção marcada, foco de teclado, Z da marca | `tokens.css:92` |
| `--cyan-400` | `#00E0E1` | hover do botão principal | `tokens.css:93` |
| `--coral-300` | `#FF8A80` | erro; etapa com obrigatória em branco | `tokens.css:94` |
| `--sage-500` | `#5E8884` | borda dos campos e das opções (3:1 de componente) | `tokens.css:95` |
| `--sage-600` | `#4F7A76` | barra de etapa ainda não feita | `tokens.css:96` |
| `--line` | `rgba(227,239,237,.12)` | divisória dentro da placa e abaixo das etapas | `tokens.css:112` |
| `--error-ring` | `rgba(255,138,128,.2)` | anel do campo inválido | `tokens.css:126` |

Regras que vêm junto, com o motivo registrado no site:

- **Acento raro, só ação e estado** (`tokens.css:118–120`). Na página: botão
  principal (um por etapa), barra da etapa atual, marca da opção escolhida, caixa
  de confirmação marcada, anel de foco, Z da marca. Nada mais em ciano — nem link,
  nem título, nem ícone.
- **Sobre o petróleo, texto em `--mist-50`, nunca `--mist-400`.** O cinza-névoa
  sobre o petróleo "lia apagado" (`tokens.css:109–110`, review de 30/09/2026).
  Hierarquia na placa por tamanho, peso e espaço, não por tom.
- **Superfícies vizinhas nunca iguais** (`tokens.css:99`): página 950 → cartão
  900 → placa petróleo; campo 950 dentro da coluna 900. Degraus medidos no site:
  950/900 1.20, petróleo/900 1.25 (`tokens.css:82–84`).
- **Sem sombra** (o site só tem o anel de erro; `brief-zyphy-site-v3.md` §8:
  "Sombra cinza" sai). O cartão se separa da página pela troca de tom.

Contraste (valores do comentário de `tokens.css:74–81`): `--mist-100` sobre 900
14.0; `--mist-400` sobre 900 6.9 e sobre 950 8.3; ciano sobre 900 8.2; texto do
botão (`--ink-950`) sobre ciano 9.8; coral sobre 900 7.2; `--sage-500` sobre 950
5.0. Calculados aqui para usos novos: `--sage-500` sobre 900 ≈ 4.2 e `--sage-600`
sobre 900 ≈ 3.4 (objeto gráfico, mínimo 3:1). Remedir no build.

### Raio, borda, foco (herdados)

- `--r-screen` 12px (`tokens.css:282`) no cartão: é o único objeto com cara de
  tela, como o dashboard no site.
- `--r-control` 4px (`tokens.css:281`) em campo, opção, checkbox e botão.
- `--hairline` 1px, `--focus-width` 2px, `--focus-offset` 3px, `--ring` 3px,
  `--control-h` 48px, `--tap` 44px, `--textarea-min-h` 128px (`tokens.css:258–269`).
- `color-scheme: dark` e `theme-color` `#050B0B`, como o site.

---

## Layout

### Desktop (≥ 1100px, mesmo ponto de quebra das grades do site)

```
página --ink-950
┌──────────────────────── cartão --ink-900, raio 12, máx. ~1160px ────────────────────────┐
│  1 Seu negócio │ 2 Quem visita │ 3 Provas │ 4 Contato │ 5 Gosto e marca │ 6 Parte técnica │  ← etapas, largura toda
├────────────────────────────┬────────────────────────────────────────────────────────────┤
│ PLACA --petrol-700 (5/12)  │ PERGUNTAS --ink-900 (7/12)                                  │
│ Zyphy                      │ SEU NEGÓCIO            (título da etapa, Sofia)             │
│ CONTA PRA GENTE SOBRE O    │ Comece pelo básico.                                         │
│ SEU NEGÓCIO.               │                                                             │
│ QUEM LÊ É QUEM VAI         │ 1  Nome da empresa  obrigatória                             │
│ PROGRAMAR O SEU SITE.      │ [______________________________________]                   │
│ Seis etapas sobre o seu    │ 2  Seu nome e cargo  obrigatória                            │
│ negócio. No fim, o PDF é   │ [______________________________________]                   │
│ seu.                       │ …                                                          │
│ Corpo · Quem lê            │                                                             │
│ ──────                     │                                                             │
│ Tamanho · Privacidade      │                                                             │
│ Política de privacidade    │ Faltam 2 respostas obrigatórias nesta etapa. (só no erro)   │
│ ──────                     │ [ Próximo: Quem visita ]  [ Voltar ]                        │
│ Etapa 1 de 6 · Seu negócio │                                                             │
│ 3 de 11 obrigatórias…      │                                                             │
│ Rascunho salvo… · 14:32    │                                                             │
└────────────────────────────┴────────────────────────────────────────────────────────────┘
  Política de privacidade da Zyphy    {rótulo do WhatsApp}        ← rodapé, fora do cartão
```

- **Etapas no topo, na largura do cartão.** Seis colunas iguais (~180px cada em
  1440): cabe "5 Gosto e marca" numa linha. Em cima de cada uma, a barra de estado.
  Interpretação do brief ("cartão em duas colunas + 6 etapas numeradas no topo")
  e da nota do `copy.md` ("direita (etapas 1 a 6)"): as etapas ficam no topo do
  cartão; as perguntas de cada etapa, na direita.
- **Placa à esquerda, de cima a baixo das colunas**, com o raio só no canto de
  baixo. O cartão **não** usa `overflow:hidden` (quebraria o sticky abaixo).
- **Ordem da placa:** marca → H1 → subtítulo → Corpo → Quem lê → divisória →
  Tamanho → Privacidade → link da política → divisória → bloco de progresso.
- **O bloco de progresso fica por último e é `position: sticky; top`.** Quando a
  etapa é longa (a 1 tem 7 perguntas), o texto da placa sobe e sai, e o progresso
  gruda no topo da coluna da esquerda, ao lado das perguntas. Ele não cobre nada:
  tudo o que estava acima dele já saiu da tela e não há nada abaixo dele na placa.
  A placa inteira não pode ser sticky: mede ~900px e não cabe em 768.
- **Bloco de progresso:** "Etapa {n} de {total} · {nome da etapa}", "{x} de {y}
  obrigatórias respondidas" e a linha "Rascunho salvo neste navegador · {hh:mm}".
  O rascunho fica aqui, junto do progresso, porque é a prova visível do aviso de
  privacidade logo acima.
- **{y} = 11** (P1, P2, P3, P5, P6, P8, P9, P15, P21, P23, P27). A caixa de
  confirmação não conta: ela tem erro e copy próprios (decidido: brief §3,
  linha 28). O campo do "Outro" (P9, P19) não soma no {y}.
- **Coluna das perguntas:** medida útil ~600px; enunciado, ajuda e campo
  alinhados à mesma borda esquerda (nada de rótulo à esquerda do campo — ref-04).
- **Respiro:** cartão a `--space-8` (64px) do topo da página; padding interno
  `--space-7` (48px) nas duas colunas. Abaixo do cartão vem o rodapé (ver
  "Rodapé"), e os 64px de base ficam depois dele.

### Tablet (600–1099px)

Uma coluna, cartão centrado com `--form-max` 760px (`tokens.css:261`) e raio 12.
Etapas com número e rótulo (o rótulo pode quebrar em duas linhas). Rodapé abaixo
do cartão, como no desktop, alinhado às bordas dos 760px.

**Ordem: a mesma do celular** — etapas → bloco de progresso → cabeçalho da placa
(marca, H1, subtítulo) → perguntas → fim da placa (corpo, quem lê, tamanho,
privacidade, link). Escolha da direção (a decisão do brief §3, linha 31 fala do
celular e do desktop; o tablet não foi citado). Por quê:

- o tablet é uma coluna, como o celular, e tem o mesmo defeito: no print da
  volta 2 (`qa/prints/home_768x1024.png`) o campo P1 termina em ~1290px, fora
  dos 1024px. Com a ordem nova, a estimativa a partir do mesmo print é ~940px;
- duas ordens para o mesmo layout de uma coluna seria uma regra a mais para
  construir e testar, sem ganho para quem preenche.

Diferenças do celular: o padding do cabeçalho da placa fica em `--card-pad`
(48px), porque a conta acima já cabe com ele; e o fim da placa é a última faixa
dentro do cartão, então leva o raio de 12px nos dois cantos de baixo (o cartão
continua sem `overflow:hidden`).

### Celular (< 600px)

Decidido pelo Weslley (brief §3, linha 31): etapas → H1 e subtítulo → perguntas
→ resto da placa. Motivo: C2 da volta 2 — a pergunta 1 aparecia em y≈1210 no
print de 375×812 (`qa/prints/home_375x812.png`), e o campo terminava em ~1260.
O desktop não muda.

Uma coluna, de borda a borda (sem margem de cartão, raio 0), padding lateral
`--gutter` (`tokens.css:254`, 20px).

1. **Etapas** (fundo `--ink-950`): seis números com a barra de estado, ~55px cada
   em 360px, alvo ≥ 44px. O rótulo de cada etapa fica no botão, visualmente
   oculto (o leitor de tela lê "1 Seu negócio").
2. **Bloco de progresso** (fundo `--ink-950`), logo abaixo das etapas, como
   antes: é a legenda das etapas, porque no celular os números sozinhos não dizem
   onde a pessoa está. Não faz parte do "resto da placa" da decisão: no desktop
   ele mora no fim da placa só para poder ser sticky ao lado das perguntas; no
   celular ele já estava fora dela. Sem sticky. Custa ~70px na primeira tela e
   traz a linha "Rascunho salvo neste navegador · {hh:mm}" para o topo.
3. **Cabeçalho da placa** (petróleo): marca "Zyphy" → H1 → subtítulo. Padding
   `--space-6` (32px) em cima e embaixo — mais curto que os 48px de antes,
   porque a faixa agora é só um cabeçalho, e é a folga que garante o P1 na
   primeira tela em 360×800. **A marca fica aqui**, acima do H1, como em toda
   largura: o H1 começa com "Conta pra gente", e é a marca que diz quem é a
   "gente"; ela ocupa uma linha.
4. **Perguntas** (fundo `--ink-900`): título da etapa, subtítulo, perguntas,
   avisos da etapa, "Faltam {n}…" e os botões da etapa. Padding `--space-7`
   (48px) em cima e embaixo, como antes.
5. **Fim da placa** (petróleo), **depois dos botões da etapa**: Corpo → Quem lê
   → divisória `--line` → Tamanho → Privacidade → link "Política de privacidade
   da Zyphy". Mesma ordem, tamanhos e pesos da placa no desktop (Corpo e Quem lê
   17px; Tamanho e Privacidade 15px, Privacidade em 500; link sublinhado
   `--mist-50`). Padding `--space-7` (48px) em cima e embaixo, `--gutter` nas
   laterais. Vem depois dos botões, não entre a última pergunta e o botão,
   porque o botão é o passo seguinte ao último campo (ver Botões); texto da placa
   no meio separaria os dois e empurraria o botão para baixo.
6. **Rodapé** (fundo `--ink-950`), depois do fim da placa.

As faixas vizinhas são sempre diferentes (950 → petróleo → 900 → petróleo →
950), como as bandas do site. A placa continua sendo a única superfície
petróleo; no celular ela aparece em duas faixas, cabeçalho e fim, e cada uma
encosta só em 950 ou 900. Nenhuma faixa é fixa na tela (regra 6).

**Primeira tela (375×812), estimada a partir do print da volta 2:** etapas e
progresso até ~137px; cabeçalho da placa até ~515px; título da etapa, "Comece
pelo básico." e a pergunta 1, com o campo terminando em ~755px. Em 360×800 o H1
encolhe junto com a placa (`13cqi`) e a conta fica parecida. Medir no build com
print nas duas larguras. Se o campo não couber inteiro, o primeiro ajuste é o
padding de cima das perguntas (48 → 32px); o H1 não desce abaixo do mínimo do
`clamp` e a marca não sai sem perguntar.

**O que saiu, por quê e o que ficou (regra 1):** sai, no celular e no tablet, o
aviso de privacidade antes do primeiro campo (a versão anterior desta direção
dizia "a pessoa sabe que nada sai do navegador antes de digitar"). Motivo: C2,
decisão do Weslley de 2026-10-01 (brief §3, linha 31). No lugar: a linha
"Rascunho salvo neste navegador · {hh:mm}" no progresso, no topo, a partir do
primeiro salvamento; o aviso completo e o link no fim da placa; o link de novo
no rodapé. Efeito conhecido: o A2 da rubrica (aviso de privacidade na primeira
tela do celular, prioridade 3 na volta 2) continua sem ser atendido no celular,
agora por decisão registrada.

**Ordem no DOM = ordem na tela do celular.** O cabeçalho da placa e o fim da
placa são dois elementos separados no markup: cabeçalho → perguntas → fim da
placa. Reordenar só pelo CSS (`order`, áreas de grid) deixaria o link da
política, que é focável, antes do P1 no tab e lá embaixo na tela. No desktop o
grid devolve o fim da placa à coluna da esquerda, logo abaixo do cabeçalho, sem
mudança visual; o progresso continua o último item da coluna, sticky. A única
diferença no desktop é de tab: o link da política passa a vir depois dos botões
da etapa, não antes do P1 — ordem coerente com a do celular.

### Troca de etapa (todas as larguras)

"Próximo" e "Voltar" trocam a etapa sem animação (ver Movimento), levam a rolagem
**sem suavização** até o topo da etapa (no desktop, o topo do cartão, com as
etapas à vista; no celular e no tablet, o topo da faixa das perguntas, sem
mostrar de novo o cabeçalho da placa, que a pessoa já leu) e passam o foco para
o título da nova etapa (`tabindex="-1"`).
Sem `autofocus` no carregamento: no celular ele abre o teclado sobre o H1
(decidido: brief §3, linha 28).

### Rodapé

Decidido pelo Weslley (brief §3, linha 27): rodapé mínimo com dois links, sem
exceção no `qa/config.json`. É o `.footer-links` do site reduzido
(`styles.css:373–376`), sem marca, sem texto, sem redes.

- **Conteúdo, nesta ordem:**
  1. "Política de privacidade da Zyphy" → https://www.zyphy.com.br/privacidade/
     (mesmo texto do link da placa, `copy.md` §1).
  2. O WhatsApp da Zyphy → `https://wa.me/5511924507188`, sem texto pronto
     [F35]. O rótulo é o "rótulo do link do WhatsApp no rodapé (`copy.md` §13)";
     traz o número, então é copy, não microcopy do design.
- **Por que o link da política aparece duas vezes:** o da placa fica junto do
  aviso de privacidade (brief §3, linha 18, mantido) — no desktop, antes do
  primeiro campo; no celular e no tablet, no fim da placa, depois das perguntas
  (brief §3, linha 31). O do rodapé é onde a pessoa procura e onde o QA-14
  confere. Nenhum dos dois sai. No celular os dois ficam próximos (o da placa é o
  último item da faixa petróleo, o do rodapé é o primeiro da faixa 950 logo
  abaixo); a troca de faixa separa os dois blocos, e tirar um deles desfaria uma
  das duas decisões registradas.
- **Elemento:** `<footer>` (landmark de rodapé), fora do `<main>`, com uma lista
  de dois links.
- **Letra e cor:** Archivo 400, 15px (`--fs-small`); texto `--mist-400` sobre
  `--ink-950` (8.3:1), vira `--mist-100` no hover e no foco (`--dur-fast`, só
  `color`). Sublinhado como os links da página. Nada em ciano.
- **Alvo:** cada link com `min-height: --tap` (44px), como no site.
- **Desktop e tablet:** abaixo do cartão, no fundo da página, em uma linha; borda
  esquerda alinhada à borda esquerda do cartão; `--space-5` (24px) entre os
  links; `--space-5` entre o cartão e o rodapé; `--space-8` (64px) do rodapé à
  base da página. Fica longe do fluxo das perguntas: quem preenche não tropeça
  nele, e quem procura acha no lugar de sempre.
- **Celular:** faixa de borda a borda em `--ink-950`, depois do fim da placa
  (antes vinha logo depois das perguntas; a faixa do fim da placa entrou entre
  as duas); padding lateral `--gutter`, `--space-5` em cima e `--space-7` (48px)
  embaixo, somado a `env(safe-area-inset-bottom)`. Um link por linha (como o site
  abaixo de 600px, `styles.css:376`).
- **Comportamento:** não é fixo nem sticky (regra 6). Os dois links abrem em nova
  aba com `rel="noopener"`, pelo mesmo motivo do link da placa (decidido: brief
  §3, linha 28). O aviso de nova aba para leitor de tela é o mesmo microcopy do
  link da placa, criado na construção.
- Fica igual na tela final.

---

## Componentes

### Etapas no topo

- `<nav>` com lista de seis botões; a atual com `aria-current="step"`. Os rótulos
  para leitor de tela são os do `copy.md`: "agora", "feita", "falta responder".
- Cada etapa: barra de 2px em cima, número em Sofia, rótulo em Archivo 500 15px.
- Estados (cor **e** forma, para não depender só da cor):

| Estado | Barra | Número e rótulo |
|---|---|---|
| ainda não feita | `--sage-600`, contínua | `--mist-400` |
| atual | `--cyan-500` (indicador único que desliza, ver Movimento) | `--mist-100` |
| feita | `--mist-100`, contínua | `--mist-100` |
| falta responder | `--coral-300`, **tracejada** | `--mist-100` |

- As etapas são navegáveis: a pessoa pode pular para qualquer uma (decidido:
  brief §3, linha 28). "Próximo"
  confere as obrigatórias da etapa atual; "Gerar o PDF" confere todas e marca como
  "falta responder" as etapas com obrigatória em branco (também acontece com
  rascunho recuperado incompleto).
- A etapa 3 (Provas) não tem obrigatória, então nunca fica "falta responder".

### Pergunta

Ordem vertical: **número + enunciado + "obrigatória"** → **ajuda** → **campo** →
**erro**.

- **Número** ("1" a "28") antes do enunciado, Archivo 500, `--mist-400`,
  algarismo tabular. É a mesma numeração do PDF: quem conversar com a Zyphy depois
  pode dizer "a pergunta 13". Numeração aqui é legítima porque é sequência (mesmo
  critério do processo no site).
- **"obrigatória"** depois do enunciado, 15px, `--mist-400`. Pergunta opcional não
  leva marca.
- **Ajuda acima do campo**, não abaixo (diferente do site): é instrução, tem de ser
  lida antes de digitar. Ligada por `aria-describedby`.
- **Erro abaixo do campo**, coral, 15px, peso 500; campo com borda coral e anel
  `--error-ring` (como `.form-input--invalid`, `styles.css:325–326`).
- Espaço: enunciado → ajuda 4px; ajuda → campo 8px; campo → erro 8px; entre
  perguntas `--space-7` (48px); título da etapa → subtítulo 12px; subtítulo →
  primeira pergunta `--space-7`.

### Campos

| Tipo (`perguntas.md`) | Componente | Detalhe |
|---|---|---|
| curta | `input`, 48px, fundo `--ink-950`, borda 1px `--sage-500`, raio 4px | Largura da coluna, exceto P4 (ano, ~10ch) e P15 (WhatsApp, ~20ch): a largura diz o que cabe. `inputmode`/`autocomplete` certos: P1 `organization`, P4 `numeric`, P15 `tel`, P16 `email`, P25 `url` (como texto, sem exigir `https://`). Placeholders só os do `copy.md` (P15, P16, P25), em `--mist-400`. |
| longa | `textarea`, mín. 128px | Cresce com o texto (`field-sizing: content` onde houver; senão `resize: vertical`). |
| escolha única | `fieldset` + `legend` (o enunciado); cada opção é uma linha clicável inteira | Linha de 48px, fundo `--ink-950`, borda `--sage-500`, raio 4px; marca redonda de 20px com contorno `--mist-400`. Marcada: marca com ponto ciano e borda da linha em `--mist-100`. Foco: anel ciano na linha (`:has(:focus-visible)`). Desktop: opções em 2 colunas quando são 4 ou mais (P9, P19); 3 opções ficam numa coluna. Celular: sempre uma coluna. |
| caixa de confirmação | `checkbox` 24px, raio 4px, contorno `--mist-400` | Marcada: fundo ciano, visto em `--ink-950`. Fica num bloco próprio no fim da etapa 6, separado por divisória, logo acima do botão. |
| campo do "Outro" (P9, P19) | `input` curto, igual ao da tabela acima | Ver abaixo. |

#### Campo do "Outro" (P9 e P19)

Decidido pelo Weslley (brief §3, linha 25; `perguntas.md` linha 16): marcar
"Outro" abre um campo curto.

- **Onde:** logo abaixo do grupo de opções, dentro do mesmo `fieldset`, a
  `--space-2` (8px) da última linha. Fica abaixo da grade inteira, não dentro da
  célula do "Outro": na P9, em 2 colunas no desktop, o campo ocupa a largura das
  duas.
- **Rótulo:** o "rótulo do campo Outro (`copy.md`)", em Archivo 400, 15px,
  `--mist-400`, acima do campo, ligado por `<label for>`. O design não escreve
  esse texto.
- **Campo:** 48px, fundo `--ink-950`, borda `--sage-500`, raio 4px, largura da
  coluna; placeholder só o do `copy.md`, em `--mist-400`.
- **Aparece e some sem animação** (o único movimento da página é o das etapas).
  Com "Outro" desmarcado, o campo sai da tela e da ordem de tab (`hidden`).
- **Foco:** não pula para o campo ao marcar "Outro"; mover o foco quebraria a
  navegação por setas dentro do grupo de opções. O campo é o próximo no tab.
- **Obrigatório só onde o `copy.md` traz erro para o campo vazio.** Na leitura
  de hoje (em edição pelo `zyphy-copy`): P9 tem ("Escreva qual ação pra
  seguir."), P19 não. Onde for obrigatório, o vazio conta no "Faltam {n}…" e o
  erro aparece abaixo do campo, como nos outros; sem marca "obrigatória" (o campo
  só existe depois da escolha). Não muda o {y}: a P9 continua contando uma vez.
- **No rascunho**, o texto fica guardado mesmo se a pessoa trocar de opção (volta
  se ela marcar "Outro" de novo). **No PDF e na prévia**, só sai com "Outro"
  marcado: "Outro: {texto}"; com o campo vazio (só possível na P19), "Outro".

Foco de teclado em tudo: contorno 2px ciano, afastamento 3px (`styles.css:13`).

### Avisos na coluna das perguntas

"Rascunho recuperado", "Sem rascunho disponível" e o aviso do fim da etapa 5
("Logo, fotos e manual de marca: …") são parágrafo simples em Archivo 500
`--mist-100`, separados por divisória `--line`. Sem caixa colorida, sem faixa
lateral colorida, sem ícone. O de rascunho fica no topo da etapa; o da etapa 5,
no fim dela, antes do botão.

### Botões

- **Principal** = `.btn--primary` do site (`styles.css:83–84`): fundo ciano, texto
  `--ink-950`, 48px, Archivo 600, raio 4px, hover `--cyan-400`. Um por etapa:
  "Próximo: {etapa}", "Gerar o PDF", "Enviar pra Zyphy".
- **Secundário** = `.btn--ghost` (`styles.css:85–86`): transparente, borda 1px
  `--mist-400`, texto `--mist-100`. "Voltar" e "Baixar".
- **Link** "Voltar e editar respostas": sublinhado em `--mist-400` que vira
  `--mist-100` no hover (como `.project-link`). Volta para a etapa 6.
- **Ordem:** o principal vem primeiro no DOM e no tab (é o passo seguinte ao
  último campo), alinhado à borda esquerda das perguntas; "Voltar" à direita dele.
  No celular: os dois na largura toda, principal em cima.
- Sem seta nem ícone no botão (`brief-zyphy-site-v3.md` §8).
- "Faltam {n} respostas obrigatórias nesta etapa." aparece logo acima dos botões,
  em coral, com `role="alert"`; o foco vai para o primeiro campo em branco.
- "Gerar o PDF" fica desativado com `aria-busy` enquanto a biblioteca carrega e
  o PDF é montado, com um texto de espera no botão; não há no `copy.md` — na
  construção entra como microcopy criado pelo design (sem afirmação factual) e
  vai para o `zyphy-copy`. A largura do botão não muda com a troca de texto.

### Placa (coluna da esquerda)

- **Duas partes no markup:** cabeçalho (marca, H1, subtítulo) e fim da placa
  (Corpo, Quem lê, divisória, Tamanho, Privacidade, link). No desktop as duas
  ficam juntas na coluna da esquerda, seguidas do progresso sticky, e a placa se
  lê como sempre. Abaixo de 1100px viram duas faixas petróleo: o cabeçalho antes
  das perguntas e o fim depois dos botões da etapa (ver Layout › Celular).
- **Sem prova** (decidido: brief §3, linha 32): a placa não traz projetos nem
  depoimentos.
- Marca "Zyphy" como texto (o `.zy-logo` do site: Archivo 800, Z em ciano). Não é
  link: não há site para navegar aqui, e sair no meio do questionário é ruim.
- Corpo e Quem lê em 17px; Tamanho e Privacidade em 15px, peso 500 na
  Privacidade (é o diferencial — "nada fica guardado online" — e merece peso, não
  cor).
- Link "Política de privacidade da Zyphy" sublinhado, `--mist-50`, abre em nova
  aba com `rel="noopener"` (sair da página no meio do preenchimento é o que se
  evita; decidido: brief §3, linha 28). O aviso de nova aba para leitor de tela
  é microcopy a criar na construção. O mesmo link se repete no rodapé.

### Tela final

Substitui a coluna das perguntas; as seis etapas ficam "feita". No bloco de
progresso some a linha "Etapa {n} de {total}" (não há etapa atual) e ficam a
contagem e o rascunho. No celular e no tablet, o fim da placa continua depois
da tela final (depois da prévia), na mesma posição relativa das etapas.

1. Título em Sofia: "O PDF da {empresa} está pronto." — `text-wrap: balance`
   (o nome da empresa pode ser longo).
2. Corpo.
3. "Enviar pra Zyphy" (principal) + "Baixar" (secundário).
4. Linha de status (`role="status"`) para as mensagens de depois do clique
   (fallback e Baixar, do `copy.md`).
5. "Voltar e editar respostas".
6. As duas notas ("Depois de enviar", "Se não fechar") em 15px `--mist-400`,
   separadas por divisória.
7. **Prévia das respostas** (decidido: brief §3, linha 23), separada por
   divisória `--line`. Detalhe abaixo.

#### Prévia

Em HTML, no modo escuro, com a estrutura do PDF. Só texto do `copy.md` §11 e
as respostas da pessoa; nenhum texto novo.

- **Sem caixa nem superfície nova:** fica no `--ink-900` da coluna, como o resto
  da tela final. Quem separa a prévia das ações é a divisória e o cabeçalho.
- **Cabeçalho:** "Zyphy · Questionário do site" em Archivo 600, 15px,
  `--mist-400`. Depois, a ficha em duas colunas (rótulo | valor), como no PDF:
  "Empresa", "Respondido por", "Data"; rótulo 15px `--mist-400`, valor 17px
  `--mist-100`. O nome da empresa **não** vai em Sofia aqui: o título da tela já
  é o nome em Sofia, e dois títulos em Sofia brigariam.
- **Seções:** título da etapa em Sofia 800 caixa alta, 24px (`--fs-h3`),
  `--mist-100`; `--space-7` acima, `--space-3` abaixo.
- **Pergunta:** "{nº}. {texto da pergunta}" em Archivo 600, 17px, `--mist-100`,
  número em algarismo tabular com recuo deslocado (como no PDF).
- **Resposta:** Archivo 400, 17px, entrelinha 1.6, `--mist-100`, alinhada ao
  texto da pergunta, `--space-1` abaixo dela; quebras de linha da pessoa
  preservadas; endereço e URL longos quebram em qualquer ponto
  (`overflow-wrap: anywhere`). "Sem resposta." em `--mist-400`.
- **Entre perguntas:** `--space-5` (24px), mais apertado que no formulário: aqui
  é leitura corrida, não preenchimento.
- **Confirmação** no fim, depois de divisória: a frase "Confirmado por {nome}…"
  do `copy.md` §11, Archivo 500, 15px.
- **No fim da prévia, de novo o link "Voltar e editar respostas"** (mesmo texto
  e destino do item 5): quem acha um erro na pergunta 27 não precisa subir a
  tela inteira.
- **Uma fonte de dados só:** a prévia e o PDF saem da mesma lista de respostas
  montada uma vez, para nunca divergirem.
- Sem "Página {x} de {y}" (é do papel). Não se move, não abre e fecha: está
  sempre aberta.
- Marcação: `<section>` com o cabeçalho como título (`aria-labelledby`); as
  perguntas como lista ordenada com o número em texto.

"Enviar pra Zyphy": com `navigator.canShare({ files })` num aparelho de toque, o
compartilhamento do sistema com o PDF anexado; senão, baixa o PDF e abre o
`wa.me` com o texto pronto (`encodeURIComponent`). O rótulo é o mesmo nos dois
casos.

---

## Densidade e ritmo vertical

- Uma etapa por vez: no máximo 7 perguntas na tela (etapa 1), nunca as 28 numa
  página longa (ref-04).
- Ritmo de formulário, não de site: espaço vem da escala do site, de 4 em 4px
  (`tokens.css:239–247`), sem o `--section-pad` de 96–200px, que é de banda de
  página institucional.
- Intervalos fixos dentro da pergunta (4/8/8px) e um intervalo grande e igual
  entre perguntas (48px): a pergunta se lê como um bloco, e as 28 têm o mesmo
  passo.
- A placa é mais solta que a folha de respostas: H1 grande, frases curtas,
  divisórias. A coluna da direita é mais densa e regular. O contraste entre as
  duas é o contraste entre "quem pergunta" e "onde você responde".

---

## Tratamento de imagem

Não há imagem na página. Nem foto, nem ilustração, nem arte abstrata (a da ref-03
fica de fora), nem gradiente de fundo (o da ref-01), nem círculos decorativos (os
da ref-02). A cor chapada da placa e a letra fazem o papel visual.

Únicos gráficos:

- a marca "Zyphy" em texto;
- o favicon e o apple-touch-icon do site (`zyphy-site/assets/favicon.svg`: Z
  ciano sobre quadrado `#050B0B`), copiados;
- o mesmo Z em vetor no PDF;
- a og:image (abaixo).

### og:image

Decidido pelo Weslley (brief §3, linha 26): imagem só com texto e marca. O link
chega pelo WhatsApp, e é essa imagem que aparece na prévia dele.

- 1200×630, PNG, arquivo estático no próprio site, gerado uma vez na construção
  com as mesmas fontes da página.
- Fundo `--petrol-700` chapado (a placa), sem gradiente, sem textura.
- Em cima à esquerda, o quadrado da marca (Z `--cyan-500` sobre `--ink-950`, o
  `favicon.svg`), 72px.
- O H1 inteiro em Sofia 800 caixa alta, `--mist-50`, entrelinha 1.0, nos mesmos
  dois blocos da página ("CONTA PRA GENTE SOBRE O SEU NEGÓCIO." / "QUEM LÊ É QUEM
  VAI PROGRAMAR O SEU SITE."), alinhado à esquerda, ~80px de corpo.
- Margem de 80px em volta. O texto tem de ser lido na miniatura do WhatsApp (que
  pode cortar as laterais): medir com a imagem reduzida a 300px de largura.
- `og:image`, `og:image:width`, `og:image:height` e `og:image:alt` (microcopy
  sem afirmação, criado na construção); a URL é absoluta, no endereço final
  `.vercel.app` (regra 9).

---

## Movimento

Um comportamento só. O resto da página não se move.

| # | Onde | O que se move | Informação que mostra |
|---|---|---|---|
| 1 | Etapas no topo (`<nav>` das etapas, o indicador da etapa atual) | A barra ciana da etapa atual desliza da etapa anterior para a nova (`transform: translateX`, ~240ms, `--ease-out` do site, `tokens.css:294`) | De onde a pessoa saiu e para onde foi — inclusive a distância, quando ela pula da 1 para a 5 pela navegação das etapas. |

Com `prefers-reduced-motion: reduce`: a barra aparece direto na etapa nova.

Transições de cor no hover e no foco (`--dur-fast` 200ms, `tokens.css:295`, só
`color`, `border-color` e `background-color`) são as do site e não contam como
comportamento.

Cortado, com o motivo:

- **Transição entre etapas** (deslizar, fade, fade-up): é texto de leitura e de
  preenchimento; deslocamento lateral de texto e fade-up são proibidos (regra 3).
  A troca é instantânea.
- **Contagem animada** de "{x} de {y} obrigatórias": contador animado está fora
  da identidade (`brief-zyphy-site-v3.md` §3). O número troca direto.
- **Erro tremendo, botão pulsando, check animado no fim:** não mostram nada que a
  cor e o texto já não mostrem.
- **Rolagem suave** na troca de etapa: rolagem instantânea, porque a pessoa
  repete isso até 12 vezes.

A tarefa de implementação do item 1 vai para `emil-design-eng` / `animate` na
construção, com este arquivo, este elemento e esta informação.

---

## PDF

Faz parte da entrega. É o que a pessoa leva e o que a Zyphy lê.

### Decisões

- **Papel branco, não modo escuro** (decidido: brief §3, linha 24 — o modo
  escuro vale só para a página). O PDF é aberto no visualizador do WhatsApp,
  impresso ou anotado; fundo escuro gasta tinta e lê mal fora da tela. A
  identidade entra pela marca, pela Sofia e pelo petróleo. O fundo não é pintado:
  o branco é o papel.
- **Biblioteca: pdf-lib + fontkit** (decidido: brief §3, linha 22; dependência
  nova aprovada pelo Weslley). Os dois arquivos ficam no próprio site e são
  carregados só no clique em "Gerar o PDF", nunca no carregamento da página. A
  pdf-lib não quebra linha nem página sozinha: a quebra é escrita na construção,
  medindo o texto com a fonte embutida, seguindo as regras de "Quebra de página"
  abaixo.
- **Texto de verdade, selecionável e pesquisável.** Montado como texto pela
  biblioteca, com as fontes embutidas e com subset. Nunca captura de tela do HTML
  (html2canvas e afins): sai imagem, sem seleção, e pesado.
- **Fontes:** Archivo (400, 500, 600) e Sofia Sans Extra Condensed 800, em TTF
  estático (mesmas famílias OFL do site), também carregados só no clique. A
  pdf-lib não usa o `woff2` variável da página.
- **Espera:** com ~1 MB a carregar no clique, "Gerar o PDF" passa dos ~300ms no
  celular; o texto de espera do botão (ver Botões) entra com certeza.
- **Nada de Helvetica** (fonte padrão das bibliotecas de PDF): está no anti-brief.

### Página

A4 retrato (595 × 842 pt). Margens: 56 pt nas laterais e em cima, 64 pt embaixo
(com o rodapé). Medida do texto ~480 pt.

### Cores no PDF (mesmos primitivos)

| Uso | Valor | Contraste no branco |
|---|---|---|
| Texto, enunciados, nome da empresa | `--ink-950` `#050B0B` | ~19.8:1 |
| Respostas | `--ink-900` `#112222` | ~16.5:1 |
| Títulos de seção, "Zyphy · Questionário do site" | `--petrol-700` `#0E3634` | ~13.2:1 |
| Rótulos, "Sem resposta.", rodapé | `--sage-600` `#4F7A76` | ~4.8:1 |
| Divisórias (0,75 pt) | `--mist-400` `#93ADAA` | decorativo |
| Marca: Z ciano sobre quadrado escuro | `#00CBCC` sobre `#050B0B` (favicon) | 9.8:1 |

O ciano nunca aparece como texto sobre branco (~1.9:1); só dentro do quadrado
escuro da marca.

### Composição

**Página 1 — cabeçalho de identificação**

1. Marca: o quadrado do favicon (28 pt, desenhado em vetor a partir do caminho de
   `favicon.svg`) + "Zyphy · Questionário do site" em Archivo 600, 11 pt,
   petróleo.
2. "Empresa" como rótulo (Archivo 500, 9 pt, `--sage-600`) e, logo abaixo,
   **{nome da empresa} em Sofia 800 caixa alta, 30 pt**, entrelinha 1.0, até 3
   linhas. É o título do documento: o PDF é da empresa.
3. Ficha em duas colunas (rótulo | valor), como a `.spec` do site:
   "Respondido por" | {nome e cargo}; "Data" | {dd/mm/aaaa}. Rótulo 9 pt
   `--sage-600`, valor 10,5 pt `--ink-950`.
4. Divisória.

**Seções** (os títulos das etapas, na ordem)

- Título da seção em Sofia 800 caixa alta, 15 pt, petróleo; 24 pt acima, 10 pt
  abaixo, com divisória acima.
- Pergunta: "{nº}. {texto da pergunta}" em Archivo 600, 10,5 pt, `--ink-950`;
  número em algarismo tabular, com recuo deslocado (as linhas seguintes alinham
  com o texto, não com o número). 12 pt acima.
- Resposta: Archivo 400, 10,5 pt, entrelinha 15 pt, `--ink-900`, alinhada ao
  texto da pergunta. Quebras de linha da pessoa preservadas; endereço longo quebra
  em qualquer ponto. Escolha única: o texto da opção marcada.
- Em branco: "Sem resposta." em `--sage-600`.
- P9 e P19 com "Outro": "Outro: {texto}"; com o campo vazio, "Outro".
- Confirmação, no fim, separada por divisória: "Confirmado por {nome}: as
  informações acima são verdadeiras e podem ser usadas no site." em Archivo 500,
  10 pt.

**Todas as páginas**

- A partir da página 2, cabeçalho corrido: o quadrado da marca (12 pt) + "Zyphy ·
  Questionário do site", 8,5 pt.
- Rodapé: "Página {x} de {y}", 8,5 pt, `--sage-600`, à direita.

**Quebra de página**

- Título de seção nunca sozinho no pé da página: vai junto com a primeira
  pergunta.
- Pergunta nunca separada da resposta: vai junto com pelo menos as duas primeiras
  linhas dela. Resposta longa pode continuar na página seguinte.

**Arquivo**

- Nome: `zyphy-questionario-{empresa}-{aaaa-mm-dd}.pdf` (copy §11), com o nome da
  empresa em minúsculas, sem acento, espaço vira hífen.
- Metadados: título do documento, idioma `pt-BR`, autor e criador. O texto exato
  do título é microcopy da construção (sem afirmação factual), a partir do
  cabeçalho e do nome da empresa.
- Alvo: abaixo de ~300 KB para 28 respostas médias (fontes com subset).

---

## O que não entra

Do brief (§3) e das notas das referências:

- gradiente como fundo principal (ref-01), arte abstrata (ref-03), bolas
  decorativas (ref-02), upload de arquivos nesta versão;
- tudo o que a ref-04 faz: intro explicando a ferramenta, todas as perguntas numa
  página longa, rótulo à esquerda do campo, caixas cinza sem hierarquia, botão
  "Enviar" genérico;
- estimativa de tempo; analytics; qualquer envio a servidor; script, fonte ou
  biblioteca de CDN de terceiro.

Da identidade do site e do anti-brief:

- sombra; o mesmo raio em tudo (cartão 12, controles 4); ciano fora de ação e
  estado; seta nos botões; botão fixo na tela; eyebrow sobre título; ícones
  genéricos; Inter, Roboto, Arial, Helvetica, Space Grotesk (também no PDF).

---

## Decisões do Weslley (2026-10-01)

Os seis pontos que estavam em aberto, todos decididos, e as três decisões
tomadas depois da volta 2 do ciclo (7–9). Registro no
`brief-questionario-v1.md` §3, linhas 22–32.

| # | Ponto | Decisão | Onde está na direção |
|---|---|---|---|
| 1 | Biblioteca de PDF | (a) **pdf-lib + fontkit**, dependência nova aprovada; no próprio site, carregada só no clique; TTF estáticas de Archivo e Sofia, embutidas | PDF › Decisões |
| 2 | Prévia na tela final | (b) **prévia em HTML, no modo escuro**, com a estrutura do PDF | Tela final › Prévia |
| 3 | Cor do papel do PDF | (a) **papel branco**; o modo escuro vale só para a página | PDF › Decisões |
| 4 | "Outro" nas perguntas 9 e 19 | (b) **abre um campo curto**; rótulo no `copy.md` (`perguntas.md` linha 16 já atualizado) | Componentes › Campo do "Outro" |
| 5 | og:image | (b) **só texto e marca**: placa petróleo, Z e o H1 em Sofia | Tratamento de imagem › og:image |
| 6 | QA-14 e QA-13 | QA-14: **rodapé mínimo** com o link da política e o WhatsApp da Zyphy [F35], sem exceção. QA-13: fica como está; sem sitemap e sem JSON-LD numa página noindex, e o check desconta pontos. O "sem exceções no `qa/config.json`" foi substituído pela decisão 9 (brief §3, linha 27) | Layout › Rodapé |
| 7 | Ordem no celular (C2) | **etapas → H1 e subtítulo → perguntas → resto da placa** (privacidade, tamanho) depois das perguntas. Desktop não muda. Motivo: a pergunta 1 aparecia em y=1210 no celular (brief §3, linha 31) | Layout › Celular e Tablet; Ideia do hero; Componentes › Placa; Rodapé |
| 8 | Prova na placa (C4) | **placa sem prova**: não traz projetos nem depoimentos (brief §3, linha 32). Não muda o layout | Componentes › Placa |
| 9 | Exceções IMP | **ai-color-palette** ("ciano é a identidade herdada do zyphy-site, brief §3") e **all-caps-body** ("H1 em caixa alta da direção aprovada") no `qa/config.json`; domínio https://zyphy-questionario.vercel.app (brief §3, linha 30). Não muda o layout: paleta e H1 ficam como estão | Paleta; Tipografia › Escala |

Como a direção leu a decisão 7 (escolhas registradas aqui, sem ok à parte):

- **Marca "Zyphy":** fica no cabeçalho, acima do H1, em toda largura (é ela que
  diz quem é a "gente" do "Conta pra gente"; uma linha).
- **Progresso:** fica junto das etapas, logo abaixo delas, como já estava no
  celular; não é "resto da placa".
- **Corpo e Quem lê:** vão para o fim da placa (a decisão põe só H1 e subtítulo
  antes das perguntas).
- **Tamanho, Privacidade e o link da política:** no fim da placa, nessa ordem
  (a do desktop), com o link logo abaixo da privacidade (`copy.md` §1).
- **Fim da placa depois dos botões da etapa**, não entre a última pergunta e o
  botão.
- **Tablet segue a ordem do celular** (mesmo layout de uma coluna, mesmo
  problema no print de 768×1024).
- **Ordem no DOM igual à do celular;** no desktop, só o tab muda: o link da
  política vem depois dos botões da etapa.
- **Sai** o aviso de privacidade antes do primeiro campo no celular e no tablet
  (regra 1: ver Layout › Celular, "O que saiu").

Interpretações da direção, aprovadas (brief §3, linha 28):

- o progresso conta só as 11 obrigatórias; a caixa de confirmação fica fora;
- a pessoa pode pular para qualquer etapa pelo topo;
- sem `autofocus` ao carregar;
- o link da política abre em nova aba (vale também para os links do rodapé).

Decisões de design que ficam à vista, sem pedir ok: etapas na largura do topo do
cartão; progresso no fim da placa com sticky (desktop) e logo abaixo das etapas
(celular); número da pergunta na tela igual ao do PDF; ajuda acima do campo; um
único movimento; campo do "Outro" fora do {y}; link "Voltar e editar
respostas" repetido no fim da prévia; rodapé abaixo do cartão no desktop e faixa
de borda a borda no celular; cabeçalho da placa com 32px de padding no celular.
