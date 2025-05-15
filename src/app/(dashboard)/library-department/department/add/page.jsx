'use client'

import { Fragment, useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Container, Col, Row, Form, Button, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Swal from "sweetalert2";
import { FaMinusCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const AddDepartment = () => {
    const instituteId = useSelector((state) => state.institute.instituteId);
    const router = useRouter();
    const successToaster = (text) => toast(text);
    const errorToaster = (text) => toast.error(text);
    
    const [isLoading, setIsLoading] = useState(false);
    const [library, setLibrary] = useState([]);
    const [errors, setErrors] = useState({}); // Store validation errors

    const [formData, setFormData] = useState({
        department_name: "",
        department_code: "",
        library: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({ ...errors, [name]: "" });
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
        setErrors({}); // Clear previous errors

        const token = getToken();
        if (!token) {
            errorToaster("Authentication required!");
            return;
        }

        let formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/departments`,
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
                text: "Department added successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });

            setIsLoading(false);
            setFormData({
                department_name: "",
                department_code: "",
                library: "",
            });

            router.push("../department");

        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.data) {
                setErrors(error.response.data); // Store validation errors
            } else {
                errorToaster("Something went wrong!");
            }
        }
    };

    const loadLibrary = async (instituteId) => {
        const token = getToken();

        if (!token) {
            console.error("Authentication token is missing!");
            return;
        }

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/libraries?institute_id=${instituteId}`, {
                headers: {
                    "Authorization": `${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                setLibrary(response.data);
            }
        } catch (error) {
            console.error("Error fetching libraries:", error);
        }
    };

    useEffect(() => {
        if(instituteId){
            loadLibrary(instituteId);
        }
    }, [instituteId]);

    return (
        <Fragment>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="mb-0 text-dark">Add Department</h3>
                            <Link href="/library-department/department" className="btn btn-white">
                                <FaMinusCircle /> Back
                            </Link>
                        </div>
                    </Col>
                </Row>
                <div className="card p-6 mt-5">
                    <Form onSubmit={handleSubmit}>
                        <Row className="justify-content-center">
                            {/* Department Name Field */}
                            <Col lg={6} className="mb-3" md={6} xs={12}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Department Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="department_name"
                                        value={formData.department_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter Department name"
                                        isInvalid={!!errors.department_name}
                                    />
                                    {errors.department_name && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.department_name.join(", ")}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>

                            {/* Department Code Field */}
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

                            {/* Library Select Dropdown */}
                            <Col lg={12} className="mb-3" md={12} xs={12}>
                                <Form.Group controlId="library">
                                    <Form.Label>Library</Form.Label>
                                    <Form.Select
                                        name="library"
                                        aria-label="Select Library"
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

                            {/* Submit Button */}
                            <Col lg={12} className="mb-3" md={3} xs={12}>
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

export default AddDepartment;
