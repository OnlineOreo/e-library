'use client'

import { Fragment, useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter, useParams } from "next/navigation";
import { Container, Col, Row, Form, Button, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { FaMinusCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const EditContentGroup = () => {
    const router = useRouter();
    const { id } = useParams();
    const successToaster = (text) => toast(text);
    const errorToaster = (text) => toast.error(text);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    
    const [formData, setFormData] = useState({
        content_name: "",
    });

    const getToken = () => {
        const cookieString = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="));
    
        return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
      };

    useEffect(() => {
        if (!id) return;

        const fetchContentGroup = async () => {
            const token = getToken();
            if (!token) {
                errorToaster("Authentication required!");
                router.push("/authentication/sign-in");
                return;
            }

            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content-groups?cg_id=${id}`,
                    {
                        headers: { Authorization: token }, // ✅ Corrected Token Usage
                    }
                );

                setFormData({ content_name: response.data.content_name });
            } catch (error) {
                if (error.response?.status === 401) {
                    router.push("/authentication/sign-in");
                } else {
                    errorToaster("Failed to fetch content group");
                }
            }
        };

        fetchContentGroup();
    }, [id]);

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
        const token = getToken();
        if (!token) {
            router.push("/authentication/sign-in");
            setIsLoading(false);
            return;
        }

        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content-groups?cg_id=${id}`,
                { content_name: formData.content_name },
                {
                    headers: { Authorization: token },
                }
            );

            Swal.fire({
                title: "Success!",
                text: "Content group updated successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });

            setTimeout(() => {
                router.push('/library-department/content-group');
            }, 2000);
        } catch (error) {
            if (error.response?.status === 401) {
                router.push("/authentication/sign-in");
            } else if (error.response?.data) {
                setErrors(error.response.data);
            } else {
                errorToaster("Something went wrong!");
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
                    <Col lg={12} md={12} xs={12}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="mb-0 text-dark">Edit Content Group</h3>
                            <Link href="/library-department/content-group" className="btn btn-white"><FaMinusCircle /> Back</Link>
                        </div>
                    </Col>
                </Row>
                <div className="card p-6 mt-5">
                    <Form onSubmit={handleSubmit}>
                        <Row className="justify-content-start">
                            <Col lg={6} className="mb-3" md={6} xs={12}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Content Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="content_name"
                                        value={formData.content_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter content name"
                                        isInvalid={!!errors.content_name}
                                    />
                                    {errors.content_name && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.content_name[0]}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col lg={12} className="mb-3" md={3} xs={12}>
                                <Button variant="primary" className="w-100" disabled={isLoading} type="submit"> 
                                    {isLoading ? <Spinner animation="border" size="sm" /> : "Update"} 
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <ToastContainer />
            </Container>
        </Fragment>
    );
};

export default EditContentGroup;
