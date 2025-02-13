'use client';
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { RiDeleteBin6Line } from "react-icons/ri";

const Home = () => {
  const [users, setUsers] = useState([]);

  const getToken = () => localStorage.getItem("access_token");

  const loadUser = async () => {
    const token = getToken();
    console.log("Token:", token);
    console.log("API URL:", "http://192.168.1.20:8010/api/users");
  
    if (!token) {
      errorToaster("Authentication required!");
      return;
    }
  
    try {
      const response = await axios.get("http://192.168.1.20:8010/api/users", {
        headers: { Authorization: `${token}` },
      });
      console.log("Server Response:", response.data);
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Axios Error:", error);
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
    loadUser();
  }, []);

  const columns = [
    { field: "id", headerName: "User ID", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "number", headerName: "Number", width: 150 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "designation", headerName: "Designation", width: 150 },
    { field: "gender", headerName: "Gender", width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <button onClick={() => handleAction(params.row.id)} className="btn btn-danger btn-sm"><RiDeleteBin6Line /></button>
      ),
    },
  ];

  const handleAction = (userId) => {
    alert(`Action triggered for user ID: ${userId}`);
  };

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-white">Manage User</h3>
              <Link href="#" className="btn btn-white">
                Create New Project
              </Link>
            </div>
          </Col>
        </Row>
        <div className="card p-3 mt-4">
          <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={users}
              columns={columns}
              pageSize={5}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </div>
      </Container>
    </Fragment>
  );
};

export default Home;
