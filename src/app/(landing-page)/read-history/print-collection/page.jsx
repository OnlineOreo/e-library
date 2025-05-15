"use client";

import { Container, Row, Col, Button, Spinner, Form, InputGroup } from 'react-bootstrap';
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl, FaSearch } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import axios from 'axios';

import CatalogGridCard from '../../search/components/CatalogGridCard';
import CatalogListCard from '../../search/components/CatalogListCard';
import GridViewSkelton from '../../search/components/GridViewSkelton';
import CatalogDetailModal from '../../search/components/CatalogDetailModal';


export default function PrintCollectionSavedCatalog() {
    const instituteId = useSelector((state) => state.institute.instituteId);
    const Router = useRouter();

    // Use state with initialization from props
    const [gridView, setGridView] = useState(true);
    const [searchWithinSearch, setSearchWithinSearch] = useState("")
    const [results, setResults] = useState([]);
    const [resultsCount, setResultsCount] = useState(0);
    const [show, setShow] = useState(false);
    const [selectCatalog, setSelectCatalog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userSavedCatalogs, setUserSavedCatalogs] = useState({});
    const [startIndex, setStartIndex] = useState(12);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [filterResults, setFilterResults] = useState([]) 


    useEffect(() => {
        if (searchWithinSearch.trim() === "") {
          setFilterResults(results);
        } else {
          const filtered = results.filter((item) =>
            item?.datacite_titles?.toLowerCase().includes(searchWithinSearch.toLowerCase())
          );
          setFilterResults(filtered);   
        }
      }, [searchWithinSearch, results]);

    const handleLoadMore = async () => {
        setIsLoading(true);
        const catalogIds = userSavedCatalogs.saved_p_collection_ids;
        const formattedCatalogIds = catalogIds
        .split(",")
        .map(id => `"${id.trim()}"`)
        .join(",");
        // id:("4395","5084","6367")
        const solrQuery = `id:(${formattedCatalogIds})`;
        // console.log("user saved catalog : ", solrQuery);
        
        const nextStart = startIndex;

        try {
            const res = await fetch(`/internal-api/load-more?q=${solrQuery}&start=${nextStart}&catalogCore=Print-collection&rows=12`);
            const data = await res.json();

            const newDocs = data.results || [];

            setResults(prevResults => [...prevResults, ...newDocs]);
            setStartIndex(nextStart + newDocs.length);

        } catch (error) {
            console.error("Load More Error:", error);
        } finally {
            setIsLoading(false);
        }
    };


    const getToken = () => {
        const cookieString = document.cookie
            .split("; ")
            .find((row) => row.startsWith("access_token="));

        return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
    };

    const getUserID = () => {
        if (typeof window !== "undefined") {
            const cookieString = document.cookie
                .split("; ")
                .find((row) => row.startsWith("user_id="));
            return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
        }
        return null;
    };

    const loadReadHistory = async () => {
        const token = getToken();
        if (!token) {
            console.error("Authentication required!");
            return;
        }
        const userId = getUserID();
        // console.log("user_id", userId);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logs?user_id=${userId}&institute_id=${instituteId}&read_history=true`, {
                headers: { Authorization: `${token}` },
            });

            // console.log("read history : ",response.data);


            const logs = response.data.logs;

            const result = {
                saved_p_collection_ids: new Set(),
                saved_e_collection_ids: new Set(),
                saved_multimedia_ids: new Set(),
                saved_e_resources_ids: new Set()
            };

            logs.forEach(log => {
                const bookId = log.book_id;
                const core = log.core;

                if (!bookId) return; // skip if book_id is missing

                switch (core) {
                    case "Print-collection":
                        result.saved_p_collection_ids.add(bookId);
                        break;
                    case "e-collection":
                        result.saved_e_collection_ids.add(bookId);
                        break;
                    case "multimedia-n":
                        result.saved_multimedia_ids.add(bookId);
                        break;
                    case "e-resources":
                        result.saved_e_resources_ids.add(bookId);
                        break;
                }
            });

            // Convert sets to comma-separated strings
            const finalResult = {
                saved_p_collection_ids: Array.from(result.saved_p_collection_ids).join(','),
                saved_e_collection_ids: Array.from(result.saved_e_collection_ids).join(','),
                saved_multimedia_ids: Array.from(result.saved_multimedia_ids).join(','),
                saved_e_resources_ids: Array.from(result.saved_e_resources_ids).join(',')
            };

            console.log(finalResult);

            setUserSavedCatalogs(finalResult);

            const catalogIds = finalResult.saved_p_collection_ids;
            console.log("user saved catalog : ", catalogIds);
            const responce_catalog = await axios.get(`/internal-api/saved-catalog?catalogIds=${catalogIds}&catalogCore=Print-collection`)
            setResults(responce_catalog.data.results)
            setFilterResults(responce_catalog.data.results)
            setResultsCount(responce_catalog.data.resultsCount)

            // console.log("user saved catalog detail : ", responce_catalog);


        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(instituteId){
            loadReadHistory()
        }
    }, [instituteId])

    return (
        <Container className="px-4 text-secondary mt-5">
            <Row>
                <Col md={12} className='pe-0 ps-4'>
                    <Row className="mb-3">
                        <Col md={6}>
                            {/* <p>Showing <strong>{resultsCount}</strong> results from data</p> */}
                            <h3>Read History</h3>
                        </Col>
                        <Col md={6}>
                            <div className="d-flex align-items-center justify-content-end">
                                <InputGroup>
                                    <Form.Control placeholder="Search..." onChange={(e) => setSearchWithinSearch(e.target.value)} value={searchWithinSearch} />
                                    <Button type='submit' variant="outline-secondary" ><FaSearch /></Button>
                                </InputGroup>
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
                            {isLoading && filterResults.length === 0 ? (
                                Array.from({ length: 4 }).map((_, index) => (
                                    <Col md={3} key={`loading-skeleton-${index}`} className='mb-4'>
                                        <GridViewSkelton />
                                    </Col>
                                ))
                            ) : filterResults.length > 0 ? (
                                filterResults.map((item) => (
                                    <Col md={3} key={item.id} className="mb-4">
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
                                            thumbnail = {item.thumbnail}
                                            resource_type={item.resource_types_string}
                                            user_saved_catalog={userSavedCatalogs}
                                            catalogCore={"Print-collection"}
                                            onShow={handleShow}
                                            onSelect={() => setSelectCatalog(item)}
                                        />
                                    </Col>
                                ))
                            ) : (
                                <Col md={12} className="text-center text-muted py-5" style={{height:"300px"}}>
                                   <h5>You have not read yet anything from Print-collection.</h5>
                                </Col>
                            )}
                        </Row>
                    ) : (
                        <Row id='grid-view' className={`grid-view`}>
                            {isLoading && filterResults.length === 0 ? (
                                Array.from({ length: 4 }).map((_, index) => (
                                    <Col md={4} key={`loading-skeleton-${index}`} className='mb-4'>
                                        <GridViewSkelton />
                                    </Col>
                                ))
                            ) : filterResults.length > 0 ? (
                                filterResults.map((item) => (
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
                                            thumbnail = {item.thumbnail}
                                            resource_type={item.resource_types_string}
                                            user_saved_catalog={userSavedCatalogs}
                                            catalogCore={"Print-collection"}
                                            onShow={handleShow}
                                            onSelect={() => setSelectCatalog(item)}
                                        />
                                    </Col>
                                ))
                            ) : (
                                <Col md={12} className="text-center text-muted py-5" style={{height:"300px"}}>
                                       <h5>You have not read yet anything from Print-collection.</h5>
                                </Col>
                            )}
                        </Row>
                    )}
                    <div className='d-flex justify-content-center my-5'>
                        {filterResults.length > 0 && filterResults.length < resultsCount && (
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

            <CatalogDetailModal
                modalShow={show}
                handleClose={handleClose}
                {...selectCatalog}
            />
        </Container>
    );
}