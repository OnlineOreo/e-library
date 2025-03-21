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

const ViewHarvestData = () => {
  const router = useRouter();
  const successToaster = (text) => toast(text);
  const errorToaster = (text) => toast.error(text);

  const [harvestData, setHarvestData] = useState([]);
  const [search, setSearch] = useState("");
  const instituteId = useSelector((state) => state.institute.instituteId);

//   console.log("Institute ID:", instituteId);

  useEffect(() => {
    if (instituteId) {
      loadHarvestData();
    }
  }, [instituteId]);

  const getToken = () => {
    if (typeof window === "undefined") return null;
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const loadHarvestData = async () => {
    const token = getToken();
    if (!token) {
      errorToaster("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/harvest-data?institute_id=${instituteId}`,
        {
          headers: { Authorization: `${token}` },
        }
      );

      if (response.status === 200) {
        console.log("this harvest Data:", response.data);
        setHarvestData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      errorToaster("Failed to load data.");
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
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/harvest-data?harvest_id=${params.id}`,
            {
              headers: { Authorization: `${token}` },
            }
          );
          Swal.fire("Deleted!", "Harvest data has been deleted.", "success");
          setHarvestData((prev) => prev.filter((item) => item.harvest_id !== params.id));
        } catch (error) {
          console.error("Delete Error:", error);
          errorToaster("Something went wrong!");
        }
      }
    });
  };

  const handleEdit = (params) => {
    
    router.push(`/configuration/harvest-data/edit/${params.id}`);
  };

  const formattedData = harvestData
    .map((inst) => ({
      ...inst,
    }))
    .filter((inst) =>
      inst?.title?.toLowerCase().includes(search.toLowerCase()) // Updated to filter by title instead of name
    );

  console.log("Formatted Data:", formattedData);

  const columns = [
    { field: "harvest_id", headerName: "ID", width: 200 },
    { field: "url", headerName: "URL", width: 200 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "publisher", headerName: "Publisher", width: 250 },
    { field: "created_at", headerName: "Created At", width: 200 },
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
              <h3 className="mb-0 text-dark">Harvest Data</h3>
              <Link href="/configuration/harvest-data/add" className="btn btn-white">
                <FaPlusCircle /> Add Data
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

          {formattedData.length > 0 ? (
            <Box sx={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={formattedData}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.id || row.harvest_id} // Ensuring unique row ID
                // columnVisibilityModel={{ id: false }}
              />
            </Box>
          ) : (
            <p>No data available...</p>
          )}
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default ViewHarvestData;
