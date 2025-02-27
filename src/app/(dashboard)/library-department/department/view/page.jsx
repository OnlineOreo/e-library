'use client';
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

const Home = () => {
  const [users, setUsers] = useState([]);

  const router = useRouter();

  const getToken = () => localStorage.getItem("access_token");


  const loadUser = async () => {
    const token = getToken();
  
    if (!token) {
      errorToaster("Authentication required!");
      return;
    }
  
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/departments`, {
        headers: { Authorization: `${token}` },
        method:'GET'
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
    { field: "department_id", headerName: "User ID", width: 200 },
    { field: "department_name", headerName: "Department Name", width: 300 },
    { field: "department_code", headerName: "Department Code", width: 300 },
    { field: "library", headerName: "Library", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div>
        <button onClick={() => handleEdit(params)} className="btn btn-success btn-sm mx-2"><FaEdit /></button>
        <button onClick={() => deleteAction(params.id)} className="btn btn-danger btn-sm"><RiDeleteBin6Line /></button>
        </div>
      ),
    },
  ];

  const deleteAction = async (userId) => {
    if (!window.confirm("Are you sure you want to delete?")) {
      return; 
    }
  
    try {
      const token = getToken();
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/libraries?library_id=${userId}`,
        {
          headers: { Authorization: `${token}` }, 
        }
      );
  
      console.log("Server Response:", response.data);
  
      if (response.status === 200) {
        setUsers(response.data || []); 
      }
  
      loadUser(); // Reload user data after deletion
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

  const handleEdit = (params) => {
    // console.log(params.id);
    
    router.push(`/library-department/department/view/${params.id}`);
  };   

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-white">Department</h3>
              <Link href="/library-department/department/add" className="btn btn-white">
                Add Department
              </Link>
            </div>
          </Col>
        </Row>
        <div className="card p-3 mt-4">
          <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid
              getRowId={(row)=> row.department_id}
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
