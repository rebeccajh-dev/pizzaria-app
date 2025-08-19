
import Slider from "react-slick";
import { Card, CardMedia, Box, Typography, useTheme } from "@mui/material";
import { toast } from "react-toastify";
import { usePizzas } from "../context/PizzasContext.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = () => {
  const theme = useTheme();
  const { pizzas } = usePizzas();

  // se o context ainda não carregou, exibe nada ou loading
  if (!pizzas || pizzas.length === 0) return null;

  // cada promoção tem a imagem, ids das pizzas e preço
  const promocoes = [
    { imagem: "/imagens/pizza1.png", ids: ["1", "2"], preco: 60.99 },
    { imagem: "/imagens/pizza2.png", ids: ["3", "6"], preco: 42 },
    { imagem: "/imagens/pizza3.png", ids: ["3"], preco: 65.99 }, // pizza grande
  ];

  const handleClickPromo = (promo) => {
    const selecionadas = pizzas.filter(p => promo.ids.includes(p.id.toString));

    if (selecionadas.length !== promo.ids.length) {
      console.error("Pizzas do context:", pizzas);
      toast.error("Não foi possível encontrar as pizzas da promoção.");
      return;
    }

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const novoItem = {
      idUnico: `promo-${Date.now()}`,
      descricao: `Promoção - ${selecionadas.map(p => p.nome).join(" & ")}`,
      sabores: selecionadas.map(p => p.nome),
      quantidade: 1,
      preco: promo.preco,
    };

    carrinho.push(novoItem);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    // toast único para cada promoção
    toast.success(
      `Promoção adicionada ao carrinho! (${selecionadas.map(p => p.nome).join(" & ")})`,
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
    <Box sx={{ maxWidth: "1000px", margin: "auto", mt: 4 }}>
      <Slider {...settings}>
        {promocoes.map((promo, index) => {
          const nomes = pizzas
            .filter(p => promo.ids.includes(p.id))
            .map(p => p.nome)
            .join(" & ");

          return (
            <Box key={index} sx={{ px: 1, position: "relative" }}>
              <Card
                onClick={() => handleClickPromo(promo)}
                sx={{
                  cursor: "pointer",
                  borderRadius: "12px",
                  backgroundColor:
                    theme.palette.mode === "light" ? "#ffffff" : "#2b2828",
                  color: theme.palette.mode === "light" ? "#000000" : "#ffffff",
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0px 2px 10px rgba(0, 0, 0, 0.1)"
                      : "0px 2px 10px rgba(0, 0, 0, 0.6)",
                }}
              >
                <CardMedia
                  component="img"
                  image={promo.imagem}
                  alt={`Promoção ${index + 1}`}
                  sx={{
                    borderRadius: "12px",
                    width: "100%",
                    height: { xs: "200px", sm: "250px", md: "300px" },
                    objectFit: "cover",
                  }}
                />
                <Typography
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    color: "#fff",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    padding: "4px 8px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                  }}
                >
                  {nomes} - R$ {promo.preco.toFixed(2)}
                </Typography>
              </Card>
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
};

export default ImageCarousel;
