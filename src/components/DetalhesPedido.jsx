import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Divider,
  Button,
  Chip,
  useTheme,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";

import { usePizzas } from "../context/PizzasContext";
import { usePedidos } from "../context/PedidosContext";
import { useEntregadores } from "../context/EntregadoresContext";
import { useGarcons } from "../context/GarconsContext";

const DetalhesPedido = ({ pedido, onClose, modo = "funcionario" }) => {
  const theme = useTheme();
  const { pizzas } = usePizzas();
  const { updatePedidoStatus } = usePedidos();
  const { entregadores } = useEntregadores();
  const [entregadorSelecionado, setEntregadorSelecionado] = useState("");
  const entregadoresDisponiveis = entregadores.filter(e => e.status === "disponível");
  const { garcons } = useGarcons();

  if (!pedido) {
    return (
      <Typography variant="body2" color="text.secondary">
        Selecione um pedido para ver os detalhes
      </Typography>
    );
  }

  const garcom = garcons.find((g) => g.id === pedido.garcom);
  const entregador = entregadores.find((e) => e.id === pedido.entregador);
  const totalNumber = typeof pedido.total === "number" ? pedido.total : Number(pedido.total);

  // 🔹 Cliente não precisa ver botão de ação
  const getButtonLabel = () => {
    if (modo === "cliente") return "";
    if (pedido.status === "Novo" || pedido.status === "Em preparo") return "Pedido Pronto";
    if (pedido.status === "Servir") return "Servido";
    if (pedido.status === "Entregar") return "Entregue";
    return "";
  };

  const getStatusLabel = () =>{
    if (modo === "cliente"){
      if(pedido.status === "Novo"){ 
        return "Em espera" 
      } else if (pedido.status === "Servir" || pedido.status === "Entregar"){
        return "Pedido pronto"
      } 
    }
    return pedido.status
  }

  const handleFinalizar = async () => {
    if (modo === "cliente") return; // segurança

    let novoStatus = pedido.status;
    if (pedido.status === "Novo" || pedido.status === "Em preparo") {
      novoStatus = pedido.tipoEntrega === "mesa" ? "Servir" : "Entregar";
    } else if (pedido.status === "Servir" || pedido.status === "Entregar") {
      novoStatus = "Finalizado";
    }

    if (novoStatus !== pedido.status) {
      const extraData =
        pedido.tipoEntrega === "entrega" && entregadorSelecionado
          ? { entregador: entregadorSelecionado }
          : {};

      await updatePedidoStatus(pedido.id, novoStatus, extraData);
      onClose && onClose();
    }
  };

  return (
    <Card sx={{ borderRadius: 3, width: "100%" }}>
      <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
        <Typography variant="h6" fontWeight="bold">
          Pedido #{pedido.id}
          <Chip
            label={getStatusLabel()}
            sx={{ ml: 1, fontSize: "16px" }}
          />
        </Typography>

        {/* Local */}
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <Avatar src="/imagens/local.png" alt="Local" variant="square" sx={{ width: 24, height: 24 }} />
          {pedido.tipoEntrega === "mesa" ? (
            <Typography variant="body1">Mesa {pedido.numeroMesa}</Typography>
          ) : (
            <Typography variant="body1">{pedido.endereco}</Typography>
          )}
        </Box>

        {/* Infos */}
        <Box display="flex" textAlign="left" mt={1} flexDirection="column">
          <Typography variant="body1" sx={{ ml: "30px" }}>Cliente: {pedido.cliente}</Typography>
          {pedido.tipoEntrega === "mesa" && garcom && (
            <Typography variant="body1" sx={{ ml: "30px" }}>Garçom: {garcom.nome}</Typography>
          )}
          {pedido.tipoEntrega === "entrega" && entregador && (
            <Typography variant="body1" sx={{ ml: "30px" }}>Entregador: {entregador.nome}</Typography>
          )}
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Itens */}
        {pedido.itens.map((item, idx) => {
          const pizzaInfo = pizzas.find(p => String(p.id) === String(item.pizzaId));
          return (
            <Box key={idx} display="flex" alignItems="center" gap={2} mb={1}>
              <Typography variant="body2" color="secondary">{item.quantidade}x</Typography>
              <Avatar
                src={pizzaInfo?.imagem ? `/imagens/${pizzaInfo.imagem}` : "/imagens/pizza.png"}
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
                {item.observacao?.length > 0 && (
                  <Typography variant="caption" textAlign="right" sx={{ display: "block" }}>
                    Obs: {Array.isArray(item.observacao) ? item.observacao.join(", ") : item.observacao}
                  </Typography>
                )}
              </Box>
            </Box>
          );
        })}

        <Divider sx={{ my: 1 }} />
        <Box flexDirection="row" display="flex" justifyContent="space-between">
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6" color="error">
            R$ {(Number.isFinite(totalNumber) ? totalNumber : 0).toFixed(2).replace(".", ",")}
          </Typography>
        </Box>

        {/* Só funcionários podem escolher entregador */}
        {modo === "funcionario" && pedido.status === "Entregar" && (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Selecionar Entregador</InputLabel>
            <Select
              value={entregadorSelecionado}
              onChange={(e) => setEntregadorSelecionado(e.target.value)}
              label="Selecionar Entregador"
            >
              {entregadoresDisponiveis.map(e => (
                <MenuItem key={e.id} value={e.id}>
                  {e.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Botão só aparece para funcionários */}
        {modo === "funcionario" && !(getButtonLabel() === "") && (
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: theme.palette.sextatory.main, color: theme.palette.primary.main, fontWeight: "bold" }}
            onClick={handleFinalizar}
            disabled={pedido.status === "Entregar" && !entregadorSelecionado}
          >
            {getButtonLabel()}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DetalhesPedido;
