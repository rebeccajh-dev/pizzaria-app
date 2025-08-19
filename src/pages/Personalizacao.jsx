import { Grid } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import { useState } from "react";

export default function ColorInputExample() {
  const [color1, setColor1] = useState("#ffffff");
  const [color2, setColor2] = useState("#a81010");
  const [color3, setColor3] = useState("#FF5A5F");
  const [color4, setColor4] = useState("#558858");
  const [color5, setColor5] = useState("#60a76f");
  const [color6, setColor6] = useState("#17411e");

  // salvar preferências
  localStorage.setItem("themeConfig", JSON.stringify({
    primary: { main: "#ffffff" },
    secondary: { main: "#a81010" },
    tertiary: { main: "#FF5A5F" },  
    quartiary: { main: "#558858" },
    quintary: { main: "#60a76f" },
    sextatory: { main: "#17411e" },
    success: { main: "#28a745", contrastText: "#fff" },
    error: { main: "#dc3545", contrastText: "#fff" },
  }));


  return (
    <Grid p={{xs:8,dm:3}} display="grid" sx={{gap:"10px"}}>

      <MuiColorInput
        format="hex"
        value={color1}
        onChange={setColor1}
        label="Cor dos ícones"
      />

      <MuiColorInput
        format="hex"
        value={color2}
        onChange={setColor2}
        label="Cor Principal"
      />

      <MuiColorInput
        format="hex"
        value={color3}
        onChange={setColor3}
        label="Cor Sub-Principal"
      />

      <MuiColorInput
        format="hex"
        value={color4}
        onChange={setColor4}
        label="Cor Complementar"
      />

      <MuiColorInput
        format="hex"
        value={color5}
        onChange={setColor5}
        label="Cor Sub-Complementar"
      />

      <MuiColorInput
        format="hex"
        value={color6}
        onChange={setColor6}
        label="Cor Header"
      />

      
    </Grid>
  );
}
