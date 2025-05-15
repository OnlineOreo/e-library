'use client'
import { useTranslation } from 'react-i18next';
import '@/i18n'; // cleaner using path alias `@`

const { t, i18n } = useTranslation();

export default function AboutUs() {
    return (
        <>
            {/* About Start */}
            <div
                className="container-xxl py-5 section"
                id="about_section"
            >
                <div className="container py-5 px-lg-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <h5 className="text-primary-gradient fw-medium" id="about_heading">
                                {t('About Us')}
                            </h5>
                            <h2 className="mb-4">1.4 Million users in over 700 libraries</h2>
                            <span className="mb-4">
                                Best Book Buddies' Vision: Facilitating Humanity Acquire and Spread
                                Wisdom and Knowledge. Best Book Buddies (BBB) is the unique attempt
                                to bring the whole of the Books domain, (both e-Content and
                                Physical) on a single platform connecting B2B2C.
                            </span>
                            <br />
                            <br />
                            <span>
                                BBB is a 360 degree social &amp; e-commerce network &amp; Market
                                Place of Book/Content lovers across the spectrum of Stakeholders
                                (Author-Reader-Publisher), creating value for every stakeholder. At
                                Best Book Buddies, users Discover Books and Buddies to Interact
                                timely on their topics of concern.
                            </span>
                            <div className="row g-4 mb-4">
                                <div className="col-sm-6 wow fadeIn" data-wow-delay="0.5s">
                                    <div className="d-flex">
                                        <i className="fa fa-cogs fa-2x text-primary-gradient flex-shrink-0 mt-1" />
                                        <div className="ms-3">
                                            <h3 className="mb-0" data-toggle="counter-up">
                                                15,00,000
                                            </h3>
                                            <p className="text-primary-gradient mb-0">Active Visitors</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 wow fadeIn" data-wow-delay="0.7s">
                                    <div className="d-flex">
                                        <i className="fa fa-comments fa-2x text-secondary-gradient flex-shrink-0 mt-1" />
                                        <div className="ms-3">
                                            <h3 className="mb-0" data-toggle="counter-up">
                                                40,000
                                            </h3>
                                            <p className="text-secondary-gradient mb-0">
                                                Clients Reviews
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a
                                href=""
                                className="btn btn-primary-gradient py-sm-3 px-4 px-sm-5 rounded-pill mt-3"
                            >
                                Read More
                            </a>
                        </div>
                        <div className="col-lg-6">
                            <img
                                className="img-fluid wow fadeInUp align-items-center"
                                data-wow-delay="0.5s"
                                src="http://mriirs.libvirtuua.com:8000/landingPageAsset/img/about_us.webp"
                                style={{ paddingLeft: 50, paddingBottom: 100 }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* About End */}
        </>

    )
}