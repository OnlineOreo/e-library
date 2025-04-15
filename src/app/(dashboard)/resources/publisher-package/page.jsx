"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row, Modal, Button } from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { FaEdit, FaEye, FaPlusCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import ImportPublisherPackage from "./ImportPublisherPackage";

const ViewItemTypes = () => {
  const router = useRouter();
  const successToaster = (text) => toast(text);
  const errorToaster = (text) => toast.error(text);

  const [publisherPkg, setPublisherPkg] = useState([]);
  const [search, setSearch] = useState("");

  const [showImportModal, setShowImportModal] = useState(false);

  const handleOpenModal = () => setShowImportModal(true);
  const handleCloseModal = () => setShowImportModal(false);

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      loadItemTypes();
    }
  }, []);

  const loadItemTypes = async () => {
    const token = getToken();
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
          params.row.mappings.forEach((element) => {
            deleteMappingIdArr.push(element.publisher_package_mapping_id);
          });
          var deleteMappingParam = deleteMappingIdArr.join(",");
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publisher-packages?package_id=${params.id}&mapping_ids=${deleteMappingParam}&delete_all=True`,
            {
              headers: { Authorization: `${token}` },
            }
          );
          Swal.fire(
            "Deleted!",
            "Publisher package has been deleted.",
            "success"
          );
          setPublisherPkg((prev) =>
            prev.filter((item) => item.package_id !== params.id)
          );
        } catch (error) {
          errorToaster("Something went wrong!");
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
    { field: "package_name", headerName: "Package Name", flex: 2 },
    { field: "created_at", headerName: "Created At", flex: 2 },
    { field: "publisher", headerName: "Publisher", flex: 2 },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleShow(params)}
            className="btn btn-secondary btn-sm"
          >
            <FaEye />
          </button>
          <button
            onClick={() => handleEdit(params)}
            className="btn btn-primary mx-2 btn-sm"
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
              <div>
                {/* <Button
                  variant="white"
                  onClick={handleOpenModal}
                  className="me-2"
                >
                  <FaPlusCircle /> Import Publisher Package
                </Button> */}
                <Link href="./publisher-package/add" className="btn btn-white">
                  <FaPlusCircle /> Publisher Package
                </Link>
              </div>
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
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Box sx={{ minWidth: "800px", height: 500 }}>
              <DataGrid
                rows={formattedItemTypes}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.id}
              />
            </Box>
          </Box>
        </div>
      </Container>
      {/* Modal with ImportPublisher */}
      <Modal show={showImportModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Import Publisher Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImportPublisherPackage />
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default ViewItemTypes;
