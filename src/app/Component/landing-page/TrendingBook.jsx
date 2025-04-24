import React from "react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Image from "next/image";

import "@/i18n"; // cleaner using path alias `@`

export default function TrendingBook({
  headingName,
  bannerData,
  show,
  setShow,
}) {
  const landingPageData = useSelector((state) => state.landingPageDataSlice);
  const { t, i18n } = useTranslation();
  const books = landingPageData?.landingPageData?.trending_books;
  const router = useRouter();
  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const handleRedirect = (bookUrl) => {
    const token = getToken();
    if (!token) {
      setShow(true);
      router.push(`?book=${bookUrl}`);
      return;
    }
    window.open(`${bookUrl}`, "_blank");
  };
  return (
    <div style={{ backgroundColor: bannerData?.color1 }}>
      <div
        className="tranding-wrapper mt-5 container-xxl section py-5"
        id="tranding_books_section"
      >
        <h2
          className="mb-5 text-center wow fadeInUp"
          id="trending_books_heading"
          data-wow-delay="0.3s"
        >
          {t(headingName)}
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
              1280: { slidesPerView: 5 },
            }}
          >
            {books.map((book, index) => (
              <SwiperSlide key={index}>
                <div
                  onClick={() => handleRedirect(book.url)}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "200px",
                      height: "280px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    {book?.book_image &&
                    book.book_image.split("/").pop() !== "undefined" ? (
                      <img
                        src={book.book_image}
                        alt={`Trending book ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          backgroundColor: "#f8f8f8",
                          border: "1px solid #ddd",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          flexDirection: "column",
                          padding: "10px",
                        }}
                      >
                        <h3
                          className="fw-bold fs-6 f-italic four_line_ellipses"
                          style={{
                            color: "#404040",
                            marginBottom: "10px",
                          }}
                        >
                          {book.book_title?.toUpperCase()}
                        </h3>
                        <div
                          className="fw-bold one_line_ellipses"
                          style={{
                            color: "#272626",
                            fontSize: "14px",
                          }}
                        >
                          {book.book_author || ""}
                        </div>
                        <Image
                          src="/images/avatar/1.png"
                          alt={book.book_title}
                          width={100}
                          height={100}
                          style={{ marginTop: "10px", objectFit: "contain" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
