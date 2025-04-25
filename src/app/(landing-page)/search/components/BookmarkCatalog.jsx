"use client";
import React, { useEffect, useState } from 'react';
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import axios from 'axios';

const BookmarkCatalog = ({ id, catalogType, user_saved_catalogs }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 

    // console.log(catalogType);
    

    // console.log("user saved catalog throgh props : ",user_saved_catalogs);
    

    const getToken = () => {
        const cookieString = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="));
    
        return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
    };

    const getUserRole = () => {
        if (typeof window !== "undefined") { 
            const cookieString = document.cookie
                .split("; ")
                .find((row) => row.startsWith("user_id="));
            return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
        }
        return null;
    };

    
    const arrayCors = {
        "Print-collection": "saved_p_collection_ids",
        "e-resources": "saved_e_resources_ids",
        "e-collection": "saved_e_collection_ids",
        "multimedia-n": "saved_multimedia_ids",
    };
    

    const handleBookmark = async () => {
        const token = getToken();
        if (!token) {
            console.error("Authentication required!");
            return;
        }

        setIsLoading(true);
        try {
            const userId = getUserRole();
            const formData = new FormData();

            formData.append('user', userId);
            formData.append(arrayCors[catalogType], id);

            const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-saved-article`, formData, {
                headers: { Authorization: `${token}` },
            });

            if (res.status === 200) {
                setIsBookmarked(prev => !prev);
            }
        } catch (error) {
            console.error("Axios Error:", error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    const savedBookmarked = () => {
        const firstCatalog = user_saved_catalogs[0];
    
        if (!firstCatalog) {
            console.log("No saved catalog data found.");
            return;
        }
    
        const key = arrayCors[catalogType];
        const saved_ids_string = firstCatalog[key];
    
        if (!saved_ids_string) {
            console.log(`No saved IDs found for key: ${key}`);
            return;
        }
    
        const saved_ids_array = saved_ids_string
            .split(',')
            .map(id => Number(id.trim()))
            .filter(id => !isNaN(id));
    
        if (saved_ids_array.includes(Number(id))) {
            setIsBookmarked(true);
        }
    };
    
    useEffect(() => {
        if (user_saved_catalogs?.length > 0 && id != null) {
            savedBookmarked();
        }
    }, [catalogType, user_saved_catalogs]);
    

    return (
        <div style={{ width: "20px", height: "20px" }}>
            {isLoading ? (
                <Spinner animation="border" size="sm" />
            ) : isBookmarked ? (
                <FaBookmark
                    size={20}
                    className='cursor_pointer text-primary'
                    onClick={handleBookmark}
                />
            ) : (
                <FaRegBookmark
                    size={20}
                    className='cursor_pointer'
                    onClick={handleBookmark}
                />
            )}
        </div>
    );
};

export default BookmarkCatalog;
