'use client'
import { Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Publisher() {
    return (
        <>
            <div className="publisher-wrapper container py-5 pt-5 section"
                id="publisher_section"
                style={{ display: "block" }}
            >
                <h2
                    className="mb-5 wow fadeInUp"
                    id="publisher_heading"
                    data-wow-delay="0.3s"
                >
                    Publisher Collections
                </h2>
                <div className="publish-carousel d-flex wow fadeInUp" data-wow-delay="0.5s">


                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={20}
                        slidesPerView={7}
                        loop={true}
                        autoplay={{ autoplay: true }}
                    >
                        <SwiperSlide>

                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="publish-card">
                                <div className="card-header">
                                    <img
                                        src="http://mriirs.libvirtuua.com:8000/landingPageAsset/img/publisher8.webp"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            objectPosition: "conter",
                                            borderRadius: 10
                                        }}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="publish-card">
                                <div className="card-header">
                                    <img
                                        src="http://mriirs.libvirtuua.com:8000/landingPageAsset/img/publisher7.webp"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            objectPosition: "conter",
                                            borderRadius: 10
                                        }}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="publish-card">
                                <div className="card-header">
                                    <img
                                        src="http://mriirs.libvirtuua.com:8000/landingPageAsset/img/publisher6.jpg"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            objectPosition: "conter",
                                            borderRadius: 10
                                        }}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="publish-card">
                                <div className="card-header">
                                    <img
                                        src="http://mriirs.libvirtuua.com:8000/landingPageAsset/img/publisher5.png"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            objectPosition: "conter",
                                            borderRadius: 10
                                        }}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="publish-card">
                                <div className="card-header">
                                    <img
                                        src="http://mriirs.libvirtuua.com:8000/landingPageAsset/img/publisher4.jpg"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            objectPosition: "conter",
                                            borderRadius: 10
                                        }}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="publish-card">
                                <div className="card-header">
                                    <img
                                        src="http://mriirs.libvirtuua.com:8000/landingPageAsset/img/publisher3.png"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            objectPosition: "conter",
                                            borderRadius: 10
                                        }}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="publish-card">
                                <div className="card-header">
                                    <img
                                        src="http://mriirs.libvirtuua.com:8000/landingPageAsset/img/publisher2.jpg"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            objectPosition: "conter",
                                            borderRadius: 10
                                        }}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="publish-card">
                                <div className="card-header">
                                    <img
                                        src="http://mriirs.libvirtuua.com:8000/landingPageAsset/img/publisher1.jpg"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            objectPosition: "conter",
                                            borderRadius: 10
                                        }}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>

        </>
    )
}