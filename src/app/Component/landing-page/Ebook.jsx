'use client'
import React from 'react';
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const bookImages = [
    "https://demo.libvirtuua.com/storage/landing_page/1e1d274f-3bcf-4ca9-946a-d83a94ca95e9.jpg",
    "https://demo.libvirtuua.com/storage/landing_page/06b6d62b-895f-4ab6-9425-f04a1142da96.webp",
    "https://demo.libvirtuua.com/storage/landing_page/ef473acd-8c64-404a-bb0f-7aa2b4b4c277.png",
    "https://demo.libvirtuua.com/storage/landing_page/bf0d80ea-29cf-4c0c-a83d-735eb31e0a2c.png",
    "https://demo.libvirtuua.com/storage/landing_page/58d393d1-7744-43e4-b90e-c1c82b22ad53.jpg",
    "https://demo.libvirtuua.com/storage/landing_page/e5f7b8f8-ffb2-414c-b9e5-617714b1f9a7.jpg",
    "https://demo.libvirtuua.com/storage/landing_page/2ed4bdba-e68b-400f-9f33-94798330e2e1.png"
];

export default function Ebook({ toggle }) {
    return (
        <div
            id="sp_ebook_div"
            className={`book-wrapper wow fadeInUp ${toggle ? "d-block" : "d-none"}`}
            data-wow-delay="0.5s"
            style={{ padding: '20px 0' }} // Added padding for better mobile spacing
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
                                                maxHeight: '300px', // Adjust as needed
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