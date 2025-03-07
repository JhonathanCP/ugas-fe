import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Carousel from "react-bootstrap/Carousel";
import "../assets/main.css";
import { jwtDecode } from "jwt-decode";
import Loading from "../components/Loading";

const HomePage: React.FC = () => {
    const [user, setUser] = useState<string>("");
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        try {
            const token = localStorage.getItem("access_token");
            if (!token) return;
            const decodedToken: any = jwtDecode(token);
            setUser(decodedToken?.sub || "");
        } catch (error) {
            console.error("Error al procesar el token:", error);
        }
    }, []);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await fetch("/api/institucion/essalud/campañas", {
                    cache: "no-store",
                });
                const htmlText = await response.text();
        
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlText, "text/html");
        
                const campaignItems = doc.querySelectorAll("ul.js-campaigns-search-results.row > li");
        
                const campaignsData = Array.from(campaignItems)
                    .slice(0, 3)
                    .map((item) => {
                        const titleElement = item.querySelector("h3 a");
                        const imgElement = item.querySelector("img");
                        const dateElement = item.querySelector("time");
        
                        return {
                            title: titleElement ? titleElement.textContent?.trim() : "",
                            image: imgElement ? imgElement.getAttribute("src") : "",
                            date: dateElement ? dateElement.textContent?.trim() : "",
                            link: titleElement ? titleElement.getAttribute("href") : "",
                        };
                    });
        
                setCampaigns(campaignsData);
            } catch (error) {
                console.error("Error al obtener campañas:", error);
            }
        };       

        fetchCampaigns();
    }, []);

    return (
        <div className="main-container">
            <NavBar user={user} />
            <h4 className="text-essalud text-center pt-2">Bienvenido {user}</h4>
            <div className="carousel-container">                
                <Carousel fade activeIndex={activeIndex} onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}  variant="dark">
                    {campaigns.length > 0 ? (
                        campaigns.map((campaign, index) => (
                            <Carousel.Item key={index}>
                                <img src={campaign.image} alt={campaign.title} className="d-block w-100" />
                            </Carousel.Item>
                        ))
                    ) : (
                        <Loading />
                    )}
                </Carousel>

                {campaigns.length > 0 && (
                    <div className="text-container">
                        <h3 className="text-essalud">{campaigns[activeIndex]?.title}</h3>
                        {/* <p>{campaigns[activeIndex]?.date}</p> */}
                        <a href={`https://www.gob.pe${campaigns[activeIndex]?.link}`} target="_blank" rel="noopener noreferrer">
                            Leer más
                        </a>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
