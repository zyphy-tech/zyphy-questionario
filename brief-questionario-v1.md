## 1. Contexto
- Cliente: a própria Zyphy (fatos F8–F12). Público: dono de PME que já conversou com a Zyphy e decide se vale gastar ~15 min respondendo.
- Ação principal: preencher e enviar o PDF à Zyphy pelo WhatsApp.
- Diferencial: a pessoa sai com um PDF do próprio negócio, nada fica guardado online, e quem lê é quem vai programar o site (F13).
## 2. Stack e hospedagem
HTML/CSS/JS vanilla. Biblioteca de PDF hospedada no próprio site (sem CDN de terceiro). Vercel no time do Weslley, endereço .vercel.app.
## 3. Decisões travadas (2026-10-01)
- Visual: identidade do zyphy-site (paleta petróleo + ciano, mesmas fontes), modo escuro.
- Layout: cartão central em duas colunas (esquerda: quem é a Zyphy e o progresso; direita: perguntas) + 6 etapas numeradas no topo. No celular: uma coluna, etapas no topo.
- Tom: próximo ("Conta pra gente sobre o teu negócio").
- Conteúdo: 28 perguntas em 6 seções + caixa de confirmação final obrigatória (lista em perguntas.md).
- Saída: PDF com marca, nome da empresa, data e respostas numeradas, em texto selecionável. Botões "Baixar" e "Enviar pra Zyphy" (Web Share com o PDF anexado no celular; fallback: baixar + abrir wa.me com mensagem pronta).
- Dados: nada sai do navegador. Rascunho salvo localmente. Sem analytics. A página diz isso ao visitante.
- Referências: 3 positivas + 1 negativa (abaixo das 5–8 do playbook; aceito por ser página única e pequena).
- Não entra: gradiente como fundo principal, arte abstrata, bolas decorativas, upload de arquivos nesta versão, nada do que a ref-04 faz.
