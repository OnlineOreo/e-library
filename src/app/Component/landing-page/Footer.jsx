import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        <Row>
          <Col md={4}>
            <h4 className="footer-logo">📚 eLibrary</h4>
            <p className="footer-description">
              Your digital reading companion. Access thousands of books, articles, and media instantly.
            </p>
          </Col>

          <Col md={2}>
            <h5>Explore</h5>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Publisher</a></li>
              <li><a href="#">Collection</a></li>
              <li><a href="#">Media</a></li>
            </ul>
          </Col>

          <Col md={3}>
            <h5>Contact</h5>
            <ul className="footer-links">
              <li>Email: support@elibrary.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: Noida, India</li>
            </ul>
          </Col>

          <Col md={3}>
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-github"></i></a>
            </div>
          </Col>
        </Row>
        <hr className="footer-line" />
        <p className="text-center copyright">
          © {new Date().getFullYear()} eLibrary. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
