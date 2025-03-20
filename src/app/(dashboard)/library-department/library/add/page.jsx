"use client";

import { React, Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container, Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import { FaMinusCircle } from "react-icons/fa";

const AddLibrary = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [institutes, setInstitutes] = useState([]);
  const [errors, setErrors] = useState({});

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
  
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    const token = getToken();
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/institutes`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setInstitutes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching institutes", error);
      });
  }, []);

  const errorToaster = (text) => toast.error(text);

  const [formData, setFormData] = useState({
    library_name: "",
    domain: "",
    address: "",
    email: "",
    phone: "",
    institute: "",
    email_config: {
      mail_driver: "",
      mail_host: "",
      mail_port: "",
      mail_username: "",
      mail_password: "",
      mail_encryption: "",
      mail_from_address: "",
      mail_from_name: "",
    },
  });

  const handleInputChange = (event) => {

    const { name, value } = event.target;
    setErrors((prev) => ({ ...prev, [name]: null }));

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
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/libraries`,
        {
          ...formData,
          email_config: JSON.stringify(formData.email_config),
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire({
        title: "Success!",
        text: "Library added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setIsLoading(false);
      setFormData({
        library_name: "",
        domain: "",
        address: "",
        email: "",
        phone: "",
        institute: "",
        email_config: {
          mail_driver: "",
          mail_host: "",
          mail_port: "",
          mail_username: "",
          mail_password: "",
          mail_encryption: "",
          mail_from_address: "",
          mail_from_name: "",
        },
      });
      //setTimeout(() => router.push("../library"), 2000); 
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data) {
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
              <h3 className="mb-0 text-dark">Add Library</h3>
              <Link href="../library" className="btn btn-white">
               <FaMinusCircle /> Back
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
                      value={formData[field]}
                      onChange={handleInputChange}
                      placeholder={`Enter ${field.replace("_", " ")}`}
                      isInvalid={!!errors[field]} 
                      required
                    />
                    {errors[field] && errors[field].map((err, i) => (
                      <Form.Control.Feedback key={i} type="invalid">
                        {err}
                      </Form.Control.Feedback>
                    ))}
                  </Form.Group>
                </Col>
              ))}
              
              {/* Institute Dropdown */}
              <Col md={4} className="mb-3">
                <Form.Group>
                  <Form.Label htmlFor="institute">INSTITUTE</Form.Label>
                  <Form.Select
                    id="institute"
                    name="institute"
                    value={formData.institute}
                    onChange={handleInputChange}
                    isInvalid={!!errors.institute}
                    required
                  >
                    <option value="">Select Institute</option>
                    {institutes.map((inst) => (
                      <option key={inst.institute_id} value={inst.institute_id}>
                        {inst.institute_name}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.institute && errors.institute.map((err, i) => (
                    <Form.Control.Feedback key={i} type="invalid">
                      {err}
                    </Form.Control.Feedback>
                  ))}
                </Form.Group>
              </Col>
            </Row>

            <h5 className="mt-4">Mail Configuration</h5>
            <Row>
              {Object.keys(formData.email_config).map((key, index) => (
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
                      isInvalid={!!(errors.email_config && errors.email_config[key])}
                      required
                    />
                    {errors.email_config && errors.email_config[key] && errors.email_config[key].map((err, i) => (
                      <Form.Control.Feedback key={i} type="invalid">
                        {err}
                      </Form.Control.Feedback>
                    ))}
                  </Form.Group>
                </Col>
              ))}
            </Row>

            <div className="text-center mt-4">
              <Button type="submit" className="w-100" variant="dark" disabled={isLoading}>
                {isLoading ? <Spinner animation="border" size="sm" /> : "Add Library"}
              </Button>
            </div>
          </Form>
        </div>
        <ToastContainer />
      </Container>
    </Fragment>
  );
};

export default AddLibrary;
