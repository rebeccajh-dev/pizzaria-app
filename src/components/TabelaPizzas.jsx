import { Box, Stack, Button, TableCell, Paper , TableContainer, Table, TableHead, TableRow, TableBody, CardActions} from "@mui/material";
import { Add } from "@mui/icons-material";
import PizzaDialog from "../components/PizzaDialog";
import { useState } from "react";
import { usePizzas} from "../context/PizzasContext";
import { EditOutlined, DeleteOutline } from "@mui/icons-material";

const TabelaPizzas = () => {
    const { pizzas, savePizza, deletePizza } = usePizzas();

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);


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
        <Box p={2} >
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" mb={2} >
            <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleOpenCreate}
                sx={{
                    backgroundColor: (theme) => theme.palette.secondary.main,
                    color: "#fff",
                    "&:hover": {
                    backgroundColor: (theme) => theme.palette.secondary.dark,
                    },
                }}
                >
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
                        <Button variant="contained"  color="success" onClick={() => handleOpenEdit(pizza)}><EditOutlined fontSize="small" /></Button>
                        <Button variant="contained"  color="error" onClick={() => handleDelete(pizza.id)}><DeleteOutline fontSize="small" /></Button>
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
    )
}

export default TabelaPizzas