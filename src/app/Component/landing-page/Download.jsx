"use client";

import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useTranslation } from 'react-i18next';
import '@/i18n'; // cleaner using path alias `@`


const downloadLinks = [
  
  {
    href: "",
    iconClass: "fab fa-apple fa-3x text-white flex-shrink-0",
    bgClass: "bg-primary-gradient",
    platform: "App Store",
  },
  {
    href: "",
    iconClass: "fab fa-android fa-3x text-white flex-shrink-0",
    bgClass: "bg-secondary-gradient",
    platform: "Play Store",
  },
 
];


const screenshots = [
  "https://demo.libvirtuua.com/landingPageAsset/img/screenshot-1.png",
  "https://demo.libvirtuua.com/landingPageAsset/img/screenshot-2.png",
  "https://demo.libvirtuua.com/landingPageAsset/img/screenshot-3.png",
  "https://demo.libvirtuua.com/landingPageAsset/img/screenshot-4.png",
  "https://demo.libvirtuua.com/landingPageAsset/img/screenshot-5.png",
];

export default function Download({ headingName, bannerData }) {
  const { t, i18n } = useTranslation();
  return (
    <>
      <style jsx>{`
        .custom-button {
          background: linear-gradient(
            to bottom right,
            ${bannerData?.color1 || "#000"},
            ${bannerData?.color2 || "#fff"}
          );
        }
      `}</style>
      <div style={{ backgroundColor: bannerData?.color1 }}>
        <div
          className="container-xxl py-5 section"
          id="download_section"
        >
          <div className="container py-5 px-lg-5">
            <div className="row g-5 align-items-center">
              <div className="col-lg-7 wow fadeInUp" data-wow-delay="0.3s">
                <h5 className=" fw-medium" id="download_heading">
                  {t(headingName)}
                </h5>
                <h2 className="mb-4">{t('Download The Latest Version Of Our App')}</h2>
                <div className="row g-4">
                  {downloadLinks.map((link, index) => (
                    <div
                      key={index}
                      className="col-sm-6 wow fadeIn "
                      data-wow-delay={`${0.5 + index * 0.2}s`}
                    >
                      <a
                        href={link.href}
                        className={`d-flex ${link.bgClass} custom-button rounded py-3 px-4`}
                      >
                        <i className={link.iconClass} />
                        <div className="ms-3">
                          <p className="text-white mb-0">{t('Available On')}</p>
                          <h5 className="text-white mb-0">{t(link.platform)}</h5>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-5 d-flex justify-content-center justify-content-lg-end">
                <div
                  className="owl-carousel screenshot-carousel"
                  style={{
                    maxHeight: "500px",
                    overflow: "hidden",
                    borderRadius: "20px",
                  }}
                >
                  <Swiper
                    modules={[Pagination, A11y, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ Autoplay: true }}
                    style={{ borderRadius: "20px" }}
                  >
                    {screenshots.map((src, index) => (
                      <SwiperSlide key={index}>
                        <img
                          className="img-fluid"
                          src={src}
                          alt={`Screenshot ${index + 1}`}
                          style={{
                            maxHeight: "480px",
                            objectFit: "contain",
                            borderRadius: "20px",
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

