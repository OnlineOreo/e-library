"use client";
import React from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";

const MainNavbar = () => {
  return (
   <Navbar expand="lg" className="custom-navbar" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/" className="brand-glow">📘 eLibrary</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" className="nav-toggler" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto nav-links">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Publisher</Nav.Link>
            <Nav.Link href="#">Collection</Nav.Link>
            <Nav.Link href="#">Media</Nav.Link>
            <Nav.Link href="#">Account</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
