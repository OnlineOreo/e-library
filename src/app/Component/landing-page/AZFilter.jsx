'use client'
import React from "react";
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import '@/i18n'; // cleaner using path alias `@`
import { useRouter } from "next/navigation";

const AZFilter = ({ token, setShow }) => {
  const Route = useRouter()
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const { t, i18n } = useTranslation();

  return (
    <div className="a_to_z px-3 pb-3 mt-2">
      <div className="head mb-2">{t('Search A To Z')}</div>
      <div className="d-flex flex-wrap gap-2 py-2">
        {letters.map((letter) => (

          <span
            onClick={(e) => {
              e.preventDefault();
              if (token) {
                Route.push(`/search/print-collection?q=datacite_titles_string%3A${letter}*`);
              } else {
                setShow(true)
                Route.push(`/?search=/search/print-collection?q=datacite_titles_string%3A${letter}*`)
              }
            }}
          >{t(letter)}</span>
        ))}
        <div
          className="see_all_btn"
          onClick={(e) => {
            e.preventDefault();
            if (token) {
              Route.push(`/search/print-collection?q=*:*`);
            } else {
              setShow(true)
              Route.push(`/?search=/search/print-collection?q=*:*`)
            }
          }}
        >
          {t('See All')}
        </div>
      </div>
    </div>
  );
};

export default AZFilter;