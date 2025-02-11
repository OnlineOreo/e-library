'use client'
import React, { useState } from 'react';

import { FaPlay } from "react-icons/fa";
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function StaffPick() {
    const [book, setBook] = useState(true)
    const [journal, setJournal] = useState(false)
    const [video, setVideo] = useState(false)

    const handleChange = (e)=> {
        if(e == 'book'){
            setBook(true)
            setJournal(false)
            setVideo(false)
        }
        if(e == 'journal'){
            setBook(false)
            setJournal(true)
            setVideo(false)
        }
        if(e == 'video'){
            setBook(false)
            setJournal(false)
            setVideo(true)
        }
    }
    
    return (
        <div
            className="tranding-wrapper container-xxl py-5 section"
            id="staff_pick_section"
        >
            <h2
                className="mb-3 text-center wow fadeInUp"
                id="staff_heading"
                data-wow-delay="0.3s"
                style={{ letterSpacing: 1 }}
            >
                Staff Pick
            </h2>
            <div
                className="navtabs d-flex justify-content-evenly mx-auto bg-light p-3 mb-5 rounded"
                style={{ cursor: "pointer" }}
            >
                <div id="ebook" onClick={()=>handleChange('book')} className={`sp_nav ${ book ? 'sp_active' : ''}`}>
                    E-Book
                </div>
                <div id="ejournals" onClick={()=>handleChange('journal')} className={`sp_nav ${ journal ? 'sp_active' : ''}`}>
                    E-Journals
                </div>
                <div id="video" onClick={()=>handleChange('video')} className={`sp_nav ${ video ? 'sp_active' : ''}`}>
                    Video
                </div>
            </div>
            <Ebook toggle={book} />
            <Ejournal toggle={journal} />
            <Video toggle={video} />
        </div>
    )
}

