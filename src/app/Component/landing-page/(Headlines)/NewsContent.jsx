'use client'
import React from 'react';

const NewsContent = ({ newsItems }) => {
    return (
        <div 
            id="news_cards_show_div" 
            className="news-content-wrapper wow fadeInUp" 
            data-wow-delay="0.5s"
            style={{
                visibility: "visible",
                animationDelay: "0.5s",
                animationName: "fadeInUp"
            }}
        >
            {newsItems.map((item, index) => (
                <div className="news-card" key={index}>
                    <a href={item.link} className="news-card__card-link" target="_blank" rel="noopener noreferrer" />
                    <img src={item.image} alt="News Image" className="news-card__image" />
                    <div className="news-card__text-wrapper">
                        <h3 className="news-card__title two_line_ellipses">{item.title}</h3>
                        <div className="news-card__post-date">{item.date}</div>
                        <div className="news-card__details-wrapper">
                            <p className="news-card__excerpt three_line_ellipses">{item.excerpt}</p>
                            <a href={item.link} target="_blank" className="news-card__read-more" rel="noopener noreferrer">
                                Read more <i className="fas fa-long-arrow-alt-right" />
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsContent;