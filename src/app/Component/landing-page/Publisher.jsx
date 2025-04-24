'use client';

import { memo, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const Publisher = ({ headingName }) => {
  // Memoized image list to prevent unnecessary re-renders
  const publisherImages = useMemo(() => [
    '/images/publisher/publisher1.jpg',
    '/images/publisher/publisher2.jpg',
    '/images/publisher/publisher3.png',
    '/images/publisher/publisher4.jpg',
    '/images/publisher/publisher5.png',
    '/images/publisher/publisher6.jpg',
    '/images/publisher/publisher7.webp',
    '/images/publisher/publisher8.webp',
  ], []);

  return (
    <div
      className="publisher-wrapper container py-5 pt-5 section"
      id="publisher_section"
      style={{ display: 'block' }}
    >
      <h2 className="mb-5 wow fadeInUp" id="publisher_heading" data-wow-delay="0.3s">
        {headingName}
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
          className="p-3"
        >
          {publisherImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className="publish-card"
                style={{
                  width: '150px',
                  height: '150px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                  borderRadius: '10px',
                  backgroundColor: '#fff'
                }}
              >
                <div className="card-header" style={{ width: '100%', height: '100%' }}>
                  <img
                    src={image}
                    alt={`publisher-${index}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      borderRadius: 10,
                      backgroundColor: '#fff'
                    }}
                    width='auto'
                    height='auto'
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

// Prevent re-renders if props haven't changed
export default memo(Publisher);
