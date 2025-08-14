import React from "react";
import OrderCard from "./OrderCard";

export default function OrdersList({ pedidos, onStatusChange,onDetalhesClick }) {
  return (
    <div>
      {pedidos.map((pedido) => (
        <OrderCard 
          key={pedido.id} pedido={pedido}  
          onStatusChange={onStatusChange} 
          onDetalhesClick={onDetalhesClick}/>
      ))}
    </div>
  );
}
