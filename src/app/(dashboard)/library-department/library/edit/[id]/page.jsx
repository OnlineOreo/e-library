"use client";

import React from "react";
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Container, Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";

const EditLibrary = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [institutes, setInstitutes] = useState([]);

  // Default form data
  const defaultFormData = {
    library_name: "",
    domain: "",
    address: "",
    email: "",
    phone: "",
    institute: "",
    email_config: {
      mail_host: "",
      mail_driver: "",
      mail_encryption: "",
      mail_from_address: "",
      mail_port: "",
      mail_password: "",
      mail_username: "",
      mail_from_name: "",
    },
  };

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("access_token"));
    }

    const fetchInstitutes = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/institutes`,
          {
            headers: { Authorization: localStorage.getItem("access_token") },
          }
        );
        setInstitutes(response.data || []);
      } catch (error) {
        console.error("Error fetching institutes", error);
      }
    };

    const fetchLibraryData = async () => {
      if (!id) return;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/libraries?library_id=${id}`,
          {
            headers: { Authorization: localStorage.getItem("access_token") },
          }
        );

        const apiData = response.data || {};
        const emailConfig = apiData.email_config && typeof apiData.email_config === "string"
          ? JSON.parse(apiData.email_config)
          : {};

        setFormData({
          ...defaultFormData,
          ...apiData,
          email_config: { ...defaultFormData.email_config, ...emailConfig },
        });
      } catch (error) {
        console.error("Error fetching library data", error);
      }
    };

    fetchInstitutes().then(() => fetchLibraryData());
  }, [id]);

  const errorToaster = (text) => toast.error(text);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name.startsWith("email_config.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        email_config: {
          ...prev.email_config,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!token) {
      errorToaster("Authentication required!");
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        email_config: JSON.stringify(formData.email_config),
      };

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/libraries?library_id=${id}`,
        payload,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      Swal.fire({
        title: "Success!",
        text: "Library updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
      setIsLoading(false);
      setTimeout(() => router.push("/library-department/library"), 2000);
    } catch (error) {
      setIsLoading(false);
      errorToaster("Something went wrong!");
    }
  };

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-white">{id ? "Edit Library" : "Add Library"}</h3>
              <Link href="/library-department/library" className="btn btn-white">
                Back
              </Link>
            </div>
          </Col>
        </Row>
        <div className="card p-6 mt-5">
          <Form onSubmit={handleSubmit}>
            <Row>
              {["library_name", "domain", "address", "email", "phone"].map((field, index) => (
                <Col md={4} className="mb-3" key={index}>
                  <Form.Group>
                    <Form.Label htmlFor={field}>{field.replace("_", " ").toUpperCase()}</Form.Label>
                    <Form.Control
                      id={field}
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={formData[field] || ""}
                      onChange={handleInputChange}
                      placeholder={`Enter ${field.replace("_", " ")}`}
                      required
                    />
                  </Form.Group>
                </Col>
              ))}

              <Col md={4} className="mb-3">
                <Form.Group>
                  <Form.Label htmlFor="institute">INSTITUTE</Form.Label>
                  <Form.Select
                    id="institute"
                    name="institute"
                    value={formData.institute || ""}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Institute</option>
                    {institutes.map((inst) => (
                      <option key={inst.institute_id} value={inst.institute_id}>
                        {inst.institute_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <h5 className="mt-4">Mail Configuration</h5>
            <Row>
              {Object.keys(defaultFormData.email_config).map((key, index) => (
                <Col md={4} className="mb-3" key={index}>
                  <Form.Group>
                    <Form.Label htmlFor={`email_config.${key}`}>
                      {key.replace("_", " ").toUpperCase()}
                    </Form.Label>
                    <Form.Control
                      id={`email_config.${key}`}
                      type={key.includes("password") ? "password" : "text"}
                      name={`email_config.${key}`}
                      value={formData.email_config[key] || ""}
                      onChange={handleInputChange}
                      placeholder={`Enter ${key.replace("_", " ")}`}
                    />
                  </Form.Group>
                </Col>
              ))}
            </Row>

            <div className="text-center mt-4">
              <Button type="submit" className="w-100" variant="dark" disabled={isLoading}>
                {isLoading ? <Spinner animation="border" size="sm" /> : "Update Library"}
              </Button>
            </div>
          </Form>
        </div>
        <ToastContainer />
      </Container>
    </Fragment>
  );
};

export default EditLibrary;
