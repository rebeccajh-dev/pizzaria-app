import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Paper,
  Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const response = await axios.get("/api/usuarios.json");
        setUsuarios(response.data.usuarios);
      } catch (error) {
        console.error("Erro ao carregar os usuários:", error);
        setErro("Falha ao carregar dados de autenticação.");
      }
    };
    carregarUsuarios();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro("");

    const usuarioEncontrado = usuarios.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (usuarioEncontrado && usuarioEncontrado.senha === senha) {
      const token = btoa(
        `${usuarioEncontrado.email}:${new Date().getTime()}`
      );

      const usuarioAutenticado = {
        nome: usuarioEncontrado.nome,
        email: usuarioEncontrado.email,
        tipo: usuarioEncontrado.tipo,
        token: token
      };

      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAutenticado));
      login(usuarioAutenticado, token);
      navigate("/pages/cardapio");
    } else {
      setErro("E-mail ou senha inválidos.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column", // para organizar verticalmente
        minHeight: "90vh", // altura total
        width: "100%", // largura total
        backgroundColor: "#558858ff"
      }}
    >
      <Paper elevation={4} sx={{ p: 4, width: 350 }}>
         <Box
            component="img"
            src="\imagens\logo&nome.png"
            alt="Logo"
            sx={{ height: 180 }}
          />
        <Typography variant="h5" align="center" gutterBottom sx={{color:"#d32f2f"}}>
          Login
        </Typography>

        {erro && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {erro}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
            autoFocus
          />

          <TextField
            fullWidth
            label="Senha"
            type={mostrarSenha ? "text" : "password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setMostrarSenha((prev) => !prev)}
                    edge="end"
                    aria-label={
                      mostrarSenha ? "Ocultar senha" : "Mostrar senha"
                    }
                  >
                    {mostrarSenha ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#d32f2f", color:"#fff"}}
          >
            Entrar
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
