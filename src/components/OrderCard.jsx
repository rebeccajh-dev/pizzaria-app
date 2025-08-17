import React from "react";
import { Card, CardContent, Typography, Button, Box, Chip } from "@mui/material";
import { usePedidos } from "../context/PedidosContext";
import { InfoOutlined } from "@mui/icons-material";


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

export default function OrderCard({ pedido, onDetalhesClick }) {
  const { updatePedidoStatus } = usePedidos();

  const mudarStatusEDetalhes = async (pedido) => {
    if (pedido.status !== "Novo") {
      if (onDetalhesClick) onDetalhesClick(pedido);
      return;
    }
    await updatePedidoStatus(pedido.id, "Em preparo");
    if (onDetalhesClick) onDetalhesClick({ ...pedido, status: "Em preparo" });
  };

  return (
    <Card variant="outlined" sx={{ mb: 1, borderRadius:"0px"}}>
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

        <Box flexDirection="row" display="flex" sx={{ width: { xs: "100%", sm: "260px"}}}>
        <Box
          sx={{
            width: { xs: "80%", sm: "200px"},
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
          sx={{ width: { xs: "20%", sm: "50px"}}}
          color="error"
          onClick={() => mudarStatusEDetalhes(pedido)}
        >
          <InfoOutlined fontSize="medium" />
        </Button></Box>
      </CardContent>
    </Card>
  );
}
