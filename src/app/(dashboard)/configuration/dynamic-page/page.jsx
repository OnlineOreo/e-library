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
import Image from "next/image";
import { useSelector } from "react-redux";

const ViewDynamicPages = () => {
  const instituteId = useSelector((state) => state.institute.instituteId);
  const router = useRouter();
  const successToaster = (text) => toast(text);
  const errorToaster = (text) => toast.error(text);

  const [dynamicPage, setDynamicPage] = useState([]);
  const [search, setSearch] = useState("");

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    if (typeof window !== "undefined" && instituteId) {
      loadItemTypes(instituteId);
    }
  }, [instituteId]);

  const loadItemTypes = async (instituteId) => {
    const token = getToken();
    if (!token) {
      errorToaster("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dynamic-page?institute=${instituteId}`,
        {
          headers: { Authorization: `${token}` },
        }
      );

      if (response.status === 200) {
        setDynamicPage(response.data);
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
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dynamic-page?page_id=${params.id}`,
            {
              headers: { Authorization: `${token}` },
            }
          );
          Swal.fire("Deleted!", "Dynamic page has been deleted.", "success");
          setDynamicPage((prev) =>
            prev.filter((item) => item.page_id !== params.id)
          );
        } catch (error) {
          errorToaster("Something went wrong!");
        }
      }
    });
  };

  const handleEdit = (params) => {
    router.push(`/configuration/dynamic-page/edit/${params.id}`);
  };

  const formattedDynamicPage = dynamicPage
    .map((inst) => ({
      ...inst,
    }))
    .filter((inst) =>
      inst?.page_name?.toLowerCase().includes(search.toLowerCase())
    );

  const columns = [
    { field: "page_id", headerName: "Id", flex: 1 },
    {
      field: "page_image",
      headerName: "Image",
      flex: 0.5,
      renderCell: (params) => (
        <div className="avatar avatar-md">
          <img
            src={params.value || ""}
            alt="Dynamic pages"
            width={50}
            height={50}
            className="rounded-circle"
          />
        </div>
      ),
    },
    { field: "page_name", headerName: "Page Name", flex: 2 },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 2,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formatted = date.toLocaleString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        return <span>{formatted}</span>;
      },
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      flex: 2,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formatted = date.toLocaleString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        return <span>{formatted}</span>;
      },
    },    
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div className="d-flex pt-2 gap-2">
          {" "}
          {/* Ensures spacing */}
          <button
            onClick={() => handleEdit(params)}
            className="btn btn-primary btn-sm"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(params)}
            className="btn btn-danger btn-sm"
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
              <h3 className="mb-0 text-dark">Dynamic Page</h3>
              <Link href="./dynamic-page/add" className="btn btn-white">
                <FaPlusCircle /> Add New Page
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
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Box sx={{ minWidth: 800, height: 500 }}>
              <DataGrid
                rows={formattedDynamicPage}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.page_id}
                columnVisibilityModel={{ page_id: false }}
              />
            </Box>
          </Box>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default ViewDynamicPages;
