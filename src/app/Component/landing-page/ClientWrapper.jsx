"use client"

import { useEffect, useState, useMemo } from 'react';
import Publisher from "./Publisher";
import NoticeBoard from "./NoticeBoard";
import TrendingBook from "./TrendingBook";
import StaffPick from "./StaffPick";
import Download from './Download';
import TopUser from "./TopUser";
import Headline from './(Headlines)/Headline';
import { useUserSession } from '@/hooks/useUserSession';

export default function ClientWrapper({ sectionOrder, configData, landingPageData, show, setShow }) {
  useUserSession();

  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    if (configData) {
      document.documentElement.style.setProperty("--dynamic-font-family", configData?.font_style || "inherit");
      document.documentElement.style.setProperty("--dynamic-font-size", `${configData?.font_size}px` || "inherit");
      document.documentElement.style.setProperty("--dynamic-font-weight", configData?.font_weight || "inherit");
    }
  }, [configData]);

  // useEffect(() => {
  //   setLoading(false);
  // }, []);

  const componentsMap = useMemo(() => ({
    publisher: Publisher,
    books: TrendingBook,
    staff: StaffPick,  
    headline: Headline,
    download: Download,
    // top_user: TopUser,
    notice_board: NoticeBoard,
  }), []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Render Publisher first if active */}
      {sectionOrder?.publisher?.active && (
        <Publisher
          key="publisher"
          headingName={sectionOrder.publisher.heading_name}
          bannerData={configData}
          landingPageData={landingPageData}
          show={show}
          setShow={setShow}
        />
      )}

      {/* Render rest of the active components excluding publisher */}
      {Object.values(sectionOrder)
        .filter(section => section.active && section.id !== "publisher")
        .map((section, index) => {
          const Component = componentsMap[section.id];
          return Component ? (
            <Component
              key={section.id || index}
              headingName={section.heading_name}
              bannerData={configData}
              landingPageData={landingPageData}
              show={show}
              setShow={setShow}
            />
          ) : null;
        })}
    </>
  );
}
