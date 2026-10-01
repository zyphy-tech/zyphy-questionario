# Histórico do QA

Uma entrada por volta do `zyphy-ciclo`, a mais nova embaixo. Não edite à mão
as entradas já gravadas: elas registram o que foi medido em cada commit.

<!-- Formato de cada volta:

## Volta N — AAAA-MM-DD

- **Commit medido:** <hash curto>
- **Modo:** rapido | completo
- **URL medida:** <url, sem token>
- **Nota:** X/100 (medido Y/60, julgado Z/40) · aprovado sim|não
- **Bloqueios:** <ids, ou "nenhum">
- **Correções aplicadas:** N/M — <origem de cada uma>
- **Precisa de humano:** <itens, ou "nada">
- **Preview:** não medido (sem-preview) ← só na volta final com sem-preview
-->

## Volta 1 — 2026-10-01

- **Commit medido:** 5a86cad
- **Modo:** rapido
- **URL medida:** http://127.0.0.1:56986/
- **Nota:** 83,4/100 (medido 48,35/60, julgado 35/40) · aprovado não
- **Bloqueios:** R4, IMP (ai-color-palette)
- **Correções aplicadas:** 2/8 — QA-06 (canonical), QA-07 (landmark header)
- **Precisa de humano:** R4 (CTA da etapa 1 fora da primeira tela; mudar exige contrariar brief ou direção, ou ajustar o medidor); IMP ai-color-palette (ciano é a identidade do brief; exceção IMP só com autorização); QA-13 (decidido no brief: fica como está); IMP all-caps-body (H1 em caixa alta da direção aprovada); C2 (P1 fora da primeira tela no celular; exige mudar a ordem aprovada); C4 (prova na placa; escolher o fato e pedir o texto ao zyphy-copy)

## Volta 2 — 2026-10-01

- **Commit medido:** 5de573f
- **Modo:** rapido
- **URL medida:** http://127.0.0.1:56986/
- **Nota:** 86,5/100 (medido 53,5/60, julgado 33/40) · aprovado não
- **Bloqueios:** R4, IMP (ai-color-palette)
- **Correções aplicadas:** 0/7 — volta só de registro (só bloqueios humanos; sem correção)
- **Precisa de humano:** os mesmos da volta 1 (R4, IMP ai-color-palette, QA-13, IMP all-caps-body, C2, C4) e A2 (aviso de privacidade na primeira tela do celular; mexe na ordem aprovada da placa)
