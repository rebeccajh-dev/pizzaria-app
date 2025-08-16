import React from 'react'
import {
  Box,
  Button,
  TableCell,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  Rating,
  TableContainer,
  Paper
} from "@mui/material";

const HistoricoAtendimentos = ({ garcom, onClose }) => {
  if (!garcom) return null;

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Histórico de Atendimentos de {garcom.nome}
      </Typography>

      {garcom.historicoAtendimentos?.length > 0 ? (
        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID Atendimento</TableCell>
                <TableCell>Mesa</TableCell>
                <TableCell>ID Pedido</TableCell>
                <TableCell>Valor Gorjeta</TableCell>
                <TableCell>Atendimento</TableCell>
                <TableCell>Avaliação</TableCell>
                <TableCell>Observação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {garcom.historicoAtendimentos.map((h) => (
                <TableRow key={h.idAtendimento} hover>
                  <TableCell>{h.idAtendimento}</TableCell>
                  <TableCell>{h.numeroMesa}</TableCell>
                  <TableCell>{h.idPedido}</TableCell>
                  <TableCell>
                    R$ {h.valorGorjeta.toFixed(2).replace(".", ",")}
                  </TableCell>
                  <TableCell>
                    {new Date(h.dataHoraAtendimento).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Rating value={h.avaliacao} readOnly size="small" />
                  </TableCell>
                  <TableCell>{h.observacao}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>Nenhum atendimento registrado.</Typography>
      )}

      <Button onClick={onClose} sx={{ mt: 2 }} variant="outlined">
        Fechar
      </Button>
    </Box>
  );
};

export default HistoricoAtendimentos;
