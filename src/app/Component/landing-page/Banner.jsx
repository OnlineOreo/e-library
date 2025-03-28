import "bootstrap/dist/css/bootstrap.min.css";

export default function Banner() {
  return (
    <div className="w-100 mt-3">
      <div className="container-fluid hero-header text-white d-flex align-items-center justify-content-center min-vh-50 py-4" style={{backgroundColor: "#7dd3d9"}}>
        <div className="container text-center w-50 px-3">
          <h2 className="fw-bold text-dark fs-1 fs-md-2 fs-lg-3">
            Transform Your Automation System With <span className="text-primary">LIBVIRTUUA</span>
          </h2>
          <p className="lead text-white fw-semibold px-4 py-3 d-inline-block mt-3 shadow-sm"  style={{backgroundColor: "#00DBC2"}}>
           Explore a world of knowledge with our library discovery platform – search, discover, and access resources effortlessly. 
         </p>
       </div>
      </div>
    </div>
  );
}
