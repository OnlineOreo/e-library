'use client'
import React from 'react';
import { FaPlay } from "react-icons/fa";
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const videos = [
    {
        id: 1,
        title: "Discover How To Draw",
        price: "10.99$",
        description: "62 Hours of Video & Full Access",
        image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=778&q=80"
    },
    {   id: 2, title: "Mastering Digital Art", price: "12.99$", description: "50 Hours of Video & Full Access", image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80" },
    {   id: 3, title: "Creative Sketching Techniques", price: "15.99$", description: "70 Hours of Video & Full Access", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" },
    {   id: 4, title: "Watercolor Masterclass", price: "9.99$", description: "40 Hours of Video & Full Access", image: "https://images.unsplash.com/photo-1494698853255-d84e7d4a6fe8?auto=format&fit=crop&w=800&q=80" },
];

export default function Video({ toggle }) {
    return (
        <div id="sp_video_div" className={`book-wrapper fadeInUp ${toggle ? "d-block" : "d-none"}`}>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={15}
                slidesPerView={5}
                loop={true}
                autoplay={{ delay: 3000 }}
                navigation
            >
                {videos.map((video) => (
                    <SwiperSlide key={video.id} className="h-auto">
                        <div className="card h-100 d-flex flex-column">
                            <header className="card__header ratio ratio-16x9 bg-dark position-relative overflow-hidden flex-grow-0" style={{
                                background: `linear-gradient(to top, #00000063, #0006), url(${video.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}>
                                <span className="position-absolute top-0 end-0 m-2 z-1">
                                    <span className="mdi mdi-share card__header__share text-white" />
                                </span>
                                <button className="card__header__button position-absolute top-50 start-50 translate-middle z-1 btn btn-light rounded-circle p-3">
                                    <FaPlay className="text-dark" />
                                </button>
                                <span className="position-absolute bottom-0 end-0 m-2 z-1">
                                    <span className="mdi mdi-dots-horizontal card__header__actions text-white" />
                                </span>
                            </header>
                            <main className="card__content p-3 d-flex flex-column flex-grow-1">
                                <span className="card__content__price text-muted mb-1">{video.price}</span>
                                <h2 className="card__content__title h5 mb-2">{video.title}</h2>
                                <span className="card__content__description small text-muted mb-3">{video.description}</span>
                                <button className="card__content__buy btn btn-primary mt-auto">Watch</button>
                            </main>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}