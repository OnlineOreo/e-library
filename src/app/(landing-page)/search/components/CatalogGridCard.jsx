"use client"
import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap';
import ShareButtonDropdown from './ShareButtonDropdown';
import CitationDownload from './CitationDownload';
import BookmarkCatalog from './BookmarkCatalog';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BookCover from './BookCover';


const CatalogGridCard = (props) => {
    const instituteId = useSelector((state) => state.institute.instituteId);

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

    const handelBookRead = async (id, url, title, catalogCore, thumbnail, instituteId) => {
        const token = getToken();
        const userId = getUserID();

        if (!token || !userId) {
            console.error("Authentication or user ID missing.");
            return;
        }

        const formdata = new FormData();
        formdata.append("method", "get");
        formdata.append("path", url);
        formdata.append("status_code", 200);
        formdata.append("user", userId);
        formdata.append("institute", instituteId);
        formdata.append("book_id", id);
        formdata.append("book_name", title);
        formdata.append("core", catalogCore);
        formdata.append("book_image", thumbnail);
        formdata.append("request_body", "");
        formdata.append("response_body", "");
        formdata.append("error_trace", "");

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/log`,
                formdata,
                {
                    headers: { Authorization: token },
                }
            );
            // console.log("log response:", response.data);
        } catch (error) {
            console.error("Log API Error:", error);
        }

        try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trending-books?institute_id=${instituteId}`,
              { headers: { Authorization: `${token}` } }
            );
          } catch (error) {
          }

    }
    return (
        <Card>
            <div className="image text-center">
                <BookCover title={props.datacite_titles} author={props.datacite_creators} thumbnail={props.thumbnail}/>
            </div>
            <Card.Body className='text-secondary'>
                <div className='fw-bold one_line_ellipses'>{props.datacite_titles}</div>
                <div className='one_line_ellipses'>{props.datacite_creators}</div>
                <div className='one_line_ellipses text-primary'>{props.publisher || "N/A"}</div>
                <div>{props.dc_date}</div>
                <div className='d-flex my-3'>
                    <ShareButtonDropdown id={props.id} catalogType={props.catalogCore} />
                    <CitationDownload id={props.id} catalogType={props.catalogCore} />
                    <BookmarkCatalog id={props.id} catalogType={props.catalogCore} user_saved_catalogs={props.user_saved_catalog} />
                </div>
                <div className="mt-2 d-flex">
                    <a
                        href={props.url}
                        className="me-2 w-50 py-2 btn btn-success"
                        onClick={(e) => {
                            e.preventDefault();
                            handelBookRead(props.id, props.url, props.datacite_titles, props.catalogCore, props.thumbnail, instituteId)
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