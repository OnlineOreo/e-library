'use client'

import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Download(){
    return (
        <div
            className="container-xxl py-5 section"
            id="download_section"
            >
            <div className="container py-5 px-lg-5">
                <div className="row g-5 align-items-center">
                <div className="col-lg-7 wow fadeInUp" data-wow-delay="0.3s">
                    <h5 className="text-primary-gradient fw-medium" id="download_heading">
                    Download
                    </h5>
                    <h2 className="mb-4">Download The Latest Version Of Our App</h2>
                    <div className="row g-4">
                    <div className="col-sm-6 wow fadeIn" data-wow-delay="0.5s">
                        <a href="" className="d-flex bg-primary-gradient rounded py-3 px-4">
                        <i className="fab fa-apple fa-3x text-white flex-shrink-0" />
                        <div className="ms-3">
                            <p className="text-white mb-0">Available On</p>
                            <h5 className="text-white mb-0">App Store</h5>
                        </div>
                        </a>
                    </div>
                    <div className="col-sm-6 wow fadeIn" data-wow-delay="0.7s">
                        <a
                        href=""
                        className="d-flex bg-secondary-gradient rounded py-3 px-4"
                        >
                        <i className="fab fa-android fa-3x text-white flex-shrink-0" />
                        <div className="ms-3">
                            <p className="text-white mb-0">Available On</p>
                            <h5 className="text-white mb-0">Play Store</h5>
                        </div>
                        </a>
                    </div>
                    </div>
                </div>
                <div className="col-lg-5 d-flex justify-content-center justify-content-lg-end ">
                    <div className="owl-carousel screenshot-carousel">

                <Swiper
                    modules={[Pagination, A11y, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ Autoplay: true }}
                >
                    <SwiperSlide>
                    <img
                        className="img-fluid"
                        src="http://mriirs.libvirtuua.com:8000/landingPageAsset/img/screenshot-1.png"
                        alt=""
                    />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img
                        className="img-fluid"
                        src="http://mriirs.libvirtuua.com:8000/landingPageAsset/img/screenshot-2.png"
                        alt=""
                    />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img
                        className="img-fluid"
                        src="http://mriirs.libvirtuua.com:8000/landingPageAsset/img/screenshot-3.png"
                        alt=""
                    />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img
                        className="img-fluid"
                        src="http://mriirs.libvirtuua.com:8000/landingPageAsset/img/screenshot-4.png"
                        alt=""
                    />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img
                        className="img-fluid"
                        src="http://mriirs.libvirtuua.com:8000/landingPageAsset/img/screenshot-5.png"
                        alt=""
                    />
                    </SwiperSlide>
                </Swiper>
                    
                    </div>
                </div>
                </div>
            </div>
            </div>
    )
}