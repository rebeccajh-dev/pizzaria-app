import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
const PizzasContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePizzas = () => useContext(PizzasContext);


export function PizzasProvider({ children }) {
  const [pizzas, setPizzas] = useState([]);
  const baseUrl = "http://localhost:3002/pizzas";

  const fetchPizzas = async () => {
    try {
      const res = await fetch(baseUrl);
      const data = await res.json();
      setPizzas(Array.isArray(data) ? data : data?.pizzas || []);
    } catch (error) {
      toast.error("Erro ao carregar pizzas:", error);
    }
  };

  const deletePizza = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar essa pizza?")) return;
    try {
      await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
      setPizzas(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      toast.error("Erro ao deletar pizza:", error);
    }
  };

  const savePizza = async (data, editing) => {
    try {
      if (editing) {
        await fetch(`${baseUrl}/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, id: editing.id })
        });
      } else {
        const nextId = String(
          pizzas.length ? Math.max(...pizzas.map(p => Number(p.id))) + 1 : 1
        );

        await fetch(`${baseUrl}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, id: nextId })
        });
      }
      await fetchPizzas();
    } catch (err) {
      toast.error("Erro ao salvar pizzas:", err);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  return (
    <PizzasContext.Provider value={{ pizzas, fetchPizzas, savePizza, deletePizza }}>
      {children}
    </PizzasContext.Provider>
  );
}