function Ebook({toggle}) {
    return (
        <>
            <div
                id="sp_ebook_div"
                className={`book-wrapper wow fadeInUp ${toggle? "d-block" : "d-none"}`}
                data-wow-delay="0.5s"   
            >
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    spaceBetween={15}
                    slidesPerView={5}
                    loop={true}
                    autoplay={{ Autoplay: true }}
                    navigation
                >
                    <SwiperSlide>
                        <div className="book-items">
                            <div className="main-book-wrap">
                                <div className="book-cover">
                                    <div className="book-inside" />
                                    <div className="book-image">
                                        <img src="http://mriirs.libvirtuua.com:8000/storage/landing_page/2ed4bdba-e68b-400f-9f33-94798330e2e1.png" />
                                        <div className="effect" />
                                        <div className="light" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="book-items">
                            <div className="main-book-wrap">
                                <div className="book-cover">
                                    <div className="book-inside" />
                                    <div className="book-image">
                                        <img src="http://mriirs.libvirtuua.com:8000/storage/landing_page/bf0d80ea-29cf-4c0c-a83d-735eb31e0a2c.png" />
                                        <div className="effect" />
                                        <div className="light" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="book-items">
                            <div className="main-book-wrap">
                                <div className="book-cover">
                                    <div className="book-inside" />
                                    <div className="book-image">
                                        <img src="http://mriirs.libvirtuua.com:8000/storage/landing_page/ef473acd-8c64-404a-bb0f-7aa2b4b4c277.png" />
                                        <div className="effect" />
                                        <div className="light" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="book-items">
                            <div className="main-book-wrap">
                                <div className="book-cover">
                                    <div className="book-inside" />
                                    <div className="book-image">
                                        <img src="http://mriirs.libvirtuua.com:8000/storage/landing_page/06b6d62b-895f-4ab6-9425-f04a1142da96.webp" />
                                        <div className="effect" />
                                        <div className="light" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="book-items">
                            <div className="main-book-wrap">
                                <div className="book-cover">
                                    <div className="book-inside" />
                                    <div className="book-image">
                                        <img src="http://mriirs.libvirtuua.com:8000/storage/landing_page/58d393d1-7744-43e4-b90e-c1c82b22ad53.jpg" />
                                        <div className="effect" />
                                        <div className="light" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="book-items">
                            <div className="main-book-wrap">
                                <div className="book-cover">
                                    <div className="book-inside" />
                                    <div className="book-image">
                                        <img src="http://mriirs.libvirtuua.com:8000/storage/landing_page/e5f7b8f8-ffb2-414c-b9e5-617714b1f9a7.jpg" />
                                        <div className="effect" />
                                        <div className="light" />   
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="book-items">
                            <div className="main-book-wrap">
                                <div className="book-cover">
                                    <div className="book-inside" />
                                    <div className="book-image">
                                        <img src="http://mriirs.libvirtuua.com:8000/storage/landing_page/1e1d274f-3bcf-4ca9-946a-d83a94ca95e9.jpg" />
                                        <div className="effect" />
                                        <div className="light" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}

function Ejournal({toggle}) {
    return (
        <>
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
                    <SwiperSlide>
                    <div className="journal_card">
                    <div className="card-image">
                        {" "}
                        <img
                            src="http://mriirs.libvirtuua.com:8000/storage/landing_page/80f68bc2-e1f8-4005-8a2a-5040cff79803.jpg"
                            alt=""
                        />
                    </div>
                    <div className="card-content d-flex flex-column align-items-center">
                        <h4 className="pt-2">Somre Honda</h4>
                        <h5>Harvest in nature</h5>
                        <ul className="social-icons d-flex justify-content-center">
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-facebook" />{" "}
                                </a>
                            </li>
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-twitter" />{" "}
                                </a>
                            </li>
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-instagram" />{" "}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="journal_card">
                    <div className="card-image">
                        {" "}
                        <img
                            src="http://mriirs.libvirtuua.com:8000/storage/landing_page/80f68bc2-e1f8-4005-8a2a-5040cff79803.jpg"
                            alt=""
                        />
                    </div>
                    <div className="card-content d-flex flex-column align-items-center">
                        <h4 className="pt-2">Somre Honda</h4>
                        <h5>Harvest in nature</h5>
                        <ul className="social-icons d-flex justify-content-center">
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-facebook" />{" "}
                                </a>
                            </li>
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-twitter" />{" "}
                                </a>
                            </li>
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-instagram" />{" "}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="journal_card">
                    <div className="card-image">
                        {" "}
                        <img
                            src="http://mriirs.libvirtuua.com:8000/storage/landing_page/80f68bc2-e1f8-4005-8a2a-5040cff79803.jpg"
                            alt=""
                        />
                    </div>
                    <div className="card-content d-flex flex-column align-items-center">
                        <h4 className="pt-2">Somre Honda</h4>
                        <h5>Harvest in nature</h5>
                        <ul className="social-icons d-flex justify-content-center">
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-facebook" />{" "}
                                </a>
                            </li>
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-twitter" />{" "}
                                </a>
                            </li>
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-instagram" />{" "}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="journal_card">
                    <div className="card-image">
                        {" "}
                        <img
                            src="http://mriirs.libvirtuua.com:8000/storage/landing_page/80f68bc2-e1f8-4005-8a2a-5040cff79803.jpg"
                            alt=""
                        />
                    </div>
                    <div className="card-content d-flex flex-column align-items-center">
                        <h4 className="pt-2">Somre Honda</h4>
                        <h5>Harvest in nature</h5>
                        <ul className="social-icons d-flex justify-content-center">
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-facebook" />{" "}
                                </a>
                            </li>
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-twitter" />{" "}
                                </a>
                            </li>
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-instagram" />{" "}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="journal_card">
                    <div className="card-image">
                        {" "}
                        <img
                            src="http://mriirs.libvirtuua.com:8000/storage/landing_page/80f68bc2-e1f8-4005-8a2a-5040cff79803.jpg"
                            alt=""
                        />
                    </div>
                    <div className="card-content d-flex flex-column align-items-center">
                        <h4 className="pt-2">Somre Honda</h4>
                        <h5>Harvest in nature</h5>
                        <ul className="social-icons d-flex justify-content-center">
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-facebook" />{" "}
                                </a>
                            </li>
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-twitter" />{" "}
                                </a>
                            </li>
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-instagram" />{" "}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="journal_card">
                    <div className="card-image">
                        {" "}
                        <img
                            src="http://mriirs.libvirtuua.com:8000/storage/landing_page/80f68bc2-e1f8-4005-8a2a-5040cff79803.jpg"
                            alt=""
                        />
                    </div>
                    <div className="card-content d-flex flex-column align-items-center">
                        <h4 className="pt-2">Somre Honda</h4>
                        <h5>Harvest in nature</h5>
                        <ul className="social-icons d-flex justify-content-center">
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-facebook" />{" "}
                                </a>
                            </li>
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-twitter" />{" "}
                                </a>
                            </li>
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-instagram" />{" "}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="journal_card">
                    <div className="card-image">
                        {" "}
                        <img
                            src="http://mriirs.libvirtuua.com:8000/storage/landing_page/80f68bc2-e1f8-4005-8a2a-5040cff79803.jpg"
                            alt=""
                        />
                    </div>
                    <div className="card-content d-flex flex-column align-items-center">
                        <h4 className="pt-2">Somre Honda</h4>
                        <h5>Harvest in nature</h5>
                        <ul className="social-icons d-flex justify-content-center">
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-facebook" />{" "}
                                </a>
                            </li>
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-twitter" />{" "}
                                </a>
                            </li>
                            <li>
                                {" "}
                                <a href="#">
                                    {" "}
                                    <span className="fab fa-instagram" />{" "}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                    </SwiperSlide>
                </Swiper>
                
               
            </div>
        </>
    )
}

function Video({toggle}) {
    return (
        <>
            <div
                id="sp_video_div"
                className={`book-wrapper fadeInUp ${toggle ? "d-block" : "d-none"}`}
            >
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    spaceBetween={15}
                    slidesPerView={5}
                    loop={true}
                    autoplay={{ Autoplay: true }}
                    navigation
                >
                    <SwiperSlide>
                    <div className="card">
                    <header
                        className="card__header"
                        style={{
                            background:
                                'linear-gradient(to top, #00000063, #0006), url("https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=778&q=80")',
                            backgroundSize: "cover",
                            backgroundPosition: "bottom"
                        }}
                    >
                        <span className="mdi mdi-share card__header__share" />
                        <button className="card__header__button">
                            <FaPlay />
                        </button>
                        <span className="mdi mdi-dots-horizontal card__header__actions" />
                    </header>
                    <main className="card__content">
                        <span className="card__content__price">10.99$</span>
                        <h2 className="card__content__title">Discover How To Draw</h2>
                        <span className="card__content__description">
                            62 Hours of Video &amp; Full Access
                        </span>
                        <button className="card__content__buy">Add to Cart</button>
                    </main>
                </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="card">
                    <header
                        className="card__header"
                        style={{
                            background:
                                'linear-gradient(to top, #00000063, #0006), url("https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=778&q=80")',
                            backgroundSize: "cover",
                            backgroundPosition: "bottom"
                        }}
                    >
                        <span className="mdi mdi-share card__header__share" />
                        <button className="card__header__button">
                            <FaPlay />
                        </button>
                        <span className="mdi mdi-dots-horizontal card__header__actions" />
                    </header>
                    <main className="card__content">
                        <span className="card__content__price">10.99$</span>
                        <h2 className="card__content__title">Discover How To Draw</h2>
                        <span className="card__content__description">
                            62 Hours of Video &amp; Full Access
                        </span>
                        <button className="card__content__buy">Add to Cart</button>
                    </main>
                </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="card">
                    <header
                        className="card__header"
                        style={{
                            background:
                                'linear-gradient(to top, #00000063, #0006), url("https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=778&q=80")',
                            backgroundSize: "cover",
                            backgroundPosition: "bottom"
                        }}
                    >
                        <span className="mdi mdi-share card__header__share" />
                        <button className="card__header__button">
                            <FaPlay />
                        </button>
                        <span className="mdi mdi-dots-horizontal card__header__actions" />
                    </header>
                    <main className="card__content">
                        <span className="card__content__price">10.99$</span>
                        <h2 className="card__content__title">Discover How To Draw</h2>
                        <span className="card__content__description">
                            62 Hours of Video &amp; Full Access
                        </span>
                        <button className="card__content__buy">Add to Cart</button>
                    </main>
                </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="card">
                    <header
                        className="card__header"
                        style={{
                            background:
                                'linear-gradient(to top, #00000063, #0006), url("https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=778&q=80")',
                            backgroundSize: "cover",
                            backgroundPosition: "bottom"
                        }}
                    >
                        <span className="mdi mdi-share card__header__share" />
                        <button className="card__header__button">
                            <FaPlay />
                        </button>
                        <span className="mdi mdi-dots-horizontal card__header__actions" />
                    </header>
                    <main className="card__content">
                        <span className="card__content__price">10.99$</span>
                        <h2 className="card__content__title">Discover How To Draw</h2>
                        <span className="card__content__description">
                            62 Hours of Video &amp; Full Access
                        </span>
                        <button className="card__content__buy">Add to Cart</button>
                    </main>
                </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="card">
                    <header
                        className="card__header"
                        style={{
                            background:
                                'linear-gradient(to top, #00000063, #0006), url("https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=778&q=80")',
                            backgroundSize: "cover",
                            backgroundPosition: "bottom"
                        }}
                    >
                        <span className="mdi mdi-share card__header__share" />
                        <button className="card__header__button">
                            <FaPlay />
                        </button>
                        <span className="mdi mdi-dots-horizontal card__header__actions" />
                    </header>
                    <main className="card__content">
                        <span className="card__content__price">10.99$</span>
                        <h2 className="card__content__title">Discover How To Draw</h2>
                        <span className="card__content__description">
                            62 Hours of Video &amp; Full Access
                        </span>
                        <button className="card__content__buy">Add to Cart</button>
                    </main>
                </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="card">
                    <header
                        className="card__header"
                        style={{
                            background:
                                'linear-gradient(to top, #00000063, #0006), url("https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=778&q=80")',
                            backgroundSize: "cover",
                            backgroundPosition: "bottom"
                        }}
                    >
                        <span className="mdi mdi-share card__header__share" />
                        <button className="card__header__button">
                            <FaPlay />
                        </button>
                        <span className="mdi mdi-dots-horizontal card__header__actions" />
                    </header>
                    <main className="card__content">
                        <span className="card__content__price">10.99$</span>
                        <h2 className="card__content__title">Discover How To Draw</h2>
                        <span className="card__content__description">
                            62 Hours of Video &amp; Full Access
                        </span>
                        <button className="card__content__buy">Add to Cart</button>
                    </main>
                </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="card">
                    <header
                        className="card__header"
                        style={{
                            background:
                                'linear-gradient(to top, #00000063, #0006), url("https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=778&q=80")',
                            backgroundSize: "cover",
                            backgroundPosition: "bottom"
                        }}
                    >
                        <span className="mdi mdi-share card__header__share" />
                        <button className="card__header__button">
                            <FaPlay />
                        </button>
                        <span className="mdi mdi-dots-horizontal card__header__actions" />
                    </header>
                    <main className="card__content">
                        <span className="card__content__price">10.99$</span>
                        <h2 className="card__content__title">Discover How To Draw</h2>
                        <span className="card__content__description">
                            62 Hours of Video &amp; Full Access
                        </span>
                        <button className="card__content__buy">Add to Cart</button>
                    </main>
                </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}