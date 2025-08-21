import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
const GarconsContext = createContext();

export const useGarcons = () => useContext(GarconsContext);

export function GarconsProvider({ children }) {
  const [garcons, setGarcons] = useState([]);
  const baseUrl = "http://localhost:3004/garcons";

  const fetchGarcons = async () => {
    try {
      const res = await fetch(baseUrl);
      const data = await res.json();
      setGarcons(Array.isArray(data) ? data : data?.garcons || []);
    } catch (error) {
      toast.error("Erro ao carregar Garçons:", error);
    }
  };

  const deleteGarcom = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar esse Garçom?")) return;
    try {
      await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
      setGarcons(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      toast.error("Erro ao deletar Garçom:", error);
    }
  };

  const saveGarcom = async (data, editing) => {
    try {
      if (editing) {
        await fetch(`${baseUrl}/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, id: editing.id })
        });
      } else {
        const ano = new Date().getFullYear().toString().slice(-2); 
        const nextIdNumber = garcons.length
        ? Math.max(...garcons.map(e => Number(e.id.slice(3)))) + 1 
        : 1;

        const nextId = `G${ano}${nextIdNumber}`;

        await fetch(`${baseUrl}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, id: nextId })
        });
      }
      toast.success("Garçom salvo com sucesso!")
      await fetchGarcons();
    } catch (err) {
      toast.error("Erro ao salvar Garçom:", err);
      console.error("Erro ao salvar Garçom:", err);
    }
  };

  const sincronizarHistoricoAtendimentos = async () => {
    const historico = JSON.parse(localStorage.getItem("historicoAtendimentos")) || [];

    for (const atendimento of historico) {
      const garcomId = atendimento.idGarcom;
      
      if (!garcomId) {
        console.error("ID do garçom não encontrado no atendimento:", atendimento);
        continue;
      }

      try {
        const res = await fetch(`${baseUrl}/${garcomId}`);
        const garcom = await res.json();

        if (!res.ok) {
          throw new Error('Garçom não encontrado');
        }

        // Adiciona novo histórico
        const historicoAtualizado = [...(garcom.historicoAtendimentos || []), atendimento];

        // Atualiza garçom no db.json
        await fetch(`${baseUrl}/${garcomId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ historicoAtendimentos: historicoAtualizado }),
        });
        
      } catch (error) {
        console.error(`Erro ao sincronizar atendimento para o garçom ${garcomId}:`, error);
        toast.error("Erro ao sincronizar histórico de atendimentos.");
      }
    }

    localStorage.removeItem("historicoAtendimentos");
    fetchGarcons();
  };


  useEffect(() => {
    fetchGarcons();
  }, []);

  return (
    <GarconsContext.Provider value={{ garcons, fetchGarcons, saveGarcom, deleteGarcom, sincronizarHistoricoAtendimentos }}>
      {children}
    </GarconsContext.Provider>
  );
}
