"use client"
import '../search.css'; 
import { Container, Row, Col, Form, Card, Button, InputGroup, Nav } from 'react-bootstrap';
import { PiBookOpenTextFill } from "react-icons/pi";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa6";
// import { IoMdCloudDownload } from "react-icons/io";
import { FaSearch, FaShareAlt, FaRegBookmark, FaFileDownload } from "react-icons/fa";
import { useState } from 'react';
import Link from 'next/link';

// import Navbar from '../Component/landing-page/Navbar';


export default function LibraryPage() {
    const [gridView, setGridView] = useState(true);


    return (
        <>
            <Container className="px-4 text-secondary">
                <Row>
                    {/* Sidebar Filters */}
                    <Col md={3} className="px-0 border rounded bg-white">
                        {/* Filter Header */}
                        <div className="text-center py-3 border-bottom bg-light">
                            <h5 className="fw-bold mb-0">Filter</h5>
                        </div>
                        {/* Filter Content */}
                        <div className="filters">
                            <Form>
                                {/* Source Filter */}
                                <Form.Group className="border-bottom p-3">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <Form.Label className="fw-bold mb-0">Publishers</Form.Label>
                                        <a href="#" className="text-success small">View All</a>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Form.Check type="checkbox" label="Gurgaon" />
                                        <span className="text-secondary">120</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Form.Check type="checkbox" label="Delhi" />
                                        <span className="text-secondary">53</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Form.Check type="checkbox" label="Lucknow" />
                                        <span className="text-secondary">20</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Form.Check type="checkbox" label="New Delhi" />
                                        <span className="text-secondary">20</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Form.Check type="checkbox" label="New Jersey" />
                                        <span className="text-secondary">4</span>
                                    </div>
                                </Form.Group>

                                {/* Access Type */}
                                <Form.Group className="border-bottom p-3">
                                    <Form.Label className="fw-bold mb-2">Access Type</Form.Label>
                                    <div className="d-flex justify-content-between">
                                        <Form.Check type="checkbox" label="Subscribe" />
                                        <span className="text-secondary">00</span>
                                    </div>
                                </Form.Group>

                                {/* Content */}
                                <Form.Group className="border-bottom p-3">
                                    <Form.Label className="fw-bold mb-2">Content</Form.Label>
                                    <div className="d-flex justify-content-between">
                                        <Form.Check type="checkbox" label="Book" defaultChecked />
                                        <span className="text-secondary">268</span>
                                    </div>
                                </Form.Group>

                                {/* Author Filter */}
                                <Form.Group className="border-bottom p-3">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <Form.Label className="fw-bold mb-0">Authors</Form.Label>
                                        <a href="#" className="text-success small">View All</a>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Form.Check type="checkbox" label="M.P. Jain" />
                                        <span className="text-secondary">42</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Form.Check type="checkbox" label="K.D. Gaur" />
                                        <span className="text-secondary">34</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Form.Check type="checkbox" label="Ishwari Prasad" />
                                        <span className="text-secondary">31</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Form.Check type="checkbox" label="B.M. Gandhi" />
                                        <span className="text-secondary">20</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Form.Check type="checkbox" label="M.P. Singh" />
                                        <span className="text-secondary">20</span>
                                    </div>
                                </Form.Group>

                                {/* Publish Year */}
                                <Form.Group className='border-bottom p-3'>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <Form.Label className="fw-bold mb-0">Publish Year</Form.Label>
                                        <a href="#" className="text-success small">View All</a>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Form.Check type="checkbox" label="2024" />
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Form.Check type="checkbox" label="2023" />
                                    </div>
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>

                    {/* Main Content */}
                    <Col md={9}>
                        <Row className="mb-3">
                            <Col md={6}>
                                <p>Showing <strong>268</strong> results for <strong>data</strong></p>
                            </Col>
                            <Col md={6}>
                                <div className="d-flex align-items-center">
                                    <InputGroup>
                                        <Form.Control placeholder="Search..." />
                                        <Button variant="outline-secondary"><FaSearch /></Button>
                                    </InputGroup>
                                    <BsFillGrid3X3GapFill size={40} className={`border p-1 curser_pointer rounded mx-2 ${gridView == true ? "active_result_view" : ""}`} onClick={()=>{setGridView(true)}}/>
                                    <FaListUl size={40} className={`border p-1 curser_pointer rounded ${gridView == false ? "active_result_view" : ""}`} onClick={()=>setGridView(false)}/>
                                </div>
                            </Col>
                        </Row>

                        <Row id='grid-view' className={`grid-view ${gridView == false ? "d-none" : ""}`}>
                            {[...Array(6)].map((_, idx) => (
                                <Col md={4} key={idx} className="mb-4">
                                    <Card>
                                        <div className="image text-center">
                                            <PiBookOpenTextFill size={170} className='text-secondary' />
                                        </div>
                                        <Card.Body className='text-secondary'>
                                            <div className='fw-bold'>Book Title</div>
                                            <div>Author Name</div>
                                            <div>2024</div>
                                            <div className='d-flex my-3'>
                                                <FaShareAlt size={20} className='me-3' />
                                                <FaFileDownload size={20} className='me-3' />
                                                <FaRegBookmark size={20} className='me-3' />
                                            </div>
                                            <div className="mt-2 d-flex">
                                                <Button variant="success" className="me-2 w-50 py-2">READ</Button>
                                                <Button variant="outline-secondary w-50 py-2">DETAILS</Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <Row id='list-view' className={`list-view ${gridView == true ? "d-none" : ""}`}>
                            {[...Array(6)].map((_, idx) => (
                                <Col md={12} key={idx} className="mb-4">
                                    <Card>
                                        <Row>
                                            <Col md={3} className="image text-center">
                                                <PiBookOpenTextFill size={170} className='text-secondary' />
                                            </Col>
                                            <Col md={9}>
                                                <Card.Body className='text-secondary'>
                                                    <div className='fw-bold'>Book Title</div>
                                                    <div>Author Name</div>
                                                    <div>2024</div>
                                                    <div className="mt-3 d-flex align-items-center">
                                                        <Button variant="success" className="me-2 py-2" style={{width:"100px"}}>READ</Button>
                                                        <Button variant="outline-secondary py-2 mx-2" style={{width:"100px"}}>DETAILS</Button>
                                                        <FaShareAlt size={20} className='me-3' />
                                                        <FaFileDownload size={20} className='me-3' />
                                                        <FaRegBookmark size={20} className='me-3' />
                                                    </div>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
