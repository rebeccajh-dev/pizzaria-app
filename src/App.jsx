import React, { useState, useMemo } from 'react';
import { ThemeProvider} from '@mui/material/styles';
import { Box, CssBaseline, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';
import './App.css';
import { ToastContainer } from 'react-toastify';
import {getTheme} from "./routes/theme"

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => getTheme(darkMode), [darkMode]);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1300,
          borderRadius: "50%",
          boxShadow: 3,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <IconButton onClick={toggleDarkMode} color="black">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>

      {/* Conteúdo */}
      <div>
      </div>
      <Header />
      <AppRoutes />
      <ToastContainer />
    </ThemeProvider>
  );
}
