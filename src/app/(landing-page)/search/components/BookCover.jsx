
import Image from 'next/image';
import React from 'react';
// import { MdOutlineMenuBook } from "react-icons/md";

const BookCover = ({ title, author }) => {

    const coverImageArray = [
        "/images/avatar/book_cover1.jpeg",
        "/images/avatar/book_cover2.jpeg",
        "/images/avatar/book_cover3.jpeg",
        "/images/avatar/book_cover4.jpeg",
        "/images/avatar/book_cover5.jpeg",
    ]
  return (
    <div className="mx-3 mt-3 border" style={{ position: 'relative' }}>
      {/* Title on top of image */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 8,
          width: '90%',
          color: 'black',
          padding: '8px',
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        <div className='fw-bold'>{title}</div>
        <div className='mt-2'>By : {author}</div>
      </div>

      {/* Book cover image */}
      <Image
        src={coverImageArray[1]}
        alt={title}
        width={300}
        height={300}
        style={{ width: '100%', height: '320px', objectFit: 'fill' }}
      />
    </div>
  );
};

export default BookCover;
