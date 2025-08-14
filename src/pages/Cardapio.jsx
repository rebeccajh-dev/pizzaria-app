import React, { useEffect, useState } from "react";
import {
  AppBar, Toolbar, Typography, Box, Button
} from "@mui/material";
import PizzaCard from "../components/PizzaCard";
import { toast } from "react-toastify";

const Cardapio = () => {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
  const [pizzas, setPizzas] = useState([]);
  const [filtrosAtivos, setFiltrosAtivos] = useState([]);

  const botoes = [
    { id: 1, label: "Tradicional" },
    { id: 2, label: "Especialidades" },
    { id: 3, label: "Vegana" },
    { id: 4, label: "Doce" },
  ];

  const handleClickFiltro = (id) => {
    setFiltrosAtivos(prevFiltros =>
      prevFiltros.includes(id)
        ? prevFiltros.filter((filtroId) => filtroId !== id)
        : [...prevFiltros, id]
    );
  };

  const finalizarPedido = () => {
    toast.sucess("Pedido finalizado com sucesso!", {
      position: toast.position.top_right,
      autoClose: 3000,
    });
  };

  useEffect(() => {
    fetch("http://localhost:3002/pizzas")
      .then(res => res.json())
      .then(data => setPizzas(data || []))
      .catch(err => console.error("Erro ao carregar pizzas:", err));
  }, []);

  const pizzasFiltradas =
    filtrosAtivos.length > 0
      ? pizzas.filter((pizza) =>
          filtrosAtivos.some(
            (filtroId) =>
              pizza.categoria ===
              botoes.find((b) => b.id === filtroId)?.label
          )
        )
      : pizzas;

    if ((usuarioLogado === null)) {
      return (
          <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h5">Acesso Restrito</Typography>
              <Typography>Você precisa estar logado como cliente para ver o cardápio.</Typography>
          </Box>
      );
    }
  
  return (
    <Box sx={(theme) => ({
      bgcolor: theme.palette.background.default,
      minHeight: "100vh",
    })}>
      {((usuarioLogado === null)) && (
      <AppBar position="static" sx={{ bgcolor: "#558858ff" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Cardápio</Typography>
          <Button
            variant="contained"
            sx={{ color: "#ffffff", bgcolor: "#a5140a", "&:hover": { bgcolor: "#9a3730ff" } }}
            onClick={finalizarPedido}
          >
            Finalizar Pedido
          </Button>
        </Toolbar>
      </AppBar>
      )}

      <Box sx={{ display: "flex", gap: 2, p: 2, flexWrap: "wrap" }}>
  {botoes.map(({ id, label }) => (
    <Button
      key={id}
      variant={filtrosAtivos.includes(id) ? "contained" : "outlined"}
      onClick={() => handleClickFiltro(id)}
      sx={(theme) => ({
        bgcolor: filtrosAtivos.includes(id) ? "#0d7212ff" : theme.palette.background.default,
        color: filtrosAtivos.includes(id) ? "#ffffff" : "#0d7212ff",
        borderColor: "#0d7212ff",
        borderRadius: "10px",
        "&:hover": {
          bgcolor: filtrosAtivos.includes(id) ? "#0f8c23" : "#e8f5e9",
        },
      })}
    >
      {label}
    </Button>
  ))}
</Box>


      <PizzaCard pizzas={pizzasFiltradas} />

    </Box>
  );
};

export default Cardapio;