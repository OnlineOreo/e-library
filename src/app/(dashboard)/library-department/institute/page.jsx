"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { FaEdit, FaEye, FaPlusCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

const ViewInstitute = () => {
  const router = useRouter();
  const successToaster = (text) => toast(text);
  const errorToaster = (text) => toast.error(text);

  const [institutes, setInstitutes] = useState([]);
  const [search, setSearch] = useState("");

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const loadUser = async () => {
    const token = getToken();
    if (!token) {
      errorToaster("Authentication required!");
      // router.push('/authentication/sign-in');
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/institutes`,
        {
          headers: { Authorization: `${token}` },
          method: "GET",
        }
      );

      if (response.status === 200) {
        setInstitutes(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleDelete = async (params) => {
    const token = getToken();
    Swal.fire({
      title: "Are you sure?",
      text: "Deletes  Institute?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/institutes?institute_id=${params.id}`,
            {
              headers: { Authorization: `${token}` },
            }
          );

          Swal.fire("Deleted!", "Institute deleted successfully!", "success");
          setInstitutes((prev) =>
            prev.filter((item) => item.institute_id !== params.id)
          );
        } catch (error) {
          errorToaster(error?.response?.data?.error || "Something went wrong!");
          errorToaster(
            error?.response?.data?.details || "Something went wrong!"
          );
          // console.log(error);
        }
      }
    });
  };

  const handleEdit = (params) => {
    router.push(`./institute/edit/${params.id}`);
  };

  const handleShow = (params) => {
    router.push(`./institute/show/${params.id}`);
  };

  const filteredInstitutes = institutes.filter(
    (inst) =>
      inst.institute_name.toLowerCase().includes(search.toLowerCase()) ||
      inst.email.toLowerCase().includes(search.toLowerCase()) ||
      inst.address.toLowerCase().includes(search.toLowerCase()) ||
      inst.domain.toLowerCase().includes(search.toLowerCase()) ||
      inst.phone.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: "institute_id", headerName: "ID", flex: 1 },
    { field: "institute_name", headerName: "Institute Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "domain", headerName: "Domain", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleShow(params)}
            className="btn btn-secondary mx-2 btn-sm"
          >
            <FaEye />
          </button>
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

  return (
    <>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Manage Institute</h3>
              <Link href="./institute/add" className="btn btn-white">
                <FaPlusCircle /> Institute
              </Link>
            </div>
          </Col>
        </Row>

        <div className="card p-3 mt-4">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by name, email or domain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Box sx={{ minWidth: 800, height: 500 }}>
              <DataGrid
                rows={filteredInstitutes}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.institute_id}
                columnVisibilityModel={{ institute_id: false }}
              />
            </Box>
          </Box>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default ViewInstitute;
