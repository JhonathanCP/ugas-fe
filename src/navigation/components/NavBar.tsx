import React from 'react';
import { Container, Navbar, Offcanvas, Nav, Image } from 'react-bootstrap';
import { Person, BoxArrowLeft, FileEarmarkBarGraphFill, BarChartLineFill, FolderSymlinkFill, HouseDoorFill, FileExcelFill } from 'react-bootstrap-icons';
import { NavLink, useLocation } from 'react-router-dom'; // Importar NavLink y useLocation
import Logo from "../../assets/logo-essalud.png";
import logoUgas from "../../assets/logo-ugas.png";
import DashboardSearchBar from './DashboardSearchBar'; // Importa el nuevo componente
import '../assets/main.css';

interface NavBarProps {
    user: string;
}

const NavBar: React.FC<NavBarProps> = ({ user }) => {
    const location = useLocation(); // Obtener la ruta actual

    return (
        <Navbar expand={false} className="navbar-essalud" data-bs-theme="light">
            <Container fluid>
                <Navbar.Toggle aria-controls="offcanvasNavbar-expand-false" className="custom-navbar-toggle" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar-expand-false"
                    aria-labelledby="offcanvasNavbarLabel-expand-false"
                    placement="start"
                >
                    <Offcanvas.Header closeButton className='color-header-menu custom-close-button'>
                        <Offcanvas.Title id="offcanvasNavbarLabel-expand-false" className='color-header-menu-text'>
                            <Person className="me-2 color-header-menu-text"></Person> <span className="color-header-menu-text">{user}</span>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="d-flex flex-column justify-content-between color-menu">
                        <Nav className="flex-column pe-3">
                            <Nav.Link as={NavLink} to="/home" className={`nav-link-custom ${location.pathname === "/home" ? "active" : ""}`}>
                                <HouseDoorFill className="me-2" /> Inicio
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/tableros" className={`nav-link-custom ${location.pathname === "/tableros" ? "active" : ""}`}>
                                <BarChartLineFill className="me-2" /> Dashboards
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/reportes" className={`nav-link-custom ${location.pathname === "/reportes" ? "active" : "disabled"}`}>
                                <FileExcelFill className="me-2" /> Reportes (En proceso)
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/archivos" className={`nav-link-custom ${location.pathname === "/archivos" ? "active" : "disabled"}`}>
                                <FolderSymlinkFill className="me-2" /> Archivos (En proceso)
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/archivos" className={`nav-link-custom ${location.pathname === "/archivos" ? "active" : ""}`}>
                                <BoxArrowLeft className="me-2" /> Cerrar Sesión
                            </Nav.Link>
                        </Nav>

                        {/* Footer pegado abajo */}
                        <div className="footer-nav">
                            <Image src={Logo} alt="Logo ESSALUD" fluid className="logo-essalud" />
                            <div className="logo-divider2"></div>
                            <div className="logo-ugas-container">
                                <Image src={logoUgas} alt="Logo UGAS" fluid className="logo-ugas" />
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                <div className="d-flex d-md-none col-4 justify-content-end">
                    {location.pathname.startsWith("/tableros") && (
                        <DashboardSearchBar placeholder="Buscar tablero..." />
                    )}
                </div>
                <div className="d-none d-md-flex offset-4 col-6 justify-content-end">
                    {location.pathname.startsWith("/tableros") && (
                        <DashboardSearchBar placeholder="Buscar tablero..." />
                    )}
                </div>
                <Navbar.Brand href="/home" className="d-flex align-items-center">
                    <Image src={Logo} alt="Logo ESSALUD" fluid className="logo-essalud" />
                    <div className="logo-divider2"></div>
                    <div className="logo-ugas-container">
                        <Image src={logoUgas} alt="Logo UGAS" fluid className="logo-ugas" />
                    </div>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default NavBar;