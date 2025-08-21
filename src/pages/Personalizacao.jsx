import { Button, Grid, useTheme, TextField} from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import { useState, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import { toast } from "react-toastify";

export default function ColorInputExample() {
  // cores padrão
  const defaultColors = {
    color1: "#ffffff",
    color2: "#a81010",
    color3: "#FF5A5F",
    color4: "#558858",
    color5: "#60a76f",
    color6: "#17411e",
  };

  const [colors, setColors] = useState(defaultColors);
  const [logo, setLogo] = useState(null);
  const [title, setTitle] = useState(null);

  const theme = useTheme();

  // carregar config do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("themeConfig");
    if (saved) {
      const parsed = JSON.parse(saved);
      setColors({
        color1: parsed.primary?.main || defaultColors.color1,
        color2: parsed.secondary?.main || defaultColors.color2,
        color3: parsed.tertiary?.main || defaultColors.color3,
        color4: parsed.quartiary?.main || defaultColors.color4,
        color5: parsed.quintary?.main || defaultColors.color5,
        color6: parsed.sextatory?.main || defaultColors.color6,
      });
      setLogo(parsed.logo || null);
      setTitle(parsed.title || "Mammamia Pizzaria")
    }
  }, []);

  // handler salvar preferências
  const handleSave = () => {
    localStorage.setItem(
      "themeConfig",
      JSON.stringify({
        primary: { main: colors.color1 },
        secondary: { main: colors.color2 },
        tertiary: { main: colors.color3 },
        quartiary: { main: colors.color4 },
        quintary: { main: colors.color5 },
        sextatory: { main: colors.color6 },
        logo,
        title
      })
    );
    toast.success("Configurações salvas!");
  };

  // handler resetar
  const handleReset = () => {
    setColors(defaultColors);
    setLogo(null);
    localStorage.removeItem("themeConfig");
  };

  // upload logo
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result); // base64 da imagem
      reader.readAsDataURL(file);
    }
  };

  return (
    <Grid p={{ xs: 8, dm: 3 }} container spacing={2} sx={{ gap: "10px" }}>
      <MuiColorInput
        format="hex"
        value={colors.color1}
        onChange={(val) => setColors((c) => ({ ...c, color1: val }))}
        label="Cor dos ícones"
      />

      <MuiColorInput
        format="hex"
        value={colors.color2}
        onChange={(val) => setColors((c) => ({ ...c, color2: val }))}
        label="Cor Principal"
      />

      <MuiColorInput
        format="hex"
        value={colors.color3}
        onChange={(val) => setColors((c) => ({ ...c, color3: val }))}
        label="Cor Sub-Principal"
      />

      <MuiColorInput
        format="hex"
        value={colors.color4}
        onChange={(val) => setColors((c) => ({ ...c, color4: val }))}
        label="Cor Complementar"
      />

      <MuiColorInput
        format="hex"
        value={colors.color5}
        onChange={(val) => setColors((c) => ({ ...c, color5: val }))}
        label="Cor Sub-Complementar"
      />
      
      <MuiColorInput
        format="hex"
        value={colors.color6}
        onChange={(val) => setColors((c) => ({ ...c, color6: val }))}
        label="Cor Header"
      />

      <TextField
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />

      {/* upload logo */}
      <Button
        variant="outlined"

        component="label"
        sx={{
          width: "255px",
          color: "#585858ff",
          border: "1px solid #585858ff",
        }}
      >
        Upload Logo
        <input hidden accept="image/*" type="file" onChange={handleLogoChange} />
      </Button>

      {/* preview logo se existir */}
      {logo && (
        <img
          src={logo}
          alt="Logo preview"
          style={{ width: "100px", marginTop: "10px" }}
        />
      )}

      {/* salvar */}
      <Button
        onClick={handleSave}
        variant="contained"
        sx={{
          bgcolor: theme.palette.tertiary.main,
          color: theme.palette.primary.main,
        }}
      >
        <SaveIcon />
      </Button>

      {/* reset */}
      <Button
        onClick={handleReset}
        variant="contained"
        sx={{
          bgcolor: theme.palette.quartiary.main,
          color: theme.palette.primary.main,
        }}
      >
        <SettingsBackupRestoreIcon />
      </Button>
    </Grid>
  );
}
