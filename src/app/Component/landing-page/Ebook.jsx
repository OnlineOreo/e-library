'use client'
import React from 'react';
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Ebook({ toggle }) {
    const landingPageData = useSelector((state) => state.landingPageDataSlice);
    const bookImages = landingPageData?.instituteId?.staff_picks
    ?.filter(staff_pick => staff_pick.article_type_name === "e-news") 
    ?.map(staff_pick => staff_pick.image) || [];

    return (
        <div
            id="sp_ebook_div"
            className={`book-wrapper wow fadeInUp ${toggle ? "d-block" : "d-none"}`}
            data-wow-delay="0.5s"
            style={{ padding: '20px 0' }}
        >
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={15}
                slidesPerView={1}
                loop={true}
                autoplay={{ 
                    delay: 2000,
                    disableOnInteraction: false 
                }}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 5,
                    }
                }}
            >
                {bookImages.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="book-items" style={{ height: 'auto' }}>
                            <div className="main-book-wrap" style={{ height: '100%' }}>
                                <div className="book-cover" style={{ 
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <div className="book-inside" />
                                    <div className="book-image" style={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden'
                                    }}>
                                        <img 
                                            src={image} 
                                            alt={`Book ${index + 1}`} 
                                            style={{
                                                width: 'auto',
                                                height: '100%',
                                                maxHeight: '300px', 
                                                objectFit: 'contain'
                                            }}
                                        />
                                        <div className="effect" />
                                        <div className="light" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}