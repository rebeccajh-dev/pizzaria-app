import React, { useState } from 'react';
import {
  Typography, Box, Card, CardMedia, CardContent, Button, CardActions,
  Dialog, DialogTitle, DialogContent, TextField, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel
} from "@mui/material";
import { toast } from 'react-toastify';

// Lista de tamanhos disponíveis 
const tamanhosDisponiveis = ['Pequena', 'Média', 'Grande'];

const PizzaCard = ({ pizzas }) => {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
  const [pizzaSelecionada, setPizzaSelecionada] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [tamanho, setTamanho] = useState('Média');
  const [observacoes, setObservacoes] = useState('');

  const handleAbrirDetalhes = (pizza) => {
    setPizzaSelecionada(pizza);
    setQuantidade(1);
    setTamanho('Média');
    setObservacoes('');
  };

  const handleFecharDetalhes = () => {
    setPizzaSelecionada(null);
  };

  const handleAdicionarCarrinho = () => {
    if (!pizzaSelecionada) return;

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let precoBase = pizzaSelecionada.preco;
    if (tamanho === "Média") precoBase *= 1.2;
    if (tamanho === "Grande") precoBase *= 1.5;
    
    const novoItem = {
      ...pizzaSelecionada,
      idUnico: `${pizzaSelecionada.id}-${tamanho}-${observacoes.trim()}`,
      quantidade,
      tamanho,
      observacoes: observacoes.trim(),
      preco: precoBase * quantidade
    };

    const itemExistente = carrinho.find(item => item.idUnico === novoItem.idUnico);

    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      carrinho.push(novoItem);
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    toast.success(`${pizzaSelecionada.nome} (${tamanho}) adicionada ao carrinho!`);
    handleFecharDetalhes();
  };

  return (
    <div>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '16px',
        p: 2,
      }}>
        {pizzas && pizzas.length > 0 ? (
          pizzas.map((pizza) => (
            <Card key={pizza.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={
                  pizza.imagem?.startsWith("http")
                    ? pizza.imagem
                    : `/imagens/${pizza.imagem || "pizza.png"}`
                }
                alt={pizza.nome}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{pizza.nome}</Typography>
                <Typography variant="body2" color="text.secondary">{pizza.ingredientes?.join(", ")}</Typography>
                <Typography variant="h5" sx={{ color: "red", fontWeight: "bold", mt: 1 }}>
                  R$ {pizza.preco.toFixed(2).replace(".", ",")}
                </Typography>
              </CardContent>
              {(usuarioLogado.tipo === "cliente") && (
              <CardActions>
                <Button variant="outlined" color='success' fullWidth onClick={() => handleAbrirDetalhes(pizza)}>
                  Selecionar
                </Button>
              </CardActions>
              )}
            </Card>
          ))
        ) : (
          <Typography sx={{ p: 2, width: '100%', textAlign: 'center' }}>
            Nenhuma pizza encontrada.
          </Typography>
        )}
      </Box>

      {/* Modal de Detalhes */}
      {pizzaSelecionada && (
        <Dialog open={true} onClose={handleFecharDetalhes}>
          <DialogTitle>{pizzaSelecionada.nome}</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              {pizzaSelecionada.ingredientes?.join(', ')}
            </Typography>

            <FormControl sx={{ mt: 2, mb: 1 }}>
              <FormLabel color='error'>Tamanho</FormLabel>
              <RadioGroup
                row
                value={tamanho}
                onChange={(e) => setTamanho(e.target.value)}
              >
                {tamanhosDisponiveis.map(size => (
                  <FormControlLabel key={size} value={size} control={<Radio color='error' />} label={size} />
                ))}
              </RadioGroup>
            </FormControl>

            <Typography variant="h6" gutterBottom>
              Preço: R$ {(
                tamanho === "Média"
                  ? pizzaSelecionada.preco * 1.2
                  : tamanho === "Grande"
                  ? pizzaSelecionada.preco * 1.5
                  : pizzaSelecionada.preco
              ).toFixed(2).replace(".", ",")}
            </Typography>

            <TextField
              label="Observações (ex: sem cebola)"
              multiline
              rows={3}
              fullWidth
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              sx={{ mt: 2, mb: 2 }}
            />

            <TextField
              label="Quantidade"
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(Math.max(1, parseInt(e.target.value) || 1))}
              sx={{ mb: 2 }}
              fullWidth
            />
            <Button variant="contained" color="error" fullWidth onClick={handleAdicionarCarrinho}>
              Adicionar ao Carrinho
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PizzaCard;