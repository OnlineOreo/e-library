import React from 'react';
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default function TrendingBook({headingName,bannerData}) {
    const landingPageData = useSelector((state) => state.landingPageDataSlice);
    const books = landingPageData?.instituteId?.trending_books?.map(trending_book => trending_book.book_image) || [];
    console.log(books)
    return (
        <div
            className="tranding-wrapper mt-5 container-xxl section py-5"
            id="tranding_books_section"
            style={{backgroundColor: bannerData?.color1}}
        >
            <h2
                className="mb-5 text-center wow fadeInUp"
                id="trending_books_heading"
                data-wow-delay="0.3s"
            >
                {headingName}
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
                                            {/* <div className="effect" /> */}
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
