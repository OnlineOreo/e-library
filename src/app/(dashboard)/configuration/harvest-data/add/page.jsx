"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Container, Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import Link from "next/link";
import { FaMinusCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const AddHarvestData = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const instituteId = useSelector((state) => state.institute.instituteId);

  const [formData, setFormData] = useState({
    url: "",
    title: "",
    publisher: "",
    description:"",
    institute: instituteId || "",
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, institute: instituteId || "" }));
  }, [instituteId]);

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    const token = getToken();
    if (!token) {
      toast.error("Authentication required!");
      router.push("/authentication/sign-in");
      setIsLoading(false);
      return;
    }
    
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/harvest-data`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      
      Swal.fire({
        title: "Success!",
        text: "Harvest data added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
      router.push("/configuration/harvest-data");
    } catch (error) {
      const errorData = error.response?.data || {};
      setErrors(errorData);
      toast.error(errorData.message || "Something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Add Harvest Data</h3>
              <Link href="/configuration/harvest-data" className="btn btn-white">
                <FaMinusCircle /> Back
              </Link>
            </div>
          </Col>
        </Row>
        <div className="card p-6 mt-5">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    isInvalid={!!errors.url}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.url?.join(", ")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    isInvalid={!!errors.title}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title?.join(", ")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>publisher</Form.Label>
                  <Form.Control
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                    isInvalid={!!errors.publisher}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.publisher?.join(", ")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={formData.descvription}
                    onChange={handleChange}
                    isInvalid={!!errors.descvription}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description?.join(", ")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
           
            <Button className="w-100" disabled={isLoading} type="submit">
              {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
            </Button>
          </Form>
        </div>
        <ToastContainer />
      </Container>
    </>
  );
};

export default AddHarvestData;
