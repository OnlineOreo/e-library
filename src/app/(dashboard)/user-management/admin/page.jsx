"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row, Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { FaPlusCircle, FaEdit, FaKey } from "react-icons/fa";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap"; // Import Spinner for loading indicator

const Home = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const instituteId = useSelector((state) => state.institute.instituteId);

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
    const hostname = typeof window !== "undefined" ? window.location.hostname : "";
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users?admin=true&sub_domain=${hostname}`,
        {
          headers: { Authorization: `${token}` },
          method: "GET",
        }
      );

      if (response.status === 200) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Response Error:", error.response.data);
      } else if (error.request) {
        console.error("Request Error: No response received");
      } else {
        console.error("Setup Error:", error.message);
      }
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
      text: "Deletes package with all mapping!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleteMappingIdArr = params.row.mappings.map(
            (element) => element.user_mapping_id
          );
          const deleteMappingParam = deleteMappingIdArr.join(",");
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users?user_id=${params.id}&mapping_ids=${deleteMappingParam}&delete_all=True`,
            {
              headers: { Authorization: `${token}` },
            }
          );

          Swal.fire("Deleted!", "User has been deleted.", "success");
          setFilteredUsers((prev) =>
            prev.filter((item) => item.id !== params.id)
          );
          setUsers((prev) => prev.filter((item) => item.id !== params.id));
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleEdit = (params) => {
    router.push(`/user-management/admin/edit/${params.id}`);
  };

  const handleChangePassword = (id) => {
    setCurrentUserId(id);
    setShowModal(true);
  };

  const handleSavePassword = async () => {
    const token = getToken();

    if (!newPassword) {
      Swal.fire("Error", "Please enter a new password", "error");
      return;
    }

    // Find the user to be updated from the users array
    const userToUpdate = users.find(user => user.id === currentUserId);

    if (!userToUpdate) {
      Swal.fire("Error", "User not found", "error");
      return;
    }

    // Exclude the 'image' field from the updated user data
    const { image, ...updatedUserData } = userToUpdate;

    // Add the new password to the updated user data
    updatedUserData.password = newPassword;

    try {
      // Set loading to true to disable button and show spinner
      setLoading(true);

      // Send the updated user data including the new password in the PUT request body
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users?user_id=${currentUserId}`,
        updatedUserData,
        {
          headers: { Authorization: `${token}` },
        }
      );
      Swal.fire("Success", "Password updated successfully", "success");
      setShowModal(false);
      setNewPassword("");
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to update password", "error");
    } finally {
      // Set loading to false once the request is done
      setLoading(false);
    }
  };

  const columns = [
    { field: "id", headerName: "User ID", flex: 2 },
    {
      field: "image",
      headerName: "Photo",
      flex: 1,
      renderCell: (params) => {
        return (
          <img
            src={params.value || params.value}
            alt="User"
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
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => (
        <>
          <button
            onClick={() => handleChangePassword(params.id)}
            className="btn btn-info btn-sm mx-2"
          >
            <FaKey />
          </button>
          <button
            onClick={() => handleEdit(params)}
            className="btn btn-primary mx-2 btn-sm"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(params)}
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
              <h3 className="mb-0 text-dark">Manage Admin</h3>
              <Link href="./admin/add-admin" className="btn btn-white">
                <FaPlusCircle /> New Admin
              </Link>
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
          <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              pageSize={5}
              components={{ Toolbar: GridToolbar }}
              columnVisibilityModel={{ id: false }}
              getRowId={(row) => row.id}
            />
          </Box>
        </div>
      </Container>

      {/* Change Password Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled={loading} onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSavePassword} 
            disabled={loading} // Disable the button when loading
          >
            {loading ? 'Updating' : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Home;
