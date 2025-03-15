"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { Container, Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function EditBook() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  const [book, setBook] = useState({
    book_title: "",
    url: "",
    description: "",
    book_image: "",
  });

  const getToken = () => localStorage.getItem("access_token");

  useEffect(() => {
    if (id) {
      loadBook();
    }
  }, [id]);

  const loadBook = async () => {
    const token = getToken();
    if (!token) {
      toast.error("Authentication required!");
      router.push("/authentication/sign-in");
      return;
    }
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trending-books?trending_book_id=${id}`,
        { headers: { Authorization: `${token}` } }
      );
      setBook(data);
      setExistingImage(data.book_image || "");
    } catch (error) {
      toast.error("Failed to load book details.");
    }
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
      const formData = new FormData();
      formData.append("book_title", book.book_title);
      formData.append("url", book.url);
      formData.append("description", book.description);
      
      if (file) {
        formData.append("book_image", file); // Append new image if selected
      }

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trending-books?trending_book_id=${id}`,
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
        text: "Book updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setTimeout(() => router.push("/configuration/trending-books"), 2000);
    } catch (error) {
      setErrors(error.response?.data || {});
      Swal.fire({
        title: "Failed to Update!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "OK",
      });
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
              <h3 className="mb-0 text-dark">Edit Book</h3>
              <Link href="/configuration/trending-books" className="btn btn-white">
                <FaArrowLeft /> Back
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
                    onChange={handleChange}
                    isInvalid={!!errors.book_title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.book_title?.join(", ")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="url"
                    value={book.url}
                    onChange={handleChange}
                    isInvalid={!!errors.url}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.url?.join(", ")}
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
                    value={book.description}
                    onChange={handleChange}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description?.join(", ")}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Book Cover</Form.Label>
                  <Form.Control
                    type="file"
                    name="book_image"
                    onChange={handleFileChange}
                    isInvalid={!!errors.book_image}
                  />
                  {existingImage && (
                    <div className="mt-2">
                      <p>Current Image:</p>
                      <img
                        src={existingImage}
                        alt="Book Cover"
                        style={{ width: "100px", borderRadius: "5px" }}
                      />
                    </div>
                  )}
                  <Form.Control.Feedback type="invalid">
                    {errors.book_image?.join(", ")}
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
}
