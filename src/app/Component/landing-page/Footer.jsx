'use client';

import React from "react";
import { MdEmail } from "react-icons/md";
import { FaLinkedinIn, FaPhoneAlt, FaTwitter, FaFacebookF, FaMapMarkerAlt } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import { useLandingPageData } from "@/app/context/LandingPageContext"; 
import { useSelector } from "react-redux";
import '@/i18n';

export default function Footer() {
  const { t } = useTranslation();
  const landingPageData2 = useSelector((state) => state.landingPageDataSlice);
  const landingPageData = landingPageData2?.landingPageData
  const footer = landingPageData?.footers?.[0];
  const bannerData = landingPageData?.configurations?.[0] || {};


  const activeLogo = bannerData?.latest_logos?.find(config => config.is_active)?.logo;

  return (
    <>
      <style jsx>{`
        .custom-banner {
          background-color: ${bannerData?.color2 || '#343a40'};
        }
      `}</style>

      <div className="container-fluid text-light footer custom-banner">
        <div className="container py-5 px-lg-5">
          <div className="row">
            {/* Logo and Developer Info */}
            <div className="col-md-6 col-lg-4 mb-4">
              <h4 className="text-white">{t('Developed By')}</h4>
              <img
                src="images/avatar/elib_logo.png"
                alt="Logo"
                style={{ width: 100, height: 100 }}
              />
              <p>{t('Copyright 2016-25')}</p>
              <p>{t("Green Park Extn., New Delhi 110017 INDIA")}</p>
              <div className="d-flex gap-3">
                <a href="#" style={{ fontSize: "1em", textDecoration: "underline" }}>
                  {t('Term of use')}
                </a>
                <a
                  href="https://bestbookbuddies.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "1em", textDecoration: "underline" }}
                >
                  {t('LibVirtuUA Website')}
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-md-6 col-lg-4 mb-4">
              <h4 className="text-white mb-4">{t('Quick Link')}</h4>
              <a className="btn btn-link" href="#">{t('About Library')}</a>
              <a className="btn btn-link" href="#">{t('Request an eResource')}</a>
              <a className="btn btn-link" href="#">{t('User Manual')}</a>
              <a className="btn btn-link" href="#">{t('Submit Feedback')}</a>
              <div className="d-flex pt-2">
                <a className="btn btn-outline-light btn-social" target="_blank" rel="noopener noreferrer" href={footer?.x_url || "#"}>
                  <FaTwitter />
                </a>
                <a className="btn btn-outline-light btn-social" target="_blank" rel="noopener noreferrer" href={footer?.fb_url || "#"}>
                  <FaFacebookF />
                </a>
                <a className="btn btn-outline-light btn-social" target="_blank" rel="noopener noreferrer" href={footer?.insta_url || "#"}>
                  <FaInstagram />
                </a>
                <a className="btn btn-outline-light btn-social" target="_blank" rel="noopener noreferrer" href={footer?.li_url || "#"}>
                  <FaLinkedinIn />
                </a>
              </div>
            </div>

            {/* Contact Details */}
            <div className="col-md-6 col-lg-4">
              <h4 className="text-white mb-4">{t('Address')}</h4>
              <p className="text-truncate">
                <FaMapMarkerAlt className="me-2" />
                {t(footer?.address || '')}
              </p>
              <p className="text-truncate">
                <FaPhoneAlt className="me-2" />
                {t(footer?.phone || '')}
              </p>
              <p className="text-truncate">
                <MdEmail className="me-2" />
                {t(footer?.email || '')}
              </p>
              <div className="mt-5">{t('Visits : 3939')}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
