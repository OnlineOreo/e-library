'use client'
import React from 'react';

const NewsTabs = ({ activeTab, onTabChange }) => {
    const tabs = ['Business', 'Technology', 'Health', 'Sports', 'Politics', 'Economy'];

    return (
        <div 
            className="news_nav p-3 mx-auto bg-light d-flex flex-wrap gap-2 justify-content-evenly rounded mb-5 wow fadeInUp"
            style={{
                cursor: "pointer",
                visibility: "visible",
                animationDelay: "0.3s",
                animationName: "fadeInUp"
            }}
            data-wow-delay="0.3s"
        >
            {tabs.map((tab) => (
                <div
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`news_nav_link ${activeTab === tab ? 'news_nav_active' : ''}`}
                >
                    {tab}
                </div>
            ))}
        </div>
    );
};

export default NewsTabs;