"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstituteId } from "./../redux/slices/instituteSlice";
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./Component/landing-page/Navbar";
import '../../public/landingPageAsset/css/style2.css';
import '../../public/landingPageAsset/css/header.css';
import Banner from "./Component/landing-page/Banner";
import Publisher from "./Component/landing-page/Publisher";
import NoticeBoard from "./Component/landing-page/NoticeBoard";
import AboutUs from "./Component/landing-page/AboutUs";
import TrendingBook from "./Component/landing-page/TrendingBook";
import StaffPick from "./Component/landing-page/StaffPick";
import Download from "./Component/landing-page/Download";
import TopUser from "./Component/landing-page/TopUser";
import Footer from "./Component/landing-page/Footer";
import Headline from "./Component/landing-page/(Headlines)/Headline";

export default function Home() {
  const dispatch = useDispatch();
  const instituteId = useSelector((state) => state.institute.instituteId);
  const landingPageData = useSelector((state) => state.landingPageDataSlice);
  const status = useSelector((state) => state.institute.status);
  
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchInstituteId());
    }
  }, [dispatch, status]);


  return (
    <div className={styles.page}>
      <div id="main_widget_section">
        <Navbar/>
        <Banner bannerData={landingPageData?.instituteId?.configurations[0]} />
        <Publisher /> 
        <NoticeBoard />
        {/* <AboutUs /> */}
        <TrendingBook />
        <StaffPick />
        <Headline/>
        <Download />
        <TopUser />
        <Footer />
      </div>
    </div>
  );
}
