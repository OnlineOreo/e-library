import "bootstrap/dist/css/bootstrap.min.css";

export default function Banner({bannerData}) {
  return (
    <div className="w-100 mt-3">
      <div className="container-fluid hero-header text-white d-flex align-items-center justify-content-center min-vh-50 py-4" style={{backgroundColor: bannerData?.color1}}>
        <div className="container text-center w-50 px-sm-3">
          <h2 className="fw-bold text-dark fs-md-2 fs-lg-3" style={{ fontSize:bannerData?.cover_headline?.firstQuote || '' }} >
            {bannerData?.cover_headline?.firstQuote || ''}
             {/* <span className="text-primary">LIBVIRTUUA</span> */}
          </h2>
          <p className="lead text-white fw-semibold px-1 px-sm-4 py-3 rounded-3 d-inline-block mt-3 shadow-sm" style={{backgroundColor: bannerData?.color2}}>
          {bannerData?.cover_headline?.subHeading || ''}
         </p>
       </div>
      </div>
    </div>
  );
}
