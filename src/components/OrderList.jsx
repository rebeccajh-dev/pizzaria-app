import React from "react";
import OrderCard from "./OrderCard";
import { usePedidos } from "../context/PedidosContext";

export default function OrdersList({ onDetalhesClick }) {
  const { pedidos } = usePedidos();

  return (
    <div>
      {pedidos.map((pedido) => (
        <OrderCard
          key={pedido.id}
          pedido={pedido}
          onDetalhesClick={onDetalhesClick}
        />
      ))}
    </div>
  );
}
