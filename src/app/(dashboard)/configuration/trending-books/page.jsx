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

export default function TrendingBooks() {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const instituteId = useSelector((state) => state.institute.instituteId);

  useEffect(() => {
    if(instituteId){
    if (typeof window !== "undefined") {
      loadBooks();
    }
  }
  }, [instituteId]);

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const loadBooks = async () => {
    const token = getToken();
    if (!token) {
      toast.error("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trending-books?institute=${instituteId}`,
        { headers: { Authorization: `${token}` } }
      );
      if (response.status === 200 && Array.isArray(response.data)) {
        setBooks(response.data);
      } else {
        toast.error("Invalid data format received from the API.");
      }
    } catch (error) {
      toast.error("Failed to load books.");
    }
  };

  const handleEdit = (row) => {
    router.push(`./trending-books/edit/${row.trending_book_id}`);
  };

  const handleDelete = async (row) => {
    const token = getToken();
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the book!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trending-books?trending_book_id=${row.trending_book_id}`,
            { headers: { Authorization: `${token}` } }
          );
          Swal.fire("Deleted!", "Book has been deleted.", "success");
          setBooks((prev) => prev.filter((item) => item.trending_book_id !== row.trending_book_id));
        } catch (error) {
          toast.error("Error deleting book!");
          console.error(error);
        }
      }
    });
  };

  const columns = [
    { field: "book_title", headerName: "Title", flex: 2 },
    { field: "url", headerName: "Url", flex: 3 }, 
    { field: "description", headerName: "Description", flex: 3 },
    {
      field: "book_image",
      headerName: "Cover",
      flex: 1, 
      renderCell: (params) =>
        params.value ? (
          <img
            src={params.value}
            alt="Book Cover"
            style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "5px" }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div className="d-flex gap-2 mt-2">
          <button onClick={() => handleEdit(params.row)} className="btn btn-primary btn-sm">
            <FaEdit />
          </button>
          <button onClick={() => handleDelete(params.row)} className="btn btn-danger btn-sm">
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
              <h3 className="mb-0 text-dark">Trending Books</h3>
              <div>
                <Link href="./trending-books/add" className="btn btn-white">
                  <FaPlusCircle /> Add Book
                </Link>
              </div>
            </div>
          </Col>
        </Row>
        <div className="card p-3 mt-4">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by Title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {books.length > 0 ? (
            <Box sx={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={books.filter((b) => b?.book_title?.toLowerCase().includes(search.toLowerCase()))}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.trending_book_id}
              />
            </Box>
          ) : (
            <p>No trending books found.</p>
          )}
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}
