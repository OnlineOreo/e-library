'use client'

import { Fragment, useState, useEffect } from "react";
import Link from 'next/link';
import { Container, Col, Row, Form, Button, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { use } from "react";
import EditInstituteComponent from "@/app/Component/Institute/EditInstituteComponent";
import ShowInstitute from "@/app/Component/Institute/ShowInstitute";

const EditInstitute = ({params}) => {
    const { id } = use(params)
    const [page , setPage] = useState("edit");
    useEffect(() => {
        if (id[1] === 'show') {
            setPage('show');
        }else{
            setPage('edit');
        }
    }, [id]);   

    return (
        <>
        {
            page == 'edit' ? <EditInstituteComponent params={params} /> : <ShowInstitute/>
        }
        <ToastContainer />
        </>
    );
};

export default EditInstitute;
