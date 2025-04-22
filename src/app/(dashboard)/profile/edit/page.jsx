"use client";
// Import node module libraries
import {
  Form,
  Card,
  Row,
  Col,
  Container,
  Button,
  Spinner,
} from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authUser, setAuthUser] = useState({
    name: "",
    role: "",
    email: "",
    id: "",
    image: "",
    phone_number: "",
    date_joined: "",
    address: "",
    designation: "",
    gender: "",
    admission_year: "",
  });

  const [formdata, setFormdata] = useState({
    name: "",
    role: "",
    email: "",
    image: "",
    phone_number: "",
    address: "",
    gender: "",
    admission_year: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    // (Optional) Add frontend validation here if needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    loadAuthUser();
  }, []);

  const cleanValue = (value) =>
    value === null || value === undefined ? "" : value;

  const loadAuthUser = async () => {
    const token = getToken();
    if (!token) {
      console.error("Authentication required!");
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      setAuthUser({
        name: cleanValue(response.data.name),
        role: cleanValue(response.data.role),
        email: cleanValue(response.data.email),
        id: cleanValue(response.data.id),
        image: cleanValue(response.data.image),
        phone_number: cleanValue(response.data.phone_number),
        date_joined: cleanValue(response.data.date_joined),
        address: cleanValue(response.data.address),
        designation: cleanValue(response.data.designation),
        gender: cleanValue(response.data.gender),
        admission_year: cleanValue(response.data.admission_year),
      });

      setFormdata({
        name: cleanValue(response.data.name),
        role: cleanValue(response.data.role),
        email: cleanValue(response.data.email),
        image: cleanValue(response.data.image),
        phone_number: cleanValue(response.data.phone_number),
        address: cleanValue(response.data.address),
        gender: cleanValue(response.data.gender),
        admission_year: cleanValue(response.data.admission_year),
      });
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAuthUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setFormdata((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAuthUser((prevUser) => ({
        ...prevUser,
        image: imageUrl,
      }));
      setFormdata((prevUser) => ({
        ...prevUser,
        image: file,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      return;
    }

    let token = getToken();
    if (!token) {
      errorToaster("Authentication required!");
      return;
    }

    let authUserData = new FormData();

    Object.entries(formdata).forEach(([key, value]) => {
      if (key === "image") {
        if (value instanceof File) {
          authUserData.append(key, value);
        }
      } else if (key === "groups" || key === "user_permissions") {
        console.log(typeof value);
        return;
      } else {
        authUserData.append(key, value);
      }
    });

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`,
        authUserData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        setIsLoading(true);
        Swal.fire({
          title: "Success!",
          text: "User Profile Updated!",
          icon: "success",
          confirmButtonText: "OK",
        });
        loadAuthUser();
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);

      if (error.response && error.response.data) {
        const errorData = error.response.data;
        const formattedErrors = {};

        Object.entries(errorData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            const firstError = value[0];
            if (
              typeof firstError === "string" &&
              firstError.includes('"" is not a valid choice')
            ) {
              formattedErrors[key] = `${key} is not a valid choice.`;
            } else if (
              typeof firstError === "string" &&
              firstError === "This field may not be blank."
            ) {
              formattedErrors[key] = `${key} may not be blank.`;
            } else {
              formattedErrors[key] = firstError;
            }
          } else {
            formattedErrors[key] = value;
          }
        });

        setErrors(formattedErrors);
      }

      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Container fluid className="p-6">
      {/* Profile Header */}
      <Row className="align-items-center">
        <Col xl={12} lg={12} md={12} xs={12}>
          <div
            className="pt-10 rounded-top"
            style={{
              backgroundImage: "url(/images/background/profile-cover.jpg)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="bg-white rounded-bottom smooth-shadow-sm">
            <div className="d-flex align-items-center justify-content-between pt-4 pb-6 px-4">
              <div className="d-flex align-items-center">
                <div className="avatar-xxl avatar-indicators avatar-online me-2 position-relative d-flex justify-content-end align-items-end mt-n10">
                  <Image
                    src={
                      authUser.image !== ""
                        ? authUser.image
                        : "/images/avatar/avatar-1.jpg"
                    }
                    alt="User Avatar"
                    className="avatar-xxl rounded-circle border border-4 border-white-color-40"
                    width={200}
                    height={200}
                  />
                  {/* <Link href="#!" className="position-absolute top-0 right-0 me-2" data-bs-toggle="tooltip" data-placement="top" title="Verified">
                                        <Image src="/images/svg/checked-mark.svg" alt="Verified" height={30} width={30} />
                                    </Link> */}
                </div>
                <div className="lh-1">
                  <h2 className="mb-0">
                    {authUser.name == "null" ? "User" : authUser.name}
                  </h2>
                  <p className="mb-0 d-block">
                    {authUser.email || "user@example.com"}
                  </p>
                </div>
              </div>
              <div>
                {authUser?.id && (
                  <Link
                    href={`/profile/view`}
                    className="btn btn-outline-primary d-none d-md-block"
                  >
                    View Profile
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* About Me Section */}
      <div className="py-6">
        <Card>
          <Card.Body>
            <Card.Title as="h4">Edit User</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col lg={6} className="mb-3">
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={authUser.name == "null" ? "User" : authUser.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col lg={6} className="mb-3">
                  <Form.Group controlId="formEmail">
                    <Form.Label>E-Mail</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={authUser.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      isInvalid={!!errors.email}
                      readOnly
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col lg={6} className="mb-3">
                  <Form.Group controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="number"
                      name="phone_number"
                      value={authUser.phone_number}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      isInvalid={!!errors.phone_number}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone_number}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col lg={6} className="mb-3">
                  <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={authUser.address == "null" ? "" : authUser.address}
                      onChange={handleInputChange}
                      placeholder="Enter Address"
                      isInvalid={!!errors.address}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col lg={6} className="mb-3">
                  <Form.Group controlId="library">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      name="gender"
                      value={authUser.gender}
                      onChange={handleInputChange}
                      isInvalid={!!errors.gender}
                    >
                      <option value="">Select Gender</option>
                      <option value="MALE">MALE</option>
                      <option value="FEMALE">FEMALE</option>
                      <option value="OTHER">OTHER</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.gender}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col lg={6} className="mb-3">
                  <Form.Group controlId="formFile">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                      isInvalid={!!errors.image}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.image}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {authUser.image && (
                    <div className="mt-3 avatar">
                      <Image
                        src={authUser.image}
                        alt="Preview"
                        width={150}
                        height={150}
                        className="rounded border"
                      />
                    </div>
                  )}
                </Col>

                <input
                  type="hidden"
                  value={authUser.admission_year}
                  name="admission_year"
                  onChange={handleInputChange}
                />
                <input type="hidden" value={authUser.role} name="role" />

                {errors.non_field_errors && (
                  <Col lg={12}>
                    <div className="text-danger mb-2">
                      {errors.non_field_errors}
                    </div>
                  </Col>
                )}

                <Col lg={12} className="mb-3 mt-4">
                  <Button
                    variant="primary"
                    className="w-100"
                    disabled={isLoading}
                    type="submit"
                  >
                    {isLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Update"
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Profile;
