'use client'
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
