## 1. Contexto
- Cliente: a própria Zyphy (fatos F8–F12). Público: dono de PME que já conversou com a Zyphy e decide se vale responder.
- Ação principal: preencher e enviar o PDF à Zyphy pelo WhatsApp.
- Diferencial: a pessoa sai com um PDF do próprio negócio, nada fica guardado online, e quem lê é quem vai programar o site (F13).
## 2. Stack e hospedagem
HTML/CSS/JS vanilla. Biblioteca de PDF hospedada no próprio site (sem CDN de terceiro). Vercel no time do Weslley, endereço .vercel.app.
## 3. Decisões travadas (2026-10-01)
- Visual: identidade do zyphy-site (paleta petróleo + ciano, mesmas fontes), modo escuro.
- Layout: cartão central em duas colunas (esquerda: quem é a Zyphy e o progresso; direita: perguntas) + 6 etapas numeradas no topo. No celular: uma coluna, etapas no topo.
- Tom: próximo ("Conta pra gente sobre o seu negócio").
- Conteúdo: 28 perguntas em 6 seções + caixa de confirmação final obrigatória (lista em perguntas.md).
- Saída: PDF com marca, nome da empresa, data e respostas numeradas, em texto selecionável. Botões "Baixar" e "Enviar pra Zyphy" (Web Share com o PDF anexado no celular; fallback: baixar + abrir wa.me com mensagem pronta).
- Dados: nada sai do navegador. Rascunho salvo localmente. Sem analytics. A página diz isso ao visitante.
- Referências: 3 positivas + 1 negativa (abaixo das 5–8 do playbook; aceito por ser página única e pequena).
- Não entra: gradiente como fundo principal, arte abstrata, bolas decorativas, upload de arquivos nesta versão, nada do que a ref-04 faz.
- H1: "Conta pra gente sobre o seu negócio. Quem lê é quem vai programar o seu site." (opção A do zyphy-copy, adaptada).
- Subtítulo: "Seis etapas sobre o seu negócio. No fim, o PDF é seu." (opção B).
- Aviso de privacidade (F34) na coluna da esquerda, com link para https://www.zyphy.com.br/privacidade/.
- Tratamento: "você" e "seu" em todo o texto.
- Sem estimativa de tempo; usar "28 perguntas em 6 etapas".
- Página fora do Google (noindex), porque o questionário é enviado por link.
- PDF: gerado com pdf-lib + fontkit (dependência nova aprovada pelo Weslley), hospedada no próprio site e carregada só no clique; fontes Archivo e Sofia em TTF estático, embutidas.
- Prévia: a tela final mostra uma prévia das respostas em HTML, no modo escuro, com a estrutura do PDF.
- PDF em papel branco (o modo escuro vale só para a página).
- "Outro" nas perguntas 9 e 19 abre um campo curto; rótulo definido no copy.md.
- og:image: imagem só com texto e marca (placa petróleo, Z e o H1 em Sofia).
- Rodapé mínimo com o link da política de privacidade e o WhatsApp da Zyphy (F35). Sem exceções no qa/config.json (substituído em 2026-10-01: ver exceções IMP abaixo); QA-13 (sitemap e JSON-LD) fica como está e desconta pontos por causa do noindex.
- Aprovadas as interpretações da direção: progresso conta só as 11 obrigatórias (a caixa de confirmação fica fora); a pessoa pode pular para qualquer etapa pelo topo; sem autofocus ao carregar; link da política abre em nova aba.
- Direção (direcao.md) aprovada pelo Weslley.
- Exceções IMP no qa/config.json (2026-10-01): ai-color-palette ("ciano é a identidade herdada do zyphy-site, brief §3") e all-caps-body ("H1 em caixa alta da direção aprovada"). Domínio no qa/config.json: https://zyphy-questionario.vercel.app.
- Ordem no celular e no tablet (2026-10-01; vale para toda largura em que a página fica em uma coluna): etapas → H1 e subtítulo → perguntas → resto da placa (privacidade, tamanho) depois das perguntas. Nessas larguras, o aviso de privacidade vem depois da primeira etapa de perguntas. Desktop não muda. Motivo: C2, a primeira pergunta aparecia em y=1210 no celular.
- Placa sem prova (C4, 2026-10-01): a placa não traz projetos nem depoimentos.
