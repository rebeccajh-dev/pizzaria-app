import React from "react";
import { AppBar, Toolbar, Typography, Box, Button, useMediaQuery} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

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
        { label: "Cardápio", to: "/pages/cardapio" }
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

  const handlePedido = () => {
    navigate("/pages/pedido")
  }

  const handlePersonalizacao = () => {
    navigate("/pages/personalizacao")
  }

  return (
    //{//mudar isso aqui}
    <AppBar position="static" width="100%" sx={{ backgroundColor: theme.palette.sextatory.main }}> 
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Logo e título */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={
              localStorage.getItem("themeConfig")
                ? JSON.parse(localStorage.getItem("themeConfig"))?.logo || "/imagens/logopizza.png"
                : "/imagens/logopizza.png"
            }
            alt="Logo"
            sx={{ height: 40, mr: 2 }}
          />
          {!isSmallScreen && <Typography variant="h6" color="primary" fontSize="17px" fontWeight="bold" >
            {localStorage.getItem("themeConfig")
                ? JSON.parse(localStorage.getItem("themeConfig"))?.title || "MammaMia Pizzaria"
                :  "MammaMia Pizzaria"}
           </Typography>}
        </Box>

        {/* Barra de navegação centralizada */}
        {!isLoginPage && usuarioLogado && (
          <Box sx={{ display: "flex", gap: 3 }}>
            {navLinks.map((link) => (
              <Typography
                key={link.to}
                component={Link}
                to={link.to}
                color={location.pathname === link.to ? "quintary" : "quartiary"}
                sx={{
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
        <Box display="flex" flexDirection="row">
        {!isLoginPage && usuarioLogado.tipo === "cliente" &&(
          <Button onClick={handlePedido}>
              <ShoppingCartIcon fontSize="medium"/>
            </Button>
        )}

        {!isLoginPage && usuarioLogado.tipo === "admin" &&(
          <Button onClick={handlePersonalizacao}>
              <SettingsIcon/>
            </Button>
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
                <LogoutIcon/>
              </Button>

        )}</Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;