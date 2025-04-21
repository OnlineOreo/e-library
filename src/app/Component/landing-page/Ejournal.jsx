'use client'
import React from 'react';
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Ejournal({ toggle }) {
    const landingPageData = useSelector((state) => state.landingPageDataSlice);
    const ejournals = landingPageData?.landingPageData?.staff_picks?.filter(staff_pick => 
        staff_pick.article_type_name?.toLowerCase() === "journals"
    ) || [];

    return (
        <div
            id="sp_ejournals_div"
            className={`book-wrapper fadeInUp ${toggle ? "d-block" : "d-none"}`}
        >
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={10}
                loop={true}
                autoplay={{ Autoplay: false }}
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
                        slidesPerView: 6,
                    },
                }}
            >
                {ejournals.map((journal, index) => (
                    <SwiperSlide key={index}>
                        <div className="journal_card">
                            <div className="card-image">
                                <img src={journal.image} alt={journal.title} />
                            </div>
                            <div className="card-content d-flex flex-column align-items-center text-center">
                                <h4 className="pt-2">
                                    <a
                                        href={journal.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none text-dark"
                                    >
                                        {journal.title}
                                    </a>
                                </h4>
                                <h5>{journal.description}</h5>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
