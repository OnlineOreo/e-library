"use client";

import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container, Col, Row, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { FaMinusCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

const EditCategory = () => {
    const router = useRouter();
    const instituteId = useSelector((state) => state.institute.instituteId);

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        address: "",
        phone: "",
        email: "",
        fb_url: "",
        x_url: "",
        yt_url: "",
        li_url: "",
        insta_url: "",
        page_content: "",
    });


    const { id } = useParams();

    useEffect(() => {
        if (id && instituteId) {
            fitchDetails(id , instituteId);
        }
    }, [id,instituteId]);

    const fitchDetails = async (footer_id,instituteId) => {
        let token = getToken();
        // console.log("idiididiid" + footer_id);

        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/footers?footer_id=${footer_id}&institute=${instituteId}`, {
                headers: { Authorization: `${token}` },
            });
            setFormData(response.data);
            console.log(response.data);

        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const getToken = () => {
        const cookieString = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="));
    
        return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
    
        const token = getToken();
        if (!token) {
            Swal.fire("Error", "Authentication required!", "error");
            setIsLoading(false);
            return;
        }
    
        let formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });
    
        try {
            if (formData.footer_id) {
                // Updating existing footer (PUT request)
                await axios.put(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/footers?footer_id=${formData.footer_id}`,
                    formDataToSend,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
            } else {
                // Creating a new footer (POST request)
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/footers`,
                    formDataToSend,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
            }
    
            Swal.fire({
                title: "Success!",
                text: "Footer updated successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });
    
            setTimeout(() => {
                router.push("../");
            }, 2000);
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                Swal.fire("Error", "Something went wrong!", "error");
            }
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <Fragment>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <Col lg={12}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="mb-0 text-dark">Edit Details</h3>
                            <Link href="/configuration/footer" className="btn btn-white">
                                <FaMinusCircle /> Back
                            </Link>
                        </div>
                    </Col>
                </Row>
                <div className="card p-6 mt-5">
                    <Form onSubmit={handleSubmit}>
                        <Row className="justify-content-center">
                            <Col lg={6} className="mb-3">
                                <Form.Group controlId="formAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter Address"
                                        isInvalid={!!errors.address}
                                    />
                                    {errors.address && <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>}
                                </Form.Group>
                            </Col>

                            <Col lg={6} className="mb-3">
                                <Form.Group controlId="formPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Enter Phone Number"
                                        isInvalid={!!errors.phone}
                                    />
                                    {errors.phone && <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>}
                                </Form.Group>
                            </Col>

                            <Col lg={6} className="mb-3">
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter Email"
                                        isInvalid={!!errors.email}
                                    />
                                    {errors.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
                                </Form.Group>
                            </Col>

                            {['fb_url', 'x_url', 'yt_url', 'li_url', 'insta_url'].map((field, index) => (
                                <Col lg={6} className="mb-3" key={index}>
                                    <Form.Group controlId={`form${field}`}>
                                        <Form.Label>{field.replace("_", " ").toUpperCase()}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleInputChange}
                                            placeholder={`Enter ${field.replace("_", " ")}`}
                                            isInvalid={!!errors[field]}
                                        />
                                        {errors[field] && <Form.Control.Feedback type="invalid">{errors[field]}</Form.Control.Feedback>}
                                    </Form.Group>
                                </Col>
                            ))}

                            <Col lg={12} className="mb-3">
                                <Form.Group controlId="formPageContent">
                                    <Form.Label>Page Content</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="page_content"
                                        value={formData.page_content}
                                        onChange={handleInputChange}
                                        placeholder="Enter Page Content"
                                        isInvalid={!!errors.page_content}
                                    />
                                    {errors.page_content && <Form.Control.Feedback type="invalid">{errors.page_content}</Form.Control.Feedback>}
                                </Form.Group>
                            </Col>

                            <Col lg={12} className="mb-3">
                                <Button variant="primary" className="w-100" disabled={isLoading} type="submit">
                                    {isLoading ? <Spinner animation="border" size="sm" /> : "Update"}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Container>
        </Fragment>
    );
};

export default EditCategory;
