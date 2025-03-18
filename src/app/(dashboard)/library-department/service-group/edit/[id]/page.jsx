"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaMinusCircle } from "react-icons/fa";

export default function EditServiceGroup() {
  const router = useRouter();
  const { id } = useParams();
  const [serviceName, setServiceName] = useState("");
  const [loading, setLoading] = useState(false);

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    const token = getToken();
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/service-groups?sg_id=${id}`, {
          headers: { Authorization: `${token}` },
        })
        .then((response) => setServiceName(response.data.service_name))
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = getToken();

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/service-groups?sg_id=${id}`,
        { service_name: serviceName },
        {
          headers: { Authorization: `${token}` },
        }
      );
      Swal.fire({
        title: "Success!",
        text: "Service group updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
      router.push("/library-department/service-group");
    } catch (error) {
      toast.error("Failed to update service group!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12} className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Edit Service Group</h3>
              <Link href="/library-department/service-group" className="btn btn-white">
                <FaMinusCircle /> Back
              </Link>
            </div>
          </Col>
        </Row>
        <div className="card p-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="serviceName">
              <Form.Label>Service Group Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter service group name"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
              {loading ? "Updating..." : "Update Service Group"}
            </Button>
          </Form>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}
