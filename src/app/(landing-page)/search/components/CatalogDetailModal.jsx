"use client"
import React from 'react'
import { Container, Row, Col, Form, Card, Button, InputGroup, Nav, Modal } from 'react-bootstrap';

const CatalogDetailModal = (props) => {
    return (
        <div>
            <Modal show={props.modalShow} onHide={props.handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Catalog Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-secondary'>
                    {props ? (
                        <>
                            <p className='mb-1'><strong>Title:</strong> {props.datacite_titles}</p>
                            <p className='mb-1'><strong>Author:</strong> {props.datacite_creators}</p>
                            <p className='mb-1'><strong>Date:</strong> {props.dc_date}</p>
                            <p className='mb-1'><strong>Publisher:</strong> {props.dc_publishers?.[0] || "Unknown Publisher"}</p>
                            <p className='mb-1'><strong>Resources Type:</strong> {props.resource_types_string}</p>
                            <p className='mb-1'><strong>Subject:</strong> {props.college_category}</p>
                            <p className='mb-1'><strong>Description:</strong> {props.description}</p>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>props.handleClose()}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CatalogDetailModal