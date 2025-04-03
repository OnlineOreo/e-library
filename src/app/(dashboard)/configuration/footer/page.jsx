'use client';
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Footer = () => {
  const [footerData, setFooterData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const instituteId = useSelector((state) => state.institute.instituteId);
  const status = useSelector((state) => state.institute.status);

  useEffect(() => {
    if(instituteId){
    loadFooter();
    }
  }, [instituteId]);

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const loadFooter = async () => {
    const token = getToken();
    if (!token) {
      router.push("/authentication/sign-in");
      return;
    }   

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/footers?institute=${instituteId}`,
        { headers: { Authorization: `${token}` } }
      );
      if (response.status === 200 && response.data.length > 0) {
        setFooterData(response.data[0]);
        // console.log(response.data[0].footer_id);
        
      }
    } catch (error) {
      console.error("Axios Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // console.log(footerData.footer_id)

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 text-dark">Personals and Social Details</h3>
                <Link href={`/configuration/footer/edit/${footerData.footer_id}`} className="btn btn-white">
                  <FaPlusCircle /> Update Details
                </Link>
            </div>
          </Col>
        </Row>

        <div className="card p-3 mt-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : footerData ? (
            <div>
              <p><strong>Address:</strong> {footerData.address || "N/A"}</p>
              <p><strong>Phone:</strong> {footerData.phone || "N/A"}</p>
              <p><strong>Email:</strong> {footerData.email || "N/A"}</p>
              <p><strong>Facebook:</strong> {footerData.fb_url ? <a href={footerData.fb_url} target="_blank">{footerData.fb_url}</a> : "N/A"}</p>
              <p><strong>X (Twitter):</strong> {footerData.x_url ? <a href={footerData.x_url} target="_blank">{footerData.x_url}</a> : "N/A"}</p>
              <p><strong>YouTube:</strong> {footerData.yt_url ? <a href={footerData.yt_url} target="_blank">{footerData.yt_url}</a> : "N/A"}</p>
              <p><strong>LinkedIn:</strong> {footerData.li_url ? <a href={footerData.li_url} target="_blank">{footerData.li_url}</a> : "N/A"}</p>
              <p><strong>Instagram:</strong> {footerData.insta_url ? <a href={footerData.insta_url} target="_blank">{footerData.insta_url}</a> : "N/A"}</p>
              <p><strong>Page Content:</strong> {footerData.page_content || "N/A"}</p>
            </div>
          ) : (
            <p>No footer data available.</p>
          )}
        </div>
      </Container>
    </Fragment>
  );
};

export default Footer;
