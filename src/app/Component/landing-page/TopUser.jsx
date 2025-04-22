"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function TopUser({ headingName, bannerData, landingPageData, instituteId, token }) {
  const swiperRef = useRef(null);
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports?institute_id=${instituteId}&top_users=true`,
          {
            headers: { Authorization: `${token}` },
          }
        );

        if (response.status === 200) {
          setTopUsers(response.data?.top_users || []);
        }
      } catch (error) {
        console.error("Error fetching top users:", error);
      } finally {
        setLoading(false);
      }
    };

    if (instituteId && token) {
      fetchTopUsers();
    }
  }, [instituteId, token]);

  if (loading || !topUsers.length) return null;

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
                        background: "#000",
                      }}
                    >
                      {user.initials || user.name?.slice(0, 2).toUpperCase()}
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
