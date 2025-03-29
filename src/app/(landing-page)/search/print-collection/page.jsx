"use client"
import '../search.css'; 
import { Container, Row, Col, Form, Card, Button, InputGroup, Nav } from 'react-bootstrap';
import { PiBookOpenTextFill } from "react-icons/pi";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa6";
// import { IoMdCloudDownload } from "react-icons/io";
import { FaSearch, FaShareAlt, FaRegBookmark, FaFileDownload } from "react-icons/fa";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import CatalogGridCard from '../components/CatalogGridCard';
import CatalogListCard from '../components/CatalogListCard';


import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";

// import Navbar from '../Component/landing-page/Navbar';


export default function printCollection() {
    const router = useRouter();
    const instituteId = useSelector((state) => state.institute.instituteId);
    const [gridView, setGridView] = useState(true);

    const getToken = () => {
        const cookieString = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="));
    
        return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
      };

      const loadPCollectionData = async () => {
        const token = getToken();
        if (!token) {
          router.push("/authentication/sign-in");
          return;
        }
    
        try {
          const response = await axios.get(
            `http://5.135.139.104:8983/solr/Print-collection/select?indent=true&q.op=OR&q=datacite_titles%3A%22indian%20history%22&rows=15`,
            { headers: { Authorization: `${token}` } }
          );
    
          if (response.status === 200) {
            console.log(response.data);
          }
        } catch (error) {
          console.error("Axios Error:", error);
        }
      };
    
      useEffect(() => {
        loadPCollectionData();
      }, [router])
    


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
                                    <BsFillGrid3X3GapFill size={40} className={`border p-1 curser_pointer rounded mx-2 ${gridView === true ? "active_result_view" : ""}`} onClick={()=>{setGridView(true)}}/>
                                    <FaListUl size={40} className={`border p-1 curser_pointer rounded ${gridView === false ? "active_result_view" : ""}`} onClick={()=>setGridView(false)}/>
                                </div>
                            </Col>
                        </Row>

                        <Row id='grid-view' className={`grid-view ${gridView === false ? "d-none" : ""}`}>
                            {[...Array(6)].map((_, idx) => (
                                <Col md={4} key={idx} className="mb-4">
                                    <CatalogGridCard
                                    datacite_title = "Book Title"
                                    datacite_creators = "Shristi Sharma"
                                    dc_date= "2017"
                                    publisher= "XYZ Publications"
                                    isbn="123-456-789"
                                    genre="Fiction"
                                    language= "English"
                                   /> 
                                </Col>
                            ))}
                        </Row>
                        <Row id='list-view' className={`list-view ${gridView === true ? "d-none" : ""}`}>
                            {[...Array(6)].map((_, idx) => (
                                <Col md={12} key={idx} className="mb-4">
                                    <CatalogListCard
                                    datacite_title = "Book Title"
                                    datacite_creators = "Shristi Sharma"
                                    dc_date= "2017"
                                    publisher= "XYZ Publications"
                                    isbn="123-456-789"
                                    genre="Fiction"
                                    language= "English"
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
