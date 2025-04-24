'use client'
import React from "react";
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import '@/i18n'; // cleaner using path alias `@`

const AZFilter = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const { t, i18n } = useTranslation();

  return (
    <div className="a_to_z px-3 pb-3 mt-2">
      <div className="head mb-2">{t('Search A To Z')}</div>
      <div className="d-flex flex-wrap gap-2">
        {letters.map((letter) => (
          <Link 
            key={letter} 
            href={`/search/print-collection?q=datacite_titles_string%3A${letter}*`}
          >
            <span>{t(letter)}</span>
          </Link>
        ))}
        <Link
          href="/search/print-collection?q=*:*"
          className="see_all_btn mt-1"
        >
          {t('See All')}
        </Link>
      </div>
    </div>
  );
};

export default AZFilter;