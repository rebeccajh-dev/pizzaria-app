import { createTheme } from "@mui/material/styles";

export const baseColors = {
  primary: { main: "#ffffff" },
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
              primary: "#ffffff", // branco no dark
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
            root: {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "gray", // cor padrão da borda
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "green", // cor ao passar mouse
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "green", // cor quando o input está em foco
                borderWidth: "2px",
              },
            },
          },
        },
        MuiInputLabel: {
          styleOverrides: {
            root: {
              "&.Mui-focused": {
                color: "green", // muda a cor do label quando em foco
              },
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: ({ theme }) => {
              if (theme.palette.mode === "dark") {
                return {
                  backgroundColor: "#2b2828ff",
                  color: "#ffffffff",
                  borderRadius: "12px",
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.6)",
                };
              } else {
                return {
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  borderRadius: "12px",
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                };
              }
            },
          },
        },
      },
    });