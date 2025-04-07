"use client";

import { useRef } from "react";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const defaultUsers = [
  { name: "Dr. Arely Gusikowski", role: "admin", rank: "#1", initials: "AG" },
  { name: "Mr. John Doe", role: "moderator", rank: "#2", initials: "JD" },
  { name: "Ms. Jane Smith", role: "user", rank: "#3", initials: "JS" },
  { name: "Dr. Robert Brown", role: "admin", rank: "#4", initials: "RB" },
];

export default function TopUser({ headingName, bannerData }) {
  const swiperRef = useRef(null);
  const landingPageData = useSelector((state) => state.landingPageDataSlice);

  const topUsers = landingPageData.instituteId?.top_users || [];

  // 🔒 Do not render anything if no top users
  if (!topUsers.length) return null;

  return (
    <>
      <div className="container-xxl py-5 section" id="top_user_section">
        <div className="container py-5 px-lg-5">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h2 className="mb-5" id="top_user_heading">
              {headingName}
            </h2>
          </div>

          <Swiper
            ref={swiperRef}
            modules={[Autoplay, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {topUsers.map((user, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-item rounded p-4 bg-gradient">
                  <div className="d-flex align-items-center mb-4">
                    <div
                      className="d-flex justify-content-center align-items-center text-white rounded-circle"
                      style={{
                        width: 85,
                        height: 85,
                        fontSize: 24,
                        borderRadius: "50%",
                      }}
                    >
                      {user.initials}
                    </div>
                    <div className="ms-4">
                      <h5 className="mb-1 custom-banner">{user.name}</h5>
                      <p className="mb-1 custom-banner">{user.role}</p>
                      <p className="mb-1 custom-banner">Rank : {user.rank}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="d-flex justify-content-center gap-4 mt-3">
            <button
              className="prev-btn"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <FaChevronLeft />
            </button>
            <button
              className="next-btn"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <FaChevronRight />
            </button>
          </div>

          <style jsx>{`
            .prev-btn,
            .next-btn {
              background: linear-gradient(
                to bottom right,
                ${bannerData?.color1 || "#000"},
                ${bannerData?.color2 || "#fff"}
              );
              color: white !important;
              border: none;
              padding: 10px 15px;
              cursor: pointer;
              border-radius: 50%;
              font-size: 18px;
              margin: 5px;
            }

            :global(.swiper-slide-active .testimonial-item) {
              background: linear-gradient(
                to bottom right,
                ${bannerData?.color2 || "#fff"},
                ${bannerData?.color1 || "#000"}
              ) !important;
              color: white;
            }
          `}</style>
        </div>
      </div>
    </>
  );
}

