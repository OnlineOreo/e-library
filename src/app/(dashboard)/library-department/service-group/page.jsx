"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export default function ServiceGroup() {
  const router = useRouter();
  const [serviceGroup, setServiceGroup] = useState([]);
  const [search, setSearch] = useState("");
  const instituteId = useSelector((state) => state.institute.instituteId);

  useEffect(() => {
    if (typeof window !== "undefined" && instituteId) {
      loadServiceGroup(instituteId);
    }
  }, [instituteId]);

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

  const loadServiceGroup = async (instituteId) => {
    const token = getToken();
    if (!token) {
      toast.error("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/service-groups?institute_id=${instituteId}`,
        { headers: { Authorization: `${token}` } }
      );
      if (response.status === 200) {
        setServiceGroup(response.data);
      }
    } catch (error) {
      console.error(error);
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
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/service-groups?sg_id=${params.id}`,
            { headers: { Authorization: `${token}` } }
          );
          Swal.fire("Deleted!", "Service Group has been deleted.", "success");
          setServiceGroup((prev) =>
            prev.filter((item) => item.sg_id !== params.id)
          );
        } catch (error) {
          toast.error("Something went wrong!");
          console.error(error);
        }
      }
    });
  };

  const handleEdit = (params) => {
    router.push(`/library-department/service-group/edit/${params.id}`);
  };

  const formattedServiceGroup = serviceGroup
    .map((inst) => ({
      ...inst,
    }))
    .filter((inst) =>
      inst.service_name.toLowerCase().includes(search.toLowerCase())
    );

  const columns = [
    { field: "service_name", headerName: "Name", flex: 2 },
    { field: "created_at", headerName: "Created At", flex: 2 },
    { field: "updated_at", headerName: "Updated At", flex: 2 },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => (
        <div>
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
          <Col lg={12} md={12} xs={12} className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Service Group</h3>
              {userRole === "ADMIN" && (
                <Link href="./service-group/add" className="btn btn-white">
                  <FaPlusCircle /> Service Group
                </Link>
              )}
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
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Box sx={{ minWidth: 800, height: 500 }}>
              <DataGrid
                rows={formattedServiceGroup}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.sg_id}
              />
            </Box>
          </Box>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}
