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
} from "@mui/material";
import { toast } from "react-toastify";

const Pagamento = ({ carrinho, total, limparCarrinho }) => {
  const [formaPagamento, setFormaPagamento] = useState("pix");
  const [nomeCartao, setNomeCartao] = useState("");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [cvv, setCvv] = useState("");


  //processo de validação da compra
  const handleFinalizarCompra = (event) => {
    event.preventDefault();

    if (
      (formaPagamento === "credito" || formaPagamento === "debito") &&
      (!nomeCartao || !numeroCartao || !cvv)
    ) {
      toast.error("Por favor, preencha todos os dados do cartão.");
      return;
    }

    toast.success(
      `Compra de R$ ${total.toFixed(2)} realizada com sucesso via ${formaPagamento.toUpperCase()}`
    );

    console.log("Compra finalizada:", {
      itens: carrinho,
      total,
      formaPagamento,
      nomeCartao,
      numeroCartao,
      cvv,
    });
    //limpa o carrinho após finalizar
    limparCarrinho();
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
          <FormLabel
          sx={(theme) => ({
            color: theme.palette.secondary.main,})}
            >Forma de Pagamento</FormLabel>
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
              inputProps={{ maxLength: 16 }}
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

        <Button type="submit" variant="contained" color="error" fullWidth>
          Pagar Agora
        </Button>
      </form>
    </Box>
  );
};

export default Pagamento;
