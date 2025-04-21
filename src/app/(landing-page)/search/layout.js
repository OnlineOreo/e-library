'use client';

import { Suspense } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SolrSearchNav from './components/SolrSearchNav';

export default function Layout({ children }) {
    return (
        <div>
            <Suspense fallback={<div className="text-center py-5">Loading search results...</div>}>
                <Container className="mt-4 px-4">
                    <Row className="mb-4">
                        <Col md={12} className="p-3 border rounded d-flex justify-content-center gap-5">
                            <SolrSearchNav />
                        </Col>
                    </Row>
                </Container>
            </Suspense>
            {children}
        </div>
    );
}
