"use client";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const Department = () => {
  const [notices, setNotices] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const router = useRouter();

  const instituteId = useSelector((state) => state.institute.instituteId);


  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const loadNotices = async () => {
    const token = getToken();
    if (!token) {
      router.push("/authentication/sign-in");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notices?institute=${instituteId}`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      if (response.status === 200) {
        setNotices(response.data);
        setFilteredNotices(response.data);
      }
    } catch (error) {
      console.error("Axios Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (instituteId) {
        loadNotices();
      }
    }
  }, [instituteId]);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);

    if (searchValue === "") {
      setFilteredNotices(notices);
    } else {
      const lowerSearch = searchValue.toLowerCase();
      const filtered = notices.filter(
        (notice) =>
          notice.description.toLowerCase().includes(lowerSearch) ||
          String(notice.notice_id).toLowerCase().includes(lowerSearch)
      );
      setFilteredNotices(filtered);
    }
  };

  const columns = [
    { field: "notice_id", headerName: "Notice Id", flex: 1 },
    { field: "description", headerName: "Description", flex: 4 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div className="d-flex align-items-center mt-3">
          <button
            onClick={() => handleEdit(params)}
            className="btn btn-primary btn-sm mx-2"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => deleteAction(params.id)}
            className="btn btn-danger btn-sm"
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      ),
    },
  ];

  const deleteAction = async (notice_id) => {
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
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notices?notice_id=${notice_id}`,
            {
              headers: { Authorization: `${token}` },
            }
          );
          Swal.fire("Deleted!", "Notices has been deleted.", "success");
          loadNotices();
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "warning",
            title: "Delete Failed!",
            text:
              error.response?.data?.message ||
              "An error occurred while deleting.",
            position: "center",
            showConfirmButton: true,
            timer: 3000,
          });
        }
      }
    });
  };

  const handleEdit = (params) => {
    router.push(`/configuration/notice/edit/${params.id}`);
  };

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Notices</h3>
              <Link href="/configuration/notice/add" className="btn btn-white">
                <FaPlusCircle /> New Notice
              </Link>
            </div>
          </Col>
        </Row>
        <div className="card p-3 mt-4">
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="Search..."
            className="form-control mb-3"
          />
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Box sx={{ minWidth: 800, height: 500 }}>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <DataGrid
                  getRowId={(row) => row.notice_id}
                  rows={filteredNotices}
                  columns={columns}
                  pageSize={5}
                  columnVisibilityModel={{ notice_id:false }}
                />
              )}
            </Box>
          </Box>
        </div>
      </Container>
    </Fragment>
  );
};

export default Department;
