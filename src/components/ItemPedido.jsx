// ItemPedido.jsx
import React from "react";
import { Box, Typography, Avatar, TextField, IconButton, } from "@mui/material";
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
        sx={{
          width: 60,
          height: 60,
          border: "1px solid",
          borderColor:"error",
          borderRadius: "8px"     // cantos arredondados (pode ser "50%" para círculo)
        }}
      />
      <Box flexGrow={1} textAlign="left">
        <Typography fontWeight="bold">{item.nome}</Typography>
        <Typography variant="body2">{item.tamanho}</Typography>
        {item.observacoes && (
          <Typography variant="caption" display="block" >
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
      />

      <IconButton color="error" onClick={() => onRemoverItem(index)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default ItemPedido;
