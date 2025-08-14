import React from "react";
import { Card, CardContent, Typography, Button, Box, Chip } from "@mui/material";

const statusColors = {
  mesa: "error",
  entrega: "success",
};

const actionColors = {
  Novo: "rgba(61, 122, 255, 1)",
  "Em preparo": "rgba(231, 129, 44, 1)",
  Entregar: "rgba(196, 64, 54, 1)",
  Servir: "rgba(38, 99, 48, 1)",
  Finalizado : "rgba(36, 36, 36, 1)"
};

export default function OrderCard({ pedido, onStatusChange, onDetalhesClick }) {
  const mudarStatusEDetalhes = async (pedido) => {
  try {
    if (pedido.status !== "Novo") {
      // Se não for "Novo", só abre os detalhes sem mudar status
      if (onDetalhesClick) onDetalhesClick(pedido);
      return;
    }

    await fetch(`http://localhost:3001/pedidos/${pedido.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Em preparo" }),
    });

    if (onStatusChange) onStatusChange();
    if (onDetalhesClick) onDetalhesClick({ ...pedido, status: "Em preparo" });
  } catch (err) {
    console.error("Erro ao mudar status:", err);
  }
};


  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: { xs: 1, sm: 0 }
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", textAlign:"left"}}>
            Pedido #{pedido.id}{" "}
            <Chip
              label={pedido.tipoEntrega === "mesa" ? "Mesa" : "Entrega"}
              size="small"
              color={statusColors[pedido.tipoEntrega] || "default"}
              sx={{ ml: 1 }}
            />
          </Typography>
          <Typography variant="body2" color="text.secondary" width="400px" sx={{wordBreak: "break-word", textAlign: "left"}}>
            {pedido.itens.map(i => `${i.quantidade}x ${i.nome} (${i.tamanho})`).join(", ")}
          </Typography>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", sm: "100px"},
            bgcolor: actionColors[pedido.status] || "primary.main",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontFamily: "sans-serif",
            pt:1, pb:1
          }}
        >
          {pedido.status}
        </Box>

        <Button
          variant="outlined"
          sx={{ width: { xs: "100%", sm: "100px"}}}
          color="error"
          onClick={() => mudarStatusEDetalhes(pedido)}
        >
          Detalhes
        </Button>
      </CardContent>
    </Card>
  );
}
