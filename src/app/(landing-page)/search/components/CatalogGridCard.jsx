import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap';
import { PiBookOpenTextFill } from "react-icons/pi";
import { FaShareAlt, FaRegBookmark, FaFileDownload, FaFacebookSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import ShareButtonDropdown from './ShareButtonDropdown';


const CatalogGridCard = (props) => {

    return (
        <Card>
            <div className="image text-center">
                <PiBookOpenTextFill size={170} className='text-secondary' />
            </div>
            <Card.Body className='text-secondary'>
                <div className='fw-bold one_line_ellipses'>{props.datacite_title}</div>
                <div className='one_line_ellipses'>{props.datacite_creators}</div>
                <div>{props.dc_date}</div>
                <ShareButtonDropdown id={props.id} catalogType={"print-collection"} />
                <div className="mt-2 d-flex">
                    <a
                        href={props.url}
                        className="me-2 w-50 py-2 btn btn-success"
                        onClick={(e) => {
                            e.preventDefault(); // prevent default link behavior

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
                    <Button variant="outline-secondary w-50 py-2" onClick={() => { props.onShow(); props.onSelect() }}>DETAILS</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CatalogGridCard