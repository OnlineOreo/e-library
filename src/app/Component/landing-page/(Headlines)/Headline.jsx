"use client";
import React, { useEffect, useState } from "react";

export default function Headline({ headingName, bannerData }) {
    const [activeTab, setActiveTab] = useState(null);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const categories = bannerData.news_category.split(",").map(cat => cat.trim());

    useEffect(() => {
        if (!activeTab && categories.length > 0) {
            setActiveTab(categories[0]); // ✅ Set trimmed category
        }
    }, []); 

    useEffect(() => {
        if (activeTab) {
            fetchNews(activeTab.trim()); // ✅ Trim before API call
        }
    }, [activeTab]);

    const fetchNews = async (category) => {
        setLoading(true);
        setError(null);
        try {
            const trimmedCategory = category.trim().toLowerCase(); // ✅ Trimmed again for safety
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news?category=${trimmedCategory}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch news");
            }
            const data = await response.json();
            setNews(data.slice(0, 9));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <h2 className="text-center fw-bold mb-4">{headingName}</h2>

            {/* Tabs */}
            <div className="d-flex justify-content-center mb-4">
                <div className="bg-light p-2 rounded-pill d-flex flex-wrap justify-content-center">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`btn btn-sm mx-1 my-1 rounded-pill ${activeTab === category ? "btn-primary text-white" : "btn-light"
                                }`}
                            onClick={() => setActiveTab(category.trim())} // ✅ Trim before setting
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Loading & Error Messages */}
            {loading && <p className="text-center text-muted">Loading...</p>}
            {error && <p className="text-center text-danger">{error}</p>}

            {/* News Cards */}
            <div className="row">
                {!loading && !error && news.length > 0 ? (
                    news.map((item, index) => (
                        <div key={index} className="col-12 col-sm-6 col-md-4 mb-2">
                            <div className="news-card position-relative overflow-hidden rounded-3">
                                {/* Background Image */}
                                <div
                                    className="news-image"
                                    style={{
                                        backgroundImage: `url(${item.thumbnail})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        height: "250px",
                                        filter: "brightness(0.7)",
                                    }}
                                ></div>

                                {/* Overlay Text */}
                                <div className="news-overlay p-3 d-flex flex-column justify-content-between">
                                    <h5 className="news-title text-white">{item.title}</h5>
                                    <p className="text-white small">{item.published}</p>

                                    {/* Read More Button with Animation */}
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline-light btn-sm read-more-btn"
                                    >
                                        Read More →
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p className="text-center text-muted">No news available.</p>
                )}
                
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                .news-card {
                    position: relative;
                    border-radius: 10px;
                    overflow: hidden;
                    transition: transform 0.3s ease-in-out;
                }
                .news-card:hover {
                    transform: scale(1.05);
                }
                .news-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: rgba(0, 0, 0, 0.6);
                    padding: 15px;
                }
                .news-title {
                    font-size: 1.2rem;
                    font-weight: bold;
                }
                .read-more-btn {
                    transition: all 0.3s ease-in-out;
                }
                .read-more-btn:hover {
                    transform: translateX(5px);
                    background: white;
                    color: black;
                }
            `}</style>
        </div>
    );
}
