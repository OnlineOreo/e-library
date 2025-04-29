'use client';

import { Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import axios from 'axios'; // <== Import axios

const ForgetPassword = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [new_password, setPassword] = useState('');
  const [changePassword, setChangePassword] = useState(false);
  const [stage, setStage] = useState(1);
  const [otpError, setOtpError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [emailError, setEmailError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);

  const sendOtp = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/password-reset/request`, { email });
      setStage(2);
    } catch (err) {
      setEmailError(err?.response?.data?.email?.[0]);
    }
    setIsLoading(false);
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    setOtpError(''); // Reset error before verifying

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/password-reset/verify`, { email, otp });
      setStage(3);
    } catch (err) {
      console.error('OTP verification error:', err);
      setOtpError(err?.response?.data?.message || 'Invalid OTP, please try again.');
    }
    setIsLoading(false);
  };

  const resendOtp = async () => {
    setResendLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/password-reset/request`, { email });
      setOtpError('A new OTP has been sent to your email.');
    } catch (err) {
      console.error('Error resending OTP:', err);
    }
    setResendLoading(false);
  };

  const setNewPassword = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/password-reset/reset`, {
        email,
        otp,
        new_password,
      });

      setChangePassword(true);
      Swal.fire({
        title: "Success!",
        text: "Password changed successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      setPasswordError(err?.response?.data?.new_password?.[0] || 'Failed to reset password.');
    }    
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError('')
    setPasswordError('');
    if (stage === 1) sendOtp();
    else if (stage === 2) verifyOtp();
    else if (stage === 3) setNewPassword();
  };

  const handleChangeEmail = () => {
    setStage(1);
  };

  return (
    <>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
          <Card className="smooth-shadow-md">
            <Card.Body className="p-6">
              <div className="mb-4">
                <strong className="mb-6">
                  {stage === 1
                    ? "Don't worry, we'll send you an email to reset your password.."
                    : stage === 2
                    ? `OTP sent to (${email})`
                    : stage === 3
                    ? 'Set new password'
                    : ''}
                </strong>
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
                     {emailError && <Alert variant="danger" className="mt-2">{emailError}</Alert>}
                  </Form.Group>
                )}

                {stage === 2 && (
                  <>
                    <Form.Group className="mb-3" controlId="otp">
                      <Form.Label>OTP</Form.Label>
                      <Form.Control
                        type="number"
                        value={otp}
                        onChange={(e) => {
                          setOtpError('');
                          setOtp(e.target.value);
                        }}
                        placeholder="Enter OTP"
                        required
                      />
                      {otpError && <Alert variant="danger" className="mt-2">{otpError}</Alert>}
                    </Form.Group>

                    <div className="mb-3 d-flex justify-content-between">
                      <a
                        disabled={resendLoading}
                        onClick={resendOtp}
                        style={{ textDecoration: 'underline', cursor: 'pointer' }}
                      >
                        {resendLoading ? <Spinner animation="border" size="sm" /> : "Resend OTP"}
                      </a>

                      <a
                        disabled={resendLoading}
                        onClick={handleChangeEmail}
                        style={{ textDecoration: 'underline', cursor: 'pointer' }}
                      >
                        Change Email
                      </a>
                    </div>
                  </>
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
                    {passwordError && <Alert variant="danger" className="mt-2">{passwordError}</Alert>}
                  </Form.Group>
                )}

                <div className="mb-3 d-grid">
                  <Button variant="primary" disabled={isLoading} type="submit">
                    {isLoading ? <Spinner animation="border" size="sm" /> : "Continue"}
                  </Button>
                </div>

                <span>
                  Already have an account?{' '}
                  <Link href="/" className="text-primary">
                    Sign In
                  </Link>
                </span>
              </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ForgetPassword;
