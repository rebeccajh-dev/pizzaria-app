import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  MenuItem
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ItemPedido from "../components/ItemPedido"; 
import { toast } from 'react-toastify'

const Pedido = () => {
  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || {};

  const [carrinho, setCarrinho] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [tipoEntrega, setTipoEntrega] = useState("mesa");
  const [numeroMesa, setNumeroMesa] = useState("");
  const [endereco, setEndereco] = useState("");

  useEffect(() => {
    setCarrinho(JSON.parse(localStorage.getItem("carrinho")) || []);

    fetch("http://localhost:3002/pizzas")
      .then((res) => res.json())
      .then((data) => setPizzas(data || []))
      .catch((err) => console.error("Erro ao carregar pizzas:", err));

    fetch("http://localhost:3001/pedidos")
      .then((res) => res.json())
      .then((data) => setPedidos(data || []))
      .catch((err) => console.error("Erro ao carregar pedidos:", err));
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

  const totalGeral = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const handleFinalizarPedido = async () => {
    if (!carrinho.length) {
      toast.error("Seu carrinho está vazio!", {autoClose: 3000});
      return;
    }

    if (tipoEntrega === "mesa" && !numeroMesa) {
      toast("Por favor, informe o número da mesa", {autoClose: 3000});
      return;
    }

    if (tipoEntrega === "entrega" && !endereco) {
      toast("Por favor, informe o endereço para entrega", {autoClose: 3000});
      return;
    }

    const novoPedido = {
      usuarioId: 2,
      itens: carrinho.map(item => ({
        pizzaId: item.id,
        nome: item.nome,
        observacao: item.observacoes || [],
        tamanho: item.tamanho,
        preco: item.preco.toFixed(2),
        quantidade: item.quantidade,
        total: item.preco * item.quantidade
      })),
      tipoEntrega,
      numeroMesa: tipoEntrega === "mesa" ? numeroMesa : null,
      endereco: tipoEntrega === "entrega" ? endereco : null,
      total: totalGeral,
      status: "Novo"
    };

    try {
      const nextId = String(
        pedidos.length ? Math.max(...pedidos.map(p => Number(p.id))) + 1 : 1
      );

      await fetch("http://localhost:3001/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...novoPedido, id: nextId })
      });

      localStorage.removeItem("carrinho");
      toast.success("Pedido realizado com sucesso!", {autoClose: 3000});
      navigate("/pages/cardapio");
    } catch (err) {
      console.error("Erro ao salvar pedido:", err);
      toast.error("Erro ao finalizar pedido", {autoClose: 3000});
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: "auto" }}>
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

          {/* Tipo de entrega */}
          <TextField
            select
            label="Tipo de Entrega"
            value={tipoEntrega}
            onChange={(e) => setTipoEntrega(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="mesa">Mesa</MenuItem>
            <MenuItem value="entrega">Entrega</MenuItem>
          </TextField>

          {tipoEntrega === "mesa" && (
            <TextField
              label="Número da Mesa"
              value={numeroMesa}
              onChange={(e) => setNumeroMesa(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
          )}

          {tipoEntrega === "entrega" && (
            <TextField
              label="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
          )}

          <Typography variant="h6" align="right">
            Total: R$ {totalGeral.toFixed(2)}
          </Typography>

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
