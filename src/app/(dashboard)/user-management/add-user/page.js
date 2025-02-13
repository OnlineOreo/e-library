'use client'
// Import node module libraries
import { Fragment, useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Container, Col, Row, Form, Button, ProgressBar } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Home = () => {
    const router = useRouter();
    const successToaster = (text) => toast(text);
    const errorToaster = (text) => toast.error(text);


    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        number: "",
        role: "",
        image: null,
        gender: "",
        user_u_id: "",
        designation: "",
        admission_year: ""
    });

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handleInputChange = (event) => {
        const { name, value, type, files } = event.target;
    
        if (type === "file") {
            setFormData({
                ...formData,
                [name]: files[0], // Store the selected file (single file)
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // Function to get token from cookies
    // const getToken = () => {
    //     return document.cookie
    //         .split("; ")
    //         .find((row) => row.startsWith("access_token="))
    //         ?.split("=")[1];
    // };
    const getToken = () => localStorage.getItem("access_token");
    // console.log(getToken());
    

    const handleSubmit = async (event) => {
        event.preventDefault();
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
              "http://192.168.1.20:8010/api/register",
              formDataToSend,
              {
                headers: {
                  "Authorization": `${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            
            console.log("Server Response:", response.data);
            
            if (response.status === 200) {  
              successToaster(response.data);
            } else {
              errorToaster("Something went wrong!");
            }
          } catch (error) {
            if (error.response) {
              console.error("API Error:", error.response.data);
              errorToaster(error.response.data.message || "Something went wrong!");
            } else {
              // Other error (network error, etc.)
              console.error("Error:", error.message);
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
                            <h3 className="mb-0 text-white">Add User</h3>
                            <Link href="#" className="btn btn-white">Create New Project</Link>
                        </div>
                    </Col>
                </Row>
                <div className="card p-6 mt-5">
                    <Form onSubmit={handleSubmit}>
                        <ProgressBar now={(step / 3) * 100} className="mb-3" />

                        {/* Step 1 - Basic Information */}
                        {step === 1 && (
                            <>
                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formNumber">
                                    <Form.Label>Number</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="number"
                                        value={formData.number}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </>
                        )}

                        {/* Step 2 - Role, Image, Gender */}
                        {step === 2 && (
                            <>
                                <Form.Group controlId="formRole" className="mb-2">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select name="role" value={formData.role} onChange={handleInputChange} required>
                                        <option value="">Select Role</option>
                                        <option value="ADMIN">Admin</option>
                                        <option value="STUDENT">Student</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group controlId="formImage">
                                    <Form.Label>Upload Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleInputChange} // Handles file selection
                                    />
                                </Form.Group>

                                <Form.Group controlId="formGender" className="mb-2">
                                    <Form.Label>Gender</Form.Label>
                                    <div>
                                        {["Male", "Female", "Other"].map((gender) => (
                                            <Form.Check
                                                inline
                                                key={gender}
                                                label={gender}
                                                for={gender}
                                                name="gender"
                                                type="radio"
                                                value={gender}
                                                checked={formData.gender === gender}
                                                onChange={handleInputChange}
                                            />
                                        ))}
                                    </div>
                                </Form.Group>
                            </>
                        )}

                        {/* Step 3 - User Metadata */}
                        {step === 3 && (
                            <>
                                <Form.Group controlId="formUserUID">
                                    <Form.Label>User Unique ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="user_u_id"
                                        value={formData.user_u_id}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formDesignation">
                                    <Form.Label>Designation</Form.Label>
                                    <Form.Select
                                        name="designation"
                                        value={formData.designation}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Designation</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Team Lead">Team Lead</option>
                                        <option value="Developer">Developer</option>
                                        <option value="Intern">Intern</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group controlId="formAdmissionYear">
                                    <Form.Label>Admission Year</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="admission_year"
                                        value={formData.admission_year}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </>
                        )}

                        {/* Navigation Buttons */}
                        <div className="d-flex justify-content-between mt-3">
                            {step > 1 && (
                                <Button variant="secondary" onClick={handlePrevious}>
                                    Previous
                                </Button>
                            )}
                            {step < 3 ? (
                                <Button variant="primary" onClick={handleNext}>
                                    Next
                                </Button>
                            ) : (
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            )}
                        </div>
                    </Form>
                </div>
                <ToastContainer />
            </Container>
        </Fragment>
    );
};

export default Home;
