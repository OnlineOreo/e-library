"use client"
import '../search.css';
import { Container, Row, Col, Form, Card, Button, InputGroup, Nav, Modal } from 'react-bootstrap';
import { PiBookOpenTextFill } from "react-icons/pi";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa6";
// import { IoMdCloudDownload } from "react-icons/io";
import { FaSearch, FaShareAlt, FaRegBookmark, FaFileDownload } from "react-icons/fa";
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";

import CatalogGridCard from '../components/CatalogGridCard';
import CatalogListCard from '../components/CatalogListCard';
import CatalogDetailModal from '../components/CatalogDetailModal';
import GridViewSkelton from '../components/GridViewSkelton';
import { useSearchParams } from 'next/navigation';





export default function printCollection() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const instituteId = useSelector((state) => state.institute.instituteId);
    const [gridView, setGridView] = useState(true);
    const [results, setResults] = useState([]);
    const [resultsCount, setResultsCount] = useState(0);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [selectCatalog, setSelectCatalog] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const getToken = () => {
        const cookieString = document.cookie
            .split("; ")
            .find((row) => row.startsWith("access_token="));

        return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
    };

    const filter_type = searchParams.get('filter_type') || "datacite_titles";
    const search_text = searchParams.get('search_text') || ""
    console.log(filter_type,search_text);
    

    const loadPCollectionData = async () => {
        const solrUrl = `http://5.135.139.104:8983/solr/Print-collection/select?indent=true&q.op=OR&q=${filter_type}%3A%22${search_text}%22&rows=15`;
        try {
            const response = await axios.get(`${solrUrl}`);
            const solrJson = response.data.response
            const results = solrJson.docs
            setResultsCount(solrJson.numFound);
            setResults(results);
            console.log(solrJson);
        } catch (error) {
            console.error("Axios Error:", error);
        } finally {
            setIsLoading(false)
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
                    <Col md={9} className='pe-0 ps-4'>
                        <Row className="mb-3">
                            <Col md={6}>
                                <p>Showing <strong>{ resultsCount }</strong> results for <strong>data</strong></p>
                            </Col>
                            <Col md={6}>
                                <div className="d-flex align-items-center">
                                    <InputGroup>
                                        <Form.Control placeholder="Search..." />
                                        <Button variant="outline-secondary"><FaSearch /></Button>
                                    </InputGroup>
                                    <BsFillGrid3X3GapFill size={40} className={`border p-1 curser_pointer rounded mx-2 ${gridView === true ? "active_result_view" : ""}`} onClick={() => { setGridView(true) }} />
                                    <FaListUl size={40} className={`border p-1 curser_pointer rounded ${gridView === false ? "active_result_view" : ""}`} onClick={() => setGridView(false)} />
                                </div>
                            </Col>
                        </Row>
                        {gridView ? (
                            <Row id='grid-view' className={`grid-view `}>
                                {isLoading ? (
                                    Array.from({ length: 6 }).map((_, index) => (
                                        <Col md={4} key={index} className='mb-4'>
                                           <GridViewSkelton/>
                                        </Col>
                                    ))
                                ) : (
                                    results.map((item) => (
                                        <Col md={4} key={item.id} className="mb-4">
                                            <CatalogGridCard
                                                id={item.id}
                                                datacite_title={item.datacite_titles}
                                                datacite_creators={item.datacite_creators}
                                                dc_date={item.dc_date}
                                                publisher={item.dc_publishers?.[0] || "Unkown Publisher"}
                                                subject={item.datacite_subject?.[0]}
                                                description={item.description}
                                                uploader={item.uploader}
                                                url={item.url}
                                                onShow={handleShow}
                                                onSelect={() => setSelectCatalog(item)}
                                            />
                                        </Col>
                                    )))}
                            </Row>
                        ) : (
                            <Row id='list-view' className={`list-view`}>
                                {results.map((item) => (
                                    <Col md={12} key={item.id} className="mb-4">
                                        <CatalogListCard
                                            id={item.id}
                                            datacite_title={item.datacite_titles}
                                            datacite_creators={item.datacite_creators}
                                            dc_date={item.dc_date}
                                            publisher={item.dc_publishers?.[0] || "Unkown Publisher"}
                                            subject={item.datacite_subject?.[0]}
                                            description={item.description}
                                            uploader={item.uploader}
                                            url={item.url}
                                            onShow={handleShow}
                                            onSelect={() => setSelectCatalog(item)}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Col>
                </Row>
            </Container>

            <CatalogDetailModal
                modalShow={show}
                handleClose={handleClose}
                {...selectCatalog}
            />
        </>
    );
}
