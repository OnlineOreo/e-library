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

const NewsClipping = () => {
  const router = useRouter();
  const successToaster = (text) => toast(text);
  const errorToaster = (text) => toast.error(text);

  const [newsClipping, setNewsClipping] = useState([]);
  const [search, setSearch] = useState("");

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      loadItemTypes();
    }
  }, []);

  const loadItemTypes = async () => {
    const token = getToken();
    if (!token) {
      errorToaster("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/e-news-clips`,
        {
          headers: { Authorization: `${token}` },
        }
      );

      if (response.status === 200) {
        setNewsClipping(response.data);
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
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/e-news-clips?e_news_clip_id=${params.id}`,
            {
              headers: { Authorization: `${token}` },
            }
          );
          Swal.fire(
            "Deleted!",
            "News Clipping has been deleted.",
            "success"
          );
          setNewsClipping((prev) =>
            prev.filter((item) => item.e_news_clip_id !== params.id)
          );
        } catch (error) {
          errorToaster("Something went wrong!");
        }
      }
    });
  };

  const handleEdit = (params) => {
    router.push(`/resources/news-clippings/edit/${params.id}`);
  };

  const formattedNewsClipping = newsClipping
    .map((inst) => ({
      ...inst,
    }))
    .filter((inst) =>
      inst?.title?.toLowerCase().includes(search.toLowerCase())
    );

  const columns = [
    { field: "e_news_clip_id", headerName: "Id", flex: 2 },
    {
      field: "thumbnail",
      headerName: "Image",
      flex: 2,
      renderCell: (params) => (
        <div className="avatar avatar-md">
          <Image
            src={params.value || ""}
            alt="Publisher"
            width={50}
            height={50}
            className="rounded-circle"
          />
        </div>
      ),
    },
    { field: "title", headerName: "Title", flex: 2 },
    { field: "url", headerName: "URL", flex: 2 },
    {
      field: "attachment",
      headerName: "Attachment",
      flex: 2,
      renderCell: (params) => (
        <div>
          <Link target="_blank" href={params.value}>View Attachment</Link>
        </div>
      ),
    },
    { field: "description", headerName: "Description", width: 200 },
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
              <h3 className="mb-0 text-dark">News Clipping</h3>
              <Link href="./news-clippings/add" className="btn btn-white">
                <FaPlusCircle /> Page
              </Link>
            </div>
          </Col>
        </Row>
        <div className="card p-3 mt-4">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {newsClipping.length > 0 ? (
            <Box sx={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={formattedNewsClipping}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.e_news_clip_id}
                columnVisibilityModel={{ e_news_clip_id: false }}
              />
            </Box>
          ) : (
            <p>Don't have any data...</p>
          )}
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default NewsClipping;
