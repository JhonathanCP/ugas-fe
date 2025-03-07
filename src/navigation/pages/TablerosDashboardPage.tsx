import React, { useState, useEffect } from "react";
import { useReports } from "../hooks/useReports";
import { useParams } from "react-router-dom"; 
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "../assets/main.css";
import "../assets/bi-frame.css";
import { jwtDecode } from "jwt-decode";
import Back from "../components/Back";

const TablerosDashboardPage: React.FC = () => {
    const { report, fetchReportById } = useReports(); // Usamos report en singular
    const [user, setUser] = useState<string>("");
    const { idReport } = useParams<{ idReport: string }>(); // Extraer idReport de la URL

    useEffect(() => {
        const fetchData = async (idReport: number) => {
            await fetchReportById(idReport);
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

            if (idReport) {
                fetchData(parseInt(idReport)); // Convertimos idReport a número
            }
        } catch (error) {
            console.error("Error al procesar el token:", error);
        }
    }, [idReport]);

    return (
        <div className="main-container">
            <NavBar user={user} />
            <div className="d-flex align-items-center justify-content-between arrowback-bi mt-5 pt-4">
                <Back/>
            </div>
            {/* Mostrar el reporte */}
            <div className="bi-frame-container">
                {report ? (
                    <>
                        {report.url ? (
                            <iframe key={report.idReport} src={report.url} className="bi-frame"></iframe>
                        ) : (
                            <p>No hay un Power BI disponible para este reporte.</p>
                        )}
                    </>
                ) : (
                    <p>Cargando reporte...</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default TablerosDashboardPage;