import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import './search.css';
export default function Layout({ children }) {
    return (
        <div>
            <Container className='mt-4 px-4'>
                <Row className='mb-4'>
                    <Col md={12} className='p-3 border rounded d-flex justify-content-center gap-5'>
                        <Link href={"/search/print-collection"} className='curser_pointer search_nav active_nav'>Print Collection</Link>
                        <Link href={"/search/e-collection"} className='curser_pointer search_nav'>E Collection</Link>
                        <Link href={"/search/e-resources"} className='curser_pointer search_nav'>E Resources</Link>
                        <Link href={"/search/multimedia"} className='curser_pointer search_nav'>Multimedia</Link>
                    </Col>
                </Row>
            </Container>
            {children}
        </div>
    );
}