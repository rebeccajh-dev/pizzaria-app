import React, { useState} from "react";
import { Box, Tabs, Tab, Paper } from "@mui/material";
import OrdersList from "../components/OrderList";
import DetalhesPedido from "../components/DetalhesPedido";

import { usePizzas } from "../context/PizzasContext";
import { usePedidos } from "../context/PedidosContext";

const HistoricoPedidos = () => {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const [tab, setTab] = useState(0);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const { pizzas } = usePizzas();
  const { pedidos, fetchPedidos } = usePedidos();

  const filteredOrders = () => {
  const pedidosFiltrados = pedidos.filter(
    o => o.status === "Finalizado"
  );

  if (tab === 0) return pedidosFiltrados.filter(o => o.status === "Finalizado");
  return [];
};


  if (!(usuarioLogado?.tipo === "admin")) {
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
          textColor="#c40f0fff"
          sx={{
            "& .MuiTab-root": { color: "#FF5A5F" },
            "& .Mui-selected": { color: "#c40f0fff", fontWeight: "bold" },
            "& .MuiTabs-indicator": { backgroundColor: "#FF5A5F" },
          }}
        >
          <Tab label="Tudo" />
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
          onStatusChange={ fetchPedidos}
        />

      </Paper>
    </Box>
  );
};

export default HistoricoPedidos;
