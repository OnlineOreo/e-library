// components/AZFilter.js
'use client'
import React from "react";
import Link from "next/link";

const AZFilter = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="a_to_z px-3 pb-3 mt-2">
      <div className="head mb-2">Search A To Z</div>
      <div className="d-flex flex-wrap gap-2">
        {letters.map((letter) => (
          <Link 
            key={letter} 
            href={`http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text=${letter}`}
          >
            <span>{letter}</span>
          </Link>
        ))}
        <Link
          href="http://demo.libvirtuua.com:8000/aToZ_Filter?filter_type=datacite_titles&first_text="
          className="see_all_btn mt-1"
        >
          See All
        </Link>
      </div>
    </div>
  );
};

export default AZFilter;