"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export default function Configurationmeta() {
  const router = useRouter();
  const [staffPick, setStaffPick] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const instituteId = useSelector((state) => state.institute.instituteId);


  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const loadStaffPick = async (instituteId) => {
    const token = getToken();
    if (!token) {
      toast.error("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/staff-picks?institute_id=${instituteId}`,
        { headers: { Authorization: `${token}` } }
      );
      if (response.status === 200 && Array.isArray(response.data)) {
        setStaffPick(response.data);
      } else {
        console.error("Failed to load meta.");
      }
    } catch (error) {
      console.error("Failed to load meta.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (instituteId) {
      if (typeof window !== "undefined") {
        loadStaffPick(instituteId);
      }
    }
  }, [instituteId]);

  const columns = [
    { field: "institute", headerName: "Institute", flex: 2 },
    { field: "article_type", headerName: "Article Type", flex: 2 },
    { field: "title", headerName: "Title", flex: 3 },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <div className="avatar avatar-md">
            <img
              src={params.value}
              alt="Meta"
              className="rounded-circle"
              style={{
                width: 50,
                height: 50,
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
          </div>
        ) : (
          "No Image"
        ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleEdit(params.id)}
            className="btn btn-primary btn-sm mx-1"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(params.id)}
            className="btn btn-danger btn-sm mx-1"
          >
            <FaTrashAlt />
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (staff_pick_id) => {
    router.push(`./staff-recommendation/edit/${staff_pick_id}`);
  };

  const handleDelete = async (staff_pick_id) => {
    const token = getToken();
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the meta configuration!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/staff-picks?staff_pick_id=${staff_pick_id}`,
            { headers: { Authorization: `${token}` } }
          );
          Swal.fire(
            "Deleted!",
            "Staff Recommendation has been deleted.",
            "success"
          );
          loadStaffPick(instituteId);
        } catch (error) {
          toast.error("Error deleting meta!");
          console.error(error);
        }
      }
    });
  };

  return (
    <>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12} className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Staff Reccomendation</h3>
              <div>
                <Link
                  href="./staff-recommendation/add"
                  className="btn btn-white"
                >
                  <FaPlusCircle /> Add Reccomendation
                </Link>
              </div>
            </div>
          </Col>
        </Row>
        <div className="card p-3 mt-4">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by List"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Box sx={{ minWidth: 800, height: 500 }}>
              <DataGrid
                rows={staffPick}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.staff_pick_id}
                columnVisibilityModel={{ staff_pick_id: false }}
              />
            </Box>
          </Box>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}
