import { Box, Stack, Button, TableCell, Paper , TableContainer, Table, TableHead, TableRow, TableBody, CardActions} from "@mui/material";
import { Add } from "@mui/icons-material";
//import GarcomDialog from "../components/GarcomDialog";
import { useState } from "react";
import { useGarcons} from "../context/GarconsContext";

const Tabelagarcons = () => {
    const { garcons, saveGarcom, deleteGarcom } = useGarcons();
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    const handleOpenCreate = () => {
        setEditing(null);
        setOpen(true);
    };

    const handleOpenEdit = (garcom) => {
        setEditing(garcom);
        setOpen(true);
    };

    const handleDelete = (id) => {
        deleteGarcom(id);
    };

    const handleSave = async (data) => {
        await saveGarcom(data, editing);
        setOpen(false);
    };

    return (
        <Box p={2} >
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" mb={2} >
            <Button variant="contained" startIcon={<Add />} onClick={handleOpenCreate} color="error">
                Novo Garçom
            </Button>
            </Stack>

            <TableContainer component={Paper}>
            <Table aria-label="Inventário de garçons">
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
                {garcons.map((garcom) => (
                    <TableRow key={garcom.matricula}>
                    <TableCell>{garcom.matricula}</TableCell>
                    <TableCell>{garcom.nome}</TableCell>
                    <TableCell>{garcom.cpf}</TableCell>
                    <TableCell>{garcom.telefone}</TableCell>
                    <TableCell>
                        <CardActions>
                            <Button variant="outlined"  color="primary" onClick={() => handleOpenEdit(garcom)}>Histórico de atendimentos</Button>
                        </CardActions>
                    </TableCell>
                    <TableCell>
                        <CardActions>
                            <Button variant="contained"  color="success" onClick={() => handleOpenEdit(garcom)}>Editar</Button>
                            <Button variant="contained"  color="error" onClick={() => handleDelete(garcom.id)}>Deletar</Button>
                        </CardActions>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            {open && (
            <garcomDialog
                open={open}
                onClose={() => setOpen(false)}
                onSave={handleSave}
                editing={editing}
            />
            )}
        </Box>
    )
}

export default Tabelagarcons