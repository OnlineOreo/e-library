import Image from 'next/image';
import React from 'react';

// Declare a module-level counter (persists across renders)
let imageIndex = 0;

const BookCover = ({ title, author, thumbnail }) => {
  const coverImageArray = [
    "/images/avatar/1.png",
    "/images/avatar/2.png",
    "/images/avatar/3.png",
    "/images/avatar/4.png",
    "/images/avatar/5.png",
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
      <h3
        className='fw-bold fs-12 f-italic four_line_ellipses'
        style={{
          position: 'absolute',
          top: '22%',
          left: 10,
          width: '95%',
          color: '#404040',
          padding: '8px',
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        {title?.toUpperCase()}
      </h3>

      {/* Author at the bottom */}
      <div
        className='mt-2 fw-bold one_line_ellipses'
        style={{
          position: 'absolute',
          bottom: '25%',
          right: '3%',
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
