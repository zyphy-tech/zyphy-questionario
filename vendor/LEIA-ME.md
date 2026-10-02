# Bibliotecas de terceiros (hospedadas no próprio site)

Dependência aprovada pelo Weslley em 2026-10-01 (brief-questionario-v1.md §3,
linha 22). Carregadas só no clique em "Gerar o PDF" (js/app.js › loadPdfLibs);
nada vem de CDN em tempo de execução. Arquivos copiados sem alteração do pacote
publicado no registro do npm.

| Arquivo | Pacote | Versão | Licença | Tamanho | SHA-256 |
|---|---|---|---|---|---|
| `pdf-lib/pdf-lib.min.js` | [pdf-lib](https://www.npmjs.com/package/pdf-lib) (`dist/pdf-lib.min.js`) | 1.17.1 | MIT (`pdf-lib/LICENSE.md`) | 525.099 bytes | `0f9a5cad07941f0826586c94e089d89b918c46e5c17cf2d5a3c6f666e3bc694f` |
| `fontkit/fontkit.umd.min.js` | [@pdf-lib/fontkit](https://www.npmjs.com/package/@pdf-lib/fontkit) (`dist/fontkit.umd.min.js`) | 1.1.1 | MIT (campo `license` do package.json; o pacote não traz arquivo de licença) | 758.440 bytes | `d8df561b9fba98e24f2e5130e40948809281bbbc55a20c412359f1a0a5eb35a6` |

Obtidos com `npm pack pdf-lib@1.17.1 @pdf-lib/fontkit@1.1.1` em 2026-10-01.
O `pdf-lib.min.js` termina com `//# sourceMappingURL=pdf-lib.min.js.map`; o
mapa não foi copiado (só o DevTools o pede).
