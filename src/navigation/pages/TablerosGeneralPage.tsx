import React, { useState, useEffect } from "react";
import { useUsers } from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Card from "react-bootstrap/Card";
import "../assets/main.css";
import { jwtDecode } from "jwt-decode";
import { ModuleDTO } from "../types";
import Back from "../components/Back";

const TablerosGeneralPage: React.FC = () => {
    const { fetchModulesWithActiveReports } = useUsers();
    const [modules, setModules] = useState<ModuleDTO[]>([]);
    const [user, setUser] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async (idUser: number) => {
            try {
                const modulesData = await fetchModulesWithActiveReports(idUser);

                setModules(modulesData);
            } catch (error) {
                console.error("Error al obtener módulos:", error);
            }
        };

        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                console.error("No se encontró el token en el almacenamiento.");
                return;
            }

            const decodedToken: any = jwtDecode(token);

            if (!decodedToken?.id || !decodedToken?.sub) {
                console.error("Token inválido o malformado.");
                return;
            }

            setUser(decodedToken.sub);
            fetchData(decodedToken.id);
        } catch (error) {
            console.error("Error al procesar el token:", error);
        }
    }, []);

    // Función para manejar clic en un módulo y navegar a su página
    const handleModuleClick = (idModule: number) => {
        navigate(`modulo/${idModule}`);
    };

    return (
        <div className="main-container">
            <NavBar user={user} />
            <div className="d-flex align-items-center justify-content-between">
                <Back />
                <div className="text-center">
                    <h4 className="text-essalud m-0">Módulos</h4>
                </div>
                <div style={{ visibility: 'hidden' }}>
                    <Back />
                </div>
            </div>
            {/* Contenedor principal */}
            <div className="container-fluid modules-container color-menu">
                {/* Cards de módulos */}
                <div className="row justify-content-center">
                    {modules.map((module) => (
                        <div key={module.idModule} className="col-12 col-md-4 mb-4 d-flex justify-content-center">
                            <Card className="module-card" onClick={() => handleModuleClick(module.idModule)}>
                                {/* Mostrar imagen si existe */}
                                {module.image && (
                                    <Card.Img
                                        variant="top"
                                        src={`data:image/png;base64,${module.image}`}
                                        alt={module.name}
                                        className="card-img"
                                    />
                                )}
                                <Card.Body>
                                    <Card.Title className="fw-bold">{module.name}</Card.Title>
                                    <Card.Text>{module.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TablerosGeneralPage;
