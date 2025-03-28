'use client'
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const publisherImages = [
    "https://demo.libvirtuua.com/landingPageAsset/img/publisher8.webp",
    "https://demo.libvirtuua.com/landingPageAsset/img/publisher7.webp",
    "https://demo.libvirtuua.com/landingPageAsset/img/publisher6.jpg",
    "https://demo.libvirtuua.com/landingPageAsset/img/publisher5.png",
    "https://demo.libvirtuua.com/landingPageAsset/img/publisher4.jpg",
    "https://demo.libvirtuua.com/landingPageAsset/img/publisher3.jpg",
    "https://demo.libvirtuua.com/landingPageAsset/img/publisher2.jpg",
    "https://demo.libvirtuua.com/landingPageAsset/img/publisher1.jpg"
];

export default function Publisher() {
    return (
        <div className="publisher-wrapper container py-5 pt-5 section" id="publisher_section" style={{ display: "block" }}>
            <h2 className="mb-5 wow fadeInUp" id="publisher_heading" data-wow-delay="0.3s">
                Publisher
            </h2>
            <div className="publish-carousel d-flex wow fadeInUp" data-wow-delay="0.5s">
                <Swiper 
                    modules={[Autoplay]} 
                    spaceBetween={20} 
                    loop={true} 
                    autoplay={{ delay: 2000, disableOnInteraction: false }} 
                    speed={1000}
                    breakpoints={{
                        320: { slidesPerView: 2 },
                        480: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                        1200: { slidesPerView: 6 },
                        1400: { slidesPerView: 7 }
                    }}
                    className='p-3'
                >
                    {publisherImages.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="publish-card" style={{ width: "150px", height: "150px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", borderRadius: "10px", backgroundColor: "#fff" }}>
                                <div className="card-header" style={{ width: "100%", height: "100%" }}>
                                    <img
                                        src={image}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            objectPosition: "center",
                                            borderRadius: 10,
                                            backgroundColor: "#fff"
                                        }}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}