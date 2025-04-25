'use client'
import { Fragment } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import DashboardCard from "@/app/Component/dashboard/DashboardCard";
import Link from "next/link";
import TopUsersBySessions from "@/app/Component/dashboard/TopUsersBySessions";
import { useTranslation } from 'react-i18next';
import '@/i18n'; // cleaner using path alias `@`
import LanguageSelector from "@/app/Component/landing-page/languageselector";


const Home = () => {
     const { t, i18n } = useTranslation();
    return (
        <Fragment>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>
                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-2 mb-lg-0">
                                    <h3 className="mb-0 text-dark">{t('Dashboard')}  </h3>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <DashboardCard />
                    <TopUsersBySessions/>
                </Row>
            </Container>
        </Fragment>
    )
}
export default Home;
