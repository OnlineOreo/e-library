'use client'
import React, { useState } from 'react';
import BusinessNews from './BusinessNews';
import TechnologyNews from './TechnologyNews';
import HealthNews from './HealthNews';
import SportsNews from './SportsNews';
import PoliticsNews from './PoliticsNews';
import EconomyNews from './EconomyNews';
import NewsTabs from './NewsTabs';


export default function Headline({headingName}) {
    const [activeTab, setActiveTab] = useState('Business');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const renderNewsContent = () => {
        switch(activeTab) {
            case 'Business':
                return <BusinessNews />;
            case 'Technology':
                return <TechnologyNews />;
            case 'Health':
                return <HealthNews />;
            case 'Sports':
                return <SportsNews />;
            case 'Politics':
                return <PoliticsNews />;
            case 'Economy':
                return <EconomyNews />;
            default:
                return <BusinesNews />;
        }
    };

    return (
        <div className="containel-xxl py-5 section" style={{ display: "block" }} id="news_section2">
            <h2 
                className="mb-3 text-center wow fadeInUp" 
                id="news_heading2" 
                data-wow-delay="0.2s"
                style={{
                    visibility: "visible",
                    animationDelay: "0.2s",
                    animationName: "fadeInUp"
                }}
            >
                {headingName}
            </h2>
            
            <NewsTabs activeTab={activeTab} onTabChange={handleTabChange} />
            
            {renderNewsContent()}
            
            <div className="container d-flex justify-content-end mt-4">
                <a 
                    href={`https://demo.libvirtuua.com/search_news?news_category=${activeTab}`} 
                    id="read_all_news"
                >
                    Read All News <i className="fas fa-long-arrow-alt-right mx-2" />
                </a>
            </div>
        </div>
    );
}