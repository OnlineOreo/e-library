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
    media_name: "",
    image: null,
    description: "",
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

    const fetchMediaData = async () => {
      const token = getToken();
      if (!token) {
        router.push("/authentication/sign-in");
        return;
      }
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configuration-media?configuration_media_id=${id}`,
          {
            headers: { Authorization: token },
          }
        );
        setFormData({
          media_name: data.media_name,
          image: null,
          description: data.description,
        });
        setExistingImage(data.image);
      } catch (error) {
        toast.error("Failed to load media data.");
      }
    };

    fetchInstitutes();
    fetchMediaData();
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configuration-media?configuration_media_id=${id}`,
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

      setTimeout(() => router.push("/configuration/media"), 2000);
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
              <h3 className="mb-0 text-dark">Edit Configuration Media</h3>
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
                  <Form.Label>Media Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="media_name"
                    value={formData.media_name}
                    onChange={handleInputChange}
                    placeholder="Enter media name"
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
                  <Form.Control type="file" name="image" onChange={handleInputChange} isInvalid={!!errors.image} />
                  {(previewImage || existingImage) && (
                    <div className="avatar avatar-md mt-1">
                      <img
                        src={previewImage || existingImage}
                        alt="Preview"
                        width={100}
                        height={100}
                        className="mb-2 rounded-circle"
                      />
                    </div>
                  )}
                  <Form.Control.Feedback type="invalid">{errors.image?.join(", ")}</Form.Control.Feedback>
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
                    placeholder="Enter description"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description?.join(", ")}
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
