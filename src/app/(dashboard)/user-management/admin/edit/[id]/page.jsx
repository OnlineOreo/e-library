"use client";
import { Fragment, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { FaMinusCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const EditAdmin = () => {
  const { id } = useParams();
  const router = useRouter();
  const instituteId = useSelector((state) => state.institute.instituteId);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    role: "",
    address: "",
    gender: "",
    image: "",
  });

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    const fetchAdmin = async(id,instituteId)=>{
        axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users?user_id=${id}&institute_id=${instituteId}&admin=true`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          setFormData(res.data);
        })
        .catch(() => toast.error("Failed to fetch user data"));
    }
    if(id && instituteId){
        fetchAdmin(id,instituteId)
    }
  }, [id,instituteId]);

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = getToken();
    if (!token) {
      toast.error("Authentication required!");
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image") {
        if (value instanceof File) {
          formDataToSend.append(key, value);
        }
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Swal.fire("Success!", "Admin updated successfully!", "success");
      router.push("/user-management/admin");
    } catch (error) {
      const errData = error.response?.data;
      if (typeof errData === "object") {
        Object.values(errData).forEach((msg) => toast.error(msg.toString()));
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Edit Admin</h3>
              <Link href="/user-management/admin" className="btn btn-white">
                <FaMinusCircle /> Back
              </Link>
            </div>
          </Col>
        </Row>
        <div className="card p-6 mt-5">
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Row>
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Address", name: "address", type: "text" },
                { label: "Number", name: "phone_number", type: "number" },
              ].map(({ label, name, type }) => (
                <Col lg={6} key={name}>
                  <Form.Group className="mb-3">
                    <Form.Label>{label}</Form.Label>
                    <Form.Control
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              ))}

              <Col lg={6}>
                <Form.Group className="mb-3">
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
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  {["MALE", "FEMALE", "OTHER"].map((gender) => (
                    <Form.Check
                      inline
                      key={gender}
                      label={gender}
                      name="gender"
                      type="radio"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleInputChange}
                    />
                  ))}
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                  {formData.image && typeof formData.image === "string" && (
                    <div className="mt-2">
                      <img
                        src={formData.image}
                        alt="Current"
                        style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 6 }}
                      />
                    </div>
                  )}
                  {formData.image instanceof File && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Preview"
                        style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 6 }}
                      />
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span> Updating...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </Form>
        </div>
        <ToastContainer />
      </Container>
    </Fragment>
  );
};

export default EditAdmin;
