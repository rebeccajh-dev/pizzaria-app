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
        const ano = new Date().getFullYear().toString().slice(-2); // "25"
        const nextIdNumber = entregadores.length
        ? Math.max(...entregadores.map(e => Number(e.id.slice(3)))) + 1 // pega só a parte numérica após 'E25-'
        : 1;

        const nextId = `E${ano}${nextIdNumber}`;

        await fetch(`${baseUrl}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, id: nextId })
        });
      }
      await fetchEntregadores();
    } catch (err) {
      toast.error("Erro ao salvar entregador:", err);
    }
  };

  useEffect(() => {
    fetchEntregadores();
  }, []);

  return (
    <EntregadoresContext.Provider value={{ entregadores, fetchEntregadores, saveEntregador, deleteEntregador }}>
      {children}
    </EntregadoresContext.Provider>
  );
}
