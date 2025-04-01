"use client";

import { useRef } from "react";
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; 

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const topUsers = [
    { name: "Dr. Arely Gusikowski", role: "admin", rank: "#1", initials: "AG" },
    { name: "Mr. John Doe", role: "moderator", rank: "#2", initials: "JD" },
    { name: "Ms. Jane Smith", role: "user", rank: "#3", initials: "JS" },
    { name: "Dr. Robert Brown", role: "admin", rank: "#4", initials: "RB" }
];

export default function TopUser() {
    const swiperRef = useRef(null);

    return (
        <>
            <div className="container-xxl py-5 section" id="top_user_section">
                <div className="container py-5 px-lg-5">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h2 className="mb-5" id="top_user_heading">
                            Top User
                        </h2>
                    </div>

                    <Swiper
                        ref={swiperRef}
                        modules={[Autoplay, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={1}  // Default for small screens
                        centeredSlides={true}
                        loop={true}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        breakpoints={{
                            768: {
                                slidesPerView: 3, // Display 3 items on larger screens
                            },
                        }}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                    >
                        {topUsers.map((user, index) => (
                            <SwiperSlide key={index}>
                                <div className="testimonial-item rounded p-4">
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="d-flex justify-content-center align-items-center text-white rounded-circle"
                                            style={{ width: 85, height: 85, fontSize: 24, borderRadius: "50%" }}>
                                            {user.initials}
                                        </div>
                                        <div className="ms-4">
                                            <h5 className="mb-1">{user.name}</h5>
                                            <p className="mb-1">{user.role}</p>
                                            <p className="mb-1">Rank : {user.rank}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Buttons */}
                    <div className="d-flex justify-content-center gap-4 mt-3">
                        <button className="prev-btn" onClick={() => swiperRef.current?.slidePrev()}>
                            <FaChevronLeft /> 
                        </button>
                        <button className="next-btn" onClick={() => swiperRef.current?.slideNext()}>
                            <FaChevronRight /> 
                        </button>
                    </div>

                    <style jsx>{`
                        .prev-btn, .next-btn {
                            background-color: var(--secondary);
                            color: white;
                            border: none;
                            padding: 10px 15px;
                            cursor: pointer;
                            border-radius: 50%;
                            font-size: 18px;
                            margin: 5px;
                        }
                    `}</style>
                </div>
            </div>
        </>
    );
}
