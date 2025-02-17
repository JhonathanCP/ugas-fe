import React, { useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Container, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";
import "../../core/components/pixel-canvas"; // Asegúrate de que la ruta sea correcta
import Logo from '../../assets/logo-essalud.png';
import portadaImg from '../../assets/portada.jpg'; // Asegúrate de que la imagen esté importada correctamente
import logoCorazon from '../../assets/logo-corazon.png';
import logoUgas from '../../assets/logo-ugas.png';

const Background = styled(Box)(() => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "row",
  "@media (max-width: 768px)": {
    flexDirection: "column",
  },
}));

const LeftPanel = styled(Box)(() => ({
  flex: 3,
  position: "relative",
  backgroundImage: `url(${portadaImg})`, // Imagen de fondo
  backgroundSize: "cover", // Asegúrate de que la imagen cubra todo el panel
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center", // Centra el contenido verticalmente
  alignItems: "center", // Centra el contenido horizontalmente
  paddingBottom: "2rem", // Espacio para los logos en la parte inferior
  height: "100vh",
  "@media (max-width: 768px)": {
    display: "none",
  },
}));

// Capa gris transparente sobre la imagen de fondo en el LeftPanel
const Overlay = styled(Box)(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 140, 255, 0.65)", // Capa gris con opacidad
}));

const RightPanel = styled(Box)(() => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(51, 221, 255, 0.2)",
  padding: "2rem",
  boxShadow: "-5px 0 10px rgba(0,0,0,0.1)",
  height: "100vh", // Aseguramos que cubra todo el alto de la pantalla
  "@media (max-width: 768px)": {
    flex: "none",
    width: "100%",
    height: "100vh",
    boxShadow: "none",
  },
}));

const PixelCanvasContainer = styled(Box)(() => ({
  position: "absolute", // Lo ponemos en posición absoluta para que no interfiera con el formulario
  top: 0, // Aseguramos que esté en la parte superior
  left: 0,
  width: "100%",
  height: "100%", // Ocupa toda la altura del panel
  zIndex: 0, // Aseguramos que el pixel-canvas quede detrás de todo
}));

const FormContainer = styled(Container)(() => ({
  textAlign: "center",
  maxWidth: "350px",
  width: "100%",
  position: "relative", // Para asegurar que el formulario se quede por encima del pixel-canvas
  zIndex: 1, // Para asegurarnos de que el formulario esté encima
}));

const InputContainer = styled(Box)(() => ({
  zIndex: 1, // Los campos de texto y el botón deben estar por encima del canvas
  position: "relative", // Asegura que se posicione correctamente
}));

// Agregar los logos al fondo del LeftPanel
const LogoContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row", // Los logos en fila
  justifyContent: "center", // Centramos los logos
  alignItems: "center", // Centramos los logos verticalmente
  gap: "20px", // Espacio entre los logos
  marginTop: "20px", // Un pequeño margen entre los logos y el título
  zIndex: 1, // Asegura que estén por encima del overlay
}));

export function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formValid, setFormValid] = useState<boolean>(false); // Estado para validación del formulario
  const { executeLogin, loading, error, data } = useLogin();
  const navigate = useNavigate();

  // Llamar a PixelCanvas
  useEffect(() => {
    console.log("Pixel Canvas debe estar en la página.");
  }, []);

  // Validación del formulario (habilitar el botón solo si los campos no están vacíos)
  useEffect(() => {
    setFormValid(username.trim() !== "" && password.trim() !== "");
  }, [username, password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValid || loading) return; // Evita enviar si el formulario no es válido o ya está cargando.
  
    try {
      // Aquí iniciamos la acción de login y mostramos la carga
      await executeLogin(username, password);
  
      if (data) {
        const decodedToken = jwtDecode(data.access_token);
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        toast.success("Login exitoso!");
        navigate("/test");
      } else if (error) {
        toast.error(error);
      }
    } catch (err) {
      console.error("Error en el login:", err);
      toast.error("Hubo un error al intentar iniciar sesión.");
    }
  };
  

  return (
    <Background>
      {/* Panel Izquierdo con imagen de fondo, capa gris y pixel-canvas */}
      <LeftPanel>
        <Overlay /> {/* Capa gris transparente */}
        <PixelCanvasContainer>
          <pixel-canvas data-colors="#0000FF, #F0F8FF, #7FFFD4" data-gap="10"></pixel-canvas>
        </PixelCanvasContainer>

        {/* Título centrado */}
        <Typography variant="h3" sx={{ color: 'white', zIndex: 1, margin: '1rem' }}>
          Sistema de visualizaciones
        </Typography>
        <Typography variant="h4" sx={{ color: 'white', zIndex: 1, margin: '1rem' }}>
          UGAS - ESSALUD
        </Typography>
        {/* Logos centrados en la parte inferior */}
        <LogoContainer>
          <img src={logoUgas} alt="Logo UGAS" style={{ minWidth: '80px' }} />
          <img src={logoCorazon} alt="Logo Corazón" style={{ minWidth: '80px' }} />          
        </LogoContainer>
      </LeftPanel>

      {/* Panel Derecho con formulario */}
      <RightPanel>
        <FormContainer>
          <img src={Logo} alt="Logo" />
          {/* <Typography variant="h5" sx={{ mb: 2 }}>
            Iniciar Sesión
          </Typography> */}

          <InputContainer>
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Usuario"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                type="submit"
                disabled={loading || !formValid} // Deshabilita si el formulario no es válido
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Ingresar"}
              </Button>
            </form>
          </InputContainer>
        </FormContainer>
      </RightPanel>
    </Background>
  );
}
