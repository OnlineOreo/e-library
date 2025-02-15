'use client'

import { Fragment, useState, useEffect } from "react";
import Link from 'next/link';
import { Container, Col, Row, Form, Button, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { use } from "react";
import EditInstituteComponent from "@/app/Component/Institute/EditInstituteComponent";

const EditInstitute = ({params}) => {
    const [page , setPage] = useState();
    
    return (
        <>
        <EditInstituteComponent params={params} />

          <ToastContainer />
        </>
    );
};

export default EditInstitute;
