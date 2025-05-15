'use client';

import { useState } from "react";
import Navbar from "./Navbar";
import Banner from "./Banner";
import Footer from "./Footer";
import ClientWrapper from "./ClientWrapper";

export default function HomeWrapper({
  landingPageData,
  configData,
  sectionOrder,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="index_page">
      <Navbar landingPageData={landingPageData} show={show} setShow={setShow} />
      <Banner bannerData={configData} show={show} setShow={setShow} />
      <ClientWrapper
        sectionOrder={sectionOrder}
        landingPageData={landingPageData}
        configData={configData}
        show={show}
        setShow={setShow}
      />
      <Footer landingPageData={landingPageData} bannerData={configData} show={show} setShow={setShow} />
    </div>
  );
}
