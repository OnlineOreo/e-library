"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row, Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { BiBarChart } from "react-icons/bi";
import { FaPlusCircle, FaEdit, FaKey } from "react-icons/fa";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import ImportUser from "./ImportUser";
import "./custom-toggle.css";

const Home = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const instituteId = useSelector((state) => state.institute.instituteId);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Store full user object
  const [newPassword, setNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleOpenModal = () => setShowImportModal(true);
  const handleCloseModal = () => setShowImportModal(false);

  const handleOpenChangePasswordModal = (user) => {
    setSelectedUser(user);
    setShowChangePasswordModal(true);
  };

  const handleCloseChangePasswordModal = () => {
    setSelectedUser(null);
    setNewPassword("");
    setShowChangePasswordModal(false);
  };

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const loadUser = async (instituteId) => {
    const token = getToken();
    if (!token) {
      router.push("/authentication/sign-in");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users?institute_id=${instituteId}`,
        { headers: { Authorization: `${token}` } }
      );

      if (response.status === 200) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (instituteId) {
      loadUser(instituteId);
    }
  }, [instituteId]);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);

    if (searchValue === "") {
      setFilteredUsers(users);
    } else {
      const lowerSearch = searchValue.toLowerCase();
      setFilteredUsers(
        users.filter((user) => user?.name?.toLowerCase().includes(lowerSearch))
      );
    }
  };

  const handleDelete = async (params) => {
    const token = getToken();

    Swal.fire({
      title: "Are you sure?",
      text: "Delete user with all mapping!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users?user_id=${params.id}&delete_all=True`,
            { headers: { Authorization: `${token}` } }
          );

          Swal.fire("Deleted!", "User deleted successfully.", "success");
          setFilteredUsers((prev) =>
            prev.filter((item) => item.id !== params.id)
          );
          setUsers((prev) => prev.filter((item) => item.id !== params.id));
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const handleEdit = (params) => {
    router.push(`/user-management/users/edit/${params.id}`);
  };

  const handleLogs = (params) => {
    router.push(`/user-management/users/logs/${params.id}`);
  };

  const handleToggleActive = async (user) => {
    const token = getToken();
    const { image, ...rest } = user;

    const updatedUser = {
      ...rest,
      is_active: !user.is_active,
      role: user.role,
    };

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users?user_id=${user.id}`,
        JSON.stringify(updatedUser),
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire({
        title: "Success!",
        text: `User ${
          updatedUser.is_active ? "activated" : "deactivated"
        } successfully!`,
        icon: "success",
        confirmButtonText: "OK",
      });

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, is_active: updatedUser.is_active } : u
        )
      );

      setFilteredUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, is_active: updatedUser.is_active } : u
        )
      );
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Could not update user status.", "error");
    }
  };

  const handlePasswordChange = async () => {
    if (!selectedUser) return;
    const token = getToken();
    setPasswordLoading(true);

    const { image, ...userWithoutImage } = selectedUser;

    const updatedUser = {
      ...userWithoutImage, 
      password: newPassword,
    };

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users?user_id=${selectedUser.id}`,
        JSON.stringify(updatedUser),
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire("Success", "Password updated successfully!", "success");
      handleCloseChangePasswordModal();
    } catch (error) {
      console.error("Password change error:", error);
      Swal.fire("Error", "Failed to update password!", "error");
    }

    setPasswordLoading(false);
  };

  const columns = [
    { field: "id", headerName: "User ID", flex: 2 },
    {
      field: "image",
      headerName: "Photo",
      flex: 1,
      renderCell: (params) => {
        const handleError = (e) => {
          e.target.src = "/images/avatar/avatar-1.jpg";
        };
      
        return (
          <img
            src={params.value || "/images/avatar/avatar-1.jpg"}
            alt="User"
            onError={handleError}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        );
      },
    },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "phone_number", headerName: "Number", flex: 2 },
    { field: "role", headerName: "Role", flex: 2 },
    {
      field: "is_active",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <div className="custom-switch-wrapper mt-3">
          <input
            type="checkbox"
            className="custom-switch"
            id={`toggle-${params.row.id}`}
            checked={params.row.is_active}
            onChange={() => handleToggleActive(params.row)}
          />
          <label htmlFor={`toggle-${params.row.id}`} />
        </div>
      ),
    },
    {
      field: "logs",
      headerName: "Logs",
      flex: 1,
      renderCell: (params) => (
        <button
          onClick={() => handleLogs(params.row)}
          className="btn btn-warning fs-4 mx-2 btn-sm"
        >
          <BiBarChart />
        </button>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 3,
      renderCell: (params) => (
        <>
          <button
            onClick={() => handleOpenChangePasswordModal(params.row)}
            className="btn btn-info mx-2 btn-sm"
          >
            <FaKey />
          </button>
          <button
            onClick={() => handleEdit(params.row)}
            className="btn btn-primary mx-2 btn-sm"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(params.row)}
            className="btn btn-danger btn-sm mx-2"
          >
            <RiDeleteBin6Line />
          </button>
        </>
      ),
    },
  ];

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Manage User</h3>
              <div>
                <Button
                  variant="white"
                  onClick={handleOpenModal}
                  className="me-2"
                >
                  <FaPlusCircle /> Import User
                </Button>
                <Link href="./users/add-user" className="btn btn-white">
                  <FaPlusCircle /> New User
                </Link>
              </div>
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
              <DataGrid
                rows={filteredUsers}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                columnVisibilityModel={{ id: false }}
                getRowId={(row) => row.id}
              />
            </Box>
          </Box>
        </div>
      </Container>

      {/* Import User Modal */}
      <Modal show={showImportModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Import User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImportUser
            onSuccess={() => {
              handleCloseModal();
              loadUser(instituteId);
              Swal.fire("Success", "Users added successfully!", "success");
            }}
          />
        </Modal.Body>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        show={showChangePasswordModal}
        onHide={handleCloseChangePasswordModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              required
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            disabled={passwordLoading}
            onClick={handleCloseChangePasswordModal}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handlePasswordChange}
            disabled={passwordLoading || !newPassword}
          >
            {passwordLoading ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Home;
