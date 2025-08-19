import { createTheme } from "@mui/material/styles";

export const baseColors = {
  primary: { main: "#ffffffff" },
  secondary: { main: "#a81010" },
  tertiary: { main: "#558858" },
  quartiary: { main: "#60a76f" },
  quintary: { main: "#0f8c23" },
  sextatory: { main: "#FF5A5F" },
  seventh: { main: "#17411e" },
  success: { main: "#28a745", contrastText: "#fff" },
  error: { main: "#dc3545", contrastText: "#fff" },
};

export const getTheme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      ...baseColors,
      ...(darkMode
        ? {
            background: {
              default: "#121212",
              paper: "#212020ff",
            },
            text: {
              primary: "#ccccccff",
              secondary: "#b3b3b3",
            },
          }
        : {
            background: {
              default: "#f5f5f5",
              paper: "#ffffff",
            },
            text: {
              primary: "#000000",
              secondary: "#525252",
            },
          }),
    },

    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root:({ theme }) => ({
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "gray", // cor padrão
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.secondary.main, // hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.secondary.main, // foco
              borderWidth: "2px",
            },
          }),
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: "gray", // cor padrão da borda/ícone
            "&:hover": {
              color: theme.palette.secondary.main, // hover
            },
            "&.Mui-checked": {
              color: theme.palette.secondary.main, // quando marcado
            },
            "&.Mui-focusVisible": {
              outline: `2px solid ${theme.palette.secondary.main}`, // foco via teclado
              outlineOffset: 2,
            },
          }),
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            "&.Mui-focused": {
              color: theme.palette.mode === "dark" ? "#cececeff" : "#585858ff",
            },
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) =>
            theme.palette.mode === "dark"
              ? {
                  backgroundColor: "#2b2828ff",
                  color: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.6)",
                }
              : {
                  backgroundColor: "#ffffff",
                  color: "#000",
                  borderRadius: "12px",
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                },
        },
      },
    },
  });