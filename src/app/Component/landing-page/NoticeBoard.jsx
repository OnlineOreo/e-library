"use client";

import { useRef } from "react";
import { Autoplay, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function NoticeBoard({headingName,bannerData}) {
    const swiperRef = useRef(null);
    const landingPageData = useSelector((state) => state.landingPageDataSlice);
    const notices = landingPageData?.instituteId?.notices

    return (
        <>
        <div className="container-xxl py-5 section" id="notice_section" >
            <div className="container py-5 px-lg-5">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h2 className="mb-5" id="notice_heading">{headingName}</h2>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination, Scrollbar, A11y]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                    centeredSlides={true}
                    loop={true}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                >
                    {notices?.length > 0 &&
                        notices.map((notice, index) => (
                            <SwiperSlide key={index}>
                                <div className="testimonial-item rounded p-4 gradient-bg">
                                    <p className="mb-0">{notice.description}</p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

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
                        background: linear-gradient(
                        to bottom right,
                        ${bannerData?.color1 || '#000'},
                        ${bannerData?.color2 || '#fff'}
                        );
                        color: white;
                        border: none;
                        padding: 10px 15px;
                        cursor: pointer;
                        border-radius: 50%;
                        font-size: 18px;
                        margin: 5px;
                    }
                    .gradient-bg {
                        background: linear-gradient(
                        to bottom right,
                        ${bannerData?.color1 || '#000'},
                        ${bannerData?.color2 || '#fff'}
                        );
                    }
                `}</style>
            </div>
        </div>
        </>
    );
}