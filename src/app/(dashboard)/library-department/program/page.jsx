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
import Swal from "sweetalert2";
import ImportProgram from "./ImportProgram";
import { useSelector } from "react-redux";

const ViewProgram = () => {
  const router = useRouter();
  const successToaster = (text) => toast.success(text);
  const errorToaster = (text) => toast.error(text);
  const instituteId = useSelector((state) => state.institute.instituteId);

  const [userType, setUserType] = useState([]);
  const [search, setSearch] = useState("");

  const [showImportModal, setShowImportModal] = useState(false);

  const handleOpenModal = () => setShowImportModal(true);
  const handleCloseModal = () => setShowImportModal(false);

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const getUserRole = () => {
    if (typeof window !== "undefined") {
      const cookieString = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user_role="));
      return cookieString
        ? decodeURIComponent(cookieString.split("=")[1])
        : null;
    }
    return null;
  };

  const userRole = getUserRole();

  useEffect(() => {
    if (typeof window !== "undefined" && instituteId) {
      loadProgram(instituteId);
    }
  }, [instituteId]);

  const loadProgram = async (instituteId) => {
    const token = getToken();
    if (!token) {
      errorToaster("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/programs?institute_id=${instituteId}`,
        {
          headers: { Authorization: `${token}` },
        }
      );

      if (response.status === 200) {
        setUserType(response.data);
      }
    } catch (error) {
      errorToaster("Failed to load programs.");
    }
  };

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
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/programs?program_id=${params.id}`,
            {
              headers: { Authorization: `${token}` },
            }
          );
          Swal.fire("Deleted!", "Program has been deleted.", "success");
          setUserType((prev) =>
            prev.filter((item) => item.program_id !== params.id)
          );
        } catch (error) {
          if (error.response && error.response.data) {
            const errorMessage =
              error.response.data.error || "Something went wrong!";
            errorToaster(errorMessage);
          } else {
            errorToaster("Something went wrong!");
          }
        }
      }
    });
  };

  const handleEdit = (params) => {
    router.push(`/library-department/program/edit/${params.id}`);
  };

  const formattedUserType = userType
    .map((inst) => ({ ...inst }))
    .filter((inst) =>
      inst.program_name.toLowerCase().includes(search.toLowerCase())
    );

  const columns = [
    // { field: "program_id", headerName: "Id", width: 150 },
    { field: "program_name", headerName: "Program Name", flex: 2 },
    { field: "program_code", headerName: "Program Code", flex: 2 },
    { field: "library_name", headerName: "Library Name", flex: 2 },
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
          {userRole === "ADMIN" && (
            <button
              onClick={() => handleDelete(params)}
              className="btn btn-danger mx-2 btn-sm"
            >
              <RiDeleteBin6Line />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Program</h3>
              <div>
                {/* <Button
                  variant="white"
                  onClick={handleOpenModal}
                  className="me-2"
                >
                  <FaPlusCircle /> Import Program
                </Button> */}
                {userRole === "ADMIN" && (
                  <Link href="./program/add" className="btn btn-white">
                    <FaPlusCircle /> Program
                  </Link>
                )}
              </div>
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
                rows={formattedUserType}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.program_id}
              />
            </Box>
          </Box>
        </div>
      </Container>
      {/* Modal with ImportPublisher */}
      <Modal show={showImportModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Import Program</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImportProgram />
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ViewProgram;
