"use client";
import { Container, Row, Col, Form, Card, Button, InputGroup } from 'react-bootstrap';
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl, FaSearch } from "react-icons/fa";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from "next/navigation";
import axios from "axios";

import CatalogGridCard from '../components/CatalogGridCard';
import CatalogListCard from '../components/CatalogListCard';
import CatalogDetailModal from '../components/CatalogDetailModal';
import GridViewSkelton from '../components/GridViewSkelton';
import SearchSideFilter from '../components/SearchSideFilter';


function PrintCollectionContent() {
    const searchParams = useSearchParams();
    const urlParams = searchParams.get("q");

    const [gridView, setGridView] = useState(true);
    const [results, setResults] = useState([]);
    const [resultsCount, setResultsCount] = useState(0);
    const [sideFilterResults, setSidefilterResults] = useState([])
    const [show, setShow] = useState(false);
    const [selectCatalog, setSelectCatalog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const sideFilterAllData = async (sideFilterFilters) => {
        const solrUrl = `http://5.135.139.104:8983/solr/Print-collection/select?indent=true&q=*:*&fq=${sideFilterFilters}&facet=true&facet.field=dc_publishers_string&facet.field=datacite_rights_string&facet.field=resource_types&facet.field=dc_date&facet.field=datacite_creators_string&facet.limit=1000&facet.sort=count`;
    
        try {
            const response = await axios.get(solrUrl);
            const data = response.data;
            const facets = ["dc_publishers_string", "datacite_rights_string", "resource_types", "datacite_creators_string", "dc_date"];
            const results = {};
            facets.forEach(facet => {
                results[facet] = combineFacetData(data.facet_counts?.facet_fields?.[facet] || []);
            });
    
            console.log("Formatted Data:", results);
            setSidefilterResults(results);
        } catch (error) {
            console.error("Axios Error:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const combineFacetData = (facetData) => {
        const combined = [];
        
        for (let i = 0; i < facetData.length; i += 2) {
            const name = facetData[i];
            const count = facetData[i + 1] || 0;
            combined.push({ name, count: parseInt(count, 10) });
        }
        
        return combined;
    };

    const loadPCollectionData = async (solrUrl, sideFilterFilters) => {
        try {
            const response = await axios.get(solrUrl);
            setResults(response.data.response.docs || []);
            setResultsCount(response.data.response.numFound || 0);
            sideFilterAllData(sideFilterFilters)
        } catch (error) {
            console.error("Axios Error:", error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        setIsLoading(true);
        if (!urlParams) return;
        const solrUrl = `http://5.135.139.104:8983/solr/Print-collection/select?indent=true&q.op=OR&q=${urlParams}&rows=15`
        let sideFilterFilters = urlParams;
        loadPCollectionData(solrUrl, sideFilterFilters);
    }, [urlParams]);

    // const handelFilterChange = (filterUrl) =>{
    //     setIsLoading(true);
    //     const filterSolrUrl = `http://5.135.139.104:8983/solr/Print-collection/select?indent=true&q.op=OR&q=${filterUrl}&rows=15`;
    //     let sideFilterFilters = filterUrl;
    //     loadPCollectionData(filterSolrUrl, sideFilterFilters); 
    // //    console.log("new filter : ", filterSolrUrl);    
    // }
    

    return (
        <Container className="px-4 text-secondary">
            <Row>
                <Col md={3} className="px-0 border rounded bg-white">
                    <SearchSideFilter {...sideFilterResults}/>
                </Col>
                <Col md={9} className='pe-0 ps-4'>
                    <Row className="mb-3">
                        <Col md={6}>
                            <p>Showing <strong>{resultsCount}</strong> results from data</p>
                        </Col>
                        <Col md={6}>
                            <div className="d-flex align-items-center">
                                <InputGroup>
                                    <Form.Control placeholder="Search..." />
                                    <Button variant="outline-secondary"><FaSearch /></Button>
                                </InputGroup>
                                <BsFillGrid3X3GapFill
                                    size={40}
                                    className={`border p-1 curser_pointer rounded mx-2 ${gridView ? "active_result_view" : ""}`}
                                    onClick={() => setGridView(true)}
                                />
                                <FaListUl
                                    size={40}
                                    className={`border p-1 curser_pointer rounded ${!gridView ? "active_result_view" : ""}`}
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


export default function PrintCollection() {
    return (
        <Suspense fallback={<div>Loading search results...</div>}>
            <PrintCollectionContent />
        </Suspense>
    );
}