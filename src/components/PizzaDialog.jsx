import React,{useEffect} from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Grid, Box, Stack, Chip, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const categorias = ["Tradicional", "Especial", "Vegana", "Doce"];

const schema = yup.object({
  nome: yup.string().required("Nome é obrigatório"),
  ingredientes: yup.string().required("Informe pelo menos um ingrediente"),
  preco: yup.number().positive().required("Preço é obrigatório"),
  imagem: yup.string().url("URL inválida").nullable().notRequired(),
  categoria: yup.string().required("Categoria é obrigatória"),
});

const PizzaDialog = ({ open, onClose, onSave, editing }) => {

  const { control, handleSubmit, watch, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: editing || {
      nome: "",
      ingredientes: "",
      preco: "",
      imagem: "",
      categoria: "Tradicional",
    },
  });

  useEffect(() => {
    if (editing) {
      reset({
        ...editing,
        ingredientes: Array.isArray(editing.ingredientes)
          ? editing.ingredientes.join(", ")
          : editing.ingredientes
      });
    }
  }, [editing, reset]);

  const submit = (data) => {
    onSave({
      ...data,
      ingredientes: data.ingredientes.split(",").map((i) => i.trim()),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle color="success" >{editing ? "Editar Pizza" : "Nova Pizza"}</DialogTitle>
      <form onSubmit={handleSubmit(submit)}>
        <DialogContent>
          <Controller name="nome" control={control} render={({ field, fieldState }) => (
            <TextField {...field} margin="normal" label="Nome" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )} />
          <Controller name="ingredientes" control={control} render={({ field, fieldState }) => (
            <TextField {...field} margin="normal" label="Ingredientes (separe por vírgula)" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller name="preco" control={control} render={({ field, fieldState }) => (
                <TextField {...field} type="number" margin="normal" label="Preço" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
              )} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller name="categoria" control={control} render={({ field, fieldState }) => (
                <TextField {...field} select margin="normal" label="Categoria" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message}>
                  {categorias.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </TextField>
              )} />
            </Grid>
          </Grid>
          <Controller name="imagem" control={control} render={({ field, fieldState }) => (
            <TextField {...field} margin="normal" label="URL da imagem" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="error">Cancelar</Button>
          <Button type="submit" variant="contained" color="success">{editing ? "Salvar" : "Criar"}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default PizzaDialog;