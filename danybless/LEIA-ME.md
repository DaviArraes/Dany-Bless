# Site Dany Bless — Treinamentos e Consultoria

Abra `index.html` no navegador (ou hospede a pasta inteira em qualquer serviço de hospedagem estática).

## Estrutura
- `index.html` — estrutura e conteúdo da página
- `css/styles.css` — todo o visual
- `js/data.js` — **dados editáveis**: WhatsApp, fotos, números e PROJETOS
- `js/i18n.js` — textos em português, inglês e espanhol
- `js/main.js` — comportamento (menu, slider, partículas, busca, tradução, projetos)
- `assets/` — logos e fotos; `assets/projects/` — fotos dos projetos

## Como adicionar um projeto
1. Salve a foto em `assets/projects/` (ex.: `treinamento-lideranca.jpg`).
2. Em `js/data.js`, dentro de `PROJECTS`, copie o modelo comentado e preencha:
   ano, categoria, título e resumo (pt/en/es), `image`, `gallery` (opcional) e `link` (opcional).
3. Salve. O card, o filtro por categoria, a janela de detalhes e a busca do site são gerados sozinhos.

## Números da faixa de estatísticas
Edite `CONFIG.stats` em `js/data.js` (hoje estão em 0 até haver números reais).

## Fotos
`CONFIG.photo` (seção "O que fazemos") e `CONFIG.photo2` (card da fundadora); a foto do topo está em `index.html` (`#heroPhoto`).

## Conteúdo do Portfólio Executivo
- Números (faixa de estatísticas): `STATS` em `js/data.js`
- Projetos com fotos, resultados e parcerias: `PROJECTS` em `js/data.js`
- Depoimentos: `TESTIMONIALS` em `js/data.js`
- Trajetória, especialização e "Como eu lidero": seções em `index.html`; textos em `js/i18n.js`
- Fotos extraídas do PDF: `assets/projects/` e `assets/foto-daniella-estudio.jpg`
