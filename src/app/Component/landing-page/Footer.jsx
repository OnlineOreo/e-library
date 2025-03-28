import React from "react"
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt , FaTwitter , FaFacebookF  } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

export default function Footer() {
    return (
        <>
            <div
                className="container-fluid bg-primary text-light footer wow fadeIn"
                data-wow-delay="0.1s"
            >
                <div className="container py-5 px-lg-5">
                    <div className="row">
                        <div className="col-md-6 col-lg-4">
                            <h4 className="text-white">Developed By</h4>
                            <img
                                src="https://demo.libvirtuua.com/storage/landing_page/elib_transparent_logo.png"
                                alt=""
                                style={{ width: 100, height: 100 }}
                            />
                            <p>Copyright 2016-25</p>
                            <p>BestBook Buddies Technologies Pvt. Ltd.</p>
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
                            <a className="btn btn-link" href="/login">
                                Request an eResource
                            </a>
                            <a className="btn btn-link" href="#">
                                User Manual
                            </a>
                            <a className="btn btn-link" href="#">
                                Submit Feedback
                            </a>
                            <div className="d-flex pt-2">
                                <a className="btn btn-outline-light btn-social" href="#">
                                <FaTwitter />
                                </a>
                                <a className="btn btn-outline-light btn-social" href="#">
                                <FaFacebookF />
                                </a>
                                <a className="btn btn-outline-light btn-social" href="#">
                                <FaInstagram />
                                </a>
                                <a className="btn btn-outline-light btn-social" href="#">
                                <FaLinkedinIn />
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <h4 className="text-white mb-4">Address</h4>
                            <p className="text-truncate">
                                <FaMapMarkerAlt />
                                Corp. Office, H - 17, LGF, Green Park Ext. , Delhi 110017, INDIA
                            </p>
                            <p className="text-truncate">
                                <FaPhoneAlt />
                                +011 49849620
                            </p>
                            <p className="text-truncate">
                                <MdEmail />
                                info@bestbookbuddies.com
                            </p>
                            <div className="mt-5">Visits : 3939</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}