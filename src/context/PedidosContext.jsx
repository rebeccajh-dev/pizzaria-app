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

  const updatePedidoStatus = async (id, status) => {
    try {
      await fetch(`${baseUrl}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchPedidos();
    } catch (error) {
      toast.error("Erro ao atualizar status:", error);
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


  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <PedidosContext.Provider value={{ pedidos, fetchPedidos, updatePedidoStatus, createPedido }}>
      {children}
    </PedidosContext.Provider>
  );
}
