import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
const EntregadoresContext = createContext();

export const useEntregadores = () => useContext(EntregadoresContext);

export function EntregadoresProvider({ children }) {
  const [entregadores, setEntregadores] = useState([]);
  const baseUrl = "http://localhost:3003/entregadores";

  const fetchEntregadores = async () => {
    try {
      const res = await fetch(baseUrl);
      const data = await res.json();
      setEntregadores(Array.isArray(data) ? data : data?.entregadores || []);
    } catch (error) {
      toast.error("Erro ao carregar Entregadores:", error);
    }
  };

  const deleteEntregador = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar esse Entregador?")) return;
    try {
      await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
      setEntregadores(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      toast.error("Erro ao deletar Entregador:", error);
    }
  };

  const saveEntregador = async (data, editing) => {
    try {
      if (editing) {
        await fetch(`${baseUrl}/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, id: editing.id })
        });
      } else {
        const ano = new Date().getFullYear().toString().slice(-2);
        const nextIdNumber = entregadores.length
        ? Math.max(...entregadores.map(e => Number(e.id.slice(3)))) + 1
        : 1;

        const nextId = `E${ano}${nextIdNumber}`;

        await fetch(`${baseUrl}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, id: nextId })
        });
      }
      toast.success("Entregador salvo com sucesso!")
      await fetchEntregadores();
    } catch (err) {
      toast.error("Erro ao salvar entregador:", err);
    }
  };

  const sincronizarHistoricoEntregas = async () => {
    const historico = JSON.parse(localStorage.getItem("historicoEntregas")) || [];

    for (const entrega of historico) {
      const entregadorId = entrega.idEntregador; 
      
      if (!entregadorId) {
        console.error("ID do entregador não encontrado na entrega:", entrega);
        continue;
      }
      
      try {
        // buscar entregador atual no db.json
        const res = await fetch(`${baseUrl}/${entregadorId}`);
        const entregador = await res.json();
        
        // adicionar novo histórico
        const historicoAtualizado = [...(entregador.historicoEntregas || []), entrega];

        // atualizar entregador no db.json
        await fetch(`${baseUrl}/${entregadorId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ historicoEntregas: historicoAtualizado }),
        });
        
      } catch (error) {
        console.error(`Erro ao sincronizar entrega para o entregador ${entregadorId}:`, error);
        toast.error("Erro ao sincronizar histórico de entregas.");
      }
    }

    localStorage.removeItem("historicoEntregas");
    fetchEntregadores();
  };

  useEffect(() => {
    fetchEntregadores();
  }, []);

  return (
    <EntregadoresContext.Provider value={{ entregadores, fetchEntregadores, saveEntregador, deleteEntregador, sincronizarHistoricoEntregas }}>
      {children}
    </EntregadoresContext.Provider>
  );
}
