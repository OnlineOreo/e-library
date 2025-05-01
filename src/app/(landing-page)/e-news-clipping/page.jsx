"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row, Card } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

const NewsClipping = () => {
  const successToaster = (text) => toast(text);
  const errorToaster = (text) => toast.error(text);

  const [newsClipping, setNewsClipping] = useState([]);
  const [search, setSearch] = useState("");

  const instituteId = useSelector((state) => state.institute.instituteId);

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    if (typeof window !== "undefined" && instituteId) {
      loadItemTypes();
    }
  }, [instituteId]);

  const loadItemTypes = async () => {
    const token = getToken();
    if (!token) {
      errorToaster("Authentication required!");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/e-news-clips?institute_id=${instituteId}`,
        {
          headers: { Authorization: `${token}` },
        }
      );

      if (response.status === 200) {
        setNewsClipping(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredClips = newsClipping.filter((clip) =>
    clip.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container className="my-6 mx-6 px-6 mt-10">
        <Row className="mb-3">
            <Col>
            {/* <h4 className="text-dark">📰 News-Paper Clipping Gallery</h4> */}
            <input
                type="text"
                className="form-control mt-2"
                placeholder="Search by title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            </Col>
        </Row>




        <Row>
          {filteredClips.length > 0 ? (
            filteredClips.map((clip) => (
              <Col key={clip.e_news_clip_id} lg={4} md={6} sm={12} className="mb-4">
                <Card className="border-0 shadow-sm h-100">
                  <Card.Img
                    variant="top"
                    src={clip.thumbnail || "/placeholder.jpg"}
                    alt={clip.title}
                    style={{ height: "180px", objectFit: "cover", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}
                  />
                  <Card.Body className="py-2 px-3">
                  <Card.Title className="mb-1 extra-bold" style={{ fontSize: "1.5rem", fontWeight: 800 }} title={clip.title}>
                    {clip.title.length > 50 ? clip.title.slice(0, 47) + "..." : clip.title}
                    </Card.Title>



                    <Card.Text className="text-muted small mb-2" style={{ lineHeight: "1.2", maxHeight: "2.4em", overflow: "hidden" }}>
                      {clip.description}
                    </Card.Text>
                    <div className="d-flex flex-wrap gap-2">
                      {clip.url && (
                        <Link href={clip.url} target="_blank" className="btn btn-sm btn-outline-secondary">
                          Source
                        </Link>
                      )}
                      {clip.attachment && (
                        <Link href={clip.attachment} target="_blank" className="btn btn-sm btn-outline-primary">
                          Attachment
                        </Link>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-muted">No news clippings found.</p>
            </Col>
          )}
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default NewsClipping;
