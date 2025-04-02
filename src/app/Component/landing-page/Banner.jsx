// import "bootstrap/dist/css/bootstrap.min.css";

export default function Banner({ bannerData }) {
  return (
    <>
      {/* Add the style tag inside the component */}
      <style jsx>{`
        .custom-banner {
          background-color: ${bannerData?.color2};
          font-size: ${bannerData?.font_size}px !important;
        }
      `}</style>

      <div className="w-100 mt-3">
        <div className="container-fluid hero-header text-white d-flex align-items-center justify-content-center min-vh-50 py-4" style={{ backgroundColor: bannerData?.color1 }}>
          <div className="container text-center w-50 px-sm-3">
            <h2 className="fw-bold text-dark fs-md-2 fs-lg-3">
              {bannerData?.cover_headline?.firstQuote || ''}
            </h2>
            <p className="lead text-white fw-semibold px-1 px-sm-4 py-3 rounded-3 d-inline-block mt-3 shadow-sm custom-banner">
              {bannerData?.cover_headline?.subHeading || ''}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
