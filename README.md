# Campus — Gestão Financeira

Dashboard de gestão financeira pensado para estudantes universitários. A aplicação foi criada com React, Vite e Tailwind CSS, com uma identidade visual retro baseada em verde-claro, laranja e bordas levemente quadradas.

## Funcionalidades

- Dashboard mensal com saldo, entradas, saídas e orçamento.
- Gráfico visual de fluxo de caixa.
- Gastos agrupados por categoria.
- Página de transações com busca e filtros.
- Cadastro local de novas transações.
- Página de orçamento com limites por categoria.
- Página de metas com progresso financeiro.
- Lista de próximos pagamentos.
- Layout responsivo para desktop, tablet e celular.

> Esta versão usa dados mockados e estado local do React. As alterações feitas durante a sessão não são persistidas em banco de dados.

## Requisitos

Antes de começar, instale:

- Node.js 18 ou superior.
- npm 9 ou superior.
- Git, caso queira clonar o projeto.

Você pode verificar as versões instaladas com:

```bash
node --version
npm --version
```

## Baixar o projeto

Se o projeto estiver em um repositório Git:

```bash
git clone URL_DO_REPOSITORIO
cd sistema-gestao-financeira
```

Ou baixe o projeto como ZIP, extraia os arquivos e abra o terminal na pasta raiz do projeto.

## Instalar dependências

Na pasta do projeto, execute:

```bash
npm install
```

## Rodar em desenvolvimento

Inicie o servidor local com:

```bash
npm run dev
```

O terminal exibirá um endereço semelhante a:

```text
http://localhost:5173
```

Abra esse endereço no navegador.

## Gerar build de produção

Para validar e gerar os arquivos otimizados:

```bash
npm run build
```

Os arquivos finais serão criados na pasta `dist/`.

Para visualizar o build localmente:

```bash
npm run preview
```

## Estrutura principal

```text
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── src
    ├── index.css
    └── main.jsx
```

## Tecnologias

- React 19
- Vite 6
- Tailwind CSS 3
- Lucide React
- PostCSS e Autoprefixer

## Dados e personalização

Os dados de exemplo estão no início de `src/main.jsx`, dentro das constantes `initialTransactions` e `categories`. Para trocar o nome do usuário, valores, categorias ou metas, edite essas estruturas e os componentes de página correspondentes.

Para uma versão real do produto, o estado local pode ser substituído por uma API e um banco de dados sem alterar a organização visual principal.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm install` | Instala as dependências |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Serve o build de produção localmente |

