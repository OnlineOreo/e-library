"use client"
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { FaFileDownload,
} from "react-icons/fa";



const CitationDownload = ({ id, catalogType }) => {


    const [citationDropdown, setCitationDropdown] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setCitationDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const downloadCitation = async (format) => {
        try {
            const response = await axios.get(`/internal-api/citation-download?catalogId=${id}&catalogCore=${catalogType}&rows=1`
            );
            const data = response.data.results[0];
            console.log(response.data);
            
            let content = '';
            let filename = `${"catalog_"+data.id || 'citation'}.${format}`;
    
            switch (format) {
                case 'text':
                    content = `Title: ${data.datacite_titles}\nAuthor: ${data.datacite_creators_string?.join(', ')}\nPublished: ${data.dc_date}\nPublisher: ${data.dc_publishers_string?.join(', ')}\nURL: ${data.url}`;
                    break;
    
                case 'bib':
                    content = `@book{${data.id},\n  title={${data.datacite_titles}},\n  author={${data.datacite_creators_string?.join(' and ')}},\n  year={${data.dc_date}},\n  publisher={${data.dc_publishers_string?.join(', ')}},\n  url={${data.url}}\n}`;
                    break;
    
                case 'ris':
                    content = `TY  - BOOK\nTI  - ${data.datacite_titles}\nAU  - ${data.datacite_creators_string?.join('\nAU  - ')}\nPY  - ${data.dc_date}\nPB  - ${data.dc_publishers_string?.join(', ')}\nUR  - ${data.url}\nER  -`;
                    break;
    
                default:
                    console.warn("Unsupported format");
                    return;
            }
    
            const blob = new Blob([content], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
    
        } catch (error) {
            console.error("Citation download failed:", error);
        }
    };


    return (
        <div
            title="Download"
            className=""
            style={{ position: "relative" }}
            ref={containerRef}
        >
            {/* Share icon */}
            <FaFileDownload
                size={20}
                className="me-3 cursor_pointer"
                onClick={() => setCitationDropdown((prev) => !prev)}
            />

            {/* Dropdown */}
            <div
                className={`share_dropdown card transition-all position-absolute ${citationDropdown ? "show" : "hide"
                    }`}
                style={{
                    top: "150%",
                    zIndex: 99,
                    backgroundColor: "#fdfdfd",
                    minWidth: "150px",
                }}
            >
                <div className="fw-bold border-bottom px-2 py-1">Download Citation</div>
                <div className="d-flex gap-2 flex-column text-secondary px-2 py-1">
                    <a onClick={() => downloadCitation("text")} className="cursor_pointer_underline">Text Format</a>
                    <a onClick={() => downloadCitation("bib")} className="cursor_pointer_underline">BIB Format</a>
                    <a onClick={() => downloadCitation("ris")} className="cursor_pointer_underline">RIS Format</a>
                </div>
            </div>

            {/* Other Icons */}


            {/* Animation styles */}
            <style jsx>{`
               .transition-all {
                 transition: opacity 0.3s ease, transform 0.3s ease;
               }
               .show {
                 opacity: 1;
                 transform: scale(1);
                 pointer-events: auto;
               }
               .hide {
                 opacity: 0;
                 transform: scale(0.95);
                 pointer-events: none;
               }
             `}</style>
        </div>
    )
}

export default CitationDownload