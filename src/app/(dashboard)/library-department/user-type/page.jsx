"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaPlusCircle } from "react-icons/fa";
import moment from "moment";

const ViewUserType = () => {
  const router = useRouter();
  const successToaster = (text) => toast(text);
  const errorToaster = (text) => toast.error(text);

  const [userType, setUserType] = useState([]);
  const [search, setSearch] = useState("");

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token");
    }
    return null;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      loadUserType();
    }
  }, []);

  const loadUserType = async () => {
    const token = getToken();
    if (!token) {
      errorToaster("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-types`,
        {
          headers: { Authorization: `${token}` },
        }
      );

      if (response.status === 200) {
        setUserType(response.data);
      }
    } catch (error) {
      console.log(error);
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
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-types?user_type_id=${params.id}`,
            {
              headers: { Authorization: `${token}` },
            }
          );
          Swal.fire("Deleted!", "User Type has been deleted.", "success");
          setUserType((prev) =>
            prev.filter((item) => item.user_type_id !== params.id)
          );
        } catch (error) {
          errorToaster("Something went wrong!");
          console.log(error);
        }
      }
    });
  };

  const handleEdit = (params) => {
    router.push(`/library-department/user-type/edit/${params.id}`);
  };

  const formattedUserType = userType.map((inst) => ({
    ...inst,
    created_at: inst.created_at ? moment(inst.created_at).format("MMMM D, YYYY, h:mm A") : "",
    updated_at: inst.updated_at ? moment(inst.updated_at).format("MMMM D, YYYY, h:mm A") : "",
  })).filter((inst) =>
    inst.type_name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: "user_type_id", headerName: "Id", width: 150 },
    { field: "type_name", headerName: "Name", width: 150 },
    { field: "created_at", headerName: "Created At", width: 200 },
    { field: "updated_at", headerName: "Updated At", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div>
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
              <h3 className="mb-0 text-white">User Type</h3>
              <Link href="./user-type/add" className="btn btn-white">
                <FaPlusCircle /> user type
              </Link>
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

          {userType.length > 0 ? (
            <Box sx={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={formattedUserType}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.user_type_id}
              />
            </Box>
          ) : (
            <p>Loading user types...</p>
          )}
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default ViewUserType;