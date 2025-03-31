"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { useRouter } from "next/navigation";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";



const ViewReports = () => {
  const router = useRouter();
  const successToaster = (text) => toast.success(text);
  const errorToaster = (text) => toast.error(text);

  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const instituteId = useSelector((state) => state.institute.instituteId);

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    if(instituteId){
    loadReports();
    }
  }, [instituteId]);

  const loadReports = async () => {
    const token = getToken();
    if (!token) {
      errorToaster("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }
  
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports?institute_id=${instituteId}&all_users=true&all_active_users=true`,
        {
          headers: { Authorization: `${token}` },
        }
      );
  
      if (response.status === 200) {
        setReports(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      errorToaster("Failed to load reports.");
      setReports([]); // Ensure it's always an array
    }
  };
  

  const formattedReports = reports
    .map((report) => ({ ...report }))
    .filter((report) => report.name.toLowerCase().includes(search.toLowerCase()));

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
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
