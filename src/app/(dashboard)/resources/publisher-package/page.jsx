"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { FaEdit , FaEye, FaPlusCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

const ViewItemTypes = () => {
  const router = useRouter();
  const successToaster = (text) => toast(text);
  const errorToaster = (text) => toast.error(text);

  const [publisherPkg, setPublisherPkg] = useState([]);
  const [search, setSearch] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("access_token"));
    }
  }, []);

  useEffect(() => {
    if (token) {
      loadItemTypes();
    }
  }, [token]);

  const loadItemTypes = async () => {
    if (!token) {
      errorToaster("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publisher-packages`,
        {
          headers: { Authorization: `${token}` },
        }
      );

      if (response.status === 200) {
        setPublisherPkg(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (params) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Deletes package with all mapping!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          var deleteMappingIdArr = [];
          params.row.mappings.forEach(element => {
            deleteMappingIdArr.push(element.publisher_package_mapping_id);
          });
          var deleteMappingParam = deleteMappingIdArr.join(',');
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publisher-packages?package_id=${params.id}&mapping_ids=${deleteMappingParam}&delete_all=True`,
            {
              headers: { Authorization: `${token}` },
            }
          );
          Swal.fire("Deleted!", "Publisher package has been deleted.", "success");
          setPublisherPkg((prev) => 
            prev.filter((item) => item.package_id !== params.id)
          );
        } catch (error) {
          errorToaster("Something went wrong!");
          console.log(error);
        }
      }
    });
  };

  const handleEdit = (params) => {
    router.push(`/resources/publisher-package/edit/${params.id}`);
  };
  const handleShow = (params) => {
    router.push(`/resources/publisher-package/show/${params.id}`);
  };

  const columns = [
    { field: "package_name", headerName: "Package Name", width: 250 },
    { field: "created_at", headerName: "Created At", width: 200 },
    { field: "publisher", headerName: "Publisher", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleShow(params)} className="btn btn-secondary btn-sm">
            <FaEye />
          </button>
          <button onClick={() => handleEdit(params)} className="btn btn-primary mx-2 btn-sm">
            <FaEdit />
          </button>
          <button onClick={() => handleDelete(params)} className="btn btn-danger mx-2 btn-sm">
            <RiDeleteBin6Line />
          </button>
        </div>
      ),
    },
  ];

  // Ensure DataGrid receives correctly formatted rows
  const formattedItemTypes = publisherPkg.map((item) => ({
    id: item.package_id,
    ...item,
  }));

  return (
    <>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Publisher Packages</h3>
              <Link href="./publisher-package/add" className="btn btn-white">
                <FaPlusCircle /> Publisher Package
              </Link>
            </div>
          </Col>
        </Row>
        <div className="card p-3 mt-4">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by package name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {formattedItemTypes.length > 0 ? (
            <Box sx={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={formattedItemTypes}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.id}
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

export default ViewItemTypes;
