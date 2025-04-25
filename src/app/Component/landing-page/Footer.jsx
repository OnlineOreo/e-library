'use client'
import React from "react"
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt , FaTwitter , FaFacebookF  } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import '@/i18n'; // cleaner using path alias `@`



export default function Footer() {
    const { t, i18n } = useTranslation();
    
    const landingPageData = useSelector((state) => state.landingPageDataSlice);
    const footer = landingPageData?.landingPageData?.footers?.[0]
    // console.log(bannerData)
    const landingPageData2 = useSelector((state) => state.landingPageDataSlice);
    const bannerData = landingPageData2?.landingPageData?.configurations?.[0] || {};
    return (
        <>
        <style jsx>{`
        .custom-banner {
          background-color: ${bannerData?.color2};
        }
      `}</style>
            <div
                className="container-fluid text-light footer wow fadeIn custom-banner"
                data-wow-delay="0.1s"
            >
                <div className="container py-5 px-lg-5">
                    <div className="row">
                        <div className="col-md-6 col-lg-4">
                            <h4 className="text-white">{t('Developed By')}</h4>
                            <img
                                 src={
                                    `${landingPageData?.landingPageData?.configurations?.[0]?.latest_logos.find(
                                      (config) => config.is_active
                                    )?.logo}` || "default"
                                  }
                                alt=""
                                style={{ width: 100, height: 100 }}
                            />
                            <p>{t('Copyright 2016-25')}</p>
                            <p>{t(footer?.address)}</p>
                            <div className="d-flex gap-3">
                                <a href="" style={{ fontSize: "1em", textDecoration: "underline" }}>
                                    {t('Term of use')}
                                </a>
                                <a
                                    href="https://elibrary.libvirtual.com"
                                    style={{ fontSize: "1em", textDecoration: "underline" }}
                                >
                                    {t('LibVirtuUA Website')}
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <h4 className="text-white mb-4">{t('Quick Link')}</h4>
                            <a className="btn btn-link" href="#">
                                {t('About Library')}
                            </a>
                            <a className="btn btn-link" href="#">
                                {t('Request an eResource')}
                            </a>
                            <a className="btn btn-link" href="#">
                                {t('User Manual')}
                            </a>
                            <a className="btn btn-link" href="#">
                                {t('Submit Feedback')}
                            </a>
                            <div className="d-flex pt-2">
                                <a className="btn btn-outline-light btn-social" target="_blank" href={footer?.x_url}>
                                <FaTwitter />
                                </a>
                                <a className="btn btn-outline-light btn-social" target="_blank" href={footer?.fb_url}>
                                <FaFacebookF />
                                </a>
                                <a className="btn btn-outline-light btn-social" target="_blank" href={footer?.insta_url}>
                                <FaInstagram />
                                </a>
                                <a className="btn btn-outline-light btn-social" target="_blank" href={(footer?.li_url)
                                }>
                                <FaLinkedinIn />
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <h4 className="text-white mb-4">{t('Address')}</h4>
                            <p className="text-truncate">
                                <FaMapMarkerAlt className="me-2" />
                                {t(footer?.address)}
                            </p>
                            <p className="text-truncate">
                                <FaPhoneAlt className="me-2" />
                                {t(footer?.phone)}
                            </p>
                            <p className="text-truncate">
                                <MdEmail className="me-2" />
                                {t(footer?.email)}
                            </p>
                            <div className="mt-5">{t('Visits : 3939')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}