"use client";
import { Suspense } from 'react';
import './dynamic.css';
import MainNavbar from "./Component/landing-page/Navbar";
import SearchBar from './Component/landing-page/SearchBar';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Footer from './Component/landing-page/Footer';

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <MainNavbar />
      </Suspense>

      <section className="hero-section">
      <Container className="text-center text-white">
        <Row className="justify-content-center align-items-center min-vh-90">
          <Col md={10} lg={8} className='mb-5'>
            <h1 className="display-4 fw-bold mb-3">
              Welcome to <span className="highlight">eLibrary</span>
            </h1>
            <p className="lead mb-4">
              Explore millions of books, journals, and media — right at your fingertips.
            </p>
             <Suspense fallback={<div>Loading Navbar...</div>}>
              <SearchBar />
            </Suspense>
          </Col>
        </Row>
      </Container>
    </section>
    <Footer/>
    </>
  );
}
