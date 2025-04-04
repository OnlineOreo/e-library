"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstituteId } from "./../redux/slices/instituteSlice";
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./Component/landing-page/Navbar";
import "../../public/landingPageAsset/css/style2.css";
import "../../public/landingPageAsset/css/header.css";
import Banner from "./Component/landing-page/Banner";
import Publisher from "./Component/landing-page/Publisher";
import NoticeBoard from "./Component/landing-page/NoticeBoard";
import TrendingBook from "./Component/landing-page/TrendingBook";
import StaffPick from "./Component/landing-page/StaffPick";
import Download from "./Component/landing-page/Download";
import TopUser from "./Component/landing-page/TopUser";
import Footer from "./Component/landing-page/Footer";
import Headline from "./Component/landing-page/(Headlines)/Headline";

export default function Home() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.institute.status);
  const landingPageData = useSelector((state) => state.landingPageDataSlice);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchInstituteId());
    } else {
      setLoading(false);
    }
  }, [dispatch, status]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#fffbfb78",
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }

  // Fetch API Data
  const configData = landingPageData?.instituteId?.configurations?.[0] || {};
  const sectionOrder = configData.section_order || {};

  // Map of components with props, including NoticeBoard
  const componentsMap = {
    publisher: (heading_name) => <Publisher headingName={heading_name} bannerData={configData} />,
    books: (heading_name) => <TrendingBook headingName={heading_name} bannerData={configData} />,
    staff: (heading_name) => <StaffPick headingName={heading_name} bannerData={configData} />,
    headline: (heading_name) => <Headline headingName={heading_name} bannerData={configData} />,
    download: (heading_name) => <Download headingName={heading_name} bannerData={configData} />,
    top_user: (heading_name) => <TopUser headingName={heading_name} bannerData={configData} />,
    notice_board: (heading_name) => <NoticeBoard headingName={heading_name} bannerData={configData} />, // Added NoticeBoard
  };

  return (
    <div className={styles.page}>
      <div id="main_widget_section">
        <Navbar />
        <Banner bannerData={configData} />

        {/* Render Components Dynamically Based on API Response */}
        {Object.values(sectionOrder)
          .filter((section) => section.active) // Only include active sections
          .map((section) => (
            <div key={section.id}>{componentsMap[section.id]?.(section.heading_name)}</div>
          ))}

        <Footer />
      </div>
    </div>
  );
}
