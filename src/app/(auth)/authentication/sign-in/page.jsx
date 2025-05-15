"use client";
import { Row, Col } from "react-bootstrap";
import { Suspense } from "react";
import SignIn from "@/app/Component/landing-page/SignIn";

const SignIn2 = () => {
  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
      <Suspense fallback={<div>Loading...</div>}>
         <SignIn/>
      </Suspense>
      </Col>
    </Row>
  );
};

export default SignIn2;
