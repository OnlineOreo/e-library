'use client'

import { Fragment, useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Container, Col, Row, Form, Button, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { FaMinusCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const AddInstitute = () => {
    const router = useRouter();
    const successToaster = (text) => toast(text);
    const errorToaster = (text) => toast.error(text);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({}); // State to store API validation errors

    const [formData, setFormData] = useState({
        institute_name: "",
        email: "",
        address: "",
        phone: "",
        domain: '',
        sub_domain: "",
    });

    const handleInputChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === "file") {
            setFormData({
                ...formData,
                [name]: files[0], 
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
        setErrors({ ...errors, [name]: null }); // Clear error when user types
    };
    
    const getToken = () => {
        const cookieString = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="));
      
        return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrors({}); // Reset previous errors

        const token = getToken();
        if (!token) {
            errorToaster("Authentication required!");
            setIsLoading(false);
            return;
        }

        let formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/institutes`,
                formDataToSend,
                {
                    headers: {
                        "Authorization": `${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            Swal.fire({
                title: "Success!",
                text: "Institute Added successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });

            setIsLoading(false);
            setFormData({
                institute_name: "",
                email: "",
                address: "",
                phone: "",
                domain: '',
                sub_domain: "",
            });

            setTimeout(() => {
                router.push('../institute')
            }, 3000);

        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.data) {
                setErrors(error.response.data); // Store API errors
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
                            <h3 className="mb-0 text-dark">Add Institute</h3>
                            <Link href="../institute" className="btn btn-white"><FaMinusCircle /> Back</Link>
                        </div>
                    </Col>
                </Row>
                <div className="card p-6 mt-5">
                    <Form onSubmit={handleSubmit}>
                        <Row className="justify-content-center">
                            <Col lg={6} className="mb-3" md={6} xs={12}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Institute Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="institute_name"
                                        value={formData.institute_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter institute name"
                                        required
                                        isInvalid={!!errors.institute_name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.institute_name && errors.institute_name[0]}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col lg={6} className="mb-3" md={6} xs={12}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        required
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email && errors.email[0]}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col lg={6} className="mb-3" md={6} xs={12}>
                                <Form.Group controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter address"
                                        required
                                        isInvalid={!!errors.address}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.address && errors.address[0]}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col lg={6} className="mb-3" md={6} xs={12}>
                                <Form.Group controlId="phone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Enter your number"
                                        required
                                        isInvalid={!!errors.phone}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phone && errors.phone[0]}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col lg={6} className="mb-3" md={6} xs={12}>
                                <Form.Group controlId="domain">
                                    <Form.Label>Domain</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="domain"
                                        value={formData.domain}
                                        onChange={handleInputChange}
                                        placeholder="Enter domain"
                                        required
                                        isInvalid={!!errors.domain}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.domain && errors.domain[0]}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col lg={6} className="mb-3" md={6} xs={12}>
                                <Form.Group controlId="sub_domain">
                                    <Form.Label>Sub domain</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="sub_domain"
                                        value={formData.sub_domain}
                                        onChange={handleInputChange}
                                        placeholder="Enter sub domain"
                                        required
                                        isInvalid={!!errors.sub_domain}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.sub_domain && errors.sub_domain[0]}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col lg={3} className="mb-3" md={3} xs={12}>
                                <Button variant="primary" className="w-100" disabled={isLoading} type="submit"> 
                                    {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"} 
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

export default AddInstitute;
