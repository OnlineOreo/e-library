"use client"
import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap';
import ShareButtonDropdown from './ShareButtonDropdown';
import CitationDownload from './CitationDownload';
import BookmarkCatalog from './BookmarkCatalog';
import BookCover from './BookCover';


const CatalogGridCard = (props) => {

    return (
        <Card>
            <div className="image text-center">
                <BookCover title={props.datacite_titles} author={props.datacite_creators} thumbnail={props.thumbnail}/>
            </div>
            <Card.Body className='text-secondary'>
                <div className='fw-bold one_line_ellipses' title={props.datacite_titles}>{props.datacite_titles}</div>
                <div className='one_line_ellipses'>{props.datacite_creators}</div>
                <div className='one_line_ellipses text-primary'>{props.publisher || "N/A"}</div>
                <div>{props.dc_date}</div>
                <div className='d-flex my-3'>
                    <ShareButtonDropdown id={props.id} catalogType={props.catalogCore} />
                    <CitationDownload id={props.id} catalogType={props.catalogCore} />
                    <BookmarkCatalog id={props.id} catalogType={props.catalogCore} />
                </div>
                <div className="mt-2 d-flex">
                    <a
                        href={props.url}
                        className="me-2 w-50 py-2 btn btn-success"
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
                    >{props.resource_type == "Video"
                        ? "Watch"
                        : props.resource_type == "audio"
                            ? "Listen"
                            : "Read"}</a>
                    <Button variant="outline-secondary w-50 py-2" onClick={() => { props.onShow(); props.onSelect() }}>DETAILS</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CatalogGridCard