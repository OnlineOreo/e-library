'use client'
import React, { useState } from 'react';
import NewsContent from './NewsContent';

const newsArticles = [
    {
      title: "Tata Autocomp to acquire International Automotive Components Group Sweden",
      date: "24/03/2025",
      excerpt: "Tata AutoComp Systems Ltd will acquire IAC Sweden to enhance its presence in Europe's automotive sector. This acquisition will strengthen Tata's relationships with Europe...",
      imageUrl: "https://img.etimg.com/photo/msid-119411315,imgsize-42964.cms",
      articleUrl: "https://economictimes.indiatimes.com/industry/auto/auto-components/tata-autocomp-to-acquire-international-automotive-components-group-sweden/articleshow/119411315.cms"
    },
    {
      title: "Parliamentary panel calls for stricter regulations on content glorifying alcohol, drugs, violence",
      date: "23/03/2025",
      excerpt: "The Standing Committee on Communications and Information Technology recommends stronger regulations for films and content that glorify alcohol, drugs, and violence. They ...",
      imageUrl: "https://img.etimg.com/photo/msid-119383768,imgsize-744961.cms",
      articleUrl: "https://economictimes.indiatimes.com/industry/media/entertainment/media/parliamentary-panel-calls-for-stricter-regulations-on-content-glorifying-alcohol-drugs-violence/articleshow/119383768.cms"
    },
    {
      title: "Boeing laid off up to 180 people in Bengaluru as part of global workforce reduction",
      date: "23/03/2025",
      excerpt: "Boeing laid off up to 180 employees at its Engineering Technology Center in Bengaluru as part of a global workforce reduction. This follows Boeing's previous announcement...",
      imageUrl: "https://img.etimg.com/photo/msid-119366597,imgsize-134582.cms",
      articleUrl: "https://economictimes.indiatimes.com/industry/transportation/airlines-/-aviation/boeing-laid-off-up-to-180-people-in-bengaluru-as-part-of-global-workforce-reduction/articleshow/119366597.cms"
    }
  ];
  

const HealthNews = () => {
    return <NewsContent newsItems={newsArticles} />;
};

export default HealthNews;