import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

const PedidosContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePedidos = () => useContext(PedidosContext);

export function PedidosProvider({ children }) {
  const [pedidos, setPedidos] = useState([]);
  const baseUrl = "http://localhost:3001/pedidos";

  const fetchPedidos = async () => {
    try {
      const res = await fetch(baseUrl);
      const data = await res.json();
      setPedidos(data);
    } catch (error) {
      toast.error("Erro ao carregar pedidos:", error);
    }
  };

  const updatePedidoStatus = async (id, novoStatus, extraData = {}) => {
  try {
    // busca o pedido atual no servidor
    const res = await fetch(`${baseUrl}/${id}`);
    const pedido = await res.json();

    // monta os dados atualizados
    const pedidoAtualizado = { ...pedido, status: novoStatus, ...extraData };

    await fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedidoAtualizado),
    });

    // atualiza no state local
    setPedidos(prev =>
      prev.map(p => (p.id === id ? pedidoAtualizado : p))
    );

    toast.success("Status do pedido atualizado!");
  } catch (err) {
    toast.error("Erro ao atualizar pedido:", err);
  }
};


  const createPedido = async (nextId, novoPedido) =>{
    try {
      await fetch(`${baseUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...novoPedido, id: nextId })
      });
      fetchPedidos(); // Atualiza lista
    } catch (err) {
      toast.error("Erro ao adicionar novo pedido", err)
    }
  }

  const getPedidoById = (id) => pedidos.find(p => p.id === id);

  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <PedidosContext.Provider value={{ pedidos, fetchPedidos, updatePedidoStatus, createPedido, getPedidoById }}>
      {children}
    </PedidosContext.Provider>
  );
}
