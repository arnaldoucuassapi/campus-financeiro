# Campus — Gestão Financeira

Dashboard de gestão financeira para estudantes universitários, feito com React, Vite e Tailwind CSS. Valores em **kwanzas (Kz)**.

## Funcionalidades

- Visão geral do mês: saldo, entradas, saídas, orçamento e gastos por categoria, **calculados a partir das transações**.
- Fluxo de caixa dos últimos 6 meses (entradas vs. saídas).
- Seletor de mês que filtra todas as páginas.
- Transações: pesquisa (ignora acentos), filtro por tipo, adicionar e apagar.
- Orçamento: limite por categoria e quanto já foi gasto em cada uma.
- Metas: criar metas e acompanhar o progresso.
- Layout responsivo, navegação por teclado e leitores de ecrã.

> Os dados são de exemplo e ficam apenas na memória do navegador: ao recarregar a página voltam ao início.

## Como correr

Requisitos: Node.js 18+ e npm 9+.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview  # serve o build
npm run format   # formata o código com Prettier
```

## Estrutura

```text
src/
├── main.jsx        # ponto de entrada
├── App.jsx         # estado global, navegação e layout
├── pages.jsx       # Visão geral, Transações, Orçamento, Metas
├── components.jsx  # componentes reutilizáveis e diálogos
├── data.js         # categorias, limites e dados de exemplo
├── utils.js        # formatação (Kz, datas) e cálculos
└── index.css       # estilos globais (Tailwind)
```

Para mudar limites, categorias ou dados de exemplo, edita `src/data.js`. Para mudar a moeda, edita `formatMoney` em `src/utils.js`.

## Tecnologias

React 19 · Vite 6 · Tailwind CSS 3 · Lucide React · Prettier
