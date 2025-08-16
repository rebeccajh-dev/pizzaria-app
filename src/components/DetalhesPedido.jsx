import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Divider,
  Button,
  Chip,
  useTheme
} from "@mui/material";

import { usePizzas } from "../context/PizzasContext";
import { usePedidos } from "../context/PedidosContext";

const DetalhesPedido = ({ pedido, onClose }) => {
  const theme = useTheme();
  const { pizzas } = usePizzas();
  const { updatePedidoStatus } = usePedidos();

  if (!pedido) {
    return (
      <Typography variant="body2" color="text.secondary">
        Selecione um pedido para ver os detalhes
      </Typography>
    );
  }

  const getButtonLabel = () => {
    if (pedido.status === "Novo" || pedido.status === "Em preparo") return "Pedido Pronto";
    if (pedido.status === "Servir") return "Servido";
    if (pedido.status === "Entregar") return "Entregue";
    return "";
  };

  const handleFinalizar = async () => {
    let novoStatus = pedido.status;

    if (pedido.status === "Novo" || pedido.status === "Em preparo") {
      novoStatus = pedido.tipoEntrega === "mesa" ? "Servir" : "Entregar";
    } else if (pedido.status === "Servir" || pedido.status === "Entregar") {
      novoStatus = "Finalizado";
    }

    if (novoStatus !== pedido.status) {
      await updatePedidoStatus(pedido.id, novoStatus);
      onClose();
    }
  };

  return (
    <Card sx={{ borderRadius: 3, width: "100%" }}>
      <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
        <Typography variant="h6" fontWeight="bold">
          Pedido #{pedido.id}{" "}
          <Chip
            label={pedido.tipoEntrega === "mesa" ? "Mesa" : "Entrega"}
            size="small"
            sx={{ ml: 1 }}
          />
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <Avatar
            src="/imagens/local.png"
            alt="Local"
            variant="square"
            sx={{ width: 24, height: 24 }}
          />
          {pedido.tipoEntrega === "mesa" && (
            <Typography variant="body1">
              Mesa {pedido.numeroMesa}
            </Typography>
          )}
          {pedido.tipoEntrega === "entrega" && (
            <Typography variant="body1">
              {pedido.endereco}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 1 }} />

        {pedido.itens.map((item, idx) => {
          const pizzaInfo = pizzas.find(p => String(p.id) === String(item.pizzaId));
          return (
            <Box key={idx} display="flex" alignItems="center" gap={2} mb={1}>
              <Typography variant="body2" color="secondary">
                {item.quantidade}x
              </Typography>
              <Avatar
                src={
                  pizzaInfo && pizzaInfo.imagem
                    ? pizzaInfo.imagem.startsWith("http")
                      ? pizzaInfo.imagem
                      : `/imagens/${pizzaInfo.imagem}`
                    : "/imagens/pizza.png"
                }
                variant="square"
                sx={{ width: 40, height: 40 }}
              />
              <Box>
                <Typography variant="body1" fontWeight="bold" textAlign="left">
                  {item.nome}
                </Typography>
                <Typography variant="caption" textAlign="left" sx={{ display: "block" }}>
                  {item.tamanho}
                </Typography>
              </Box>
              <Box ml="auto" textAlign="right">
                {item.observacao && item.observacao.length > 0 && (
                  <Typography variant="caption" textAlign="rigth" sx={{ display: "block" }}>
                    Obs:{" "}
                    {Array.isArray(item.observacao)
                      ? item.observacao.join(", ")
                      : item.observacao}
                  </Typography>
                )}
              </Box>
            </Box>
          );
        })}

        <Divider sx={{ my: 1 }} />
        <Box flexDirection="row" display="flex" justifyContent="space-between">
          <Typography variant="h6" textAlign={"right"}>
            Total
          </Typography>
          <Typography variant="h6" color="error" textAlign={"left"}>
            R$ {pedido.total.toFixed(2).replace(".", ",")}
          </Typography>
        </Box>

        {!(getButtonLabel() === "") && (
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: theme.palette.sextatory.main }}
            onClick={handleFinalizar}
          >
            {getButtonLabel()}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DetalhesPedido;
