// src/theme.jsx
import { createTheme } from "@mui/material/styles";

// Base colors (same for light and dark)
export const baseColors = {
  primary: { main: "#ffffff" },
  secondary: { main: "#c40f0f" },
  tertiary: { main: "#558858ff"},
  quartiary: { main: "#0d7212ff"},
  quintary: { main: "#0f8c23"},
  sextatory: { main: "#FF5A5F"},
  seventh: { main: "#194216ff"},
  success: { main: "#28a745", contrastText: "#fff" },
  error: { main: "#dc3545", contrastText: "#fff" },
  text: { primary: "#c40f0f", secondary: "#0d7212", tertiary: "#ffff", quartiary: "#FF5A5F" },
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

