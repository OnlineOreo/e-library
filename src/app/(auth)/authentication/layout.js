'use client'
import Footer from '@/app/Component/landing-page/Footer';
import Navbar from '@/app/Component/landing-page/Navbar';
// import node module libraries
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AuthLayout({ children }) {
  return (
    <div className='bg-light'>
      <Container className="d-flex flex-column">
          {children}
      </Container>
    </div>
  )
}
