'use client'

// Import libraries
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import useMounted from '@/hooks/useMounted';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from 'react-bootstrap/Spinner';

const SignIn = () => {
  const router = useRouter(); 

  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {  
    e.preventDefault();
    setIsLoading(true)
    setError('');

    try {
      console.log('Sending login request with:', { email, password });

      const response = await fetch('http://192.168.1.20:8010/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.access_token) {
        document.cookie = `access_token=${data.access_token}; path=/; max-age=${60 * 60 * 24}; secure=${process.env.NODE_ENV === 'production' ? 'true' : 'false'}; samesite=strict`;

        localStorage.setItem('access_token', data.access_token);
      }
      
      if (response.ok) {
        router.push('../dashboard')
      }else{
        setError(data.detail)
        setIsLoading(false)
      }
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err);
      setIsLoading(false)
    }
  }

  const hasMounted = useMounted();

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="shadow">
          {/* Card body */}
          <Card.Body className="p-6">
          <div className='mb-4' style={{ width: "100%", height: "100px", display:"flex",justifyContent:"center" }}>
            <img
              src="http://mriirs.libvirtuua.com/storage/landing_page/elib_transparent_logo.png"
              alt="Logo"
              style={{ width: "120px", height: "100%" }}
            />
          </div>
            <div className="mb-4">
              {/* <h5 className="mb-6">Login</h5> */}
            </div>
            {/* Form */}
            {hasMounted && (
              <Form onSubmit={handleSignIn}>
                {error && <div className="text-danger mb-3">{error}</div>}
                {/* Username */}
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter address here" required />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="**************" required />
                </Form.Group>

                {/* Checkbox */}
                <div className="d-lg-flex justify-content-between align-items-center mb-4">
                  <Form.Check type="checkbox" id="rememberme">
                    <Form.Check.Input type="checkbox" />
                    <Form.Check.Label>Remember me</Form.Check.Label>
                  </Form.Check>
                </div>
                <div>
                  {/* Button */}
                  <div className="d-grid">
                    <Button variant="primary" type="submit">{isLoading ? <Spinner animation="border" size="sm" /> : "Login"}</Button>
                  </div>
                  <div className="d-md-flex justify-content-between mt-4">
                    <div className="mb-2 mb-md-0">
                      {/* <Link href="/authentication/sign-up" className="text-decoration-none">Create An Account</Link> */}
                    </div>
                    <div>
                      <Link href="/authentication/forget-password" className="text-dark text-decoration-none">Forgot your password?</Link>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default SignIn;
