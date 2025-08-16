import React from "react";
import { AppBar, Toolbar, Typography, Box, Button, useMediaQuery} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/";
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  let navLinks = [];
  if (usuarioLogado) {
    if (usuarioLogado.tipo === "cliente") {
      navLinks = [
        { label: "Cardápio", to: "/pages/cardapio" },
        { label: "Pedidos", to: "/pages/pedido" }
      ];
    } else if (usuarioLogado.tipo === "funcionario") {
      navLinks = [
        { label: "Cozinha", to: "/pages/cozinha" },
        { label: "Entregas", to: "/pages/entregas" }
      ];
    } else if (usuarioLogado.tipo === "admin") {
      navLinks = [
        { label: "Admin", to: "/pages/admin" },
        { label: "Histórico de Pedidos", to: "/pages/historicoPedidos"}
      ];
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  };

  return (
    //{//mudar isso aqui}
    <AppBar position="static" width="100%" sx={{ backgroundColor: theme.palette.seventh.main }}> 
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Logo e título */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src="\imagens\logopizza.png"
            alt="Logo"
            sx={{ height: 40, mr: 2 }}
          />
          {!isSmallScreen && <Typography variant="h6" color="secondary" fontWeight="bold" >MammaMia Pizzaria</Typography>}
        </Box>

        {/* Barra de navegação centralizada */}
        {!isLoginPage && usuarioLogado && (
          <Box sx={{ display: "flex", gap: 3 }}>
            {navLinks.map((link) => (
              <Typography
                key={link.to}
                component={Link}
                to={link.to}
                sx={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight:
                    location.pathname === link.to ? "bold" : "normal",
                  "&:hover": { textDecoration: "underline" }
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Box>
        )}

        {/* Botão Logout */}
        {!isLoginPage && usuarioLogado && (
          <Button
              color="primary"
              variant="contained"
              onClick={handleLogout}
              sx={{
                fontWeight: "bold",
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
                }}
              >
                Sair
              </Button>

        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;