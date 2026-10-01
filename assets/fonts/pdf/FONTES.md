# Fontes do PDF — origem e licença

Usadas só pelo PDF (js/pdf.js, carregadas no clique em "Gerar o PDF"). A
pdf-lib não usa o woff2 variável da página, então as famílias da página
(mesmas do zyphy-site) entram aqui como TTF estáticas (direcao.md › PDF;
brief-questionario-v1.md §3, linha 22).

| Arquivo | Família e peso | Origem |
|---|---|---|
| `Archivo-Regular.ttf` | Archivo 400, largura 100 | `ofl/archivo/Archivo[wdth,wght].ttf` |
| `Archivo-Medium.ttf` | Archivo 500, largura 100 | idem |
| `Archivo-SemiBold.ttf` | Archivo 600, largura 100 | idem |
| `SofiaSansExtraCondensed-ExtraBold.ttf` | Sofia Sans Extra Condensed 800 | `ofl/sofiasansextracondensed/SofiaSansExtraCondensed[wght].ttf` |

- **Fonte:** repositório [google/fonts](https://github.com/google/fonts), ramo
  `main`, baixado em 2026-10-01 (último commit das pastas: `archivo`
  `95f4904fc8bc`, `sofiasansextracondensed` `8b0a1d0f5983`). Upstream:
  [Omnibus-Type/Archivo](https://github.com/Omnibus-Type/Archivo) e
  [lettersoup/Sofia-Sans](https://github.com/lettersoup/Sofia-Sans).
- **Licença:** SIL Open Font License 1.1 — `OFL-Archivo.txt` e
  `OFL-Sofia-Sans.txt`, copiados das mesmas pastas.
- **Como foram geradas:** `python tools/fontes-pdf.py` (fontTools 4.63):
  instância estática do eixo de peso (e largura 100 na Archivo), subset latino
  (a mesma faixa do `unicode-range` da página + Latin Extended-A), sem hinting,
  sem ligaduras (o texto copiado do PDF sai igual ao digitado), com `tnum`.
  São versões modificadas no sentido da OFL; os nomes da família continuam os
  originais, o que a OFL permite para fontes sem Reserved Font Name (nenhuma
  das duas declara RFN).
