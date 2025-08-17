import React, { useState } from "react";
import { Box, Tabs, Tab, Paper, useTheme } from "@mui/material";
import TabelaPizzas from "../components/TabelaPizzas";
import TabelaEntregadores from "../components/TabelaEntregadores";
import TabelaGarcons from "../components/TabelaGarcons";
import { EntregadoresProvider } from "../context/EntregadoresContext";
import HistoricoEntregas from "../components/HistoricoEntregas";
import PizzaCard from "../components/PizzaCard";
import HistoricoAtendimentos from "../components/HistoricoAtendimentos";

import { usePizzas } from "../context/PizzasContext";

const Admin = () => {
  const theme = useTheme();
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const [tab, setTab] = useState(0);
  const [entregadorSelecionado, setEntregadorSelecionado] = useState(null);
  const [garcomSelecionado, setGarcomSelecionado] = useState(null);
  const { pizzas } = usePizzas();

  if (usuarioLogado?.tipo !== "admin") {
    return <div>não tenho acesso</div>;
  }

  return (
    <Box
      sx={{
        padding: { xs: 0, md: 2 },
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Paper>
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
          <Tab label="Pizzas" />
          <Tab label="Entregadores" />
          <Tab label="Garçons" />
          <Tab label="Visualização do Cardápio" />
        </Tabs>
      </Paper>

      <Paper sx={{ p: 2 }}>
        {tab === 0 && <TabelaPizzas />}
        {tab === 1 && <TabelaEntregadores onSelecionarHistorico={setEntregadorSelecionado}/>}
        {tab === 2 && <TabelaGarcons onSelecionarHistorico={setGarcomSelecionado}/>}
        {tab === 3 && <PizzaCard pizzas={pizzas} />}
      </Paper>

      {/* Painel de detalhes */}
      {tab === 1 &&(
        <Paper sx={{ width: { xs: "100%", md: "100%" , padding:{xs:0, md:2}}}} elevation={3}>
          <HistoricoEntregas
            entregador={entregadorSelecionado}
            onClose={() => setEntregadorSelecionado(null)}
          />
      </Paper>
      )}
      {tab === 2 &&(
        <Paper sx={{ width: { xs: "100%", md: "100%" , padding:{xs:0, md:2}}}} elevation={3}>
          <HistoricoAtendimentos
            garcom={garcomSelecionado}
            onClose={() => setGarcomSelecionado(null)}
          />
        </Paper>
      )}
    </Box>
  );
};

export default Admin;