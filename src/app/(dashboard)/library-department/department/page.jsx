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
      loadDepartment();
    }
  }, [isClient]);

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token");
    }
    return null;
  };

  const loadDepartment = async () => {
    const token = getToken();
    if (!token) {
      router.push("/authentication/sign-in");
      return;
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/departments`, {
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
    { field: "department_id", headerName: "User ID", width: 200 },
    { field: "department_name", headerName: "Department Name", width: 300 },
    { field: "department_code", headerName: "Department Code", width: 220 },
    { field: "library_name", headerName: "Library", width: 200 },
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

  const deleteAction = async (departmentId) => {
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
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/departments?department_id=${departmentId}`,
            { headers: { Authorization: `${token}` } }
          );
    
          const updatedUsers = users.filter(user => user.department_id !== departmentId);
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers);
          Swal.fire("Deleted!", "Department has been deleted.", "success");
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
    router.push(`/library-department/department/edit/${params.id}`);
  };

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Department</h3>
              <Link href="/library-department/department/add" className="btn btn-white">
                <FaPlusCircle /> Department
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
                  getRowId={(row) => row.department_id}
                  rows={filteredUsers}
                  columns={columns}
                  pageSize={5}
                  columnVisibilityModel={{ department_id: false }}
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