'use client'

import { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Container, Col, Row, Form, Button, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Swal from "sweetalert2";
import { FaMinusCircle } from "react-icons/fa";

const AddProgram = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({ program_name: "", program_code: "", library: "" });
    const [libraries, setLibraries] = useState([]);

    const getToken = () => {
        const cookieString = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="));
    
        return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
      };

    useEffect(() => {
        const fetchLibraries = async () => {
            const token = getToken();
            if (!token) {
                router.push("/authentication/sign-in");
                return;
            }
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/libraries`,
                    {
                        headers: {
                            "Authorization": `${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                setLibraries(response.data);
            } catch (error) {
                toast.error("Failed to fetch libraries!");
            }
        };
        fetchLibraries();
    }, []);

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
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/programs`,
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
                text: "Program added successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });

            setFormData({ program_name: "", program_code: "", library: "" });
            setTimeout(() => router.push('../program'), 2000);
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
                            <h3 className="mb-0 text-dark">Add Program</h3>
                            <Link href="../program" className="btn btn-white">  <FaMinusCircle /> Back</Link>
                        </div>
                    </Col>
                </Row>
                <div className="card p-6 mt-5">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col lg={4} className="mb-3">
                                <Form.Group controlId="formName">
                                    <Form.Label>Program Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="program_name"
                                        value={formData.program_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter program name"
                                        isInvalid={Boolean(errors.program_name)}
                                    />
                                    {errors.program_name && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.program_name[0]}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col lg={4} className="mb-3">
                                <Form.Group controlId="formCode">
                                    <Form.Label>Program Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="program_code"
                                        value={formData.program_code}
                                        onChange={handleInputChange}
                                        placeholder="Enter program code"
                                        isInvalid={Boolean(errors.program_code)}
                                    />
                                    {errors.program_code && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.program_code[0]}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col lg={4} className="mb-3">
                                <Form.Group controlId="formLibrary">
                                    <Form.Label>Select Library</Form.Label>
                                    <Form.Select
                                        as="select"
                                        name="library"
                                        value={formData.library}
                                        onChange={handleInputChange}
                                        isInvalid={Boolean(errors.library)}
                                    >
                                        <option value="">Select a library</option>
                                        {libraries.map((library) => (
                                            <option key={library.library_id} value={library.library_id}>
                                                {library.library_name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    {errors.library && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.library[0]}
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
                <ToastContainer />
            </Container>
        </>
    );
};

export default AddProgram;
