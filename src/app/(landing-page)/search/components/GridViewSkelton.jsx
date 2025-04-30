import React from 'react'
import { Card } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const GridViewSkelton = () => {
    return (
        <Card>
            <div className='p-3'>
                <Skeleton height={300} />
            </div>
            <Card.Body className="text-secondary">
                <Skeleton height={20} width="80%" className="mb-2" />
                <Skeleton height={16} width="60%" className="mb-2" />
                <Skeleton height={14} width="40%" className="mb-3" />
                <div className="d-flex mb-1">
                    <Skeleton circle width={30} height={30} className="me-3" />
                    <Skeleton circle width={30} height={30} className="me-3" />
                    <Skeleton circle width={30} height={30} className="me-3" />
                </div>
                <div className="mt-2 d-flex w-100">
                    <Skeleton width={100} height={40} className="me-2" />
                    <Skeleton width={100} height={40} />
                </div>
            </Card.Body>
        </Card>
    )
}

export default GridViewSkelton