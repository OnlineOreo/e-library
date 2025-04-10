"use client"
import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap';
import { PiBookOpenTextFill } from "react-icons/pi";
import { FaShareAlt, FaRegBookmark, FaFileDownload, FaFacebookSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import ShareButtonDropdown from './ShareButtonDropdown';
import CitationDownload from './CitationDownload';
import BookmarkCatalog from './BookmarkCatalog';
import { MdOutlineMenuBook } from "react-icons/md";
import { GiBookmarklet } from "react-icons/gi";


const CatalogGridCard = (props) => {
    const getToken = () => {
        const cookieString = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="));
    
        return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
    };

    const getUserRole = () => {
        if (typeof window !== "undefined") { 
            const cookieString = document.cookie
                .split("; ")
                .find((row) => row.startsWith("user_id="));
            return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
        }
        return null;
    };

    

    const loadSavedCatalog = async () => {
        const token = getToken();
        if (!token) {
            console.error("Authentication required!");
            return;
        }
        const userId = getUserRole();
        console.log("user_id", userId);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-saved-article?user=${userId}`, {
                headers: { Authorization: `${token}` },
            });
            console.log("user data : ", response.data);

        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        loadSavedCatalog();
    }, [])

    return (
        <Card>
            <div className="image text-center">
                {/* <PiBookOpenTextFill size={170} className='text-secondary' /> */}
                <MdOutlineMenuBook size={170} className='text-secondary' />
                {/* <GiBookmarklet size={170} className='text-secondary' /> */}
            </div>
            <Card.Body className='text-secondary'>
                <div className='fw-bold one_line_ellipses'>{props.datacite_title}</div>
                <div className='one_line_ellipses'>{props.datacite_creators}</div>
                <div className='one_line_ellipses text-primary'>{props.publisher || "N/A"}</div>
                <div>{props.dc_date}</div>
                <div className='d-flex my-3'>
                    <ShareButtonDropdown id={props.id} catalogType={"Print-collection"} />
                    <CitationDownload id={props.id} catalogType={"Print-collection"} />
                    <BookmarkCatalog id={props.id} catalogType={"Print-collection"} />
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
                    >READ</a>
                    <Button variant="outline-secondary w-50 py-2" onClick={() => { props.onShow(); props.onSelect() }}>DETAILS</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CatalogGridCard