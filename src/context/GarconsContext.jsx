import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
const GarconsContext = createContext();

export const usegarcons = () => useContext(GarconsContext);

export function garconsProvider({ children }) {
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
      await fetchgarcons();
    } catch (err) {
      toast.error("Erro ao salvar Garçom:", err);
    }
  };

  useEffect(() => {
    fetchgarcons();
  }, []);

  return (
    <GarconsContext.Provider value={{ garcons, fetchGarcons, saveGarcom, deleteGarcom }}>
      {children}
    </GarconsContext.Provider>
  );
}
