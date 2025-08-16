import React, { useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Grid
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  nome: yup.string().required("Nome é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório"),
  foto: yup.string().url("URL inválida").nullable().notRequired(),
  telefone: yup.string().required("Telefone é obrigatório")
});

// funções utilitárias de formatação
const formatCPF = (value) => {
  return value
    .replace(/\D/g, "") // remove não dígitos
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14); // limita no tamanho
};

const formatTelefone = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1)$2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 14);
};


const EntregadoresDialog = ({ open, onClose, onSave, editing }) => {

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: editing || {
      nome: "",
      cpf: "",
      foto: "",
      telefone: "",
      status: "disponível",
       historicoEntregas: []
    },
  });

  useEffect(() => {
    if (editing) {
      reset(editing);
    }
  }, [editing, reset]);

  const submit = (data) => {
    onSave({
      ...data
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle color="success">
        {editing ? "Editar Entregador" : "Novo Entregador"}
      </DialogTitle>
      <form onSubmit={handleSubmit(submit)}>
        <DialogContent>
          <Controller name="nome" control={control} render={({ field, fieldState }) => (
            <TextField {...field} margin="normal" label="Nome" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Controller
                  name="cpf"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(formatCPF(e.target.value))}
                      margin="normal"
                      label="CPF"
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />

            </Grid>
            <Grid item xs={12} sm={6}>
                <Controller
                  name="telefone"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(formatTelefone(e.target.value))}
                      margin="normal"
                      label="Telefone"
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
            </Grid>
          </Grid>
          <Controller name="foto" control={control} render={({ field, fieldState }) => (
            <TextField {...field} margin="normal" label="URL da Foto" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="error">Cancelar</Button>
          <Button type="submit" variant="contained" color="success">
            {editing ? "Salvar" : "Criar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EntregadoresDialog;
