"use client";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row, Modal, Button } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { BiBarChart } from "react-icons/bi";
import { FaPlusCircle, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import ImportUser from "./ImportUser";

const Home = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const instituteId = useSelector((state) => state.institute.instituteId);
  const [showImportModal, setShowImportModal] = useState(false);

  const handleOpenModal = () => setShowImportModal(true);
  const handleCloseModal = () => setShowImportModal(false);

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
        {
          headers: { Authorization: `${token}` },
          method: "GET",
        }
      );

      if (response.status === 200) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadUser(instituteId);
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
          var deleteMappingIdArr = [];
          params.row.mappings.forEach((element) => {
            deleteMappingIdArr.push(element.user_mapping_id);
          });
          var deleteMappingParam = deleteMappingIdArr.join(",");
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
    router.push(`/user-management/users/edit/${params.id}`);
  };

  const handleLogs = (params) => {
    router.push(`/user-management/users/logs/${params.id}`);
  };

  const columns = [
    { field: "id", headerName: "User ID", flex: 2 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "phone_number", headerName: "Number", flex: 2 },
    { field: "role", headerName: "Role", flex: 2 },
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
      flex: 2,
      renderCell: (params) => (
        <>
          <button
            onClick={() => handleEdit(params.row)} // 👈 pass actual row data
            className="btn btn-primary mx-2 btn-sm"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(params.row)} // 👈 pass actual row data
            className="btn btn-danger btn-sm"
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
                {/* <Button
                  variant="white"
                  onClick={handleOpenModal}
                  className="me-2"
                >
                  <FaPlusCircle /> Import User
                </Button> */}
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
      {/* Modal with ImportPublisher */}
      <Modal show={showImportModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Import Publisher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImportUser />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default Home;
