import React, { useState, useEffect } from "react";
import { useModules } from "../hooks/useModules";
import { useUsers } from "../hooks/useUsers";
import { useNavigate, useParams } from "react-router-dom"; // Importamos Link
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Card from "react-bootstrap/Card";
import "../assets/main.css";
import { jwtDecode } from "jwt-decode";
import { ReportDTO } from "../types";
import Back from "../components/Back";

const TablerosModuloPage: React.FC = () => {
    const { fetchActiveReportsFromModule } = useUsers();
    const { module, fetchModuleById } = useModules();
    const [reports, setReports] = useState<ReportDTO[]>([]);
    const [user, setUser] = useState<string>("");
    const navigate = useNavigate();
    const { idModule } = useParams<{ idModule: string }>(); // Extraer el idModule de la URL

    useEffect(() => {
        const fetchData = async (idUser: number, idModule: number) => {
            try {
                const reportsData = await fetchActiveReportsFromModule(idUser, idModule);
                await fetchModuleById(idModule);
                setReports(reportsData);
            } catch (error) {
                console.error("Error al obtener reportes:", error);
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

            if (idModule) {
                fetchData(decodedToken.id, parseInt(idModule)); // Convertimos idModule a número
            }
        } catch (error) {
            console.error("Error al procesar el token:", error);
        }
    }, [idModule]); // Se ejecuta cuando cambia idModule

    // Función para manejar clic en un módulo y navegar a su página
    const handleModuleClick = (idReport: number) => {
        navigate(`dashboard/${idReport}`);
    };

    return (
        <div className="main-container">
            <NavBar user={user} />
            <div className="d-flex align-items-center justify-content-between">
                <Back />
                <div className="text-center">
                    <h4 className="text-essalud m-0">{module?.name}</h4>
                </div>
                <div style={{ visibility: 'hidden' }}>
                    <Back />
                </div>
            </div>
            {/* Contenedor principal */}
            <div className="container-fluid modules-container color-menu">
                {/* Cards de módulos */}
                <div className="row justify-content-center">
                    {reports.map((report) => (
                        <div key={report.idReport} className="col-12 col-md-4 mb-4 d-flex justify-content-center">
                            <Card className="module-card" onClick={() => handleModuleClick(report.idReport)}>
                                {/* Mostrar imagen si existe */}
                                {report.image && (
                                    <Card.Img
                                        variant="top"
                                        src={`data:image/png;base64,${report.image}`}
                                        alt={report.name}
                                        className="card-img"
                                    />
                                )}
                                <Card.Body>
                                    <Card.Title className="fw-bold">{report.name}</Card.Title>
                                    <Card.Text>{report.description}</Card.Text>
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

export default TablerosModuloPage;