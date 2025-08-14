# Sistema de uma Pizzaria

Aplicação web para gerenciamento de pedidos de uma pizzaria com uso de React.

## Descrição

-Funcionalidades

-Login de usuários
-Diferenciação entre cliente e administrador
- Visualização e seleção de pizzas
- Carrinho de compras e finalização de pedido
- Controle de status dos pedidos no painel admin
- Notificações em tempo real
- Tema claro e escuro

## Tecnologias Utilizadas

- Front-end: React, Material-UI, React Router, React Toastify  
- Back-end: Node.js 
- Autenticação: JWT  
- Controle de versão: Git 

## Instalação Front-end
cd app-pizzaria
nom install
npm run dev

## Instalação Back-end
cd app-pizzaria
cd data
npx json-server --watch dp-pedidos.json --port 3001
npx json-server --watch dp-pizzas.json --port 3002

## Estrutura de Pastas
app-pizzaria/
├── data/
├── public/
│   │   ├── api.jsx
│   │   └── imagens.jsx
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── PizzaCard.jsx
│   │   └── ItemPedido.jsx
│   │   └── OrderCard.jsx
│   │   └── OrderList.jsx
│   │   └── PizzaDialog.jsx
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── AuthProvider.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── HistoricoPedidos.jsx
│   │   ├── Cardapio.jsx
│   │   ├── Cozinha.jsx
│   │   ├── Entregas.jsx
│   │   ├── Admin.jsx
│   │   └── NotFound.jsx
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js