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

const ViewMedia = () => {
  const router = useRouter();
  const successToaster = (text) => toast(text);
  const errorToaster = (text) => toast.error(text);

  const [media, setMedia] = useState([]);
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configuration-media`,
        {
          headers: { Authorization: `${token}` },
        }
      );

      if (response.status === 200) {
        setMedia(response.data);
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
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configuration-media?configuration_media_id=${params.id}`,
            {
              headers: { Authorization: `${token}` },
            }
          );
          Swal.fire(
            "Deleted!",
            "Configuration media has been deleted.",
            "success"
          );
          setMedia((prev) =>
            prev.filter((item) => item.configuration_media_id !== params.id)
          );
        } catch (error) {
          errorToaster("Something went wrong!");
          console.log(error);
        }
      }
    });
  };

  const handleEdit = (params) => {
    router.push(`/configuration/media/edit/${params.id}`);
  };

  const formattedMedia = media
    .map((inst) => ({
      ...inst,
    }))
    .filter((inst) =>
      inst?.media_name?.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
      { field: "configuration_media_id", headerName: "Id", flex: 1 },
      {
        field: "image",
        headerName: "Image",
        flex: 1,
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
      { field: "media_name", headerName: "Media Name", flex: 2 },
      { field: "description", headerName: "Description", flex: 3 },
      { field: "created_at", headerName: "Created At", flex: 2 },
      {
        field: "action",
        headerName: "Action",
        flex: 1,
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
              <h3 className="mb-0 text-dark">Configuration media</h3>
              <Link href="./media/add" className="btn btn-white">
                <FaPlusCircle /> Media
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

          {media.length > 0 ? (
            <Box sx={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={formattedMedia}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.configuration_media_id}
                columnVisibilityModel={{ configuration_media_id: false }}
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

export default ViewMedia;
