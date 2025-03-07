import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../assets/main.css';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="color-essalud text-light py-2">
            <Container>
                <Row>
                    <Col className="text-center">
                        <small className='d-block d-md-none fw-bold'>&copy; {currentYear} UGAS - ESSALUD</small>
                        <small className='d-none d-md-block fw-bold'>&copy; {currentYear} Unidad de Gestión y Análisis en Salud - ESSALUD</small>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;