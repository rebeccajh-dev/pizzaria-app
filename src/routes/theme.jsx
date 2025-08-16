// src/theme.jsx
import { BorderColor, BorderColorOutlined, BorderColorRounded, BorderColorSharp, BorderColorTwoTone } from "@mui/icons-material";
import { createTheme } from "@mui/material/styles";

// Base colors (same for light and dark)
export const baseColors = {
  primary: { main: "#ffffff" },
  secondary: { main: "#a81010ff" },
  tertiary: { main: "#558858ff"},
  quartiary: { main: "#60a76fff"},
  quintary: { main: "#0f8c23"},
  sextatory: { main: "#FF5A5F"},
  seventh: { main: "#17411eff"},
  success: { main: "#28a745", contrastText: "#fff" },
  error: { main: "#dc3545", contrastText: "#fff" },
  text: { primary: "#242424ff", secondary: "#525252ff", tertiary: "#1d1d1dff", quartiary: "#FF5A5F" },
};

export const getTheme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      ...baseColors,
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
      },
    },
  });


