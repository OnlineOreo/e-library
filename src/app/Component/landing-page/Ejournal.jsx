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
    // change after fix from backend  - according to suraj bhaiya
    const ejournals = landingPageData?.instituteId?.staff_picks?.filter(staff_pick => 
        staff_pick.article_type === "fffeab60-601a-4b64-9f8d-52fd27a1fefa"
    ) || [];

    return (
        <div
            id="sp_ejournals_div"
            className={`book-wrapper fadeInUp ${toggle ? "d-block" : "d-none"}`}
        >
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={15}
                slidesPerView={5}
                loop={true}
                autoplay={{ Autoplay: false }}
                navigation
            >
                {ejournals.map((journal, index) => (
                    <SwiperSlide key={index}>
                        <div className="journal_card">
                            <div className="card-image">
                                <img src={journal.image} alt={journal.title} />
                            </div>
                            <div className="card-content d-flex flex-column align-items-center">
                                <h4 className="pt-2">{journal.title}</h4>
                                <h5>{journal.description}</h5>
                                <ul className="social-icons d-flex justify-content-center">
                                    <li>
                                        <a href="#"><span className="fab fa-facebook" /></a>
                                    </li>
                                    <li>
                                        <a href="#"><span className="fab fa-twitter" /></a>
                                    </li>
                                    <li>
                                        <a href="#"><span className="fab fa-instagram" /></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
