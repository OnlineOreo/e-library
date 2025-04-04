import { Col, Row, Card, Button, Form, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

export default function NewsCategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [configId, setConfigId] = useState(null);

  const instituteId = useSelector((state) => state.institute.instituteId);

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news`);
        const data = await response.json();
        const uniqueCategories = [...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        Swal.fire("Error", "Failed to fetch categories", "error");
      }
    };

    const fetchDefaultConfig = async (instituteId) => {
      const token = getToken();

      if (!instituteId || !token) return;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configurations?institute_id=${instituteId}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const config = response.data?.[0];
        if (config) {
          setConfigId(config.conf_id);
          let defaultCategories = [];

          if (Array.isArray(config.news_category)) {
            defaultCategories = config.news_category;
          } else if (typeof config.news_category === "string") {
            defaultCategories = config.news_category
              .split(",")
              .map(item => item.trim())
              .filter(item => item.length > 0);
          }

          setSelectedCategories(defaultCategories);
        }
      } catch (error) {
        console.error("Error fetching default config:", error);
        Swal.fire("Error", "Failed to fetch default configuration", "error");
      }
    };

    fetchCategories();
    fetchDefaultConfig(instituteId);
  }, [instituteId]);

  const handleCheckboxChange = (category) => {
    setSelectedCategories(prev => {
      if (Array.isArray(prev)) {
        if (prev.includes(category)) {
          return prev.filter(c => c !== category);
        } else if (prev.length < 8) {
          return [...prev, category];
        } else {
          Swal.fire("Limit Reached", "You can select a maximum of 8 categories.", "warning");
          return prev;
        }
      } else {
        console.error("selectedCategories is not an array:", prev);
        return [];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(configId)

    if (selectedCategories.length === 0) {
      Swal.fire("Validation Error", "Please select at least one category", "warning");
      return;
    }

    try {
      const token = getToken();
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configurations?conf_id=${configId}`,
        {
          news_category: selectedCategories.join(","), // Convert to comma-separated string
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      Swal.fire("Success", "Categories saved successfully!", "success");
      // setSelectedCategories([]);
    } catch (error) {
      console.error("Error saving categories:", error);
      Swal.fire("Error", "Failed to save categories", "error");
    }
  };

  return (
    <Row className="mt-5 justify-content-center user-select-none">
      <Col md={10}>
        <Card className="shadow border-0">
          <Card.Header className="bg-dark text-white text-center py-3 rounded-top">
            <h5 className="mb-0 text-light">📰 Choose Your News Category</h5>
          </Card.Header>
          <Card.Body className="p-4">
            <div className="text-center mb-3">
              <p className="text-muted mb-0">
                You can select up to <strong>8 categories</strong>
              </p>
              <Badge bg={selectedCategories.length < 8 ? "info" : "danger"} className="mt-2">
                {selectedCategories.length} / 8 Selected
              </Badge>
            </div>

            <Form>
              <Row className="g-3 category-scroll">
                {categories.map((category, index) => (
                  <Col key={index} xs={12} sm={6} md={3}>
                    <Form.Check
                      type="checkbox"
                      style={{ cursor:'pointer' }}
                      id={`category-${index}`}
                      label={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCheckboxChange(category)}
                      className={`styled-checkbox ${selectedCategories.includes(category) ? "checked" : ""}`}
                      disabled={
                        !selectedCategories.includes(category) &&
                        selectedCategories.length >= 8
                      }
                    />
                  </Col>
                ))}
              </Row>
            </Form>

            <div className="text-center mt-4">
              <Button variant="primary" size="sm" onClick={handleSubmit}>
                Save Category
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <style jsx>{`
        .category-scroll {
          max-height: 350px;
          overflow-y: auto;
          padding: 10px;
          border: 1px solid #e2e6ea;
          border-radius: 6px;
          background-color: #fdfdfd;
        }

        .styled-checkbox {
          background-color: #f8f9fa;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ced4da;
          transition: all 0.2s ease-in-out;
          cursor: pointer;
        }

        .styled-checkbox input {
          margin-right: 8px;
        }

        .styled-checkbox.checked {
          background-color: #e0f0ff;
          font-weight: 600;
          border-color: #007bff;
        }

        .styled-checkbox:hover {
          background-color: #eef6ff;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 3px;
        }
      `}</style>
    </Row>
  );
}
