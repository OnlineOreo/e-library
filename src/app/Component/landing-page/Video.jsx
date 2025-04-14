'use client'
import React from 'react';
import { FaPlay } from "react-icons/fa";
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Video({ toggle }) {
    const landingPageData = useSelector((state) => state.landingPageDataSlice);
    const videos = landingPageData?.instituteId?.staff_picks?.filter(staff_pick =>
        staff_pick.article_type_name?.toLowerCase() === "video"
    ) || [];

    const handleWatchClick = (url) => {
        if (url) {
            window.open(url, '_blank');
        }
    };

    return (
        <div id="sp_video_div" className={`book-wrapper fadeInUp ${toggle ? "d-block" : "d-none"}`}>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={15}
                loop={true}
                autoplay={{ delay: 3000 }}
                navigation
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    576: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    992: {
                        slidesPerView: 4,
                    },
                    1200: {
                        slidesPerView: 5,
                    },
                }}
            >
                {videos.map((video) => (
                    <SwiperSlide key={video.staff_pick_id} className="h-100 d-flex justify-content-center" style={{ maxWidth:'300px' }}>
                        <div className="card w-100 d-flex flex-column h-100">
                            <header
                                className="card__header ratio ratio-16x9 bg-dark position-relative overflow-hidden"
                                style={{
                                    background: `linear-gradient(to top, #00000063, #0006), url(${video.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }}
                            >
                                <button
                                    className="card__header__button position-absolute top-50 start-50 translate-middle z-1 btn btn-light rounded-circle p-3"
                                    aria-label="Play"
                                >
                                    <FaPlay className="text-dark" />
                                </button>
                            </header>
                            <main className="card__content p-3 d-flex flex-column flex-grow-1">
                                <h3 className="card__content__title h6 mb-2 text-truncate" title={video.title}>
                                    {video.title}
                                </h3>
                                <span className="card__content__description small text-muted mb-3 text-truncate" title={video.description}>
                                    {video.description}
                                </span>
                                <button
                                    className="card__content__buy btn btn-primary mt-auto"
                                    onClick={() => handleWatchClick(video.url)}
                                >
                                    Watch
                                </button>
                            </main>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
