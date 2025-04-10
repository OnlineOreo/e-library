"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

const ViewReports = () => {
  const router = useRouter();
  const successToaster = (text) => toast.success(text);
  const errorToaster = (text) => toast.error(text);

  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all_users");

  const instituteId = useSelector((state) => state.institute.instituteId);

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    if (instituteId) {
      loadReports();
    }
  }, [instituteId, filter]);

  const loadReports = async () => {
    const token = getToken();
    if (!token) {
      errorToaster("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports?institute_id=${instituteId}&${filter}=true`,
        {
          headers: { Authorization: `${token}` },
        }
      );

      if (response.status === 200) {
        setReports(
          filter === "all_users"
            ? response.data?.users || []
            : filter === "all_active_users"
            ? response.data?.active_users || []
            : filter === "top_users"
            ? response.data?.top_users || []
            : []
        );
      }
    } catch (error) {
      errorToaster("Failed to load reports.");
      setReports([]);
    }
  };

  const formattedReports = reports
    .map((report) => ({ ...report }))
    .filter((report) =>
      report.name?.toLowerCase().includes(search.toLowerCase())
    );

  const columns = [
    { field: "id", headerName: "ID", flex: 2 },
    { field: "name", headername: "Name", flex: 2 },
    { field: "phone_number", headerName: "Phone", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "created_at", headerName: "Created At", flex: 2 },
    { field: "designation", headerName: "Designation", flex: 2 },
  ];

  return (
    <>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <div className="card p-3 mt-4">
          {/* Filters */}
          <div className="mb-3">
            <label className="me-3">
              <input
                type="radio"
                name="reportFilter"
                value="all_users"
                checked={filter === "all_users"}
                onChange={() => setFilter("all_users")}
              />{" "}
              All Users
            </label>
            <label className="me-3">
              <input
                type="radio"
                name="reportFilter"
                value="all_active_users"
                checked={filter === "all_active_users"}
                onChange={() => setFilter("all_active_users")}
              />{" "}
              Active Users
            </label>
            <label className="me-3">
              <input
                type="radio"
                name="reportFilter"
                value="top_users"
                checked={filter === "top_users"}
                onChange={() => setFilter("top_users")}
              />{" "}
              Top Users
            </label>
            {/* <button className="btn btn-primary ms-3" onClick={loadReports}>
              Apply Filter
            </button> */}
          </div>

          {/* Search Input */}
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
                rows={formattedReports}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.id}
                columnVisibilityModel={{ id: false }}
              />
            </Box>
          </Box>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default ViewReports;
