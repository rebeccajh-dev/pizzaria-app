import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  MenuItem,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ItemPedido from "../components/ItemPedido";
import { toast } from "react-toastify";
import { usePizzas } from "../context/PizzasContext";
import { usePedidos } from "../context/PedidosContext";

const Pedido = () => {
  const navigate = useNavigate();

  const [carrinho, setCarrinho] = useState([]);
  const [tipoEntrega, setTipoEntrega] = useState("mesa");
  const [numeroMesa, setNumeroMesa] = useState("");
  const [endereco, setEndereco] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [retirarTaxaServico, setRetirarTaxaServico] = useState(false);

  const { pizzas } = usePizzas();
  const { pedidos, createPedido } = usePedidos();

  useEffect(() => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem("carrinho")) || [];
    setCarrinho(carrinhoSalvo);
  }, []);

  const handleQuantidadeChange = (index, novaQtd) => {
    const atualizado = [...carrinho];
    atualizado[index].quantidade = novaQtd > 0 ? novaQtd : 1;
    setCarrinho(atualizado);
    localStorage.setItem("carrinho", JSON.stringify(atualizado));
  };

  const handleRemoverItem = (index) => {
    const atualizado = carrinho.filter((_, i) => i !== index);
    setCarrinho(atualizado);
    localStorage.setItem("carrinho", JSON.stringify(atualizado));
  };

  const subTotal = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const taxaServico = tipoEntrega === "mesa" && !retirarTaxaServico ? subTotal * 0.1 : 0;
  const taxaEntrega = tipoEntrega === "entrega" ? subTotal * 0.2 : 0;
  const totalFinal = subTotal + taxaServico + taxaEntrega;

  const handleFinalizarPedido = async () => {
    if (!carrinho.length) {
      toast.error("Seu carrinho está vazio!", { autoClose: 3000 });
      return;
    }

    if (!nomeCliente) {
      toast("Por favor, informe o nome do cliente", { autoClose: 3000 });
      return;
    }

    if (tipoEntrega === "mesa" && !numeroMesa) {
      toast("Por favor, informe o número da mesa", { autoClose: 3000 });
      return;
    }

    if (tipoEntrega === "entrega" && !endereco) {
      toast("Por favor, informe o endereço para entrega", { autoClose: 3000 });
      return;
    }

    const novoPedido = {
      usuarioId: 2,
      cliente: nomeCliente,
      itens: carrinho.map((item) => ({
        pizzaId: item.id,
        nome: item.nome,
        observacao: item.observacoes || [],
        tamanho: item.tamanho,
        preco: item.preco.toFixed(2),
        quantidade: item.quantidade,
        total: item.preco * item.quantidade,
      })),
      tipoEntrega,
      numeroMesa: tipoEntrega === "mesa" ? numeroMesa : null,
      endereco: tipoEntrega === "entrega" ? endereco : null,
      total: totalFinal.toFixed(2),
      status: "Novo",
    };

    try {
      const nextId = String(
        pedidos.length ? Math.max(...pedidos.map((p) => Number(p.id))) + 1 : 1
      );

      createPedido(nextId, novoPedido);

      localStorage.removeItem("carrinho");
      toast.success("Pedido realizado com sucesso!", { autoClose: 3000 });
      navigate("/pages/cardapio");
    } catch (err) {
      console.error("Erro ao salvar pedido:", err);
      toast.error("Erro ao finalizar pedido", { autoClose: 3000 });
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: "auto", textAlign:"left" }}>
      {carrinho.length === 0 ? (
        <Typography>Seu carrinho está vazio</Typography>
      ) : (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Meu Pedido
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {carrinho.map((item, idx) => {
            const pizzaInfo = pizzas.find(
              (p) => String(p.id) === String(item.id)
            );
            return (
              <ItemPedido
                key={idx}
                item={item}
                pizzaInfo={pizzaInfo}
                index={idx}
                onQuantidadeChange={handleQuantidadeChange}
                onRemoverItem={handleRemoverItem}
              />
            );
          })}

          <Divider sx={{ my: 2 }} />

          {/* Nome do cliente */}
          <TextField
            label="Nome do Cliente"
            value={nomeCliente}
            onChange={(e) => setNomeCliente(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          {/* Tipo de entrega e mesa/endereço na mesma linha */}
          <Grid container spacing={1} sx={{ mb: 2 }} width="100%">
            <Grid item  width="30%">
              <TextField
                select
                label="Tipo de Entrega"
                value={tipoEntrega}
                onChange={(e) => setTipoEntrega(e.target.value)}
                fullWidth
              >
                <MenuItem value="mesa">Mesa</MenuItem>
                <MenuItem value="entrega">Entrega</MenuItem>
              </TextField>
            </Grid>
            <Grid item sx={{width:{xs:"67%",md:"68%"}}}>
              {tipoEntrega === "mesa" ? (
                <TextField
                  label="Número da Mesa"
                  value={numeroMesa}
                  onChange={(e) => setNumeroMesa(e.target.value)}
                  fullWidth
                />
              ) : (
                <TextField
                  label="Endereço"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  fullWidth
                />
              )}
            </Grid>
          </Grid>

          {/* Taxas */}
          {tipoEntrega === "mesa" && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={retirarTaxaServico}
                    onChange={(e) => setRetirarTaxaServico(e.target.checked)}
                  />

                }
                
                label="Retirar 10% de taxa de serviço"
              />
          )}

          <Divider sx={{ mb: 2 }} />

          {/* Subtotal */}
          <Grid display="flex" flexDirection="row" justifyContent="space-between">
            <Typography variant="body1" align="left">
              Subtotal:
            </Typography>
            <Typography variant="body1" align="right">
              R$ {subTotal.toFixed(2)}
            </Typography>
          </Grid>

          {!retirarTaxaServico && (
            <Grid display="flex" flexDirection="row" justifyContent="space-between">
              <Typography variant="body1" align="left">
                Taxa de Serviço:
              </Typography>
              <Typography variant="body1" align="right">
                R$ {taxaServico.toFixed(2)}
              </Typography>
            </Grid>
          )}

          {tipoEntrega === "entrega" && (
            <Grid display="flex" flexDirection="row" justifyContent="space-between">
              <Typography variant="body1" align="left">
                Taxa de Serviço:
              </Typography>
              <Typography variant="body1" align="right">
                Taxa de Entrega: R$ {taxaEntrega.toFixed(2)}
              </Typography>
            </Grid>
          )}

          {/* Total */}
          <Grid display="flex" flexDirection="row" justifyContent="space-between" sx={{ mt: 1 }}>
            <Typography variant="h6" align="left">
              Total:
            </Typography>
            <Typography variant="h6" align="right">
              R$ {totalFinal.toFixed(2)}
            </Typography>
          </Grid>

          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleFinalizarPedido}
          >
            Finalizar Pedido
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default Pedido;
