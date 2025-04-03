'use client'
import React, { useState } from 'react';
import Ebook from './Ebook';
import Ejournal from './Ejournal';
import Video from './Video';

export default function StaffPick({headingName}) {
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
                {headingName}
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