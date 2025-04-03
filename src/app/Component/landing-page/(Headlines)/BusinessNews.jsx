'use client';
import React, { useEffect, useState } from 'react';

const categories = ['Business', 'Technology', 'Health', 'Sports', 'Politics', 'Economy'];

export default function Headline() {
    const [activeTab, setActiveTab] = useState('Business');
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNews();
    }, [activeTab]);

    const fetchNews = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news?category=${activeTab.toLowerCase()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch news');
            }
            const data = await response.json();
            setNews(data); // Assuming API returns an array
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-xxl py-5 section" id="news_section2">
            <h2 className="mb-4 text-center text-primary wow fadeInUp" id="news_heading2" data-wow-delay="0.2s">
                Latest Headlines
            </h2>

            {/* Category Tabs */}
            <div className="d-flex justify-content-center mb-5">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`btn btn-outline-${activeTab === category ? 'primary' : 'secondary'} mx-2 py-2 px-4 rounded-lg text-uppercase`}
                        onClick={() => setActiveTab(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Loading and Error Messages */}
            {loading && <p className="text-center text-muted">Loading...</p>}
            {error && <p className="text-center text-danger">{error}</p>}

            {/* News List */}
            {!loading && !error && news.length > 0 ? (
                <NewsContent newsItems={news} />
            ) : (
                !loading && <p className="text-center text-muted">No news available.</p>
            )}

            {/* Read All News Link */}
            <div className="container d-flex justify-content-end mt-4">
                <a 
                    href={`https://demo.libvirtuua.com/search_news?news_category=${activeTab.toLowerCase()}`} 
                    id="read_all_news"
                    className="text-decoration-none text-primary d-flex align-items-center hover-text-dark"
                >
                    <span>Read All News</span>
                    <i className="fas fa-long-arrow-alt-right mx-2" />
                </a>
            </div>
        </div>
    );
}

const NewsContent = ({ newsItems }) => {
    return (
        <div className="news-list mt-4">
            {newsItems.map((item, index) => (
                <div key={index} className="news-item p-4 mb-4 border rounded shadow-sm hover:shadow-lg transition-all">
                    {/* Thumbnail */}
                    {item.thumbnail && (
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="img-fluid rounded mb-3"
                            style={{ height: '250px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                    )}
                    <h4 className="text-dark font-weight-bold">{item.title}</h4>
                    <p className="text-muted">{item.description}</p>
                    <p className="text-muted"><strong>Published:</strong> {item.published}</p>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-link text-primary">
                        Read more <i className="fas fa-arrow-right"></i>
                    </a>
                </div>
            ))}
        </div>
    );
};
