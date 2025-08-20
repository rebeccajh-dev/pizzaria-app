import { Box, Stack, Button, TableCell, Paper , TableContainer, Table, TableHead, TableRow, TableBody, CardActions} from "@mui/material";
import { Add } from "@mui/icons-material";
import EntregadorDialog from "../components/EntregadorDialog";
import { useState } from "react";
import { useEntregadores} from "../context/EntregadoresContext";
import { EditOutlined, DeleteOutline } from "@mui/icons-material";

const TabelaEntregadores = ({ onSelecionarHistorico }) => {
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
                Novo Entregador
            </Button>
            </Stack>

            <TableContainer component={Paper}>
            <Table aria-label="Inventário de Entregadores">
                <TableHead >
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
                    <TableRow key={entregador.id}>
                    <TableCell>{entregador.id}</TableCell>
                    <TableCell>{entregador.nome}</TableCell>
                    <TableCell>{entregador.cpf}</TableCell>
                    <TableCell>{entregador.telefone}</TableCell>
                    <TableCell>
                        <CardActions>
                            <Button  variant="outlined" color="secondary" onClick={() => onSelecionarHistorico(entregador)}>Histórico</Button>
                        </CardActions>
                    </TableCell>
                    <TableCell>
                        <CardActions>
                            <Button variant="contained"  color="success" onClick={() => handleOpenEdit(entregador)}><EditOutlined fontSize="small" /></Button>
                            <Button variant="contained"  color="error" onClick={() => handleDelete(entregador.id)}><DeleteOutline fontSize="small" /></Button>
                        </CardActions>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            {open && (
            <EntregadorDialog
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