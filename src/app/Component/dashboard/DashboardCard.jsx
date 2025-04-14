import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Briefcase } from 'react-feather';
import { ListTask, People, Bullseye, PersonCheck, Stack, Subtract } from "react-bootstrap-icons";
import axios from "axios";
import { useSelector } from "react-redux";

const DashboardOverview = () => {
  const [reportCounts, setReportCounts] = useState(null);
  const instituteId = useSelector((state) => state.institute.instituteId);

  useEffect(() => {
    const fetchReportCounts = async (instituteId) => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports-count?institute_id=${instituteId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setReportCounts(response.data);
      } catch (error) {
        console.error("Error fetching report counts:", error);
      }
    };

    if(instituteId){
      fetchReportCounts(instituteId);
    }
  }, [instituteId]);

  const DashboardCardData = [
    {
      id: 1,
      title: "Total Users",
      value: reportCounts?.total_users ?? "-",
      icon: <People size={18} />,
    },
    {
      id: 2,
      title: "Mobile Users",
      value: reportCounts?.mobile_users ?? "-",
      icon: <Briefcase size={18} />,
    },
    {
      id: 3,
      title: "Desktop Users",
      value: reportCounts?.desktop_users ?? "-",
      icon: <ListTask size={18} />,
    },
    {
      id: 4,
      title: "Inactive Users",
      value: reportCounts?.inactive_users ?? "-",
      icon: <Bullseye size={18} />,
    },
    {
      id: 5,
      title: "Active Users",
      value: reportCounts?.active_users ?? "-",
      icon: <Bullseye size={18} />,
    },
    {
      id: 5,
      title: "Verified Users",
      value: reportCounts?.verified_users ?? "-",
      icon: <PersonCheck size={18} />,
    },
    {
      id: 7,
      title: "Today Loggedin user",
      value: reportCounts?.today_logged_in_users ?? "-",
      icon: <Stack size={18} />,
    },
    {
      id: 8,
      title: "Total Publishers",
      value: reportCounts?.total_publishers ?? "-",
      icon: <Subtract size={18} />,
    },
  ];

  return (
    <Row className="justify-content-center">
      {DashboardCardData.map((item, index) => (
        <Col xl={3} lg={4} md={6} xs={12} className="mt-4" key={index}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="mb-0">{item.title}</h5>
                </div>
                <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                  {item.icon}
                </div>
              </div>
              <div>
                <h3 className="fw-bold">{item.value}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DashboardOverview;
