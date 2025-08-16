import React, { useState } from "react";
import { Box, Tabs, Tab, Paper } from "@mui/material";
import TabelaPizzas from "../components/TabelaPizzas";
import TabelaEntregadores from "../components/TabelaEntregadores";
import TabelaGarcons from "../components/TabelaGarcons";
import { EntregadoresProvider } from "../context/EntregadoresContext";
import PizzaCard from "../components/PizzaCard";

const Admin = () => {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const [tab, setTab] = useState(0);

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
            "& .MuiTab-root": { color: "#FF5A5F" },
            "& .Mui-selected": { color: "#c40f0fff", fontWeight: "bold" },
            "& .MuiTabs-indicator": { backgroundColor: "#FF5A5F" },
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
        {tab === 1 && (
          <EntregadoresProvider>
            <TabelaEntregadores />
          </EntregadoresProvider>
        )}
        {tab === 2 && <TabelaGarcons />}
        {tab === 3 && <PizzaCard />}
      </Paper>
    </Box>
  );
};

export default Admin;
