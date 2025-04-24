"use client";
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  ProgressBar,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { FaMinusCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";

const Home = () => {
  const router = useRouter();
  const successToaster = (text) => toast(text);
  const errorToaster = (text) => toast.error(text);

  const [step, setStep] = useState(1);
  const [serviceGroup, setServiceGroup] = useState([]);
  const [contentGroup, setContentGroup] = useState([]);
  const [userType, setUserType] = useState([]);

  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [institute, setInstitute] = useState([]);
  const [library, setLibrary] = useState([]);
  const [instituteId, setInstituteId] = useState("");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    role: "",
    address: "",
    gender: "",
    image: "", // 👈 Added image field
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

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const token = getToken();
    if (!token) {
      errorToaster("Authentication required!");
      setLoading(false);
      return;
    }
    
   

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image") {
        if (value instanceof File) {
          formDataToSend.append(key, value); // Append only if image is selected
        }
        // Do nothing if image is not selected (i.e., optional)
      } else if (key === "mappings" && Array.isArray(value)) {
        value.forEach((item, index) => {
          Object.entries(item).forEach(([subKey, subValue]) => {
            formDataToSend.append(`${key}[${index}][${subKey}]`, subValue);
          });
        });
      } else {
        formDataToSend.append(key, value);
      }
    });
    
    const isSuperUser = formData.role === "ADMIN";
    formDataToSend.append("is_superuser", isSuperUser);
    const hostname = typeof window !== "undefined" ? window.location.hostname : "";
    formDataToSend.append('sub_domain',hostname);
    
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`,
        formDataToSend,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data", // 👈 Ensure it's multipart for file upload
          },
        }
      );
      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Admin added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setFormData({
          name: "",
          email: "",
          phone_number: "",
          role: "",
          address: "",
          gender: "",
          image: "", // reset image field
        });
        router.push("/user-management/admin");
      }
    } catch (error) {
      const errorData = error.response?.data;
      if (typeof errorData === "object") {
        Object.keys(errorData).forEach((key) => {
          const message = Array.isArray(errorData[key])
            ? errorData[key].join(", ")
            : errorData[key];
          errorToaster(`${message}`);
        });
      } else {
        errorToaster(errorData.message || "Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMappingChange = (event, index) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      updatedFormData.mappings[index] = {
        ...updatedFormData.mappings[index],
        [name]: value,
        institute: instituteId,
      };

      return updatedFormData;
    });
  };

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Add Admin</h3>
              <Link href="./" className="btn btn-white">
                <FaMinusCircle /> Back
              </Link>
            </div>
          </Col>
        </Row>
        <div className="card p-6 mt-5">
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Row>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formNumber">
                  <Form.Label>Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    required
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="ADMIN">Super Admin</option>
                    <option value="INSTITUTE ADMIN">Institute Admin</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formGender">
                  <Form.Label>Gender</Form.Label>
                  <div>
                    {["MALE", "FEMALE", "OTHER"].map((gender) => (
                      <Form.Check
                        inline
                        key={gender}
                        label={gender}
                        id={gender}
                        name="gender"
                        type="radio"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={(e) => handleInputChange(e)}
                      />
                    ))}
                  </div>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formImage">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Preview"
                        style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "6px" }}
                      />
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" className="w-100" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        </div>
        <ToastContainer />
      </Container>
    </Fragment>
  );
};

export default Home;
