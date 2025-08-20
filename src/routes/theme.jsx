import { createTheme } from "@mui/material/styles";
// cores base (fallback)
export const baseColors = {
  primary: { main: "#ffffff" },
  secondary: { main: "#a81010" },
  tertiary: { main: "#FF5A5F" },
  quartiary: { main: "#558858" },
  quintary: { main: "#60a76f" },
  sextatory: { main: "#17411e" },
  success: { main: "#28a745", contrastText: "#fff" },
  error: { main: "#dc3545", contrastText: "#fff" }
};

// função para pegar do localStorage
const loadCustomColors = () => {
  try {
    const saved = localStorage.getItem("themeConfig");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        primary: parsed.primary || baseColors.primary,
        secondary: parsed.secondary || baseColors.secondary,
        tertiary: parsed.tertiary || baseColors.tertiary,
        quartiary: parsed.quartiary || baseColors.quartiary,
        quintary: parsed.quintary || baseColors.quintary,
        sextatory: parsed.sextatory || baseColors.sextatory,
        success: parsed.success || baseColors.success,
        error: parsed.error || baseColors.error,
      };
    }
  } catch (e) {
    console.error("Erro carregando themeConfig:", e);
  }
  return baseColors;
};

export const getTheme = (darkMode) => {
  const colors = loadCustomColors();

  return createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      ...colors,
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
          root: ({ theme }) => ({
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "gray",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.secondary.main,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.secondary.main,
              borderWidth: "2px",
            },
          }),
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: "gray",
            "&:hover": {
              color: theme.palette.secondary.main,
            },
            "&.Mui-checked": {
              color: theme.palette.secondary.main,
            },
            "&.Mui-focusVisible": {
              outline: `2px solid ${theme.palette.secondary.main}`,
              outlineOffset: 2,
            },
          }),
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            "&.Mui-focused": {
              color:
                theme.palette.mode === "dark" ? "#cececeff" : "#585858ff",
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
};
