  "use client";
  import { Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
  import Link from "next/link";
  import { useState, useEffect } from "react";
  import { useRouter , useSearchParams } from "next/navigation";
  import { useSelector, useDispatch } from "react-redux";
  // import { setUser } from "@/redux/slices/userSlice";
  import Swal from "sweetalert2";
  import { setUser } from "../../../redux/slices/userSlice";

  const SignIn = ({show, publisherUrls , setShow, setToken}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const instituteId = useSelector((state) => state.institute.instituteId);
    const searchParams = useSearchParams();
    const q = searchParams.get("q");
    const redirect = searchParams.get("redirect");
    const book = searchParams.get("book");
    const extra = searchParams.get("extra");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    const getToken = () => {
      const cookieString = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="));

      return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
    };

    const handleSignIn = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        // Step 1: Login
        const hostname = typeof window !== "undefined" ? window.location.hostname : "";
        const loginResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login?sub_domain=${hostname}`,
          // `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login?sub_domain=mriirs.libvirtuua.com`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",
          }
        );

        const loginData = await loginResponse.json();
        if (!loginResponse.ok) throw new Error(loginData.detail || "Login failed");
        
        // Store token in cookies
        document.cookie = `access_token=${loginData.access_token}; path=/; max-age=6000; SameSite=Lax;`;
        const token = getToken();
        if (!token) throw new Error("Token retrieval failed");

        // Fetch User Profile & IP in Parallel
        const [userResponse, ipResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`, {
            method: "GET",
            headers: { Authorization: token, "Content-Type": "application/json" },
          }),
          fetch("https://api64.ipify.org?format=json"),
        ]);

        if (!userResponse.ok) throw new Error("Failed to fetch user profile");
        const userData = await userResponse.json();

        // Save user role in cookie and redux
        document.cookie = `user_role=${userData.role}; path=/; max-age=6000; SameSite=Lax;`;
        document.cookie = `user_id=${userData.id}; path=/; max-age=6000; SameSite=Lax;`;
        // document.cookie = `user_id=${userData.id}; path=/; max-age=6000; SameSite=Lax;`;
        dispatch(setUser(userData));

        // Get device & browser info
        const userAgent = navigator.userAgent;
        const browserName = /Chrome/.test(userAgent)
          ? "Chrome"
          : /Firefox/.test(userAgent)
          ? "Firefox"
          : /Safari/.test(userAgent)
          ? "Safari"
          : /Edge/.test(userAgent)
          ? "Edge"
          : "Unknown";

        const deviceType = /Mobi|Android|iPhone|iPad/i.test(userAgent)
          ? "Mobile"
          : "Desktop";

        // Save session in background
        ipResponse.json().then((ipData) => {
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-session`, {
            method: "POST",
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              institute: instituteId,
              user: userData.id,
              browser_name: browserName,
              device_type: deviceType,
              ip_address: ipData.ip,
            }),
          })
            .then((res) => res.json())
            .then((response) => {
              document.cookie = `session_id=${response.session}; path=/; max-age=6000; SameSite=Lax;`;
            })
            .catch((err) => console.error("Session save failed:", err));
        });
        
        if (q != null) {
          router.push(`?q=${q}`);
        }else if(redirect != null){
          router.push(`/`);
          window.open(publisherUrls[redirect], "_blank");
        }else if(book != null){ 
          window.open(`${book}`, "_blank")
        }else if(extra != null){
          window.open(`${extra}`, "_blank")
        } else {
          router.push(userData.role === "STUDENT" ? "/" : "/dashboard");
        }
        setIsLoading(false);
        setError(null);
        setShow(false);
        setToken(token);
        setEmail('');
        setPassword('');
        Swal.fire({
          icon: 'success',
          title: 'Logged In',
          text: 'You have been successfully logged in.',
          confirmButtonText: 'OK'
        });
      } catch (err) {
        setError(err.message || "Login failed. Something went wrong!");
        setIsLoading(false);
      }
    };

    if (!isClient) return null;

    return (
      <Row className="align-items-center justify-content-center g-0">
        <Col xxl={12} lg={12} md={12} xs={12} className="py-8 py-xl-0">
          <Card className="shadow p-lg-4 p-2">
            <Card.Body className="p-3">
              <Form onSubmit={handleSignIn}>
                {error && <div className="text-danger mb-3">{error}</div>}

                {/* Email */}
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-5" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                </Form.Group>

                {/* Submit Button */}
                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
                  </Button>
                </div>

                <div className="d-md-flex justify-content-between mt-4">
                  <div>
                    <Link href="/authentication/forget-password" className="text-dark text-decoration-none">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  };

  export default SignIn;
