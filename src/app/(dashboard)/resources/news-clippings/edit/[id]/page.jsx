"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { Container, Col, Row, Form, Button, Spinner, Image } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import Link from "next/link";
import { FaMinusCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const EditNewsClipping = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const instituteId = useSelector((state) => state.institute.instituteId);

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    thumbnail: null,
    attachment: null,
    description: "",
  });
  const [prevThumbnail, setPrevThumbnail] = useState(null);
  const [prevAttachment, setPrevAttachment] = useState(null);

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (!token) {
        toast.error("Authentication required!");
        router.push("/authentication/sign-in");
        return;
      }
      
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/e-news-clips?e_news_clip_id=${id}`,
          {
            headers: { Authorization: token },
          }
        );
        setFormData({
          title: response.data.title,
          url: response.data.url,
          description: response.data.description,
          thumbnail: null,
          attachment: null,
        });
        setPrevThumbnail(response.data.thumbnail);
        setPrevAttachment(response.data.attachment);
      } catch (error) {
        toast.error("Failed to fetch news clipping data!");
      }
    };
    fetchData();
  }, [id]);

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
        if (value) {
          formDataToSend.append(key, value);
        }
      });
      formDataToSend.append("institute", instituteId);

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/e-news-clips?e_news_clip_id=${id}`,
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
        text: "E-news Clipping updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setTimeout(() => router.push("/resources/news-clippings"), 2000);
    } catch (error) {
      setErrors(error.response?.data || {});
      toast.error("Error updating E-news clipping!");
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
              <h3 className="mb-0 text-dark">Edit E-news Clipping</h3>
              <Link href="/resources/news-clippings" className="btn btn-white">
                <FaMinusCircle /> Back
              </Link>
            </div>
          </Col>
        </Row>
        <div className="card p-6 mt-5">
          <Form onSubmit={handleSubmit} noValidate>
            <Row>
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    isInvalid={!!errors.title}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.title?.join(", ")}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Url</Form.Label>
                  <Form.Control
                    type="text"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    isInvalid={!!errors.url}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.url?.join(", ")}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Thumbnail</Form.Label>
                  {prevThumbnail && <Image src={prevThumbnail} width={50} height={50} className="rounded-circle mb-3 ms-4" />}
                  <Form.Control type="file" name="thumbnail" onChange={handleInputChange} isInvalid={!!errors.thumbnail} />
                  <Form.Control.Feedback type="invalid">{errors.thumbnail?.join(", ")}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Attachment</Form.Label>
                  {prevAttachment && <p><a href={prevAttachment} target="_blank" rel="noopener noreferrer">View Previous Attachment</a></p>}
                  <Form.Control type="file" name="attachment" onChange={handleInputChange} isInvalid={!!errors.attachment} />
                  <Form.Control.Feedback type="invalid">{errors.attachment?.join(", ")}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button className="w-100" disabled={isLoading} type="submit">{isLoading ? <Spinner animation="border" size="sm" /> : "Update"}</Button>
          </Form>
        </div>
        <ToastContainer />
      </Container>
    </>
  );
};

export default EditNewsClipping;