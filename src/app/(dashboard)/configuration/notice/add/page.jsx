"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container, Col, Row, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { FaMinusCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const AddCategory = () => {
    const router = useRouter();
    const instituteId = useSelector((state) => state.institute.instituteId);

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        description: "",
        institute:"",
    });

    const validateForm = () => {
        let newErrors = {};

        if (!formData.description.trim()) {
            newErrors.description = "Notice Description cannot be empty";
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

    const getToken = () => localStorage.getItem("access_token");

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
        formDataToSend.append("description", formData.description);
        formDataToSend.append("institute", instituteId);

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notices`,
                formDataToSend,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );

            Swal.fire({
                title: "Success!",
                text: "Notice added successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });

            setFormData({
                category_name: "",
                image: null,
            });

            setTimeout(() => {
                router.push("../notice");
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
                            <h3 className="mb-0 text-dark">Add Notice</h3>
                            <Link href="/configuration/notice" className="btn btn-white">
                                <FaMinusCircle /> Back
                            </Link>
                        </div>
                    </Col>
                </Row>
                <div className="card p-6 mt-5">
                    <Form onSubmit={handleSubmit}>
                        <Row className="justify-content-center">
                            <Col lg={12} className="mb-5">
                                <Form.Group controlId="formName">
                                    <Form.Label>Notice Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3} 
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Notice Description"
                                        isInvalid={!!errors.description}
                                    />
                                    {errors.description && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.description}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>

                            <Col lg={12} className="mb-3">
                                <Button variant="primary" className="w-100" disabled={isLoading} type="submit">
                                    {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Container>
        </Fragment>
    );
};

export default AddCategory;
