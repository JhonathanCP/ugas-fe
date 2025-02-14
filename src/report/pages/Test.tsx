import { Container, Paper, Typography, useTheme } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: "Enero", ventas: 4000 },
    { name: "Febrero", ventas: 3000 },
    { name: "Marzo", ventas: 5000 },
    { name: "Abril", ventas: 7000 },
];

export function Test() {
    const theme = useTheme();
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <h1>"https://github.com/kevin344k/course-typescript-midudev/"</h1>
            <Typography variant="h4" gutterBottom>
                Dashboard de Ventas
            </Typography>
            <Paper sx={{ p: 3, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Ventas Mensuales
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="ventas" stroke={theme.palette.secondary.main} strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </Paper>
        </Container>
    );
}
