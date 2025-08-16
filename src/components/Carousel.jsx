import React from "react";
import Slider from "react-slick";
import { Card, CardMedia, useTheme, Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = ({ images }) => {
  const theme = useTheme();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,       // mostra 3 imagens por slide
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 900,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Box sx={{ maxWidth: "1000px", margin: "auto", mt: 4 }}>
      <Slider {...settings}>
        {images.map((item, index) => (
          <Box key={index} sx={{ px: 1 }}> {/* padding horizontal entre os slides */}
            <Card
              sx={{
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
                image={item}
                alt={`Slide ${index + 1}`}
                sx={{
                  borderRadius: "12px",
                  width: "100%",
                  height: { xs: "200px", sm: "250px", md: "300px" },
                  objectFit: "cover",
                }}
              />
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ImageCarousel;
