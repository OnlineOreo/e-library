"use client";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "react-bootstrap/Spinner";
import { useSelector } from "react-redux";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const instituteId = useSelector((state) => state.institute.instituteId);

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      // Step 1: Login Request
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }
  
      // Step 2: Store Token in Cookie
      document.cookie = `access_token=${data.access_token}; path=/; max-age=${
        60 * 100
      }; Secure; SameSite=None;`;
  
      const token = getToken();
      if (!token) {
        throw new Error("Token retrieval failed");
      }
  
      // Step 3: Fetch User Profile
      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`,
        {
          method: "GET",
          headers: { Authorization: token, "Content-Type": "application/json" },
        }
      );
  
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user profile");
      }
  
      const userData = await userResponse.json(); 
      const userId = userData.id; 
  
      // Step 4: Get Device & Browser Info
      const userAgent = navigator.userAgent;
      let browserName = "Unknown Browser";
  
      if (userAgent.includes("Chrome")) browserName = "Chrome";
      else if (userAgent.includes("Firefox")) browserName = "Firefox";
      else if (userAgent.includes("Safari")) browserName = "Safari";
      else if (userAgent.includes("Edge")) browserName = "Edge";
      else if (userAgent.includes("Opera")) browserName = "Opera";
  
      let deviceType = /Mobi|Android|iPhone|iPad/i.test(userAgent)
        ? "Mobile"
        : "Desktop";
  
      // Step 5: Fetch IP Address
      const ipResponse = await fetch("https://api64.ipify.org?format=json");
      const ipData = await ipResponse.json();
      const ipAddress = ipData.ip;
  
      // Step 6: Store User Session Data
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-session`, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          institute: instituteId, 
          user: userId, 
          browser_name: browserName,
          device_type: deviceType,
          ip_address: ipAddress,
        }),
      });
  
      // Step 7: Redirect to Dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Something went wrong!");
      setIsLoading(false);
    }
  };
  

  if (!isClient) return null;

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        <Card className="shadow">
          <Card.Body className="p-6">
            <Form onSubmit={handleSignIn}>
              {error && <div className="text-danger mb-3">{error}</div>}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  placeholder="**************"
                  required
                />
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit">
                  {isLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
              <div className="d-md-flex justify-content-between mt-4">
                <Link
                  href="/authentication/forget-password"
                  className="text-dark text-decoration-none"
                >
                  Forgot password?
                </Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SignIn;
