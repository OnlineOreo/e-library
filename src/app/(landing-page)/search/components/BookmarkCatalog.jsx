import React, { useState } from 'react';
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import axios from 'axios';

const BookmarkCatalog = ({ id, catalogType }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmark = () => {
        setIsBookmarked((pre) => !pre);
        // try {
        //     const response = await axios.post('/api/bookmark', {
        //         id,
        //         catalogType
        //     });
        //     console.log('Bookmark response:', response.data);

        // } catch (error) {
        //     console.error('Bookmark failed:', error);
        // }
    };

    return (
        <div>
            {isBookmarked ? (
                <FaBookmark
                    size={20}
                    className='cursor_pointer'
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
