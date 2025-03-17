"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Container, Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import Link from "next/link";
import { FaMinusCircle } from "react-icons/fa";

const AddDynamicPage = () => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    page_name: "",
    page_image: null,
    page_content:'',
    institute:'d82fc520-2536-4cc0-a744-3f6b9d20bc46'
  });

  const getToken = () => localStorage.getItem("access_token");

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] }); 
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dynamic-page`,
        formDataToSend,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        title: "Success!",
        text: "Page created successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setTimeout(() => router.push("/configuration/dynamic-page"), 2000);
    } catch (error) {
      setErrors(error.response?.data || {});
      toast.error("Error adding dynamic page!");
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
              <h3 className="mb-0 text-dark">Add Page</h3>
              <Link href="../dynamic-page" className="btn btn-white">
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
                  <Form.Label>Page Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="page_name"
                    value={formData.page_name}
                    onChange={handleInputChange}
                    placeholder="Enter page name"
                    required
                    isInvalid={!!errors.media_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.media_name?.join(", ")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="page_image"
                    onChange={handleInputChange}
                    isInvalid={!!errors.page_image}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.page_image?.join(", ")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="page_content"
                    value={formData.page_content}
                    onChange={handleInputChange}
                    isInvalid={!!errors.page_content}
                    placeholder="Enter page content"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.page_content?.join(", ")}
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

export default AddDynamicPage;
