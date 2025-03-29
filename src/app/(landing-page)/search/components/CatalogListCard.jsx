import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap';
import { PiBookOpenTextFill } from "react-icons/pi";
import { FaShareAlt, FaRegBookmark, FaFileDownload } from "react-icons/fa";

const CatalogListCard = (props) => {
    return (
        <Card>
            <Row>
                <Col md={3} className="image text-center">
                    <PiBookOpenTextFill size={170} className='text-secondary' />
                </Col>
                <Col md={9}>
                    <Card.Body className='text-secondary'>
                        <div className='fw-bold'>{props.datacite_title}</div>
                        <div>{props.datacite_creators}</div>
                        <div>{props.dc_date}</div>
                        <div className="mt-3 d-flex align-items-center">
                            <Button variant="success" className="me-2 py-2" style={{ width: "100px" }}>READ</Button>
                            <Button variant="outline-secondary py-2 mx-2" style={{ width: "100px" }}>DETAILS</Button>
                            <FaShareAlt size={20} className='me-3' />
                            <FaFileDownload size={20} className='me-3' />
                            <FaRegBookmark size={20} className='me-3' />
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default CatalogListCard