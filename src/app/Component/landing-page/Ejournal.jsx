'use client'
import React from 'react';
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const ejournals = [
    {//
        image: "https://demo.libvirtuua.com/storage/landing_page/d495a2dc-6273-4608-ae8b-2d0198d3578a.jpg",
        title: "Somre Honda",
        subtitle: "Harvest in nature"
    },
    {
        image: "https://demo.libvirtuua.com/storage/landing_page/cda423f8-d605-4c0d-8085-904f3d886b0b.jpeg",
        title: "Somre Honda",
        subtitle: "Harvest in nature"
    },
    {
        image: "https://demo.libvirtuua.com/storage/landing_page/fcbf0662-d820-4cd0-b84e-932af5e21d27.jpg",
        title: "Somre Honda",
        subtitle: "Harvest in nature"
    },
    {
        image: "https://demo.libvirtuua.com/storage/landing_page/80f68bc2-e1f8-4005-8a2a-5040cff79803.jpg",
        title: "Somre Honda",
        subtitle: "Harvest in nature"
    },
    {
        image: "https://demo.libvirtuua.com/storage/landing_page/42799596-5f6e-43cd-852f-ac7126e375c4.jpg",
        title: "Somre Honda",
        subtitle: "Harvest in nature"
    },
    {
        image: "https://demo.libvirtuua.com/storage/landing_page/633a7066-6f14-44eb-80c9-186f01632637.jpg",
        title: "Somre Honda",
        subtitle: "Harvest in nature"
    },
    
];

export default function Ejournal({ toggle }) {
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
                                <h5>{journal.subtitle}</h5>
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
