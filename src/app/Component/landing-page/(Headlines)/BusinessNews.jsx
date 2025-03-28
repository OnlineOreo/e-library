'use client'
import React from 'react';
import NewsContent from './NewsContent';

const businessNewsItems = [
    {
        title: "5 million dollars down the drain: Is employee burnout draining company profits?",
        date: "13/03/2025",
        excerpt: "Employee burnout is costing businesses millions, with the average US company losing around $5 million annually due to disengagement and lost productivity. A new study hig...",
        image: "https://images.firstpost.com/uploads/2025/03/employee-rep-Pixabay-2025-03-55246fb04070aa9e13de94d553878a2d.jpg",
        link: "https://www.firstpost.com/explainers/employee-burnout-costs-businesses-5-million-annually-study-13871287.html"
    },
    {
        title: "Soil bacteria outbreak in Australia: 14 die of rare antibiotic-resistant Melioidosis in Queensland",
        date: "26/02/2025",
        excerpt: "Queensland, in northeastern Australia, experienced heavy flooding after storms dumped more than 1.5 metres (59 inches) of rain in parts of the state this month, engulfing homes, businesses and roads",
        image: "https://images.firstpost.com/uploads/2025/02/Untitled-design-2025-02-26T145452.329-2025-02-529579d09419b4f02fd331ace4251c70.jpg",
        link: "https://www.firstpost.com/health/soil-bacteria-outbreak-in-australia-14-die-of-rare-antibiotic-resistant-melioidosis-in-queensland-13866859.html"
    },
    {
        title: "Global cos eye majority in Madison's ad business",
        date: "23/03/2025",
        excerpt: "Publicis Groupe and Havas Network are both in discussions with Madison World, founded by Sam Balsara, to acquire a majority stake in its advertising business. This move c...",
        image: "https://img.etimg.com/photo/msid-119388154,imgsize-2976448.cms",
        link: "https://economictimes.indiatimes.com/industry/services/advertising/global-cos-eye-majority-in-madisons-ad-business/articleshow/119388154.cms"
    },
    {
        title: "OYO to expand 'SUNDAY Hotels' to 100 properties by FY26",
        date: "23/03/2025",
        excerpt: "OYO-parent Oravel Stays aims to rapidly expand SUNDAY Hotels, targeting 100 global properties by the end of next fiscal year. The premium brand launched in May 2023 spans...",
        image: "https://img.etimg.com/photo/msid-119368850,imgsize-10634.cms",
        link: "https://economictimes.indiatimes.com/industry/services/hotels-/-restaurants/oyo-to-expand-sunday-hotels-to-100-properties-by-fy26/articleshow/119368850.cms"
    },
    {
        title: "RBSE Board Exam 2025: Rajasthan Board Class 12 Business Administration Exam Cancelled, Check Details",
        date: "24/03/2025",
        excerpt: "RBSE Board Exam 2025: Rajasthan Board Class 12 Business Administration Exam Cancelled, Check Details",
        image: "http://img.republicworld.com/rimages/board-exams-pti-169770417537016_9.bin?tr=f-jpeg",
        link: "https://www.republicworld.com/education/rbse-board-exam-2025-rajasthan-board-class-12-business-administration-exam-cancelled-check-details"
    },
    {
        title: "JK CM Omar Abdullah Meets LG Manoj Sinha Amid Wait for LG's Nod for Business Rules",
        date: "23/03/2025",
        excerpt: "JK CM Omar Abdullah Meets LG Manoj Sinha Amid Wait for LG's Nod for Business Rules",
        image: "http://img.republicworld.com/rimages/c034e5e2-e9d1-45b4-a085-d79b0427dcdd-169997435564216_9.webp?tr=f-jpeg",
        link: "https://www.republicworld.com/india/jk-cm-omar-abdullah-meets-lg-manoj-sinha-amid-lg-s-nod-for-business-rules"
    }
];

const BusinessNews = () => {
    return <NewsContent newsItems={businessNewsItems} />;
};

export default BusinessNews;