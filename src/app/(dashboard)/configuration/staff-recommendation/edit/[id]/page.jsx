"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { Container, Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import Link from "next/link";
import { FaMinusCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const EditStaffRecommendation = () => {
    const router = useRouter();
    const params = useParams();
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [items, setItems] = useState([]);
    const instituteId = useSelector((state) => state.institute.instituteId);
    const [imageFile, setImageFile] = useState(null);

    const [formData, setFormData] = useState({
        institute: instituteId,
        title: "",
        article_type: "",
        url: "",
        description: "",
    });

    useEffect(() => {
        loadItemTypes();
        fetchStaffPick();
    }, []);

    const getToken = () => {
        const cookieString = document.cookie
            .split("; ")
            .find((row) => row.startsWith("access_token="));
        return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
    };

    const loadItemTypes = async () => {
        const token = getToken();
        if (!token) {
            toast.error("Authentication required!");
            router.push("/authentication/sign-in");
            return;
        }
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/item-types`,
                { headers: { Authorization: `${token}` } }
            );
            if (response.status === 200 && Array.isArray(response.data)) {
                setItems(response.data);
            }
        } catch (error) {
            console.error("Failed to load item types.");
        }
    };

    const fetchStaffPick = async () => {
        const token = getToken();
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/staff-picks?staff_pick_id=${id}`,
                { headers: { Authorization: `${token}` } }
            );
            const data = response.data;
            setFormData({
                institute: data.institute,
                title: data.title,
                article_type: data.article_type,
                url: data.url,
                description: data.description,
            });
        } catch (error) {
            toast.error("Failed to fetch staff recommendation");
            // router.push("/configuration/staff-recommendation");
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrors({});

        const token = getToken();
        if (!token) {
            toast.error("Authentication required!");
            router.push("/authentication/sign-in");
            setIsLoading(false);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("institute_id", instituteId);
        formDataToSend.append("title", formData.title);
        formDataToSend.append("article_type", formData.article_type);
        formDataToSend.append("url", formData.url);
        formDataToSend.append("description", formData.description);
        if (imageFile) formDataToSend.append("image", imageFile);

        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/staff-picks?staff_pick_id=${id}`,
                formDataToSend,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            Swal.fire({
                title: "Success!",
                text: "Staff Recommendation updated successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });

            setTimeout(() => router.push("/configuration/staff-recommendation"), 2000);
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
                            <h3 className="mb-0 text-dark">Edit Staff Recommendation</h3>
                            <Link href="/configuration/staff-recommendation" className="btn btn-white">
                                <FaMinusCircle /> Back
                            </Link>
                        </div>
                    </Col>
                </Row>
                <div className="card p-6 mt-5">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col lg={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        placeholder="Enter title here"
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.title}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.title?.[0]}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col lg={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Catalog Cover (Upload to change)</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="image"
                                        onChange={handleFileChange}
                                        isInvalid={!!errors.image}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.image?.[0]}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Article Type</Form.Label>
                                    <Form.Select
                                        name="article_type"
                                        value={formData.article_type}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.article_type}
                                    >
                                        <option value="">Select Article Type</option>
                                        {items.map((item) => (
                                            <option key={item.item_type_id} value={item.item_type_id}>
                                                {item.type_name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.article_type?.[0]}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col lg={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Catalog URL</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="url"
                                        placeholder="Enter URL"
                                        value={formData.url}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.url}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.url?.[0]}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={12} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Enter description"
                                        isInvalid={!!errors.description}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description?.[0]}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button className="w-100" disabled={isLoading} type="submit">
                            {isLoading ? <Spinner animation="border" size="sm" /> : "Update"}
                        </Button>
                    </Form>
                </div>
                <ToastContainer />
            </Container>
        </>
    );
};

export default EditStaffRecommendation;
