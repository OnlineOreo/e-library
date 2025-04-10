"use client";
import React, { useEffect, useState } from 'react';
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import axios from 'axios';

const BookmarkCatalog = ({ id, catalogType }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 

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
        "multimedia": "saved_multimedia_ids",
    };

    // const loadSavedCatalog = async () => {
    //     const token = getToken();
    //     if (!token) {
    //         console.error("Authentication required!");
    //         return;
    //     }
    //     const userId = getUserRole();
    //     console.log("user_id", userId);
    //     try {
    //         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-saved-article?user=${userId}`,{
    //             headers:{Authorization:`${token}`},
    //         });
    //         console.log("user data : ",response.data);
            
    //     } catch (error) {
    //         console.error(error)
    //     }
        
    // }

    // useEffect(() => {
    //  loadSavedCatalog();
    // }, [])
    

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
