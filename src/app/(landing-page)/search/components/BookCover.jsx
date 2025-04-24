import Image from 'next/image';
import React from 'react';

// Declare a module-level counter (persists across renders)
let imageIndex = 0;

const BookCover = ({ title, author, thumbnail }) => {
  const coverImageArray = [
    "/images/avatar/book_cover1.jpeg",
    "/images/avatar/book_cover3.jpeg",
    "/images/avatar/book_cover2.jpeg",
    "/images/avatar/book_cover4.jpeg",
    "/images/avatar/book_cover5.jpeg",
  ];

  const currentImage = coverImageArray[imageIndex % coverImageArray.length];
  imageIndex++;

  // console.log("this is thumbnail : ", thumbnail);
  

  if (thumbnail && thumbnail !== "") {
    return (
      <div className="mx-3 mt-3 mb-3 border">
      <Image
        src={thumbnail}
        alt={title}
        width={300}
        height={300}
        style={{ width: '100%', height: '320px', objectFit: 'fill' }}
      />
      </div>
    );
  }

  return (
    <div className="mx-3 mt-3 mb-3 border" style={{ position: 'relative' }}>
      {/* Title on top of image */}
      <div
        className='fw-bold fs-4 five_line_ellipses'
        style={{
          position: 'absolute',
          top: 40,
          left: 10,
          width: '90%',
          color: '#272626',
          padding: '8px',
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        {title?.toUpperCase()}
      </div>

      {/* Author at the bottom */}
      <div
        className='mt-2 one_line_ellipses'
        style={{
          position: 'absolute',
          bottom: 20,
          left: 10,
          width: '90%',
          color: '#272626',
          padding: '8px',
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        By: {author}
      </div>

      {/* Book cover image */}
      <Image
        src={currentImage}
        alt={title}
        width={300}
        height={300}
        style={{ width: '100%', height: '320px', objectFit: 'fill' }}
      />
    </div>
  );
};

export default BookCover;
