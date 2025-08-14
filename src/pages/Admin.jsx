import React, { useState, useEffect} from "react";
import { Box, Stack, Button, TableCell, Paper , TableContainer, Table, TableHead, TableRow, TableBody, CardActions} from "@mui/material";
import { Add } from "@mui/icons-material";
import PizzaDialog from "../components/PizzaDialog";


const Admin = () => {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  const [pizzas, setPizzas] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const API_URL = "http://localhost:3002/pizzas";

  
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setPizzas(data || []))
      .catch(err => console.error("Erro ao carregar pizzas:", err));
  }, []);

  const handleOpenCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleOpenEdit = (pizza) => {
    setEditing(pizza);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar essa pizza?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setPizzas(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Erro ao deletar pizza:", err);
    }
  };

  const handleSave = async (data) => {
    try {
      if (editing) {
        await fetch(`${API_URL}/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, id: editing.id })
        });
      } else {
        // Gerar próximo id como string
        const nextId = String(
          pizzas.length ? Math.max(...pizzas.map(p => Number(p.id))) + 1 : 1
        );

        await fetch(`${API_URL}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, id: nextId })
        });
        }
      // Atualiza lista
      const res = await fetch(API_URL);
      setPizzas(await res.json());
    } catch (err) {
      console.error("Erro ao salvar pizza:", err);
    }
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