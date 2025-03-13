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
  const { id } = useParams(); // Get ID from URL params
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  const [formData, setFormData] = useState({
    list: "",
    link_url: "",
    description: "",
  });

  const getToken = () => localStorage.getItem("access_token");

  useEffect(() => {
    const fetchMeta = async () => {
      const token = getToken();
      if (!token) {
        router.push("/authentication/sign-in");
        return;
      }
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configuration-meta?configuration_meta_id=${id}`,
          {
            headers: { Authorization: token },
          }
        );
        setFormData({
          list: data.list,
          link_url: data.link_url,
          description: data.description,
        });
        setExistingImage(data.image || ""); // Store existing image URL
      } catch (error) {
        toast.error("Failed to load meta.");
      }
    };

    fetchMeta();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]); // Save selected file
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
    formDataToSend.append("list", formData.list);
    formDataToSend.append("sub_list", "important link"); // Hidden field
    formDataToSend.append("link_url", formData.link_url);
    formDataToSend.append("description", formData.description);

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configuration-meta?configuration_meta_id=${id}`,
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
        text: "Configuration meta updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setTimeout(() => router.push("/configuration/metas"), 2000);
    } catch (error) {
      setErrors(error.response?.data || {});
      toast.error("Error updating meta!");
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
              <h3 className="mb-0 text-dark">Edit Important Links</h3>
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
                  <Form.Label>List</Form.Label>
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
                  {existingImage && (
                    <div className="mt-2">
                      <p>Current Image:</p>
                      <img
                        src={existingImage}
                        alt="Meta"
                        style={{ width: "100px", borderRadius: "5px" }}
                      />
                    </div>
                  )}
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
