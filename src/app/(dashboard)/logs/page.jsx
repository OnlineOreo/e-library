"use client";
import { Fragment, useEffect, useState } from "react";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import MethodDistributionChart from "@/app/Component/dashboard/log/MethodDistributionChart";
import LogLevelDistributionChart from "@/app/Component/dashboard/log/LogLevelDistributionChart";
import PathDistributionChart from "@/app/Component/dashboard/log/PathDistributionChart";
import StatusCodeDistributionChart from "@/app/Component/dashboard/log/StatusCodeDistributionChart";
import RecentLogsTable from "@/app/Component/dashboard/log/RecentLogsTable";
import RawLogs from "@/app/Component/dashboard/log/RawLogs";
import PathDistributionChartHorizontal from "@/app/Component/dashboard/log/PathDistributionChartHorizontal";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const instituteId = useSelector((state) => state.institute.instituteId);
  const router = useRouter();
  const [horizontal , setHorizontal] = useState(false)

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  useEffect(() => {
    const token = getToken();
    if(!token){
      router.push("/authentication/sign-in");
      return
    }

    const fetchLogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logs?institute_id=${instituteId}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setLogs(response.data.logs || []);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    if (instituteId) {
      fetchLogs();
    }
  }, [instituteId]);

  return (
    <Fragment>
      <Container fluid className="px-6">
        <Row className="my-6 h-100">
          {loading ? (
            <Col className="text-center">
              <Spinner animation="border" />
            </Col>
          ) : (
            <>
              <Col xl={4} lg={4} md={12} xs={12} className="mb-6 mb-xl-0 h-100">
                <MethodDistributionChart logs={logs} />
              </Col>
              <Col xl={4} lg={4} md={12} xs={12} className="mb-6 mb-xl-0">
                <LogLevelDistributionChart logs={logs} />
              </Col>
              <Col xl={4} lg={4} md={12} xs={12} className="mb-6 mb-xl-0">
                <StatusCodeDistributionChart logs={logs} />
              </Col>
              {/* <Col xl={6} lg={6} md={12} xs={12} className="mb-6 mb-xl-0">
                <PathDistributionChart logs={logs} />
              </Col> */}
              <Col xl={12} lg={12} md={12} xs={12} className="mb-6 mb-xl-0">
                <PathDistributionChartHorizontal logs={logs} />
              </Col>
            </>
          )}
        </Row>
        <RecentLogsTable logs={logs} />
        <RawLogs logs={logs} />
      </Container>
    </Fragment>
  );
};

export default Logs;
