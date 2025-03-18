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

const AddConfigurationMeta = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);

  const instituteId = useSelector((state) => state.institute.instituteId);

  // if(instituteId){
  //   console.log("ins_id",instituteId);
  //  }

  const [formData, setFormData] = useState({
    institute: instituteId,
    list: "",
    sub_list: "important link",
    link_url: "",
    description: "",
  });

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
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

    const formDataToSend = new FormData();
    formDataToSend.append("institute", instituteId);
    formDataToSend.append("list", formData.list);
    formDataToSend.append("sub_list", formData.sub_list);
    formDataToSend.append("link_url", formData.link_url);
    formDataToSend.append("description", formData.description);

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configuration-meta`,
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
        text: "Configuration meta added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setTimeout(() => router.push("/configuration/metas"), 2000);
    } catch (error) {
      setErrors(error.response?.data || {});
      toast.error("Error adding meta!");
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
              <h3 className="mb-0 text-dark">Add Important Links</h3>
              <Link href="/configuration/metas" className="btn btn-white">
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
                  <Form.Label>Link Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="list"
                    value={formData.list}
                    onChange={handleInputChange}
                    isInvalid={!!errors.list}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.list?.join(", ")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
           
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Image Upload</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    isInvalid={!!errors.image}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.image?.join(", ")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col lg={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Link URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="link_url"
                    value={formData.link_url}
                    onChange={handleInputChange}
                    isInvalid={!!errors.link_url}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.link_url?.join(", ")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    isInvalid={!!errors.description}
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

export default AddConfigurationMeta;