import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    const pathname = location.pathname;

    const isActive = (path) => pathname === path;

    return (
        <header className="header">
            <div className="header-flex">
                <Link to="/">
                    <div
                        className="brand-container"
                        style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}
                    >
                        <img
                            src="/logo_new.png"
                            alt="Team Alpha"
                            style={{ height: "50px" }}
                        />
                        <span
                            style={{
                                fontFamily: "Playfair Display, serif",
                                fontWeight: "700",
                                fontSize: "1.5rem",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                            }}
                        >
                            TEAM ALPHA
                        </span>
                    </div>
                </Link>

                <nav className="nav">
                    <Link to="/" className={isActive("/") ? "active" : ""}>
                        Home
                    </Link>
                    <Link to="/gallery" className={isActive("/gallery") ? "active" : ""}>
                        Gallery
                    </Link>
                    <Link to="/chats" className={isActive("/chats") ? "active" : ""}>
                        Chats
                    </Link>

                    <div className="social-nav">
                        <a
                            href="https://www.instagram.com/teamalpha_crew/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="nav-icon"
                        >
                            <img src="/instagram.png" alt="Instagram" style={{ height: "24px", width: "24px", objectFit: "contain" }} />
                        </a>
                        <a
                            href="https://wa.me/919110603953"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp"
                            className="nav-icon"
                        >
                            <img src="/whatsapp.png" alt="WhatsApp" style={{ height: "24px", width: "24px", objectFit: "contain" }} />
                        </a>
                    </div>
                </nav>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .header {
          background: #f7f5f2;
          box-shadow: 0 2px 10px rgb(0 0 0 / 0.05);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          max-width: 1200px;
          margin: auto;
        }

        .nav {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .nav a {
          color: #1c1c1c;
          text-decoration: none;
          font-weight: 500;
          font-family: "Inter", sans-serif;
          font-size: 16px;
          padding: 6px 12px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .nav a:hover,
        .nav a.active {
          opacity: 0.6;
        }

        .social-nav {
          display: flex;
          gap: 16px;
          margin-left: 12px;
          border-left: 1px solid #ddd;
          padding-left: 20px;
        }

        .nav-icon {
          color: #1c1c1c;
          transition: transform 0.3s, opacity 0.3s;
          display: flex;
          align-items: center;
        }

        .nav-icon:hover {
          transform: translateY(-2px);
          opacity: 0.7;
        }
      `}} />
        </header>
    );
}
