import React from 'react';
import { Container, Navbar, Offcanvas, Nav, NavDropdown, Image } from 'react-bootstrap';
import Logo from "../../assets/logo-essalud.png";
import logoUgas from "../../assets/logo-ugas.png";
import '../assets/main.css';

interface NavBarProps {
    user: string;
    modules: Array<{
        name: string;
        reports: Array<string>;
    }>;
}

const NavBar: React.FC<NavBarProps> = ({ user, modules }) => {
    return (
        <Navbar key='false' expand='false' className="navbar-essalud" data-bs-theme="light">
            <Container fluid>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-false`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-false`}
                    placement="start"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                            {user}
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="/main">Inicio</Nav.Link>
                            {modules.map((module, index) => (
                                <NavDropdown
                                    key={index}
                                    title={module.name}
                                    id={`offcanvasNavbarDropdown-expand-false-${index}`}
                                >
                                    {module.reports.map((report, reportIndex) => (
                                        <NavDropdown.Item key={reportIndex} href="#action3">
                                            {report}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            ))}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                <Navbar.Brand href="/main" className="d-flex align-items-center">
                    <Image
                        src={Logo}
                        alt="Logo ESSALUD"
                        fluid
                        className="logo-essalud"
                    />
                    <div className="logo-divider2"></div>
                    <div className="logo-ugas-container">
                        <Image
                            src={logoUgas}
                            alt="Logo UGAS"
                            fluid
                            className="logo-ugas"
                        />
                    </div>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default NavBar;