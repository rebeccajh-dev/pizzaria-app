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

const HistoricoEntregas = ({ entregador, onClose }) => {
  if (!entregador) return null;

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Histórico de Entregas de {entregador.nome}
      </Typography>

      {entregador.historicoEntregas?.length > 0 ? (
        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID Entrega</TableCell>
                <TableCell>Endereço</TableCell>
                <TableCell>ID Pedido</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Saída</TableCell>
                <TableCell>Entrega</TableCell>
                <TableCell>Avaliação</TableCell>
                <TableCell>Observação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entregador.historicoEntregas.map((h) => (
                <TableRow key={h.idEntrega} hover>
                  <TableCell>{h.idEntrega}</TableCell>
                  <TableCell>{h.endereco}</TableCell>
                  <TableCell>{h.idPedido}</TableCell>
                  <TableCell>
                    R$ {h.valorEntrega.toFixed(2).replace(".", ",")}
                  </TableCell>
                  <TableCell>
                    {new Date(h.dataHoraSaida).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(h.dataHoraEntrega).toLocaleString()}
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
        <Typography>Nenhuma entrega registrada.</Typography>
      )}

      <Button onClick={onClose} sx={{ mt: 2 }} variant="outlined">
        Fechar
      </Button>
    </Box>
  );
};

export default HistoricoEntregas;
