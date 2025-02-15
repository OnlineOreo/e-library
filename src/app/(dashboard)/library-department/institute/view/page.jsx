'use client';
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

const ViewInstitute = () => {

  const router = useRouter();
  const successToaster = (text) => toast(text);
  const errorToaster = (text) => toast.error(text);

  const [institute, setInstutes] = useState([]);

  const getToken = () => localStorage.getItem("access_token");

  const loadUser = async () => {
    const token = getToken();
    if (!token) {
      errorToaster("Authentication required!");
      return;
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/institutes`, {
        headers: { Authorization: `${token}` },
        method: 'GET'
      });

      if (response.status === 200) {
        setInstutes(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleDelete = async (params)=> {
    const token = getToken();
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/institutes?institute_id=${params.id}`, {
        headers: { Authorization: `${token}` },
      });

      successToaster("Instiute deleted successfully!")
      
      setInstutes((prev) => prev.filter(item => item.institute_id !== params.id));

    } catch (error) {
      errorToaster("Something went wrong!")
      console.log(error);
    }
  }

  const handleEdit = (params)=> {
    router.push(`/library-department/institute/view/${params.id}`)
  }

  const columns = [
    { field: "institute_id", headerName: "ID", width: 150 },
    { field: "institute_name", headerName: "Institute Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Address", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "domain", headerName: "Domain", width: 150 },
    { field: "sub_domain", headerName: "Sub Domain", width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params)} className="btn btn-danger btn-sm"><FaEdit /></button>
          <button onClick={() => handleDelete(params)} className="btn btn-primary mx-2 btn-sm"><RiDeleteBin6Line /></button>
        </div>
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
              <h3 className="mb-0 text-white">Manage Institute</h3>
              <Link href="../institute/add" className="btn btn-white">
                Add Institute
              </Link>
            </div>
          </Col>
        </Row>
        <div className="card p-3 mt-4">
          <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={institute}
              columns={columns}
              pageSize={5}
              components={{ Toolbar: GridToolbar }}
              getRowId={(row) => row.institute_id} 
            />
          </Box>
        </div>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default ViewInstitute;
