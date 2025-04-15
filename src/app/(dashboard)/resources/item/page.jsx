"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row, Modal , Button} from "react-bootstrap";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit, FaPlusCircle, FaEye, FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import ImportBulkItems from "./ImportBulkItems";

export default function Item() {
  const router = useRouter();
  const [item, setItem] = useState([]);
  const [search, setSearch] = useState("");

  const [showImportModal, setShowImportModal] = useState(false);

  const handleOpenModal = () => setShowImportModal(true);
  const handleCloseModal = () => setShowImportModal(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      loadItem();
    }
  }, []);

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const loadItem = async () => {
    const token = getToken();
    if (!token) {
      toast.error("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items`,
        { headers: { Authorization: `${token}` } }
      );
      if (response.status === 200) {
        setItem(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAll = async () => {
    const token = getToken();
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete ALL items and cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete all!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items/delete-all`,
            {
              headers: { Authorization: `${token}` },
            }
          );
          Swal.fire("Deleted!", "All items have been deleted.", "success");
          setItem([]);
        } catch (error) {
          toast.error("Error deleting all items!");
          console.error(error);
        }
      }
    });
  };

  const handleEdit = (params) => {
    router.push(`/resources/item/edit/${params.id}`);
  };

  const handleView = (params) => {
    router.push(`/resources/item/show/${params.id}`);
  };

  const handleDelete = async (params) => {
    const token = getToken();
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
            deleteMappingIdArr.push(element.item_package_mapping_id);
          });

          var deleteMappingParam = deleteMappingIdArr.join(",");
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items?item_id=${params.id}&mapping_ids=${deleteMappingParam}&delete_all=True`,
            {
              headers: { Authorization: `${token}` },
            }
          );
          Swal.fire(
            "Deleted!",
            "Publisher package has been deleted.",
            "success"
          );
          setItem((prev) => prev.filter((item) => item.item_id !== params.id));
        } catch (error) {
          console.log(error);
          // errorToaster("Something went wrong!");
        }
      }
    });
  };

  const columns = [
    { field: "title", headerName: "Title", flex: 2 },
    { field: "author", headerName: "Author", flex: 2 },
    { field: "place", headerName: "Place", flex: 2 },
    { field: "year", headerName: "Year", flex: 2 },
    { field: "ISBN", headerName: "ISBN", flex: 2 },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleView(params)}
            className="btn btn-info btn-sm mx-1"
          >
            <FaEye />
          </button>
          <button
            onClick={() => handleEdit(params)}
            className="btn btn-primary btn-sm mx-1"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(params)}
            className="btn btn-danger btn-sm mx-1"
          >
            <RiDeleteBin6Line />
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
              <h3 className="mb-0 text-dark">Items</h3>
              <div>
                {/* <Button
                  variant="white"
                  onClick={handleOpenModal}
                  className="me-2"
                >
                  <FaPlusCircle /> Import Items
                </Button> */}
                <Link href="./item/add" className="btn btn-white">
                  <FaPlusCircle /> Add Item
                </Link>
              </div>
            </div>
          </Col>
        </Row>
        <div className="card p-3 mt-4">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Box sx={{ minWidth: "800px", height: 500 }}>
              <DataGrid
                rows={item}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.item_id}
              />
            </Box>
          </Box>
        </div>
      </Container>
      <Modal show={showImportModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Import Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImportBulkItems />
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
}
