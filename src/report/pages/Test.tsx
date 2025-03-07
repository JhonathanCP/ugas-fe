import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend, AreaChart, Area } from "recharts";
import { useEffect, useRef, useState } from "react";
import { createSwapy } from "swapy";

// Datos de ejemplo
const data = [
    { name: "Enero", ventas: 4000, red: 1, color: "rojo", grupo: "grupoX" },
    { name: "Febrero", ventas: 3000, red: 2, color: "azul", grupo: "grupoY" },
    { name: "Marzo", ventas: 5000, red: 2, color: "amarillo", grupo: "grupoZ" },
    { name: "Abril", ventas: 7000, red: 1, color: "verde", grupo: "grupoX" },
    { name: "Mayo", ventas: 6000, red: 1, color: "rojo", grupo: "grupoY" },
    { name: "Junio", ventas: 8000, red: 2, color: "amarillo", grupo: "grupoX" },
    { name: "Julio", ventas: 5000, red: 2, color: "rojo", grupo: "grupoZ" },
];

const dataProductos = [
    { name: "Producto A", ventas: 5000, red: 1, color: "rojo", grupo: "grupoX" },
    { name: "Producto B", ventas: 7000, red: 2, color: "verde", grupo: "grupoY" },
    { name: "Producto C", ventas: 4000, red: 1, color: "amarillo", grupo: "grupoZ" },
    { name: "Producto D", ventas: 6000, red: 2, color: "rojo", grupo: "grupoY" },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export function Test() {
    const containerRef = useRef<HTMLDivElement>(null);
    const swapyRef = useRef<any>(null);
    const [items, setItems] = useState(["bar", "line", "pie", "area"]);

    // Filtros seleccionados
    const [selectedRed, setSelectedRed] = useState<number[]>([1, 2]);
    const [selectedColors, setSelectedColors] = useState<string[]>(["rojo", "azul", "amarillo", "verde"]);
    const [selectedGroups, setSelectedGroups] = useState<string[]>(["grupoX", "grupoY", "grupoZ"]);

    // Filtrar datos
    const filteredData = (data: any) => {
        return data.filter((item: any) =>
            selectedRed.includes(item.red) &&
            selectedColors.includes(item.color) &&
            selectedGroups.includes(item.grupo)
        );
    };

    // Función para obtener opciones disponibles en cada filtro
    const getAvailableOptions = (filter: string) => {
        // Filtrar los datos actuales y extraer las opciones únicas para el filtro
        const allValues = filteredData(data).reduce((acc: any, curr: any) => {
            acc[curr[filter]] = true;
            return acc;
        }, {});
        return Object.keys(allValues);
    };

    // Eliminar todos los filtros
    const handleClearFilters = () => {
        setSelectedRed([1, 2]);
        setSelectedColors(["rojo", "azul", "amarillo", "verde"]);
        setSelectedGroups(["grupoX", "grupoY", "grupoZ"]);
    };

    // Manejo de cambio en los filtros
    const handleRedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValues = Array.from(event.target.selectedOptions, option => Number(option.value));
        setSelectedRed(selectedValues);
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedColors(selectedValues);
    };

    const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedGroups(selectedValues);
    };

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
        <div className="container mt-4">
            <h5 className="mb-4">Dashboard Interactivo</h5>

            {/* Filtro por Red */}
            <div className="mb-4">
                <label className="form-label">Filtrar por Red</label>
                <select
                    multiple
                    className="form-select"
                    value={selectedRed.map(String)}
                    onChange={handleRedChange}
                >
                    {getAvailableOptions("red").map((red) => (
                        <option key={red} value={red}>
                            {`Red ${red}`}
                        </option>
                    ))}
                </select>
            </div>

            {/* Filtro por Color */}
            <div className="mb-4">
                <label className="form-label">Filtrar por Color</label>
                <select
                    multiple
                    className="form-select"
                    value={selectedColors}
                    onChange={handleColorChange}
                >
                    {getAvailableOptions("color").map((color) => (
                        <option key={color} value={color}>
                            {color.charAt(0).toUpperCase() + color.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Filtro por Grupo */}
            <div className="mb-4">
                <label className="form-label">Filtrar por Grupo</label>
                <select
                    multiple
                    className="form-select"
                    value={selectedGroups}
                    onChange={handleGroupChange}
                >
                    {getAvailableOptions("grupo").map((grupo) => (
                        <option key={grupo} value={grupo}>
                            {grupo.charAt(0).toUpperCase() + grupo.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Botón para eliminar filtros */}
            <button className="btn btn-danger mb-4" onClick={handleClearFilters}>Eliminar Filtros</button>

            <div className="row" ref={containerRef}>
                {items.map((item) => (
                    <div
                        className={`col-12 ${item === "bar" || item === "area" ? "col-sm-3" : "col-sm-9"}`}
                        key={item}
                        data-swapy-slot={item}
                    >
                        <div data-swapy-item={item}>
                            <div className="p-3 shadow-sm bg-white">
                                {item === "bar" && (
                                    <>
                                        <h6>Ventas por Producto</h6>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <BarChart data={filteredData(dataProductos)}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Bar dataKey="ventas" fill="#00C49F" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </>
                                )}
                                {item === "line" && (
                                    <>
                                        <h6>Ventas Mensuales</h6>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <LineChart data={filteredData(data)}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Line type="monotone" dataKey="ventas" stroke="#0088FE" strokeWidth={3} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </>
                                )}
                                {item === "pie" && (
                                    <>
                                        <h6>Distribución de Ventas</h6>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <PieChart>
                                                <Pie data={filteredData(dataProductos)} dataKey="ventas" cx="50%" cy="50%" outerRadius={70} label>
                                                    {filteredData(dataProductos).map((entry:any, index:any) => (
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
                                        <h6>Tendencia de Ventas</h6>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <AreaChart data={filteredData(data)}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Area type="monotone" dataKey="ventas" stroke="#28a745" fill="#28a745" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
