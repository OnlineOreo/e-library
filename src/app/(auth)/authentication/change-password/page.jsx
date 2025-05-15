"use client";
import { Row, Col, Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import Link from "next/link";

const getToken = () => {
  const cookieString = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="));

  return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
};

const getUserId = () => {
  const cookieString = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user_id="));
  return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const token = getToken();
    if (!token) {
      setError("Unauthorized. Please log in again.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/self-change-password`,
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(response.data)

      if (response.status == 200 || response.status == 201) {
        Swal.fire({
          title: "Success!",
          text: "Password changed successfully!",
          icon: "success",
          timer: 2000,
          confirmButtonText: "OK",
        });

        setOldPassword("");
        setNewPassword("");
        router.push('/');
      } else {
        setError(response.data.message || "Password change failed.");
      }
    } catch (err) {
      setError(
        err.response?.data?.detail
      );
    }

    setIsLoading(false);
  };

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        <Card className="smooth-shadow-md">
          <Card.Body className="p-6">
            <div className="d-flex flex-wrap justify-content-between">
              <h4 className="mb-4">Change Password</h4>
              <Link href="/" className="">Back</Link>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleChangePassword}>
              <Form.Group className="mb-3" controlId="oldPassword">
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ChangePassword;
