import React, { useState} from "react";
import { Box, Tabs, Tab, Paper, useTheme } from "@mui/material";
import OrdersList from "../components/OrderList";
import DetalhesPedido from "../components/DetalhesPedido";

import { usePizzas } from "../context/PizzasContext";
import { usePedidos } from "../context/PedidosContext";

const Cozinha = () => {
  const theme = useTheme();
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const [tab, setTab] = useState(0);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  const { pizzas } = usePizzas();
  const { pedidos, fetchPedidos } = usePedidos();

 const filteredOrders = () => {
  const pedidosAtivos = pedidos.filter(
    o => o.status === "Novo" || o.status === "Em preparo"
  );

  // depois filtra conforme a aba
  if (tab === 0) return pedidosAtivos; // Tudo = todos ativos
  if (tab === 1) return pedidosAtivos.filter(o => o.status === "Novo");
  if (tab === 2) return pedidosAtivos.filter(o => o.status === "Em preparo");
  if (tab === 3) return pedidosAtivos.filter(o => o.tipoEntrega === "mesa");
  if (tab === 4) return pedidosAtivos.filter(o => o.tipoEntrega === "entrega");
  return [];
  };


  if (!(usuarioLogado?.tipo === "funcionario")) {
    return <div>Não tenho acesso</div>;
  }

  return (
    <Box
      sx={{
        padding:{xs:0, md:2},
        display: "flex",
        gap: 2,
        flexDirection: { xs: "column", md: "row" } 
      }}
    >
      {/* Lista de pedidos */}
      <Paper sx={{ flex: 1, width: { xs: "100%", md: "auto" } }}>
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          textColor="error"
          sx={{
            "& .MuiTab-root": { color: theme.palette.sextatory.main },
            "& .Mui-selected": { color: theme.palette.secondary.main, fontWeight: "bold" },
            "& .MuiTabs-indicator": { backgroundColor: theme.palette.sextatory.main },
          }}
        >
          <Tab label="Tudo" />
          <Tab label="Novo" />
          <Tab label="Em preparo" />
          <Tab label="Mesa" />
          <Tab label="Entrega" />
        </Tabs>

        <OrdersList
          pedidos={filteredOrders()}
          onStatusChange={fetchPedidos}
          onDetalhesClick={setPedidoSelecionado}
        />
      </Paper>

      {/* Painel de detalhes */}
      <Paper sx={{ width: { xs: "100%", md: 500 , padding:{xs:0, md:2}}}} elevation={3}>
        <DetalhesPedido
          pedido={pedidoSelecionado}
          pizzas={pizzas}
          onClose={() => setPedidoSelecionado(null)}
          onStatusChange={fetchPedidos}
          modo="funcionario"
        />
      </Paper>
    </Box>
  );
};

export default Cozinha;
