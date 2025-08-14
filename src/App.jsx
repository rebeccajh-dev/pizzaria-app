import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';
import './App.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          background: {
            default: darkMode ? '#121212' : '#f5f5f5', // fundo global
          },
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = () => setDarkMode(!darkMode);

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
        <IconButton onClick={toggleDarkMode} color="inherit">
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

export default App;
