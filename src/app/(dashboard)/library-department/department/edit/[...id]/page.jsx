'use client';

import { Fragment, useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter, useParams } from "next/navigation";
import { Container, Col, Row, Form, Button, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Swal from "sweetalert2"; 
import { FaMinusCircle } from "react-icons/fa";

const EditDepartment = () => {
    const router = useRouter();
    const { id } = useParams(); // Get department_id from URL
    const successToaster = (text) => toast(text);
    const errorToaster = (text) => toast.error(text);

    const [isLoading, setIsLoading] = useState(false);
    const [library, setLibrary] = useState([]);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        department_name: "",
        department_code: "",
        library: "",
    });

    const getToken = () => {
        const cookieString = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="));
    
        return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
      };

    // Fetch department details
    const loadDepartment = async () => {
        const token = getToken();
        if (!token) {
            errorToaster("Authentication required!");
            return;
        }

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/departments?department_id=${id}`, {
                headers: { Authorization: `${token}` },
            });

            if (response.status === 200) {
                const data = response.data;
                setFormData({
                    department_name: data.department_name || "",
                    department_code: data.department_code || "",
                    library: data.library|| "",
                });
            }
        } catch (error) {
            errorToaster("Failed to load department details!");
            console.error("Error fetching department:", error);
        }
    };

    // Fetch library list
    const loadLibrary = async () => {
        const token = getToken();
        if (!token) {
            errorToaster("Authentication required!");
            return;
        }

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/libraries`, {
                headers: { Authorization: `${token}` },
            });

            if (response.status === 200) {
                setLibrary(response.data);
            }
        } catch (error) {
            console.error("Error fetching libraries:", error);
        }
    };

    useEffect(() => {
        loadDepartment();
        loadLibrary();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrors({});

        const token = getToken();
        if (!token) {
            errorToaster("Authentication required!");
            return;
        }
        
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/departments?department_id=${id}`,
                formData,
                { headers: { Authorization: `${token}` } }
            );

            Swal.fire({
                title: "Success!",
                text: "Department updated successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });

            setTimeout(() => router.push("../"), 2000);
        } catch (error) {
            setIsLoading(false);
            if (error.response?.data) {
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
                            <h3 className="mb-0 text-dark">Edit Department</h3>
                            <Link href="/library-department/department" className="btn btn-white">
                                <FaMinusCircle /> Back
                            </Link>
                        </div>
                    </Col>
                </Row>
                <div className="card p-6 mt-5">
                    <Form onSubmit={handleSubmit}>
                        <Row className="justify-content-center">
                            <Col lg={6} className="mb-3" md={6} xs={12}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Department Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="department_name"
                                        value={formData.department_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter Department Name"
                                        isInvalid={!!errors.department_name}
                                    />
                                    {errors.department_name && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.department_name.join(", ")}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>

                            <Col lg={6} className="mb-3" md={6} xs={12}>
                                <Form.Group controlId="formCode">
                                    <Form.Label>Department Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="department_code"
                                        value={formData.department_code}
                                        onChange={handleInputChange}
                                        placeholder="Enter Department Code"
                                        isInvalid={!!errors.department_code}
                                    />
                                    {errors.department_code && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.department_code.join(", ")}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>

                            <Col lg={12} className="mb-3" md={12} xs={12}>
                                <Form.Group controlId="library">
                                    <Form.Label>Library</Form.Label>
                                    <Form.Select
                                        name="library"
                                        value={formData.library}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.library}
                                    >
                                        <option value="">Select Library</option>
                                        {library.map((lib) => (
                                            <option key={lib.library_id} value={lib.library_id}>
                                                {lib.library_name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    {errors.library && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.library.join(", ")}
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

export default EditDepartment;
