'use client'
import React from 'react';
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const books = [
    "https://demo.libvirtuua.com/storage/landing_page/1e1d274f-3bcf-4ca9-946a-d83a94ca95e9.jpg",
    "https://demo.libvirtuua.com/storage/landing_page/06b6d62b-895f-4ab6-9425-f04a1142da96.webp",
    "https://demo.libvirtuua.com/storage/landing_page/ef473acd-8c64-404a-bb0f-7aa2b4b4c277.png",
    "https://demo.libvirtuua.com/storage/landing_page/bf0d80ea-29cf-4c0c-a83d-735eb31e0a2c.png",
    "https://demo.libvirtuua.com/storage/landing_page/58d393d1-7744-43e4-b90e-c1c82b22ad53.jpg",
    "https://demo.libvirtuua.com/storage/landing_page/e5f7b8f8-ffb2-414c-b9e5-617714b1f9a7.jpg",
    "https://demo.libvirtuua.com/storage/landing_page/2ed4bdba-e68b-400f-9f33-94798330e2e1.png"
];

export default function TrendingBook() {
    return (
        <div
            className="tranding-wrapper mt-5 container-xxl section py-5"
            id="tranding_books_section"
            style={{ backgroundColor: "#7dd3d9" }}
        >
            <h2
                className="mb-5 text-center wow fadeInUp"
                id="trending_books_heading"
                data-wow-delay="0.3s"
            >
                Trending Books
            </h2>
            <div className="book-wrapper wow fadeInUp" data-wow-delay="0.5s">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    spaceBetween={15}
                    loop={true}
                    autoplay={{ delay: 3000 }}
                    navigation
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        480: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1280: { slidesPerView: 5 }
                    }}
                >
                    {books.map((book, index) => (
                        <SwiperSlide key={index}>
                            <div className="book-items" style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className="main-book-wrap" style={{ width: '100%', maxWidth: '200px', display: 'flex', alignItems: 'center' }}>
                                    <div className="book-cover" style={{ width: '100%' }}>
                                        <div className="book-inside" />
                                        <div className="book-image" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <img 
                                                src={book} 
                                                alt={`Trending book ${index + 1}`} 
                                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
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
        </div>
    );
}
