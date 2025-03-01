'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import Swal from "sweetalert2";
import { FaPlusCircle } from "react-icons/fa";

const ViewPublishers = () => {
  const router = useRouter();
  const successToaster = (text) => toast(text);
  const errorToaster = (text) => toast.error(text);

  const [contentGroup, setContentGroup] = useState([]);
  const [search, setSearch] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("access_token") : null);

  const loadPublishers = async () => {
    const token = getToken();
    if (!token) {
      errorToaster("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publishers`, {
        headers: { Authorization: token },
      });

      if (response.status === 200) {
        setContentGroup(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { 
    if (isClient) {
      loadPublishers();
    }
  }, [isClient]);

  const handleDelete = async (params) => {
    console.log(params)
    const token = getToken();
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publishers?publisher_id=${params.id}`, {
              headers: { Authorization: token },
            });
            Swal.fire("Deleted!", "Publisher has been deleted.", "success");
            setContentGroup((prev) => prev.filter(item => item.publisher_id !== params.id));
          } catch (error) {
            errorToaster("Something went wrong!");
            console.log(error);
          }
        }
      });
  };

  const handleEdit = (params) => {
    router.push(`/resource/publishers/edit/${params.id}`);
  };

  const filteredContentGroup = contentGroup.filter(inst =>
    inst.publisher_name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: "publisher_id", headerName: "publisher_id", width: 150 },
    { field: "publisher_name", headerName: "Publisher name", width: 150 },
    { field: "web_url", headerName: "web url", width: 200 },
    { field: "image", headerName: "image", width: 130 },
    { field: "address", headerName: "Address", width: 150 },
    { field: "redirect_url", headerName: "Redirect url", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params)} className="btn btn-primary btn-sm"><FaEdit /></button>
          <button onClick={() => handleDelete(params)} className="btn btn-danger mx-2 btn-sm"><RiDeleteBin6Line /></button>
        </div>
      ),
    },
  ];

  if (!isClient) return null;
  
  return (
    <>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Publishers</h3>
              <Link href="./publishers/add" className="btn btn-white">
                <FaPlusCircle /> Publisher
              </Link>
            </div>
          </Col>
        </Row>

        <div className="card p-3 mt-4">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={filteredContentGroup}
              columns={columns}
              pageSize={5}
              components={{ Toolbar: GridToolbar }}
              getRowId={(row) => row.publisher_id} 
              columnVisibilityModel={{ publisher_id: false }}
            />
          </Box>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default ViewPublishers;
