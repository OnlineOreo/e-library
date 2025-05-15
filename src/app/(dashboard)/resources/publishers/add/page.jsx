"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container, Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import { FaMinusCircle } from "react-icons/fa";

const AddPublishers = () => {
  const router = useRouter();
  const successToaster = (text) => toast(text);
  const errorToaster = (text) => toast.error(text);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    publisher_name: "",
    web_url: "",
    image: "",
    address: "",
    redirect_url: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});

    const token = getToken();
    if (!token) {
      router.push("/authentication/sign-in");
      setIsLoading(false);
      return;
    }

    let formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/publishers`,
        formDataToSend,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        title: "Success!",
        text: "Publisher created successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setIsLoading(false);
      setFormData({
        publisher_name: "",
        web_url: "",
        image: "",
        address: "",
        redirect_url: "",
      });
    } catch (error) {
      setIsLoading(false);
      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        errorToaster("Something went wrong!");
      }
    }
  };

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Add Publishers</h3>
              <Link href="../publishers" className="btn btn-white">
                <FaMinusCircle /> Back
              </Link>
            </div>
          </Col>
        </Row>
        <div className="card p-6 mt-5">
          <Form onSubmit={handleSubmit}>
            <Row className="justify-content-start">
              {Object.keys(formData).map((key) =>
                key !== "image" ? (
                  <Col lg={6} className="mb-3" md={6} xs={12} key={key}>
                    <Form.Group controlId={`form${key}`}>
                      <Form.Label>
                        {key.replace("_", " ").toUpperCase()}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name={key}
                        value={formData[key]}
                        onChange={handleInputChange}
                        placeholder={`Enter ${key.replace("_", " ")}`}
                        isInvalid={!!errors[key]}
                      />
                      {errors[key] && (
                        <Form.Control.Feedback type="invalid">
                          {errors[key][0]}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                ) : (
                  <Col lg={6} className="mb-3" md={6} xs={12} key={key}>
                    <Form.Group controlId={`form${key}`}>
                      <Form.Label>Upload Image</Form.Label>
                      <Form.Control
                        type="file"
                        name={key}
                        onChange={handleFileChange}
                        isInvalid={!!errors[key]}
                      />
                      {errors[key] && (
                        <Form.Control.Feedback type="invalid">
                          {errors[key][0]}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                )
              )}
              <Col lg={12} className="mb-3" md={3} xs={12}>
                <Button
                  variant="primary"
                  className="w-100"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <ToastContainer />
      </Container>
    </Fragment>
  );
};

export default AddPublishers;
