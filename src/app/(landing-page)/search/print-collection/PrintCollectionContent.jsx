"use client";

import { Container, Row, Col, Button, Spinner, Form, InputGroup } from 'react-bootstrap';
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl, FaSearch } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation";

import CatalogGridCard from '../components/CatalogGridCard';
import CatalogListCard from '../components/CatalogListCard';
import GridViewSkelton from '../components/GridViewSkelton';
import SearchSideFilter from '../components/SearchSideFilter';
import CatalogDetailModal from '../components/CatalogDetailModal';
// Import the server action
import { loadMoreResults } from '../print-collection/page';

export default function PrintCollectionContent({
    initialResults,
    initialResultsCount,
    initialSideFilterResults,
    searchQuery
}) {
    const Router = useRouter();
    const searchParams = useSearchParams();
    const urlParams = searchParams.get("q");

    // Use state with initialization from props
    const [gridView, setGridView] = useState(true);
    const [searchWithinSearch, setSearchWithinSearch] = useState("")
    const [results, setResults] = useState([]);
    const [resultsCount, setResultsCount] = useState(0);
    const [sideFilterResults, setSideFilterResults] = useState({});
    const [show, setShow] = useState(false);
    const [selectCatalog, setSelectCatalog] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [isClient, setIsClient] = useState(false);

    // Initialize state from props after hydration
    useEffect(() => {
        setIsClient(true);
        setResults(initialResults || []);
        setResultsCount(initialResultsCount || 0);
        setSideFilterResults(initialSideFilterResults || {});
        setStartIndex(initialResults?.length || 0);
    }, [initialResults, initialResultsCount, initialSideFilterResults]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Load more results using server action
    const handleLoadMore = async () => {
        if (!urlParams) return;

        setIsLoading(true);
        const nextStart = startIndex;

        try {
            // Call the server action instead of making direct API call
            const data = await loadMoreResults(urlParams, nextStart);

            const newDocs = data.results || [];

            // Append new results to existing ones
            setResults(prevResults => [...prevResults, ...newDocs]);
            setStartIndex(nextStart + newDocs.length);

        } catch (error) {
            console.error("Load More Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // When URL params change, reset to the initial server-fetched data
    useEffect(() => {
        if (isClient && urlParams !== searchQuery) {
            // If URL changed but we haven't received new props yet,
            // reload the page to get new server data
            Router.refresh();
        }
    }, [urlParams, searchQuery, Router, isClient]);

    const handelSearchWithinSearch = (e) => {
        e.preventDefault()
        const searchText = searchWithinSearch;
        // console.log(searchText);
        Router.push(`?q=${urlParams}%20AND%20datacite_titles%3A(${searchText})`);
    }

    return (
        <Container className="px-4 text-secondary">
            <Row>
                <Col md={3} className="px-0 bg-white">
                    <SearchSideFilter {...sideFilterResults} catalogCore={"print-collection"} />
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
                            {!isClient || (!results.length && !isLoading) ? (
                                Array.from({ length: 6 }).map((_, index) => (
                                    <Col md={4} key={`initial-skeleton-${index}`} className='mb-4'>
                                        <GridViewSkelton />
                                    </Col>
                                ))
                            ) : results.length > 0 ? (
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
                            ) : (
                                <Col md={12} className="text-center text-muted py-5">
                                    <h5>No data found.</h5>
                                </Col>
                            )}
                            {isLoading && isClient && (
                                Array.from({ length: 3 }).map((_, index) => (
                                    <Col md={4} key={`loading-skeleton-${index}`} className='mb-4'>
                                        <GridViewSkelton />
                                    </Col>
                                ))
                            )}
                        </Row>
                    ) : (
                        <Row id='grid-view' className={`grid-view`}>
                            {(!isClient || (!results.length && !isLoading)) ? (
                                Array.from({ length: 6 }).map((_, index) => (
                                    <Col md={4} key={`initial-skeleton-${index}`} className='mb-4'>
                                        <GridViewSkelton />
                                    </Col>
                                ))
                            ) : (
                                results.map((item) => (
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
                                ))
                            )}
                            {isLoading && isClient && (
                                Array.from({ length: 3 }).map((_, index) => (
                                    <Col md={4} key={`loading-skeleton-${index}`} className='mb-4'>
                                        <GridViewSkelton />
                                    </Col>
                                ))
                            )}
                        </Row>
                    )}
                    <div className='d-flex justify-content-center my-5'>
                        {isClient && results.length > 0 && results.length < resultsCount && (
                            <Button
                                variant='success'
                                style={{ width: "100%", padding: "10px" }}
                                onClick={handleLoadMore}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                ) : "Load More"}
                            </Button>
                        )}
                    </div>
                </Col>
            </Row>
            {isClient && (
                <CatalogDetailModal
                    modalShow={show}
                    handleClose={handleClose}
                    {...selectCatalog}
                />
            )}
        </Container>
    );
}