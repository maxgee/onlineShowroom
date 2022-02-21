import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Seventy1 from '../imgs/71Logo.png'



const Navigation = () =>(
<Navbar bg="light" variant="light">
    <Container>
        <Navbar.Brand href="/">Seventy-1 Auto</Navbar.Brand>
        <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/cars">Cars</Nav.Link>
        <Nav.Link href="/service">Service</Nav.Link>
        <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>
    </Container>
  </Navbar>
);


export default Navigation; 