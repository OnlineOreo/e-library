"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstituteId } from "./../redux/slices/instituteSlice";
import Navbar from "./Component/landing-page/Navbar";
import styles from "./page.module.css";
import './dynamic.css'

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
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const status = useSelector((state) => state.institute.status);
  const landingPageData2 = useSelector((state) => state.landingPageDataSlice);

  const configData = landingPageData2?.landingPageData?.configurations?.[0] || {};
  const sectionOrder = configData?.section_order || {};

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchInstituteId());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (configData) {
      document.documentElement.style.setProperty("--dynamic-font-family", configData?.font_style || "inherit");
      document.documentElement.style.setProperty("--dynamic-font-size", `${configData?.font_size}px` || "inherit");
      document.documentElement.style.setProperty("--dynamic-font-weight", configData?.font_weight || "inherit");
    }
  }, [configData]);

  useEffect(() => {
    if (status !== "idle" && Object.keys(configData).length > 0) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [status, configData]);

  const componentsMap = useMemo(() => ({
    publisher: Publisher,
    books: TrendingBook,
    staff: StaffPick,
    headline: Headline,
    download: Download,
    top_user: TopUser,
    notice_board: NoticeBoard,
  }), []);

  

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#fffbfb78",
      }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if(!landingPageData2.landingPageData.is_active){
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#fffbfb78",
      }}>
        <div className=" text-center text-primary" role="status">
          <h3 className="w-75 mx-auto text-dark" style={{ lineHeight:'1.5' }}>Your LibVirtuUA e-Library access is forbidden due to end of subscription period !!! <br></br>
          Please contact with LibVirtuUA Support to extend or renew your e-Library subscription.</h3>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div id="main_widget_section">
        <Navbar show={show} setShow={setShow} />
        <Banner bannerData={configData} />

        {Object.values(sectionOrder)
          .filter((section) => section.active)
          .map((section, index) => {
            const Component = componentsMap[section.id];
            return Component ? (
              <Component
                key={section.id || index}
                headingName={section.heading_name}
                bannerData={configData}
                show={show}
                setShow={setShow}
              />
            ) : null;
          })}

        <Footer bannerData={configData} />
      </div>
    </div>
  );
}
