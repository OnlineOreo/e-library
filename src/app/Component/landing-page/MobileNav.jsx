import { useState } from "react";
import Link from "next/link";

const MobileNav = ({ menuOpen, toggleMenu }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <div className={`offcanvas offcanvas-start ${menuOpen ? "show" : ""}`} tabIndex="-1">
      <div className="offcanvas-header bg-primary text-white">
        <h5 className="offcanvas-title">Menu</h5>
        <button type="button" className="btn-close btn-close-white" onClick={toggleMenu}></button>
      </div>
      <div className="offcanvas-body p-3">
        <ul className="list-unstyled">
          <li>
            <Link href="/" className="nav-link px-3 py-2 d-block text-dark fw-semibold">
              Home
            </Link>
          </li>
          <li>
            <button 
              className="btn w-100 text-start px-3 py-2 d-block fw-semibold text-dark" 
              onClick={() => toggleDropdown("resources")}
              style={{ background: "none", border: "none" }}
            >
              eResources
            </button>
            {activeDropdown === "resources" && (
              <ul className="list-unstyled ms-3">
                <li>
                  <Link href="/check-auth" className="nav-link px-3 py-1 d-block text-muted">
                    Academic Journals
                  </Link>
                </li>
                <li>
                  <Link href="/check-auth" className="nav-link px-3 py-1 d-block text-muted">
                    Science Journals
                  </Link>
                </li>
                <li>
                  <Link href="/mphil-theses" className="nav-link px-3 py-1 d-block text-muted">
                    MPhil Theses
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link href="/about-library" className="nav-link px-3 py-2 d-block text-dark fw-semibold">
              About Library
            </Link>
          </li>
          <li>
            <button 
              className="btn w-100 text-start px-3 py-2 d-block fw-semibold text-dark" 
              onClick={() => toggleDropdown("account")}
              style={{ background: "none", border: "none" }}
            >
              Account
            </button>
            {activeDropdown === "account" && (
              <ul className="list-unstyled ms-3">
                <li>
                  <Link href="/profile" className="nav-link px-3 py-1 d-block text-muted">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/user_saved_articles" className="nav-link px-3 py-1 d-block text-muted">
                    Saved Articles
                  </Link>
                </li>
                <li>
                  <Link href="/search_history" className="nav-link px-3 py-1 d-block text-muted">
                    Search History
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileNav;
