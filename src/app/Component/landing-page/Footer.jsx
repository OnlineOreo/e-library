'use client'
import React from "react"
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt , FaTwitter , FaFacebookF  } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function Footer() {
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
                            <h4 className="text-white">Developed By</h4>
                            <img
                                 src={
                                    `http://192.168.1.171:8000/api${landingPageData?.landingPageData?.configurations?.[0]?.latest_logos.find(
                                      (config) => config.is_active
                                    )?.logo}` || "default"
                                  }
                                alt=""
                                style={{ width: 100, height: 100 }}
                            />
                            <p>Copyright 2016-25</p>
                            <p>{footer?.address}</p>
                            <div className="d-flex gap-3">
                                <a href="" style={{ fontSize: "1em", textDecoration: "underline" }}>
                                    Term of use
                                </a>
                                <a
                                    href="https://elibrary.libvirtual.com"
                                    style={{ fontSize: "1em", textDecoration: "underline" }}
                                >
                                    Libvertua Website
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <h4 className="text-white mb-4">Quick Link</h4>
                            <a className="btn btn-link" href="#">
                                About Library
                            </a>
                            <a className="btn btn-link" href="#">
                                Request an eResource
                            </a>
                            <a className="btn btn-link" href="#">
                                User Manual
                            </a>
                            <a className="btn btn-link" href="#">
                                Submit Feedback
                            </a>
                            <div className="d-flex pt-2">
                                <a className="btn btn-outline-light btn-social" href={footer?.x_url}>
                                <FaTwitter />
                                </a>
                                <a className="btn btn-outline-light btn-social" href={footer?.fb_url}>
                                <FaFacebookF />
                                </a>
                                <a className="btn btn-outline-light btn-social" href={footer?.insta_url}>
                                <FaInstagram />
                                </a>
                                <a className="btn btn-outline-light btn-social" href={footer?.li_url
                                }>
                                <FaLinkedinIn />
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <h4 className="text-white mb-4">Address</h4>
                            <p className="text-truncate">
                                <FaMapMarkerAlt className="me-2" />
                                {footer?.address}
                            </p>
                            <p className="text-truncate">
                                <FaPhoneAlt className="me-2" />
                                {footer?.phone}
                            </p>
                            <p className="text-truncate">
                                <MdEmail className="me-2" />
                                {footer?.email}
                            </p>
                            <div className="mt-5">Visits : 3939</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}