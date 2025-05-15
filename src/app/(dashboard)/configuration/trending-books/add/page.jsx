"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Container, Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import Link from "next/link";
import { useSelector } from "react-redux";
import { FaMinusCircle } from "react-icons/fa";

export default function AddTrendingBook() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const instituteId = useSelector((state) => state.institute.instituteId);

  const [book, setBook] = useState({
    institute: instituteId,
    book_title: "",
    url: "",
    description: "",
  });

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!book.book_title.trim()) newErrors.book_title = "Book title is required.";
    if (!book.url.trim()) newErrors.url = "URL is required.";
    else if (!/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(book.url.trim()))
      newErrors.url = "Enter a valid URL.";
    if (!book.description.trim()) newErrors.description = "Description is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    const token = getToken();
    if (!token) {
      toast.error("Authentication required!");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("institute", instituteId);
      formData.append("book_title", book.book_title);
      formData.append("url", book.url);
      formData.append("description", book.description);
      if (file) formData.append("book_image", file);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trending-books`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        title: "Success!",
        text: "Book added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      router.push("/configuration/trending-books");
    } catch (error) {
      if (error.response && error.response.data) {
        const apiErrors = error.response.data;
        const formattedErrors = {};
    
        Object.keys(apiErrors).forEach((field) => {
          formattedErrors[field] = apiErrors[field][0]; 
        });
    
        setErrors(formattedErrors);
      }
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
              <h3 className="mb-0 text-dark">Add Trending Book</h3>
              <Link href="/configuration/trending-books" className="btn btn-white">
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
                  <Form.Label>Book Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="book_title"
                    value={book.book_title}
                    placeholder="Enter book title"
                    onChange={handleChange}
                    isInvalid={!!errors.book_title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.book_title}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>URL</Form.Label>
                  <Form.Control
                    type="url"
                    name="url"
                    placeholder="Enter URL"
                    value={book.url}
                    onChange={handleChange}
                    isInvalid={!!errors.url}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.url}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                  placeholder="Enter description"
                    as="textarea"
                    rows={3}
                    name="description"
                    value={book.description}
                    onChange={handleChange}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Book Cover (Optional)</Form.Label>
                  <Form.Control
                    type="file"
                    name="book_image"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ width: "100px", borderRadius: "5px" }}
                      />
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Button className="w-100" disabled={isLoading} type="submit">
              {isLoading ? <Spinner animation="border" size="sm" /> : "Add Book"}
            </Button>
          </Form>
        </div>
        <ToastContainer />
      </Container>
    </>
  );
}
