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
  const [totalVisit, setTotalVisits] = useState(0)
  // const [comulative, setComulative] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  // const [totalCount2, setTotalCount2] = useState(0)

  const [cardValues, setCardValues] = useState({
    1: 0,
    2: 0,
    3: 0,
    // 4: 0,
  });

  const getToken = () => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  };

  useEffect(() => {
    const fetchCardValues = async (selectedDate) => {
      if (!selectedDate || !selectedDate.start || !selectedDate.end) {
        return;
      }

      const token = getToken();
      if (!token) {
        router.push("/");
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "Session Expired! You have logged out.",
          confirmButtonText: "OK",
        });
        return;
      }

      const hostname = typeof window !== "undefined" ? window.location.hostname : "";
      console.log("Selected Date:", selectedDate);

      const start_date = selectedDate.start;
      const end_date = selectedDate.end;

      try {
        const [res1, res2, totalVisits] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports-login-stats?sub_domain=${hostname}&start_date=${start_date}&end_date=${end_date}`, {
            headers: { Authorization: `${token}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports-login-stats?sub_domain=${hostname}&start_date=${start_date}&end_date=${end_date}`, {
            headers: { Authorization: `${token}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports-user-visits?sub_domain=${hostname}&start_date=${start_date}&end_date=${end_date}`, {
            headers: { Authorization: `${token}` },
          }),
        ]);

        const [cumulative_report, page_view_report, search_report, download_report] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports-discovery-search-cumulative?report_type=cumulative_report&sub_domain=${hostname}&start_date=${start_date}&end_date=${end_date}`, {
            headers: { Authorization: `${token}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports-discovery-search-cumulative?report_type=page_view_report&sub_domain=${hostname}&start_date=${start_date}&end_date=${end_date}`, {
            headers: { Authorization: `${token}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports-discovery-search-cumulative?report_type=search_report&sub_domain=${hostname}&start_date=${start_date}&end_date=${end_date}`, {
            headers: { Authorization: `${token}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports-discovery-search-cumulative?report_type=download_report&sub_domain=${hostname}&start_date=${start_date}&end_date=${end_date}`, {
            headers: { Authorization: `${token}` },
          }),
        ]);

        const arr = {
          cumulative_report: cumulative_report.data,
          page_view_report: page_view_report.data,
          search_report: search_report.data,
          download_report: download_report.data,
        };

        function getTotalCount(array) {
          return array.reduce((sum, item) => sum + item.count, 0);
        }

        const cumulativeTotal = getTotalCount(arr.cumulative_report.cumulative_count || []);
        const downloadTotal = getTotalCount(arr.download_report.download_count || []);
        const pageViewTotal = getTotalCount(arr.page_view_report.page_visit_count || []);
        const searchTotal = getTotalCount(arr.search_report.search_query_count || []);

        const grandTotal = cumulativeTotal + downloadTotal + pageViewTotal + searchTotal;

        setCardValues({
          1: res1.data ?? "N/A",
          2: res2.data ?? "N/A",
          3: arr ?? "N/A",
        });

        setTotalVisits(totalVisits?.data?.no_of_days);
        setTotalCount(grandTotal);
      } catch (error) {
        console.error("Error fetching card values:", error);
      }
    };

    if (selectedDate && selectedDate.start && selectedDate.end) {
      fetchCardValues(selectedDate);
    } else {
      console.warn("selectedDate is missing or malformed:", selectedDate);
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
    {
      id: 2,
      title: "Vistits & Logins",
      subtitle: "(Includes guest sessions)",
      icon: <FaUsers />,
      component: <TabCard2 apiData={cardValues[2]} />,
    },
    {
      id: 3,
      title: "Comulative page views, search and Downloads",
      subtitle: "Revenue Growth",
      icon: <FaChartLine />,
      component: <TabCard3 setTotalCount={setTotalCount} totalCount={totalCount} apiData={cardValues[3]} />,
    },
    // {
    //   id: 4,
    //   title: "Tab 4",
    //   subtitle: "Settings",
    //   icon: <FaCog />,
    //   component: <TabCard4 setTotalCount={setTotalCount2} totalCount2={totalCount2} apiData={cardValues[4]} />,
    // },
  ];

  // Calculate total count for each card (before return)
  const calculateTotalCount = (cardId) => {
    const data = cardValues[cardId];
    var total = 0
    if (data && Array.isArray(data.date_wise_counts)) {
      total = data.date_wise_counts.reduce((sum, item) => sum + item.count, 0);
      if (cardId == 2) {
        total = total + totalVisit
      }
    }

    return total;
  };

  return (
    <div className="container mt-5">
      <Row className="mb-4">
        {cardData.map(({ id, title, subtitle, icon }) => (
          <Col className="mt-3" key={id} xs={12} md={3}>
            <Card
              className={`h-100 shadow-sm ${activeTab === id ? "bg-primary text-white border-primary" : "bg-light"
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
                    className={`fw-bold ${activeTab === id ? "text-white" : ""
                      }`}
                  >
                    {id != 3 ? calculateTotalCount(id) : totalCount}
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
