import React, { useState} from "react";
import { Box, Tabs, Tab, Paper, useTheme } from "@mui/material";
import OrdersList from "../components/OrderList";
import DetalhesPedido from "../components/DetalhesPedido";
import { usePizzas } from "../context/PizzasContext";
import { usePedidos } from "../context/PedidosContext";

const Entregas = () => {
  const theme = useTheme();
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const [tab, setTab] = useState(0);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const { pizzas } = usePizzas();
  const { pedidos, fetchPedidos } = usePedidos();

  const filteredOrders = () => {
  const pedidosFiltrados = pedidos.filter(
    o => o.status === "Servir" || o.status === "Entregar"
  );

  if (tab === 0) return pedidosFiltrados;
  if (tab === 1) return pedidosFiltrados.filter(o => o.status === "Servir");
  if (tab === 2) return pedidosFiltrados.filter(o => o.status === "Entregar");
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
        flexDirection: { xs: "column", md: "row" } // coluna no mobile, lado a lado no desktop
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
          <Tab label="Servido" />
          <Tab label="Entregue" />
        </Tabs>

        <OrdersList
          pedidos={filteredOrders()}
          onStatusChange={fetchPedidos}
          onDetalhesClick={setPedidoSelecionado}
        />
      </Paper>

      {/* Painel de detalhes */}
      <Paper sx={{ width: { xs: "100%", md: 500 }, padding:{xs:0, md:2} }} elevation={3}>
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

export default Entregas;
