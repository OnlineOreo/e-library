"use client";
import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaCalendarAlt, FaUsers, FaChartLine, FaCog } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import TabCard1 from "./TabCard1";
import TabCard2 from "./TabCard2";
import TabCard3 from "./TabCard3";
import TabCard4 from "./TabCard4";

const Report = ({ selectedDate }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [cardValues, setCardValues] = useState({
    1: "...",
    2: "...",
    3: "...",
    4: "...",
  });

  const getToken = () => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  };

  useEffect(() => {
    const fetchCardValues = async (selectedDate) => {
      const token = getToken();
      if (!token) {
        router.push("/");
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "Session Expired! You have logged out.",
          confirmButtonText: "OK",
        });
      }
      const hostname =
        typeof window !== "undefined" ? window.location.hostname : "";

      const start_date = selectedDate.start;
      const end_date = selectedDate.end;

      try {
        // const [res1, res2, res3, res4] = await Promise.all([
        const [res1] = await Promise.all([
          axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports-login-stats?sub_domain=${hostname}&start_date=${start_date}&end_date=${end_date}`,
            {
              headers: { Authorization: `${token}` },
            }
          ),
          // axios.get(
          //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/report-2-summary?sub_domain=${hostname}&start_date=${start_date}&end_date=${end_date}`,
          //   {
          //     headers: { Authorization: `${token}` },
          //   }
          // ),
          // axios.get(
          //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/report-3-summary?sub_domain=${hostname}&start_date=${start_date}&end_date=${end_date}`,
          //   {
          //     headers: { Authorization: `${token}` },
          //   }
          // ),
          // axios.get(
          //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/report-4-summary?sub_domain=${hostname}&start_date=${start_date}&end_date=${end_date}`,
          //   {
          //     headers: { Authorization: `${token}` },
          //   }
          // ),
        ]);

        setCardValues({
          1: res1.data ?? "N/A",
          // 2: res2.data?.value ?? "N/A",
          // 3: res3.data?.value ?? "N/A",
          // 4: res4.data?.value ?? "N/A",
        });
      } catch (error) {
        console.error("Error fetching card summaries:", error);
      }
    };

    if (selectedDate != undefined) {
      fetchCardValues(selectedDate);
    }
  }, [selectedDate]);

  const cardData = [
    {
      id: 1,
      title: "Active Users",
      subtitle: "(Login during selected period)",
      icon: <FaCalendarAlt />,
      component: <TabCard1 apiData={cardValues[1]} />,
    },
    // {
    //   id: 2,
    //   title: "Tab 2",
    //   subtitle: "Monthly Overview",
    //   icon: <FaUsers />,
    //   component: <TabCard2 apiData={cardValues[2]} />,
    // },
    // {
    //   id: 3,
    //   title: "Tab 3",
    //   subtitle: "Revenue Growth",
    //   icon: <FaChartLine />,
    //   component: <TabCard3 apiData={cardValues[3]} />,
    // },
    // {
    //   id: 4,
    //   title: "Tab 4",
    //   subtitle: "Settings",
    //   icon: <FaCog />,
    //   component: <TabCard4 apiData={cardValues[4]} />,
    // },
  ];

  // Calculate total count for each card (before return)
  const calculateTotalCount = (cardId) => {
    const data = cardValues[cardId];
    if (data && Array.isArray(data.date_wise_counts)) {
      return data.date_wise_counts.reduce((sum, item) => sum + item.count, 0);
    }
    return "...";
  };

  return (
    <div className="container mt-5">
      <Row className="mb-4">
        {cardData.map(({ id, title, subtitle, icon }) => (
          <Col key={id} xs={12} md={3}>
            <Card
              className={`h-100 shadow-sm ${
                activeTab === id ? "bg-primary text-white border-primary" : ""
              }`}
              onClick={() => setActiveTab(id)}
              style={{ cursor: "pointer" }}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h5
                      className={`mb-1 ${activeTab === id ? "text-white" : ""}`}
                    >
                      {title}
                    </h5>
                    <small
                      className={activeTab === id ? "text-white" : "text-muted"}
                    >
                      {subtitle}
                    </small>
                  </div>
                  <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                    {icon}
                  </div>
                </div>
                <div>
                  <h3
                    className={`fw-bold ${
                      activeTab === id ? "text-white" : ""
                    }`}
                  >
                    {calculateTotalCount(id)}
                  </h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-4">
        {cardData.find((card) => card.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default Report;
