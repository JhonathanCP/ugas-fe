import React from "react";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../assets/main.css";

const Back: React.FC = () => {
    const navigate = useNavigate(); // Define la función de navegación

    return (
        <ArrowLeftCircle
            className="ms-3 mt-2 text-essalud arrowback"
            size={30}
            onClick={() => navigate(-1)} // Añade el onClick para navegar hacia atrás
        />
    );
};

export default Back;