import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Briefcase } from 'react-feather';
import { ListTask , People , Bullseye } from "react-bootstrap-icons";
import axios from "axios";

const DashboardOverview = () => {
  const [reportCounts, setReportCounts] = useState(null);

  useEffect(() => {
    const fetchReportCounts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports-count`
        );
        setReportCounts(response.data);
      } catch (error) {
        console.error("Error fetching report counts:", error);
      }
    };

    fetchReportCounts();
  }, []);

  const DashboardCardData = [
    {
      id: 1,
      title: "Closed Task",
      value: 18,
      icon: <Briefcase size={18} />,
      statInfo: '<span className="text-dark me-2">2</span> Completed',
    },
    {
      id: 2,
      title: "Active Task",
      value: 132,
      icon: <ListTask size={18} />,
      statInfo: '<span className="text-dark me-2">28</span> Completed',
    },
    {
      id: 3,
      title: "Teams",
      value: 12,
      icon: <People size={18} />,
      statInfo: '<span className="text-dark me-2">1</span> Completed',
    },
    {
      id: 4,
      title: "Productivity",
      value: "76%",
      icon: <Bullseye size={18} />,
      statInfo: '<span className="text-dark me-2">5%</span> Completed',
    },
  ];

  return (
    <Row>
      {DashboardCardData.map((item, index) => (
        <Col xl={3} lg={6} md={12} xs={12} className="mt-6" key={index}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h4 className="mb-0">{item.title}</h4>
                </div>
                <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                  {item.icon}
                </div>
              </div>
              <div>
                <h3 className="fw-normal">{item.value}</h3>
                {/* <p className="mb-0" dangerouslySetInnerHTML={{ __html: item.statInfo }}></p> */}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DashboardOverview;
