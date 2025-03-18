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
  const [meta, setMeta] = useState([]);
  const [search, setSearch] = useState("");
  const instituteId = useSelector((state) => state.institute.instituteId);


  useEffect(() => {
    if(instituteId){
      if (typeof window !== "undefined") {
        loadMeta();
      }
    }
  }, [instituteId]);

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const loadMeta = async () => {
    const token = getToken();
    if (!token) {
      toast.error("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configuration-meta?institute_id=${instituteId}`,
        { headers: { Authorization: `${token}` } }
      );
      if (response.status === 200 && Array.isArray(response.data)) {
        setMeta(response.data);
      } else {
        toast.error("Invalid data format received from the API.");
      }
    } catch (error) {
      toast.error("Failed to load meta.");
    }
  };

  const handleEdit = (row) => {
    router.push(`./metas/edit/${row.configuration_meta_id}`);
  };

  const handleDelete = async (row) => {
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
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configuration-meta?configuration_meta_id=${row.configuration_meta_id}`,
            { headers: { Authorization: `${token}` } }
          );
          Swal.fire("Deleted!", "Meta configuration has been deleted.", "success");
          setMeta((prev) => prev.filter((item) => item.configuration_meta_id !== row.configuration_meta_id));
        } catch (error) {
          toast.error("Error deleting meta!");
          console.error(error);
        }
      }
    });
  };

  const columns = [
    // { field: "configuration_meta_id", headerName: "ID", width: 250 },
    { field: "list", headerName: "Link name", width: 150 },
    { field: "sub_list", headerName: "Sub List", width: 150 },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) =>
        params.value ? (
          <div className="avatar avatar-md">
          <img
            src={params.value}
            alt="Meta"
            className="rounded-circle"
            style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "5px" }}
          />
          </div>
        ) : (
          "No Image"
        ),
    },
    { field: "link_url", headerName: "URL", width: 250 },
    // { field: "description", headerName: "Description", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params.row)} className="btn btn-primary btn-sm mx-1">
            <FaEdit />
          </button>
          <button onClick={() => handleDelete(params.row)} className="btn btn-danger btn-sm mx-1">
            <FaTrashAlt />
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
          <Col lg={12} md={12} xs={12} className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Important Links</h3>
              <div>
                <Link href="./metas/add" className="btn btn-white">
                  <FaPlusCircle /> Add Meta
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
          {meta.length > 0 ? (
            <Box sx={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={meta.filter((m) => m?.list?.toLowerCase().includes(search.toLowerCase()))}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.configuration_meta_id} // Fixed row ID issue
              />
            </Box>
          ) : (
            <p>No meta configurations found.</p>
          )}
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}
