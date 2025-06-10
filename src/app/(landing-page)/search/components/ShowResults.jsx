"use client";

import { Suspense } from 'react';
import { Row, Col, Button, Spinner, } from 'react-bootstrap';
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import axios from 'axios';

import CatalogGridCard from './CatalogGridCard';
import CatalogListCard from './CatalogListCard';
import GridViewSkelton from './GridViewSkelton';
import CatalogDetailModal from './CatalogDetailModal';
import SearchWithinSearch from './SearchWithinSearch';

export default function ShowResults({ initialResults, initialResultsCount, catalogCore}){
    const searchParams = useSearchParams();
    const urlParams = searchParams.get("q");
    
    const [results, setResults] = useState([]);
    const [resultsCount, setResultsCount] = useState(0);
    const [gridView, setGridView] = useState(true);
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadMore, setLoadmore] = useState(false);
    const [selectCatalog, setSelectCatalog] = useState(null);
    const [userSavedCatalogs, setUserSavedCatalogs] = useState({});
    const [startIndex, setStartIndex] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

        // Initialize state from props after hydration
    useEffect(() => {
        setIsLoading(false);
        setResults(initialResults || []);
        setResultsCount(initialResultsCount || 0);
        setStartIndex(initialResults.length || 0);
    }, [initialResults, initialResultsCount]);

    const handleLoadMore = async () => {
        if (!urlParams) return;
        setLoadmore(true);
        const nextStart = startIndex;

        try {
            let res = await fetch(`/internal-api/load-more?q=${urlParams}&start=${nextStart}&catalogCore=${catalogCore}`);
            const data = await res.json();            
            const newDocs = data.results || [];

            setResults(prevResults => [...prevResults, ...newDocs]);
            setStartIndex(nextStart + newDocs.length);

        } catch (error) {
            console.error("Load More Error:", error);
        } finally {
            setLoadmore(false);
        }
    };



    return (
        <div>
            <Row className="mb-3">
                <Col md={6}>
                    <p>{'Showing'} <strong>{resultsCount}</strong> {'results from data'}</p>
                </Col>
                <Col md={6}>
                    <div className="d-flex align-items-center justify-content-end">
                        <Suspense fallback={<div>Loading search...</div>}>
                            <SearchWithinSearch />
                        </Suspense>
                        <BsFillGrid3X3GapFill
                            size={40}
                            className={`border p-1 cursor_pointer rounded mx-2 ${gridView ? "active_result_view" : ""}`}
                            title='Grid View'
                            onClick={() => setGridView(true)}
                        />
                        <FaListUl
                            size={40}
                            className={`border p-1 cursor_pointer rounded ${!gridView ? "active_result_view" : ""}`}
                            title='List View'
                            onClick={() => setGridView(false)}
                        />
                    </div>
                </Col>
            </Row>
            {gridView ? (
                <Row id='grid-view' className={`grid-view`}>
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <Col md={4} key={`loading-skeleton-${index}`} className='mb-4'>
                                <GridViewSkelton />
                            </Col>
                        ))
                    ) : results.length > 0 ? (
                        results.map((item) => (
                            <Col md={4} key={item.id} className="mb-4">
                                <CatalogGridCard
                                    id={item.id}
                                    datacite_titles={item.datacite_titles}
                                    datacite_creators={item.datacite_creators}
                                    dc_date={item.dc_date}
                                    publisher={item.dc_publishers?.[0] || "Unknown Publisher"}
                                    subject={item.datacite_subject?.[0]}
                                    description={item.description}
                                    uploader={item.uploader}
                                    url={item.url}
                                    resource_type={item.resource_types_string}
                                    catalogCore={catalogCore}
                                    thumbnail={item.thumbnail}
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
                </Row>
            ) : (
                <Row id='grid-view' className={`grid-view`}>
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <Col md={4} key={`loading-skeleton-${index}`} className='mb-4'>
                                <GridViewSkelton />
                            </Col>
                        ))
                    ) : results.length > 0 ? (
                        results.map((item) => (
                            <Col md={12} key={item.id} className="mb-4">
                                <CatalogListCard
                                    id={item.id}
                                    datacite_titles={item.datacite_titles}
                                    datacite_creators={item.datacite_creators}
                                    dc_date={item.dc_date}
                                    publisher={item.dc_publishers?.[0] || "Unknown Publisher"}
                                    subject={item.datacite_subject?.[0]}
                                    description={item.description}
                                    uploader={item.uploader}
                                    url={item.url}
                                    resource_type={item.resource_types_string}
                                    thumbnail={item.thumbnail}
                                    catalogCore={catalogCore}
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
                </Row>
            )}
            <div className='d-flex justify-content-center my-5'>
                {results.length > 0 && results.length < resultsCount && (
                    <Button
                        variant='success'
                        style={{ width: "100%", padding: "10px" }}
                        onClick={handleLoadMore}
                        disabled={loadMore}
                    >
                        {loadMore ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : "Load More"}
                    </Button>
                )}
            </div>
            <CatalogDetailModal
                modalShow={show}
                handleClose={handleClose}
                {...selectCatalog}
            />
        </div>
    )
}
