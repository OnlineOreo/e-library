'use client';
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const Department = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isClient, setIsClient] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      loadCategories();
    }
  }, [isClient]);

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const loadCategories = async () => {
    const token = getToken();
    if (!token) {
      router.push("/authentication/sign-in");
      return;
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configuration-categories`, {
        headers: { Authorization: `${token}` },
      });
      if (response.status === 200) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      }
    } catch (error) {
      console.error("Axios Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    if (searchValue === "") {
      setFilteredUsers(users);
    } else {
      const lowerSearch = searchValue.toLowerCase();
      setFilteredUsers(
        users.filter((user) =>
          user.department_name.toLowerCase().includes(lowerSearch) ||
          user.department_code.toLowerCase().includes(lowerSearch) ||
          user.library.toLowerCase().includes(lowerSearch)
        ) 
      );
    }
  };

  const columns = [
    { field: "configuration_category_id", headerName: "Contegory Id", width: 200 },
    { field: "category_name", headerName: "Category Name", width: 500 },
    { 
      field: "image", 
      headerName: "Image", 
      width: 150,
      renderCell: (params) => (
        <img 
          src={params.value} 
          alt="Category" 
          style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "5px" }} 
        />
      ),
    },
    // { field: "description", headerName: "Description", width: 500 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params)} className="btn btn-primary btn-sm mx-2">
            <FaEdit />
          </button>
          <button onClick={() => deleteAction(params.id)} className="btn btn-danger btn-sm">
            <RiDeleteBin6Line />
          </button>
        </div>
      ),
    },
  ];
  

  const deleteAction = async (categoriesId) => {
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
          const token = getToken(); 
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configuration-categories?configuration_category_id=${categoriesId}`,
            { headers: { Authorization: `${token}` } }
          );
    
          const updatedUsers = users.filter(user => user.configuration_category_id !== categoriesId);
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers);
          Swal.fire("Deleted!", "Category has been deleted.", "success");
        } catch (error) {
          console.error("Axios Error:", error);
          Swal.fire({
            icon: "warning",
            title: "Delete Failed!",  
            text: error.error || "An error occurred while deleting.",
            position: "center",
            showConfirmButton: true,
            timer: 3000,
          });
        }
      }
    });    
  };

  const handleEdit = (params) => {
    router.push(`/configuration/categories/edit/${params.id}`);
  };

  

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Categories</h3>
              <Link href="/configuration/categories/add" className="btn btn-white">
                <FaPlusCircle /> Add Categories
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
          <Box sx={{ height: 500, width: "100%" }}>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              isClient && (
                <DataGrid
                  getRowId={(row) => row.configuration_category_id}
                  rows={filteredUsers}
                  columns={columns}
                  pageSize={5}
                  columnVisibilityModel={{ configuration_category_id: false }}
                />
              )
            )}
          </Box>
        </div>
      </Container>
    </Fragment>
  );
};

export default Department;