'use client'
// Import node module libraries
import { Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SuccessToast from '@/app/Component/Alert/Toast';

const ForgetPassword = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [new_password, setPassword] = useState('');
  const [changePassword , setChangePassword] = useState(false)

  const [stage, setStage] = useState(1);

  const sendOtp = async () => {
    setIsLoading(true);
    try {
      await fetch("http://192.168.1.20:8010/api/password-reset/request", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setStage(2);
    } catch (err) {
      console.error('Error sending OTP:', err);
    }
    setIsLoading(false);
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    try {
      await fetch("http://192.168.1.20:8010/api/password-reset/verify", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      setStage(3);
    } catch (err) {
      console.error('OTP verification error:', err);
    }
    setIsLoading(false);
  };

  const setNewPassword = async () => {
    setIsLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/password-reset/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, new_password })
      });

      setChangePassword(true)
      setTimeout(() => {
        router.push('./sign-in');
      }, 5000);

    } catch (err) {
      console.error('Password reset error:', err);
    }
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stage === 1) sendOtp();
    else if (stage === 2) verifyOtp();
    else if (stage === 3) setNewPassword();
  };

  return (
    <>
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        <Card className="smooth-shadow-md">
          <Card.Body className="p-6">
            <div className="mb-4">
              <p className="mb-6">Don&apos;t worry, we&apos;ll send you an email to reset your password.</p>
            </div>
            <Form onSubmit={handleSubmit}>
              {stage === 1 && (
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    required
                  />
                </Form.Group>
              )}
              {stage === 2 && (
                <Form.Group className="mb-3" controlId="otp">
                  <Form.Label>OTP</Form.Label>
                  <Form.Control
                    type="number"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    required
                  />
                </Form.Group>
              )}
              {stage === 3 && (
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={new_password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your Password"
                    required
                  />
                </Form.Group>
              )}
              <div className="mb-3 d-grid">
                <Button variant="primary" disabled={isLoading} type="submit">
                  {isLoading ? <Spinner animation="border" size="sm" /> : "Continue"}
                </Button>
              </div>
              <span>Already have an account? <Link href="/authentication/sign-in" className="text-primary">Sign In</Link></span>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <SuccessToast status={changePassword} res="success" message="Password changed successfully!" />
    </>
  );
};

export default ForgetPassword;
