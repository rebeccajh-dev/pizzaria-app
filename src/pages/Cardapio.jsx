import React, {useState } from "react";
import {
  AppBar, Toolbar, Typography, Box, Button, useTheme
} from "@mui/material";
import ImageCarousel from "../components/Carousel";
import PizzaCard from "../components/PizzaCard";
import { toast } from "react-toastify";
import { usePizzas } from "../context/PizzasContext";

const images = [
  "/imagens/pizza1.png",
  "/imagens/pizza2.png",
  "/imagens/pizza3.png",
];

const Cardapio = () => {
  const theme = useTheme();
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
  const [filtrosAtivos, setFiltrosAtivos] = useState([]);
  const { pizzas } = usePizzas();

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
    toast.success("Pedido finalizado com sucesso!", {
      position: toast.position.top_right,
      autoClose: 3000,
    });
  };

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

    if (usuarioLogado === null) {
  return <Navigate to="/notfound" replace />;
}
  
  return (
    <Box sx={(theme) => ({
      bgcolor: theme.palette.background.default,
      minHeight: "100vh",
    })}>
      {((usuarioLogado === null)) && (
      <AppBar position="static" sx={{ bgcolor: theme.palette.secondary.main }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Cardápio</Typography>
          <Button
            variant="contained"
            sx={{ color: theme.palette.primary.main, bgcolor: theme.palette.secondary.main, "&:hover": { bgcolor: theme.palette.secondary.main } }}
            onClick={finalizarPedido}
          >
            Finalizar Pedido
          </Button>
        </Toolbar>
      </AppBar>
      )}

        <Box sx={{ maxWidth: "1000px", margin: "auto", mt: 2}}>
  <ImageCarousel images={images} />
        </Box>


      <Box sx={{ display: "flex", gap: 2, p: 2, flexWrap: "wrap" }}>
  {botoes.map(({ id, label }) => (
    <Button
      key={id}
      variant={filtrosAtivos.includes(id) ? "contained" : "outlined"}
      onClick={() => handleClickFiltro(id)}
      sx={(theme) => ({
        bgcolor: filtrosAtivos.includes(id) ? theme.palette.quartiary.main : theme.palette.background.default,
        color: filtrosAtivos.includes(id) ? theme.palette.primary.main : theme.palette.quartiary.main,
        borderColor: theme.palette.quartiary.main,
        borderRadius: "10px",
        "&:hover": {
          bgcolor: filtrosAtivos.includes(id) ? theme.palette.quintary.main : theme.palette.primary.main,
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