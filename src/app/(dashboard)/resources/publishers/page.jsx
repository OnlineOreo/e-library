"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row, Modal, Button } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import Swal from "sweetalert2";
import ImportPublisher from "./ImportPublisher";

const ViewPublishers = () => {
  const router = useRouter();
  const successToaster = (text) => toast(text);
  const errorToaster = (text) => toast.error(text);

  const [contentGroup, setContentGroup] = useState([]);
  const [search, setSearch] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const handleOpenModal = () => setShowImportModal(true);
  const handleCloseModal = () => setShowImportModal(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const loadPublishers = async () => {
    const token = getToken();
    if (!token) {
      errorToaster("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publishers`,
        {
          headers: { Authorization: token },
        }
      );

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
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publishers?publisher_id=${params.id}`,
            {
              headers: { Authorization: token },
            }
          );
          Swal.fire("Deleted!", "Publisher has been deleted.", "success");
          setContentGroup((prev) =>
            prev.filter((item) => item.publisher_id !== params.id)
          );
        } catch (error) {
          errorToaster(error.response.data.details);
        }
      }
    });
  };

  const handleEdit = (params) => {
    router.push(`./publishers/edit/${params.id}`);
  };

  const filteredContentGroup = contentGroup.filter((inst) =>
    inst.publisher_name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      field: "image",
      headerName: "Logo",
      width: 130,
      renderCell: (params) => (
        <div className="avatar avatar-md">
          <Image
            src={params.value || ""}
            alt="Publisher"
            width={50}
            height={50}
            className="rounded-circle"
          />
        </div>
      ),
    },
    { field: "publisher_id", headerName: "Publisher ID", flex: 2 },
    { field: "publisher_name", headerName: "Publisher Name", flex: 2 },
    { field: "web_url", headerName: "Web URL", flex: 2 },
    { field: "address", headerName: "Address", flex: 2 },
    { field: "redirect_url", headerName: "Redirect URL", flex: 2 },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleEdit(params)}
            className="btn btn-primary btn-sm"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(params)}
            className="btn btn-danger mx-2 btn-sm"
          >
            <RiDeleteBin6Line />
          </button>
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
              <div>
                <Button variant="white" onClick={handleOpenModal} className="me-2">
                <FaPlusCircle /> Import Publisher
                </Button>
                <Link href="./publishers/add" className="btn btn-white">
                  <FaPlusCircle /> Publisher
                </Link>
              </div>
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
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Box sx={{ minWidth: "800px", height: 500 }}>
              <DataGrid
                rows={filteredContentGroup}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.publisher_id}
                columnVisibilityModel={{ publisher_id: false }}
              />
            </Box>
          </Box>
        </div>
      </Container>

      {/* Modal with ImportPublisher */}
      <Modal show={showImportModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Import Publisher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImportPublisher />
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default ViewPublishers;
