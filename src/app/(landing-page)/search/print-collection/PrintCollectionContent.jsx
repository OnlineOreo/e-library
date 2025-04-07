"use client";

import { useState } from 'react';
import { Container, Row, Col, Form, Card, Button, InputGroup, Spinner } from 'react-bootstrap';
import CatalogGridCard from '../components/CatalogGridCard';
import GridViewSkelton from '../components/GridViewSkelton';
import SearchSideFilter from '../components/SearchSideFilter';
import CatalogDetailModal from '../components/CatalogDetailModal';
import CatalogListCard from '../components/CatalogListCard';
import axios from 'axios';

import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl, FaSearch } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

function PrintCollectionContent({ initialResults, initialCount, initialSideFilter, initialQuery }) {

    const [results, setResults] = useState(initialResults);
    const [resultsCount, setResultsCount] = useState(initialCount);
    const [sideFilterResults] = useState(initialSideFilter);
    const [isLoading, setIsLoading] = useState(false);
    const [startIndex, setStartIndex] = useState(initialResults.length);
    const [show, setShow] = useState(false);
    const [selectCatalog, setSelectCatalog] = useState(null);

    const [gridView, setGridView] = useState(true);
    const [searchWithinSearch, setSearchWithinSearch] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLoadMore = async () => {
        setIsLoading(true);
        const nextStart = startIndex + 15;
        setStartIndex(nextStart);

        const solrUrl = `${process.env.NEXT_PUBLIC_SOLR_BASE_URL}/solr/Print-collection/select?indent=true&q.op=OR&q=${initialQuery}&rows=15&start=${nextStart}`;
        try {
            const response = await axios.get(solrUrl);
            const docs = response.data.response.docs || [];
            setResults(prev => [...prev, ...docs]);
        } catch (err) {
            console.error("Load More Error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handelSearchWithinSearch = (e) => {
        e.preventDefault();
    }

    return (
        <Container className="px-4 text-secondary">
            <Row>
                <Col md={3} className="px-0 border rounded bg-white">
                    <SearchSideFilter {...sideFilterResults} />
                </Col>
                <Col md={9} className='pe-0 ps-4'>
                    <Row className="mb-3">
                        <Col md={6}>
                            <p>Showing <strong>{resultsCount}</strong> results from data</p>
                        </Col>
                        <Col md={6}>
                            <div className="d-flex align-items-center justify-content-end">
                                <Form onSubmit={handelSearchWithinSearch}>
                                    <InputGroup>
                                        <Form.Control placeholder="Search..." onChange={(e) => setSearchWithinSearch(e.target.value)} value={searchWithinSearch} />
                                        <Button type='submit' variant="outline-secondary" ><FaSearch /></Button>
                                    </InputGroup>
                                </Form>
                                <BsFillGrid3X3GapFill
                                    size={40}
                                    className={`border p-1 cursor_pointer rounded mx-2 ${gridView ? "active_result_view" : ""}`}
                                    onClick={() => setGridView(true)}
                                />
                                <FaListUl
                                    size={40}
                                    className={`border p-1 cursor_pointer rounded ${!gridView ? "active_result_view" : ""}`}
                                    onClick={() => setGridView(false)}
                                />
                            </div>
                        </Col>
                    </Row>
                    {gridView ? (
                        <Row id='grid-view' className={`grid-view`}>
                            {isLoading ? (
                                Array.from({ length: 6 }).map((_, index) => (
                                    <Col md={4} key={index} className='mb-4'>
                                        <GridViewSkelton />
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
                                            publisher={item.dc_publishers?.[0] || "Unknown Publisher"}
                                            subject={item.datacite_subject?.[0]}
                                            description={item.description}
                                            uploader={item.uploader}
                                            url={item.url}
                                            onShow={handleShow}
                                            onSelect={() => setSelectCatalog(item)}
                                        />
                                    </Col>
                                ))
                            )}
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
                                        publisher={item.dc_publishers?.[0] || "Unknown Publisher"}
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
                    <div className='d-flex justify-content-center mt-4'>
                        {results.length < resultsCount && (
                            <Button variant='success' style={{ width: "100%", padding: "10px" }} onClick={handleLoadMore} disabled={isLoading}>
                                {isLoading ? (<Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>) : "Load More"}
                            </Button>
                        )}
                    </div>
                </Col>
            </Row>
            <CatalogDetailModal modalShow={show} handleClose={handleClose} {...selectCatalog} />
        </Container>
    );
}

export default PrintCollectionContent;
