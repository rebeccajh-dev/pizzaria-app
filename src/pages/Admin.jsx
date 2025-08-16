import React, { useState} from "react";
import { Box, Stack, Button, TableCell, Paper , TableContainer, Table, TableHead, TableRow, TableBody, CardActions } from "@mui/material";
import { Add } from "@mui/icons-material";
import PizzaDialog from "../components/PizzaDialog";

import { usePizzas} from "../context/PizzasContext";

const Admin = () => {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const { pizzas, savePizza, deletePizza } = usePizzas();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const API_URL = "http://localhost:3002/pizzas";


  const handleOpenCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleOpenEdit = (pizza) => {
    setEditing(pizza);
    setOpen(true);
  };

  const handleDelete = (id) => {
    deletePizza(id);
  };

  const handleSave = async (data) => {
    await savePizza(data, editing);
    setOpen(false);
  };


  return (
    <>
      {/*vou fazer um componente que avisa que ele não tem acesso a essa pagina*/}
      {!(usuarioLogado.tipo === "admin") &&(
        <div>não tenho acesso</div>
      )}
      {(usuarioLogado.tipo === "admin") &&(
        <Box p={2} >
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" mb={2} >
            <Button variant="contained" startIcon={<Add />} onClick={handleOpenCreate} color="error">
              Nova Pizza
            </Button>
          </Stack>

          <TableContainer component={Paper}>
            <Table aria-label="Inventário Cardápio de Pizzas">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Id</strong></TableCell>
                  <TableCell><strong>Nome</strong></TableCell>
                  <TableCell><strong>Ingredientes</strong></TableCell>
                  <TableCell><strong>Preço</strong></TableCell>
                  <TableCell><strong>Categoria</strong></TableCell>
                  <TableCell><strong></strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pizzas.map((pizza) => (
                  <TableRow key={pizza.id}>
                    <TableCell>{pizza.id}</TableCell>
                    <TableCell>{pizza.nome}</TableCell>
                    <TableCell>{pizza.ingredientes.join(", ")}</TableCell>
                    <TableCell>R$ {pizza.preco.toFixed(2)}</TableCell>
                    <TableCell>{pizza.categoria}</TableCell>
                    <TableCell>
                      <CardActions>
                        <Button variant="contained"  color="success" onClick={() => handleOpenEdit(pizza)}>Editar</Button> 
                        <Button variant="contained"  color="error" onClick={() => handleDelete(pizza.id)}>Deletar</Button>
                      </CardActions>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {open && (
            <PizzaDialog
              open={open}
              onClose={() => setOpen(false)}
              onSave={handleSave}
              editing={editing}
            />
          )}
        </Box>
      )}
    </>
  )
}

export default Admin