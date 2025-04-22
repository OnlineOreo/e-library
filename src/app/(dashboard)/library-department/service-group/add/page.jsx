"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Swal from "sweetalert2";
import { FaMinusCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function AddServiceGroup() {
  const router = useRouter();
  const [serviceName, setServiceName] = useState("");
  const [loading, setLoading] = useState(false);
  const instituteId = useSelector((state) => state.institute.instituteId);

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const handleSubmit = async (e,instituteId) => {
    e.preventDefault();
    if (!serviceName.trim()) {
      toast.error("Service name is required!");
      return;
    }

    const token = getToken();
    if (!token) {
      toast.error("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/service-groups?institute_id=${instituteId}`,
        { service_name: serviceName },
        { headers: { Authorization: `${token}` } }
      );
      if (response.status === 201) {
         Swal.fire({
                        title: "Success!",
                        text: "Service Group added successfully!",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
        
        setTimeout(() => router.push("/library-department/service-group"), 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
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
              <h3 className="mb-0 text-dark">Add Service Group</h3>
              <Link href="/library-department/service-group" className="btn btn-white">
                <FaMinusCircle /> Back</Link>
            </div>
          </Col>
        </Row>
        <div className="card p-4">
          <Form onSubmit={(e)=>handleSubmit(e,instituteId)}>
            <Form.Group controlId="serviceName">
              <Form.Label>Service Group Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter service group name"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
              {loading ? "Adding..." : "Add Service Group"}
            </Button>
          </Form>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}