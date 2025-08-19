// Carousel.jsx
import React from "react";
import Slider from "react-slick";
import { Card, CardMedia, Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = () => {
  // Como ta dando muito erro no backend, vou deixar as promoções fixas aqui
  // Se der tempo, trazer do backend
  const pizzas = [
    { id: 1, nome: "Calabresa" },
    { id: 2, nome: "Mussarela" },
    { id: 3, nome: "Frango com Catupiry" },
    { id: 6, nome: "Churros" },
  ];

  const promocoes = [
    { imagem: "/imagens/pizza1.png", ids: ["1", "6"], preco: 60.99 },
    { imagem: "/imagens/pizza2.png", ids: ["3", "2"], preco: 42 },
    { imagem: "/imagens/pizza3.png", ids: ["3"], preco: 65.99 },
  ];

  const handleClickPromo = (promo) => {
    const selecionadas = pizzas.filter((p) => promo.ids.includes(p.id.toString()));

    if (selecionadas.length !== promo.ids.length) {
      console.error("Erro ao encontrar pizzas:", pizzas);
      toast.error("Não foi possível encontrar as pizzas da promoção.");
      return;
    }

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const novoItem = {
      idUnico: `promo-${Date.now()}`,
      descricao: `Promoção - ${selecionadas.map((p) => p.nome).join(" & ")}`,
      sabores: selecionadas.map((p) => p.nome),
      quantidade: 1,
      preco: promo.preco,
    };

    carrinho.push(novoItem);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    toast.success(
      `Promoção adicionada ao carrinho! (${novoItem.sabores.join(" & ")})`,
      { toastId: `promo-toast-${promo.ids.join("-")}` }
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Slider {...settings}>
      {promocoes.map((promo, index) => (
        <Box key={index} px={1}>
          <Card onClick={() => handleClickPromo(promo)} sx={{ cursor: "pointer", borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="200"
              image={promo.imagem}
              alt={`Promoção ${index + 1}`}
            />
            <Box p={1}>
            </Box>
          </Card>
        </Box>
      ))}
    </Slider>
  );
};

export default ImageCarousel;
