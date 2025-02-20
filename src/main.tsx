import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.ts"; // Importa el tema
import CssBaseline from "@mui/material/CssBaseline";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normaliza estilos */}
      <App />
    </ThemeProvider>
  </StrictMode>,
)
