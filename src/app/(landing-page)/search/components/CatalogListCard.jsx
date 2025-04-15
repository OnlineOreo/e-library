"use client"
import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap';
import { PiBookOpenTextFill } from "react-icons/pi";
import { FaShareAlt, FaRegBookmark, FaFileDownload } from "react-icons/fa";
import ShareButtonDropdown from './ShareButtonDropdown';
import CitationDownload from './CitationDownload';
import BookmarkCatalog from './BookmarkCatalog';
import { MdOutlineMenuBook } from "react-icons/md";

const CatalogListCard = (props) => {
    // console.log("props",props);
    
    return (
        <Card>
            <Row>
                <Col md={3} className="image text-center">
                    {/* <PiBookOpenTextFill size={170} className='text-secondary' /> */}
                    <MdOutlineMenuBook size={170} className='text-secondary' />
                </Col>
                <Col md={9}>
                    <Card.Body className='text-secondary'>
                        <div className='fw-bold'>{props.datacite_titles}</div>
                        <div>{props.datacite_creators}</div>
                        <div className='text-primary'>{props.publisher}</div>
                        <div>{props.dc_date}</div>
                        <div className="mt-3 d-flex align-items-center">
                        <a
                        href={props.url}
                        className="me-2 py-2 btn btn-success"
                        style={{width:"100px"}}
                        onClick={(e) => {
                            e.preventDefault();

                            const screenWidth = window.screen.width;
                            const screenHeight = window.screen.height;
                            const width = screenWidth / 2;
                            const height = screenHeight;
                            const left = screenWidth / 2;
                            window.open(
                                props.url,
                                'targetWindow',
                                `toolbar=no,location=no,menubar=no,scrollbars=yes,resizable=yes,width=${width},height=${height},left=${left},top=0`
                            );
                        }}
                    >READ</a>
                            <a className="btn btn-outline-secondary py-2 mx-2" style={{ width: "100px" }} onClick={()=>{props.onShow(); props.onSelect()}}>DETAILS</a>
                            <div className='d-flex my-3'>
                                <ShareButtonDropdown id={props.id} catalogType={"Print-collection"} />
                                <CitationDownload id={props.id} catalogType={"Print-collection"}/>
                                <BookmarkCatalog id={props.id} catalogType={"Print-collection"}/>
                            </div>
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default CatalogListCard