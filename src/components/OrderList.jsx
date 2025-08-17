import React, { useState } from "react";
import OrderCard from "./OrderCard";
import { Pagination, Box } from "@mui/material";

export default function OrdersList({ pedidos, onStatusChange, onDetalhesClick }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // calcular quantas páginas existem
  const totalPages = Math.ceil(pedidos.length / itemsPerPage);

  // cortar os pedidos para mostrar só os da página atual
  const startIndex = (page - 1) * itemsPerPage;
  const currentPedidos = pedidos.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box>
      {currentPedidos.map((pedido) => (
        <OrderCard
          key={pedido.id}
          pedido={pedido}
          onStatusChange={onStatusChange}
          onDetalhesClick={onDetalhesClick}
        />
      ))}

      {/* Barra de paginação */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="secondary"
          />
        </Box>
      )}
    </Box>
  );
}
