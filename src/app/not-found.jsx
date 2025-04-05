
export default function NotFound() {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center p-4">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-4">Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="btn btn-primary mt-3">Back To Home</a>
      </div>
    );
  }
  