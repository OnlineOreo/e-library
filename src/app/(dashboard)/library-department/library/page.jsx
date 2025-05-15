"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Col, Row, Form } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit, FaEye, FaPlusCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Link from "next/link";

const ViewLibrary = () => {
  const router = useRouter();
  const [library, setLibrary] = useState([]);
  const [filteredLibrary, setFilteredLibrary] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const instituteId = useSelector((state) => state.institute.instituteId);

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
    const token = getToken();

    if (!token) return;
    const loadLibrary = async (instituteId) => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/libraries?institute_id=${instituteId}`,
          { headers: { Authorization: token } }
        );
        if (response.status === 200) {
          setLibrary(response.data);
          setFilteredLibrary(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch libraries:", error);
        toast.error("Error loading libraries.");
      }
    };
    if (instituteId) {
      loadLibrary(instituteId);
    }
  }, [instituteId]);

  useEffect(() => {
    const filtered = library.filter((lib) =>
      lib.library_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLibrary(filtered);
  }, [searchQuery, library]);

  const handleDelete = async (params) => {
    const token = getToken();

    if (!token || !params?.id) return;

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
          const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/libraries?library_id=${params.id}`,
            {
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200 || response.status == 204) {
            Swal.fire("Deleted!", "Library has been deleted.", "success");
            setLibrary((prev) =>
              prev.filter((item) => item.library_id !== params.id)
            );
          }
        } catch (error) {
          toast.error(error.response?.data?.error || "Something went wrong!");
          toast.error(error.response?.data?.details || "Something went wrong!");
        }
      }
    });
  };

  const handleEdit = (params) =>
    router.push(`/library-department/library/edit/${params.id}`);
  const handleShow = (params) =>
    router.push(`/library-department/library/show/${params.id}`);

  const columns = [
    { field: "library_id", headerName: "ID", flex: 2 },
    { field: "library_name", headerName: "Library Name", flex: 1 },
    { field: "domain", headerName: "Domain", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    // { field: "address", headerName: "Address", flex: 150 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleShow(params)}
            className="btn mx-2 btn-secondary btn-sm"
          >
            <FaEye />
          </button>
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
          <Col
            lg={12}
            className="d-flex justify-content-between align-items-center"
          >
            <h3 className="mb-0 text-dark">Manage Library</h3>
            {userRole === "ADMIN" && (
              <Link href="./library/add" className="btn btn-white">
                <FaPlusCircle /> Library
              </Link>
            )}
          </Col>
        </Row>

        <div className="card p-3 mt-4">
          <Form.Control
            type="text"
            placeholder="Search Library"
            className="mb-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Box sx={{ minWidth: 800, height: 500 }}>
              <DataGrid
                rows={filteredLibrary}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.library_id}
                columnVisibilityModel={{ library_id: false }}
              />
            </Box>
          </Box>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default ViewLibrary;
