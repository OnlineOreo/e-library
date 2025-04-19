"use client";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row, Modal, Button } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import ImportDepartment from "./ImportDepartment";

const Department = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const instituteId = useSelector((state) => state.institute.instituteId);

  const [showImportModal, setShowImportModal] = useState(false);

  const handleOpenModal = () => setShowImportModal(true);
  const handleCloseModal = () => setShowImportModal(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && instituteId) {
      loadDepartment(instituteId);
    }
  }, [isClient, instituteId]);

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

  const loadDepartment = async (instituteId) => {
    const token = getToken();
    if (!token) {
      router.push("/authentication/sign-in");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/departments?institute_id=${instituteId}`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      if (response.status === 200) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      }
    } catch (error) {
      console.error("Axios Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    if (searchValue === "") {
      setFilteredUsers(users);
    } else {
      const lowerSearch = searchValue.toLowerCase();
      setFilteredUsers(
        users.filter(
          (user) =>
            user.department_name.toLowerCase().includes(lowerSearch) ||
            user.department_code.toLowerCase().includes(lowerSearch) ||
            user.library.toLowerCase().includes(lowerSearch)
        )
      );
    }
  };

  const columns = [
    { field: "department_id", headerName: "User ID", flex: 2 },
    { field: "department_name", headerName: "Department Name", flex: 2 },
    { field: "department_code", headerName: "Department Code", flex: 2 },
    { field: "library_name", headerName: "Library", flex: 2 },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleEdit(params)}
            className="btn btn-primary btn-sm mx-2"
          >
            <FaEdit />
          </button>
          {userRole === "ADMIN" && (
            <button
              onClick={() => deleteAction(params.id)}
              className="btn btn-danger btn-sm"
            >
              <RiDeleteBin6Line />
            </button>
          )}
        </div>
      ),
    },
  ];

  const deleteAction = async (departmentId) => {
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
          const token = getToken();
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/departments?department_id=${departmentId}`,
            { headers: { Authorization: `${token}` } }
          );

          const updatedUsers = users.filter(
            (user) => user.department_id !== departmentId
          );
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers);
          Swal.fire({
            title: "Success!",
            text: "Department deleted successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
        } catch (error) {
          Swal.fire({
            icon: "warning",
            title: "Delete Failed!",  
            text: error.response.data.error || "An error occurred while deleting.",
            position: "center",
            showConfirmButton: true,
            timer: 3000,
          });
        }
      }
    });
  };

  const handleEdit = (params) => {
    router.push(`/library-department/department/edit/${params.id}`);
  };

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Department</h3>

              {userRole === "ADMIN" && (
                <div>
                  <Button
                    variant="white"
                    onClick={handleOpenModal}
                    className="me-2"
                  >
                    <FaPlusCircle /> Import Department
                  </Button>
                  <Link
                    href="/library-department/department/add"
                    className="btn btn-white"
                  >
                    <FaPlusCircle /> Department
                  </Link>
                </div>
              )}
            </div>
          </Col>
        </Row>
        <div className="card p-3 mt-4">
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="Search..."
            className="form-control mb-3"
          />
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Box sx={{ minWidth: 800, height: 500 }}>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                isClient && (
                  <DataGrid
                    getRowId={(row) => row.department_id}
                    rows={filteredUsers}
                    columns={columns}
                    pageSize={5}
                    columnVisibilityModel={{ department_id: false }}
                  />
                )
              )}
            </Box>
          </Box>
        </div>
      </Container>
      <Modal show={showImportModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Import Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImportDepartment
            onSuccess={() => {
              handleCloseModal();
              loadProgram(instituteId);
              Swal.fire({
                title: "Success!",
                text: "Program added successfully!",
                icon: "success",
                confirmButtonText: "OK",
              });
            }}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default Department;
