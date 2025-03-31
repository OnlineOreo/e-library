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
  const [allUsers, setAllUsers] = useState(true);
  const [allActiveUsers, setAllActiveUsers] = useState(true);
  const [topUsers, setTopUsers] = useState(false);
  
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
  }, [instituteId, allUsers, allActiveUsers, topUsers]);

  const loadReports = async () => {
    const token = getToken();
    if (!token) {
      errorToaster("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports?institute_id=${instituteId}&all_users=${allUsers}&all_active_users=${allActiveUsers}&top_users=${topUsers}`,
        {
          headers: { Authorization: `${token}` },
        }
      );

      if (response.status === 200) {
        setReports([
          ...(allUsers ? response.data.users : []),
          ...(allActiveUsers ? response.data.active_users : []),
          ...(topUsers ? response.data.top_users : [])
        ]);
      }
    } catch (error) {
      errorToaster("Failed to load reports.");
      setReports([]);
    }
  };

  const formattedReports = reports
    .map((report) => ({ ...report }))
    .filter((report) => report.name?.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "address", headerName: "Address", width: 250 },
    { field: "created_at", headerName: "Created At", width: 200 },
    { field: "updated_at", headerName: "Updated At", width: 200 },
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
                type="checkbox"
                checked={allUsers}
                onChange={() => setAllUsers(!allUsers)}
              /> All Users
            </label>
            <label className="me-3">
              <input
                type="checkbox"
                checked={allActiveUsers}
                onChange={() => setAllActiveUsers(!allActiveUsers)}
              /> Active Users
            </label>
            <label className="me-3">
              <input
                type="checkbox"
                checked={topUsers}
                onChange={() => setTopUsers(!topUsers)}
              /> Top Users
            </label>
            <button className="btn btn-primary ms-3" onClick={loadReports}>
              Apply Filters
            </button>
          </div>

          {/* Search Input */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Data Grid */}
          {reports.length > 0 ? (
            <Box sx={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={formattedReports}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.phone}
              />
            </Box>
          ) : (
            <p>No reports available</p>
          )}
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default ViewReports;
