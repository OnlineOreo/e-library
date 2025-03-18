"use client";

import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container, Col, Row, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { FaMinusCircle } from "react-icons/fa";
import { useParams } from "next/navigation";

const EditCategory = () => {
    const router = useRouter();
    
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        configuration_category_id:"",
        category_name: "",
        image: null,
    });

    const { id } = useParams(); 

    useEffect(() => {
        if (id) {
            fetchCategory(id);
        }
    }, [id]);

    const fetchCategory = async (categoryId) => {
        let token = getToken();
        console.log("idiididiid"+categoryId);
        
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configuration-categories?configuration_category_id=${categoryId}`,{
                    headers: { Authorization: `${token}` },
                });
            setFormData({
                configuration_category_id:response.data.configuration_category_id,
                category_name: response.data.category_name,
                image: response.data.image,
            });
            console.log(response.data);
            
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.category_name.trim()) {
            newErrors.category_name = "Category Name is required";
        }

        if (!formData.image) {
            newErrors.image = "Image is required";
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

    const handleFileChange = (event) => {
        setFormData({
            ...formData,
            image: event.target.files[0], // Store file object
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
        formDataToSend.append("category_name", formData.category_name);
        
        if (formData.image instanceof File) {
            formDataToSend.append("image", formData.image);
        }
        

        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configuration-categories?configuration_category_id=${formData.configuration_category_id}`,
                formDataToSend,
                {
                    headers: {
                        Authorization: `${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            Swal.fire({
                title: "Success!",
                text: "Category Updated successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });

            setFormData({
                category_name: "",
                image: null,
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
                            <h3 className="mb-0 text-dark">Edit Categories</h3>
                            <Link href="/configuration/categories" className="btn btn-white">
                                <FaMinusCircle /> Back
                            </Link>
                        </div>
                    </Col>
                </Row>
                <div className="card p-6 mt-5">
                    <Form onSubmit={handleSubmit}>
                        <Row className="justify-content-center">
                            <Col lg={6} className="mb-5">
                                <Form.Group controlId="formName">
                                    <Form.Label>Category Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="category_name"
                                        value={formData.category_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter Category name"
                                        isInvalid={!!errors.category_name}
                                    />
                                    {errors.category_name && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.category_name}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>

                            <Col lg={6} className="mb-3">
                                <Form.Group controlId="formFile">
                                    <Form.Label>Upload Image</Form.Label>
                                    <Form.Control 
                                        type="file"
                                        name="image"
                                        onChange={handleFileChange}
                                        isInvalid={!!errors.image}
                                    />
                                    {errors.image && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.image}
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
            </Container>
        </Fragment>
    );
};

export default EditCategory;
