import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab, Paper } from "@mui/material";
import OrdersList from "../components/OrderList";
import DetalhesPedido from "../components/DetalhesPedido";

const Cozinha = () => {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const [tab, setTab] = useState(0);
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    atualizarPedidos();
    fetch("http://localhost:3001/pizzas")
      .then((res) => res.json())
      .then((data) => setPizzas(data))
      .catch((err) => console.error("Erro ao carregar pizzas:", err));
  }, []);

  function atualizarPedidos() {
    fetch("http://localhost:3001/pedidos")
      .then(res => res.json())
      .then(data => setPedidos(data))
      .catch(err => console.error("Erro ao carregar pedidos:", err));
  }

  const filteredOrders = () => {
  const pedidosFiltrados = pedidos.filter(
    o => o.status === "Novo" || o.status === "Em preparo"
  );

  if (tab === 0) return pedidosFiltrados;
  if (tab === 1) return pedidosFiltrados.filter(o => o.status === "Novo");
  if (tab === 2) return pedidosFiltrados.filter(o => o.status === "Em preparo");
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
          textColor="#c40f0fff"
          sx={{
            "& .MuiTab-root": { color: "#FF5A5F" },
            "& .Mui-selected": { color: "#c40f0fff", fontWeight: "bold" },
            "& .MuiTabs-indicator": { backgroundColor: "#FF5A5F" },
          }}
        >
          <Tab label="Tudo" />
          <Tab label="Novo" />
          <Tab label="Em preparo" />
        </Tabs>

        <OrdersList
          pedidos={filteredOrders()}
          onStatusChange={atualizarPedidos}
          onDetalhesClick={setPedidoSelecionado}
        />
      </Paper>

      {/* Painel de detalhes */}
      <Paper sx={{ width: { xs: "100%", md: 500 , padding:{xs:0, md:2}}}} elevation={3}>
        <DetalhesPedido
          pedido={pedidoSelecionado}
          pizzas={pizzas}
          onClose={() => setPedidoSelecionado(null)}
          onStatusChange={atualizarPedidos}
        />
      </Paper>
    </Box>
  );
};

export default Cozinha;
