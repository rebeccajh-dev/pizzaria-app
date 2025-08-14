import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={(theme) => ({
        height: "100vh",
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        textAlign: "center",
      })}
    >
      {/* Imagem separada */}
      <Box
        component="img"
        src="/imagens/pizza-notfound.png"
        alt="Pizza Not Found"
        sx={{
          maxWidth: 300,
          width: "100%",
          mb: 4,
        }}
      />

      <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
        404
      </Typography>

      <Typography variant="h5" gutterBottom>
        Ops! Página não encontrada.
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, maxWidth: 400 }}>
        A página que você está tentando acessar não existe ou foi removida.
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{
          backgroundColor: "#1f6e06ff",
          "&:hover": {
          backgroundColor: "#266214ff",
    },
  }}
>
  Voltar para a página inicial
</Button>
    </Box>
  );
};

export default NotFound;
