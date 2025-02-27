'use client'

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from 'next/link';
import { Container, Col, Row, Form, Button, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { FaMinusCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const EditInstitute = () => {
    const router = useRouter();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({ type_name: "" });

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("access_token");
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-types?user_type_id=${id}`,
                {
                    headers: {
                        "Authorization": `${token}`,
                    },
                }
            );
            setFormData({ type_name: response.data.type_name });
        } catch (error) {
            toast.error("Failed to fetch data!");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrors({});

        const token = localStorage.getItem("access_token");
        if (!token) {
            router.push("/authentication/sign-in");
            setIsLoading(false);
            return;
        }

        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-types?user_type_id=${id}`,
                formData,
                {
                    headers: {
                        "Authorization": `${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            Swal.fire({
                title: "Success!",
                text: "User type updated successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });

            setTimeout(() => router.push('../'), 2000);
        } catch (error) {
            if (error.response?.data) {
                setErrors(error.response.data);
            } else {
                toast.error("Something went wrong!");
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
                            <h3 className="mb-0 text-white">Edit User Type</h3>
                            <Link href="../" className="btn btn-white"> <FaMinusCircle /> Back</Link>
                        </div>
                    </Col>
                </Row>
                <div className="card p-6 mt-5">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col lg={6} className="mb-3">
                                <Form.Group controlId="formName">
                                    <Form.Label>User Type Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="type_name"
                                        value={formData.type_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter user type name"
                                        isInvalid={Boolean(errors.type_name)}
                                    />
                                    {errors.type_name && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.type_name[0]}
                                        </Form.Control.Feedback>
                                    )}
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
                <ToastContainer />
            </Container>
        </>
    );
};

export default EditInstitute;
