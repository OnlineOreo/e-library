"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { Container, Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import Link from "next/link";
import { FaMinusCircle } from "react-icons/fa";

const EditConfigurationMeta = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [institutes, setInstitutes] = useState([]);
  const [existingImage, setExistingImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    page_name: "",
    page_image: null,
    page_content: "",
  });

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    const fetchInstitutes = async () => {
      const token = getToken();
      if (!token) {
        router.push("/authentication/sign-in");
        return;
      }
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/institutes`,
          {
            headers: { Authorization: token },
          }
        );
        setInstitutes(data);
      } catch (error) {
        toast.error("Failed to load institutes.");
      }
    };

    const fetchPageData = async () => {
      const token = getToken();
      if (!token) {
        router.push("/authentication/sign-in");
        return;
      }
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dynamic-page?page_id=${id}`,
          {
            headers: { Authorization: token },
          }
        );
        setFormData({
          page_name: data.page_name,
          page_image: null,
          institute:'',
          page_content: data.page_content,
        });
        setExistingImage(data.page_image);
      } catch (error) {
        toast.error("Failed to load page data.");
      }
    };

    fetchInstitutes();
    fetchPageData();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file" && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
      setPreviewImage(URL.createObjectURL(files[0]));
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
        if (value) formDataToSend.append(key, value);
      });

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dynamic-page?page_id=${id}`,
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
        text: "Page updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setTimeout(() => router.push("/configuration/dynamic-page"), 2000);
    } catch (error) {
      setErrors(error.response?.data || {});
      toast.error("Error updating page!");
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
              <h3 className="mb-0 text-dark">Edit Dynamic page</h3>
              <Link href="../" className="btn btn-white">
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
                  <Form.Label>Page name</Form.Label>
                  <Form.Control
                    type="text"
                    name="page_name"
                    value={formData.page_name}
                    onChange={handleInputChange}
                    placeholder="Enter page name"
                    isInvalid={!!errors.page_name}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.page_name?.join(", ")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" name="page_image" onChange={handleInputChange} isInvalid={!!errors.page_image} />
                  {(previewImage || existingImage) && (
                    <div className="avatar avatar-md mt-1">
                      <img
                        src={previewImage || existingImage}
                        alt="Preview"
                        required
                        width={100}
                        height={100}
                        className="mb-2 rounded-circle"
                      />
                    </div>
                  )}
                  <Form.Control.Feedback type="invalid">{errors.page_image?.join(", ")}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Page content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="page_content"
                    value={formData.page_content}
                    onChange={handleInputChange}
                    isInvalid={!!errors.page_content}
                    placeholder="Enter page content"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.page_content?.join(", ")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Button className="w-100" disabled={isLoading} type="submit">
              {isLoading ? <Spinner animation="border" size="sm" /> : "Update"}
            </Button>
          </Form>
        </div>
        <ToastContainer />
      </Container>
    </>
  );
};

export default EditConfigurationMeta;