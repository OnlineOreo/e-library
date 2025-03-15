"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Container, Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function AddTrendingBook() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [book, setBook] = useState({
    book_title: "",
    url: "",
    description: "",
    institute: "ebfd8df2-710f-437d-8d12-e25201813ca7", // Default institute ID
  });

  const getToken = () => localStorage.getItem("access_token");

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = getToken();
    if (!token) {
      toast.error("Authentication required!");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("book_title", book.book_title);
      formData.append("url", book.url);
      formData.append("description", book.description);
      formData.append("institute", book.institute);
      if (file) {
        formData.append("book_image", file);
      }

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

      setTimeout(() => router.push("/configuration/trending-books"), 2000);
    } catch (error) {
      Swal.fire({
        title: "Failed to Add!",
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
              <h3 className="mb-0 text-dark">Add Trending Book</h3>
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
                  <Form.Control type="text" name="book_title" value={book.book_title} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>URL</Form.Label>
                  <Form.Control type="url" name="url" value={book.url} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} name="description" value={book.description} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Book Cover</Form.Label>
                  <Form.Control type="file" name="book_image" onChange={handleFileChange} accept="image/*" />
                  {imagePreview && (
                    <div className="mt-2">
                      <img src={imagePreview} alt="Preview" style={{ width: "100px", borderRadius: "5px" }} />
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
