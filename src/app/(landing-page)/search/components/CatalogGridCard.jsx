import React from 'react'
import { Card, Button} from 'react-bootstrap';
import { PiBookOpenTextFill } from "react-icons/pi";
import { FaShareAlt, FaRegBookmark, FaFileDownload } from "react-icons/fa";

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
                <div className='d-flex my-3'>
                    <FaShareAlt size={20} className='me-3' />
                    <FaFileDownload size={20} className='me-3' />
                    <FaRegBookmark size={20} className='me-3' />
                </div>
                <div className="mt-2 d-flex">
                    <Button variant="success" className="me-2 w-50 py-2">READ</Button>
                    <Button variant="outline-secondary w-50 py-2">DETAILS</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CatalogGridCard