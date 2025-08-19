// AppRoute.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Cardapio from '../pages/Cardapio';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import Cozinha from '../pages/Cozinha';
import Entregas from '../pages/Entregas';
import NotFound from '../pages/NotFound';
import Pedido from '../pages/Pedido';
import HistoricoPedidos from '../pages/HistoricoPedidos';
import Pagamento from '../components/Pagamento';

import { PedidosProvider } from '../context/PedidosContext';
import { PizzasProvider } from '../context/PizzasContext';
import { EntregadoresProvider  } from '../context/EntregadoresContext';
import { GarconsProvider  } from '../context/GarconsContext';

const AppRoutes = () => (
  <PedidosProvider>
    <PizzasProvider>
      <EntregadoresProvider>
        <GarconsProvider>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route 
              path="/pages/cardapio" 
              element={
                <ProtectedRoute>
                  <Cardapio />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/pages/admin" 
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/pages/historicoPedidos" 
              element={
                <ProtectedRoute>
                  <HistoricoPedidos/>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/pages/cozinha" 
              element={
                <ProtectedRoute>
                  <Cozinha/>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/pages/entregas" 
              element={
                <ProtectedRoute>
                  <Entregas/>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/pages/pedido" 
              element={
                <ProtectedRoute>
                  <Pedido/>
                </ProtectedRoute>
              }
              />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </GarconsProvider>
      </EntregadoresProvider>
    </PizzasProvider>
  </PedidosProvider>
);

export default AppRoutes;
