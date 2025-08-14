// ItemPedido.jsx
import React from "react";
import { Box, Typography, Avatar, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ItemPedido = ({
  item,
  pizzaInfo,
  index,
  onQuantidadeChange,
  onRemoverItem
}) => {
  return (
    <Box display="flex" alignItems="center" gap={2} mb={2}>
      <Avatar
        src={
          pizzaInfo && pizzaInfo.imagem
            ? pizzaInfo.imagem.startsWith("http")
              ? pizzaInfo.imagem
              : `/imagens/${pizzaInfo.imagem}`
            : "/imagens/pizza.png"
        }
        variant="square"
        sx={{ width: 50, height: 50 }}
      />
      <Box flexGrow={1}>
        <Typography fontWeight="bold">{item.nome}</Typography>
        <Typography variant="caption">{item.tamanho}</Typography>
        {item.observacoes && (
          <Typography variant="caption" display="block">
            Obs: {item.observacoes}
          </Typography>
        )}
        <Typography variant="body2" color="green">
          R$ {(item.preco * item.quantidade).toFixed(2)}
        </Typography>
      </Box>

      <TextField
        type="number"
        value={item.quantidade}
        onChange={(e) => onQuantidadeChange(index, parseInt(e.target.value))}
        size="small"
        sx={{ width: 70 }}
        inputProps={{ min: 1 }}
      />

      <IconButton color="error" onClick={() => onRemoverItem(index)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default ItemPedido;
