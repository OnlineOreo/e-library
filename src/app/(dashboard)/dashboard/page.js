'use client'
import { Fragment } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardCard from "@/app/Component/dashboard/DashboardCard";

import { ActiveProjects, Teams, 
    TasksPerformance 
} from "@/sub-components";


const Home = () => {
    const router = useRouter();
    useEffect(() => {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="))
          ?.split("=")[1];
      }, []);

    return (
        <Fragment>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>
                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-2 mb-lg-0">
                                    <h3 className="mb-0 text-dark">Dashboard</h3>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <DashboardCard />
                </Row>
                <ActiveProjects />
                <Row className="my-6">
                    <Col xl={4} lg={12} md={12} xs={12} className="mb-6 mb-xl-0">
                        <TasksPerformance />
                    </Col>
                    <Col xl={8} lg={12} md={12} xs={12}>
                        <Teams />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}
export default Home;
