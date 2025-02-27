'use client'

import { Fragment, useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Container, Col, Row, Form, Button, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const AddInstitute = () => {
    const router = useRouter();
    const successToaster = (text) => toast(text);
    const errorToaster = (text) => toast.error(text);
    const [isLoading, setIsLoading] = useState(false);
    const [library, setLibrary] = useState([]);

    const [formData, setFormData] = useState({
        department_name: "",
        department_code: "",
        library: "",
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
    };

    const getToken = () => localStorage.getItem("access_token");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
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
            successToaster(response.data.message);
            setIsLoading(false)
            setFormData({
                department_name: "",
                department_code: "",
                library: "",
            });


            setTimeout(() => {
                router.push('../department/view')
            }, 4000);
        } catch (error) {
            setIsLoading(false)
            errorToaster("Something went wrong!");
        }

    };





    const loadLibrary = async () => {
        const token = getToken();

        if (!token) {
            console.error("Authentication token is missing!");
            return;
        }

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/libraries`, {
                headers: {
                    "Authorization": `${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                setLibrary(response.data);
                console.log(response.data);

            }
        } catch (error) {
            console.error("Error fetching institutes:", error);
        }
    };

    useEffect(() => {
        loadLibrary();
    }, []);

    return (
        <Fragment>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="mb-0 text-white">Add Department</h3>
                            <Link href="/library-department/department/view" className="btn btn-white">Back</Link>
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
                                        placeholder="Enter Department name"
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col lg={6} className="mb-3" md={6} xs={12}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Departmenrt Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="department_code"
                                        value={formData.department_code}
                                        onChange={handleInputChange}
                                        placeholder="Enter Department Code"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                           
                            <Col lg={12} className="mb-3" md={12} xs={12}>
                                <Form.Group controlId="institute">
                                    <Form.Label>Library</Form.Label>
                                    <Form.Select
                                        name="library"
                                        aria-label="Select Library"
                                        required
                                        value={formData.library}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Library</option>
                                        {library.map((library) => (
                                            <option key={library.library_id} value={library.library_id}>
                                                {library.library_name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={12} className="mb-3" md={3} xs={12}>
                                <Button variant="primary" className="w-100" disabled={isLoading} type="submit"> {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"} </Button>
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
