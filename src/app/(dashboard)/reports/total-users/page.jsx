"use client";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ButtonGroup } from "@mui/material";

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
      loadReports(instituteId);
    }
  }, [instituteId, filter]);

  const loadReports = async (instituteId) => {
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
    .map((report, index) => ({
      ...report,
      id: `${report.id}-${index}`, // ensures the id is unique for DataGrid
    }))
    .filter((report) =>
      report.name?.toLowerCase().includes(search.toLowerCase())
    );

  const columns = [
    { field: "id", headerName: "ID", flex: 2 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "phone_number", headerName: "Phone", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "created_at", headerName: "Created At", flex: 2 },
    { field: "designation", headerName: "Designation", flex: 2 },
  ];

  // Function to download table as CSV
  const downloadCSV = () => {
    const rows = formattedReports.map((row) =>
      columns.map((col) => row[col.field])
    );
    const csvContent = [
      columns.map((col) => col.headerName).join(","),
      ...rows.map((row) => row.join(",")),
    ]
      .map((e) => e.replace(/(?:\r\n|\r|\n)/g, "")) // Remove newlines in CSV data
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "user_reports.csv");
    link.click();
    URL.revokeObjectURL(url);
  };

  // Function to download table as Excel
  const downloadExcel = () => {
    const rows = formattedReports.map((row) =>
      columns.map((col) => row[col.field])
    );
    const excelContent = [
      columns.map((col) => col.headerName).join("\t"),
      ...rows.map((row) => row.join("\t")),
    ].join("\n");

    const blob = new Blob([excelContent], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;",
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "user_reports.xlsx");
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <div className="card p-3 mt-4">
          {/* Filters */}
          <div className="d-flex justify-content-between">
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
            </div>
            <ButtonGroup aria-label="Basic example" className="pb-2">
              <Button variant="outline-secondary" onClick={downloadCSV}>
                Download CSV
              </Button>
              <Button
                variant="outline-secondary"
                className="ms-2"
                onClick={downloadExcel}
              >
                Download Excel
              </Button>
            </ButtonGroup>
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
                getRowId={(row) => row.id}
                components={{ Toolbar: GridToolbar }}
                componentsProps={{
                  toolbar: {
                    showQuickFilter: true,
                    csvOptions: {
                      fileName: "user_reports",
                      utf8WithBom: true,
                    },
                  },
                }}
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
