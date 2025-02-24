'use client'
import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
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
            page == 'edit' ? <EditInstituteComponent params={params} /> : <ShowInstitute params={params} />
        }
        <ToastContainer />
        </>
    );
};

export default EditInstitute;
