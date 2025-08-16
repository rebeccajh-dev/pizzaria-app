import { Box, Stack, Button, TableCell, Paper , TableContainer, Table, TableHead, TableRow, TableBody, CardActions} from "@mui/material";
import { Add } from "@mui/icons-material";
///import entregadorDialog from "../components/entregadorDialog";
import { useState } from "react";
import { useEntregadores} from "../context/EntregadoresContext";

const TabelaEntregadores = () => {
    const { entregadores, saveEntregador, deleteEntregador } = useEntregadores();
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    const handleOpenCreate = () => {
        setEditing(null);
        setOpen(true);
    };

    const handleOpenEdit = (entregador) => {
        setEditing(entregador);
        setOpen(true);
    };

    const handleDelete = (id) => {
        deleteEntregador(id);
    };

    const handleSave = async (data) => {
        await saveEntregador(data, editing);
        setOpen(false);
    };

    return (
        <Box p={2} >
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" mb={2} >
            <Button variant="contained" startIcon={<Add />} onClick={handleOpenCreate} color="error">
                Novo Entregador
            </Button>
            </Stack>

            <TableContainer component={Paper}>
            <Table aria-label="Inventário de Entregadores">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Matrícula</strong></TableCell>
                        <TableCell><strong>Nome</strong></TableCell>
                        <TableCell><strong>Cpf</strong></TableCell>
                        <TableCell><strong>Telefone</strong></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {entregadores.map((entregador) => (
                    <TableRow key={entregador.matricula}>
                    <TableCell>{entregador.matricula}</TableCell>
                    <TableCell>{entregador.nome}</TableCell>
                    <TableCell>{entregador.cpf}</TableCell>
                    <TableCell>{entregador.telefone}</TableCell>
                    <TableCell>
                        <CardActions>
                            <Button variant="outlined"  color="primary" onClick={() => handleOpenEdit(entregador)}>Histórico de entregas</Button>
                        </CardActions>
                    </TableCell>
                    <TableCell>
                        <CardActions>
                            <Button variant="contained"  color="success" onClick={() => handleOpenEdit(entregador)}>Editar</Button>
                            <Button variant="contained"  color="error" onClick={() => handleDelete(entregador.id)}>Deletar</Button>
                        </CardActions>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            {open && (
            <entregadorDialog
                open={open}
                onClose={() => setOpen(false)}
                onSave={handleSave}
                editing={editing}
            />
            )}
        </Box>
    )
}

export default TabelaEntregadores