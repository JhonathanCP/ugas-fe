import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: { main: "#1976d2" }, // Azul MUI
        secondary: { main: "#ff9800" }, // Naranja
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
    },
});

export default theme;
