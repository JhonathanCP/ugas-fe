import { Container, Paper, Typography, useTheme, Grid } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend, AreaChart, Area } from "recharts";
import { useEffect, useRef, useState } from "react";
import { createSwapy } from "swapy";

const data = [
    { name: "Enero", ventas: 4000 },
    { name: "Febrero", ventas: 3000 },
    { name: "Marzo", ventas: 5000 },
    { name: "Abril", ventas: 7000 },
];

const dataProductos = [
    { name: "Producto A", ventas: 5000 },
    { name: "Producto B", ventas: 7000 },
    { name: "Producto C", ventas: 4000 },
];

const dataPastel = [
    { name: "Producto A", value: 5000 },
    { name: "Producto B", value: 7000 },
    { name: "Producto C", value: 4000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export function Test() {
    const theme = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const swapyRef = useRef<any>(null);
    const [items, setItems] = useState(["bar", "line", "pie", "area"]);

    useEffect(() => {
        if (containerRef.current) {
            swapyRef.current = createSwapy(containerRef.current);
            swapyRef.current.onSwap((event: any) => {
                const newOrder = [...items];
                const fromIndex = newOrder.indexOf(event.from);
                const toIndex = newOrder.indexOf(event.to);
                if (fromIndex !== -1 && toIndex !== -1) {
                    [newOrder[fromIndex], newOrder[toIndex]] = [newOrder[toIndex], newOrder[fromIndex]];
                    setItems(newOrder);
                }
            });
        }

        return () => {
            swapyRef.current?.destroy();
        };
    }, [items]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard Interactivo
            </Typography>
            <Grid container spacing={2} ref={containerRef}>
                {items.map((item) => (
                    <Grid
                        item
                        key={item}
                        xs={12}
                        sm={item === "bar" || item === "area" ? 3 : 9} // 25% para "bar" y "area", 75% para "line" y "pie"
                        data-swapy-slot={item}
                    >
                        <div data-swapy-item={item}>
                            <Paper sx={{ p: 2, boxShadow: 3 }}>
                                {item === "bar" && (
                                    <>
                                        <Typography variant="h6">Ventas por Producto</Typography>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <BarChart data={dataProductos}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Bar dataKey="ventas" fill={theme.palette.secondary.main} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </>
                                )}
                                {item === "line" && (
                                    <>
                                        <Typography variant="h6">Ventas Mensuales</Typography>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <LineChart data={data}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Line type="monotone" dataKey="ventas" stroke={theme.palette.primary.main} strokeWidth={3} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </>
                                )}
                                {item === "pie" && (
                                    <>
                                        <Typography variant="h6">Distribución de Ventas</Typography>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <PieChart>
                                                <Pie data={dataPastel} dataKey="value" cx="50%" cy="50%" outerRadius={70} label>
                                                    {dataPastel.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </>
                                )}
                                {item === "area" && (
                                    <>
                                        <Typography variant="h6">Tendencia de Ventas</Typography>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <AreaChart data={data}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Area type="monotone" dataKey="ventas" stroke={theme.palette.success.main} fill={theme.palette.success.light} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </>
                                )}
                            </Paper>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
