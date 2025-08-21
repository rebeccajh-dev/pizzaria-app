import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  MenuItem,
  Rating
} from "@mui/material";
import { toast } from "react-toastify";

import { useEntregadores } from "../context/EntregadoresContext";
import { useGarcons } from "../context/GarconsContext";
import { usePedidos } from "../context/PedidosContext";

const Pagamento = ({ carrinho, total, pedidoId, limparCarrinho, onClose }) => {
  const [formaPagamento, setFormaPagamento] = useState("pix");
  const [nomeCartao, setNomeCartao] = useState("");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [cvv, setCvv] = useState("");
  const [avaliacao, setAvaliacao] = useState(0);
  const [observacao, setObservacao] = useState("");
 

  const { sincronizarHistoricoEntregas } = useEntregadores();
  const { sincronizarHistoricoAtendimentos } = useGarcons();
  const { updatePedidoStatus, getPedidoById } = usePedidos();

  const handleFinalizarCompra = async (event) => {
    event.preventDefault();

    // Validação do cartão
    if (
      (formaPagamento === "credito" || formaPagamento === "debito") &&
      (!nomeCartao || !numeroCartao || !cvv)
    ) {
      toast.error("Por favor, preencha todos os dados do cartão.");
      return;
    }

    const pedido = getPedidoById(pedidoId);
    if (!pedido) {
      toast.error("Pedido não encontrado!");
      return;
    }

    await updatePedidoStatus(pedidoId, "Finalizado");
    
    if (pedido.tipoEntrega === "entrega"){
      const historicoEntregaAtualizado = JSON.parse(localStorage.getItem("historicoEntregas")) || [];
      const historicoEntregaComAvaliacao = historicoEntregaAtualizado.map(item => 
        item.idPedido === pedidoId
        ? { ...item, avaliacao: avaliacao, observacao: observacao }
        : item
      );
      localStorage.setItem("historicoEntregas", JSON.stringify(historicoEntregaComAvaliacao));
      await sincronizarHistoricoEntregas();
    }
    
    if(pedido.tipoEntrega === "mesa"){
      const historicoAtendimentoAtualizado = JSON.parse(localStorage.getItem("historicoAtendimentos")) || [];
      const historicoAtendimentoComAvaliacao = historicoAtendimentoAtualizado.map(item => 
          item.idPedido === pedidoId
          ? { ...item, avaliacao: parseInt(avaliacao), observacao: observacao }
          : item
        );
        
      localStorage.setItem("historicoAtendimentos", JSON.stringify(historicoAtendimentoComAvaliacao));
      await sincronizarHistoricoAtendimentos();
    }

    toast.success(
      `Compra de R$ ${total.toFixed(2)} realizada com sucesso via ${formaPagamento.toUpperCase()}`
    );

    // Limpar carrinho e estados
    limparCarrinho();
    setNomeCartao("");
    setNumeroCartao("");
    setCvv("");
    setAvaliacao(0);
    setObservacao("");
    setFormaPagamento("pix");
    
    // Fecha o modal de pagamento
    onClose();
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Finalizar Compra
      </Typography>

      <Typography variant="h6" gutterBottom>
        Resumo do Pedido
      </Typography>
      <Typography>Total: R$ {total.toFixed(2)}</Typography>

      <Divider sx={{ my: 2 }} />

      <form onSubmit={handleFinalizarCompra}>
        <FormControl component="fieldset" sx={{ mb: 2 }}>
          <FormLabel component="legend" color="red" >Forma de Pagamento</FormLabel>
          <RadioGroup
            value={formaPagamento}
            onChange={(e) => setFormaPagamento(e.target.value)}
            row
          >
            <FormControlLabel
              value="pix"
              control={
                <Radio
                  sx={{
                    color: "#999",
                    "&.Mui-checked": {
                      color: "#ff0000",
                    },
                  }}
                />
              }
              label="PIX"
            />

            <FormControlLabel
              value="credito"
              control={
                <Radio
                  sx={{
                    color: "#999",
                    "&.Mui-checked": {
                      color: "#ff0000",
                    },
                  }}
                />
              }
              label="Crédito"
            />

            <FormControlLabel
              value="debito"
              control={
                <Radio
                  sx={{
                    color: "#999",
                    "&.Mui-checked": {
                      color: "#ff0000",
                    },
                  }}
                />
              }
              label="Débito"
            />
          </RadioGroup>
        </FormControl>

        {/* PIX */}
        {formaPagamento === "pix" && (
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="subtitle1">Pagamento com PIX</Typography>
            <Typography>Chave PIX: 42.195.543/0001-51</Typography>
            <Box
              component="img"
              src="\imagens\qr-code-plus.png"
              alt="QRCode PIX"
              sx={{ width: 200, mt: 1 }}
            />
          </Box>
        )}

        {/* Cartão */}
        {(formaPagamento === "credito" || formaPagamento === "debito") && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
            <TextField
              label="Nome no Cartão"
              value={nomeCartao}
              onChange={(e) => setNomeCartao(e.target.value)}
              required
            />
            <TextField
              label="Número do Cartão"
              value={numeroCartao}
              onChange={(e) => setNumeroCartao(e.target.value)}
              required
            />
            <TextField
              label="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
              inputProps={{ maxLength: 4 }}
            />
          </Box>
        )}

        <Typography component="legend" sx={{ mt: 2 }}>Avaliação</Typography>
        <Rating
          name="avaliacao"
          value={avaliacao}
          onChange={(event, newValue) => {
            setAvaliacao(newValue);
          }}
          precision={1}
        />

        <TextField
          label="Observação"
          multiline
          rows={3}
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />


        <Button type="submit" variant="contained" color="error" fullWidth>
          Pagar Agora
        </Button>
      </form>
    </Box>
  );
};

export default Pagamento;