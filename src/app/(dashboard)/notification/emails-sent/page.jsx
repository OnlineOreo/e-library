"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import Image from "next/image";
import { useSelector } from "react-redux";

const sendEmails = () => {
  const router = useRouter();
  const errorToaster = (text) => toast.error(text);

  const [emails, setEmails] = useState([]);
  const [search, setSearch] = useState("");
  const instituteId = useSelector((state) => state.institute.instituteId);
  console.log(instituteId);
  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (instituteId) {
        loadAllEmails(instituteId);
      }
    }
  }, [instituteId]);

  useEffect(() => {
    console.log("updated emails:", emails);
  }, [emails]);

  const loadAllEmails = async (instituteId) => {
    const token = getToken();
    if (!token) {
      errorToaster("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }

    try {
      console.log("redux institute Id", instituteId);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/emails-sent?institute_id=${instituteId}`,
        {
          headers: { Authorization: `${token}` },
        }
      );

      if (response.status === 200) {
        console.log(response.data.emails);
        setEmails(response.data.emails);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleDelete = async (params) => {
  //   const token = getToken();
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         await axios.delete(
  //           `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configuration-emails?configuration_emails_id=${params.id}`,
  //           {
  //             headers: { Authorization: `${token}` },
  //           }
  //         );
  //         Swal.fire(
  //           "Deleted!",
  //           "Configuration emails has been deleted.",
  //           "success"
  //         );
  //         setEmails((prev) =>
  //           prev.filter((item) => item.configuration_emails_id !== params.id)
  //         );
  //       } catch (error) {
  //         errorToaster("Something went wrong!");
  //         console.log(error);
  //       }
  //     }
  //   });
  // };

  const handleEdit = (params) => {
    router.push(`/configuration/emails/edit/${params.id}`);
  };

  const formattedemails = emails
    .map((inst) => ({
      ...inst,
    }))
    .filter((inst) =>
      inst?.emails_name?.toLowerCase().includes(search.toLowerCase())
    );

  const columns = [
    { field: "title", headerName: "Subject", width: 300 },
    { field: "content", headerName: "Content", width: 350 },
    { field: "bulk_email_type", headerName: "Bulk Email Type", width: 350 },
    { field: "created_at", headerName: "Sent At", width: 200 },
  ];

  return (
    <>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Sent Emails </h3>
              <Link href="./send-email" className="btn btn-white">
                <FaPlusCircle /> Compose Emails
              </Link>
            </div>
          </Col>
        </Row>
        <div className="card p-3 mt-4">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Box sx={{ minWidth: 800, height: 500 }}>
              <DataGrid
                rows={emails}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.title + row.bulk_email_type}
                columnVisibilityModel={{ configuration_emails_id: false }}
              />
            </Box>
          </Box>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default sendEmails;
