"use client";

import { useRef } from "react";
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; 

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function NoticeBoard() {
    const swiperRef = useRef(null); 

    return (
        <>
            <div className="container-xxl py-5 section" id="notice_section">
                <div className="container py-5 px-lg-5">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h2 className="mb-5" id="notice_heading">
                            Notice Board
                        </h2>
                    </div>

                    <Swiper
                        modules={[Autoplay, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={3}
                        centeredSlides={true}
                        loop={true}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                    >
                        <SwiperSlide>
                            <div className="testimonial-item rounded p-4">
                                <p className="mb-0">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi magni magnam saepe autem aperiam, laboriosam commodi unde dolore dolores molestias ipsum illum tempore atque explicabo assumenda voluptatem similique vel enim sint nesciunt tempora, sequi fuga ad! Tenetur dolor quis explicabo.
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="testimonial-item rounded p-4">
                                <p className="mb-0">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga ducimus pariatur aspernatur libero fugit nostrum cum quia error ad a corporis amet asperiores at eos id nulla vel exercitationem, ipsum natus officia velit, illum dolore veniam vitae! Explicabo, deserunt voluptatum?
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="testimonial-item rounded p-4">
                                <p className="mb-0">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, aliquam. Praesentium laudantium atque cum, iste corrupti incidunt error iure debitis cupiditate inventore dolorem quo aperiam a, reprehenderit necessitatibus nemo placeat reiciendis similique deserunt. Voluptatibus odio ducimus corporis, pariatur commodi dolores.
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="testimonial-item rounded p-4">
                                <p className="mb-0">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error dolor explicabo, sit quis tenetur voluptatum, a laborum saepe eos ex quisquam ipsum est velit quam ad hic, iure corporis nostrum amet! Magnam, numquam consequuntur. Quae natus earum possimus quod maiores.
                                </p>
                            </div>
                        </SwiperSlide>
                    </Swiper>

                    <div className="d-flex justify-content-center gap-4 mt-3">
                        <button className="prev-btn" onClick={() => swiperRef.current?.slidePrev()}>
                            <FaChevronLeft /> 
                        </button>
                        <button className="next-btn" onClick={() => swiperRef.current?.slideNext()}>
                            <FaChevronRight /> 
                        </button>
                    </div>

                    <style jsx>{`
                        .prev-btn, .next-btn {
                            background-color: var(--secondary);
                            color: white;
                            border: none;
                            padding: 10px 15px;
                            cursor: pointer;
                            border-radius: 50%;
                            font-size: 18px;
                            margin: 5px;
                        }
                    `}</style>
                </div>
            </div>
        </>
    );
}
