'use client'
import React, { useState } from 'react';
import Ebook from './Ebook';
import Ejournal from './Ejournal';
import Video from './Video';
import { useTranslation } from 'react-i18next';
import { useRouter } from "next/navigation";
import '@/i18n'; // cleaner using path alias `@`


export default function StaffPick({headingName,landingPageData,setShow,show}) {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const [book, setBook] = useState(true)
    const [journal, setJournal] = useState(false)
    const [video, setVideo] = useState(false)

    console.log(landingPageData)

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
      
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const width = screenWidth / 2;
        const height = screenHeight;
        const left = screenWidth / 2;
      
        window.open(
          bookUrl,
          'targetWindow',
          `toolbar=no,location=no,menubar=no,scrollbars=yes,resizable=yes,width=${width},height=${height},left=${left},top=0`
        );
      };

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
                {t(headingName)}
            </h2>
            <div
                className="navtabs d-flex justify-content-evenly mx-auto bg-light p-3 mb-5 rounded"
                style={{ cursor: "pointer" }}
            >
                <div id="ebook" onClick={()=>handleChange('book')} className={`sp_nav ${ book ? 'sp_active' : ''}`}>
                    {t('E-Book')}
                </div>
                <div id="ejournals" onClick={()=>handleChange('journal')} className={`sp_nav ${ journal ? 'sp_active' : ''}`}>
                    {t('E-Journals')}
                </div>
                <div id="video" onClick={()=>handleChange('video')} className={`sp_nav ${ video ? 'sp_active' : ''}`}>
                    {t('Video')}
                </div>
            </div>
            <Ebook toggle={book}  handleRedirect={handleRedirect} landingPageData={landingPageData} />
            <Ejournal toggle={journal} handleRedirect={handleRedirect} landingPageData={landingPageData} />
            <Video toggle={video} handleRedirect={handleRedirect} landingPageData={landingPageData} />
        </div>
    )
}