"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClientLayoutWrapper({ children }) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}

function Header() {
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    return (
        <header className="header">
            <div className="header-flex">
                <Link href="/">
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
                    <Link href="/" className={isActive("/") ? "active" : ""}>
                        Home
                    </Link>
                    <Link href="/gallery" className={isActive("/gallery") ? "active" : ""}>
                        Gallery
                    </Link>
                    <Link href="/payment" className={isActive("/payment") ? "active" : ""}>
                        Payment
                    </Link>
                    <Link href="/chats" className={isActive("/chats") ? "active" : ""}>
                        Chats
                    </Link>
                </nav>
            </div>

            <style jsx>{`
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

        .nav :global(a) {
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

        .nav :global(a:hover),
        .nav :global(a.active) {
          opacity: 0.6;
        }
      `}</style>
        </header>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-flex">
                <div className="footer-contact">
                    <p>WhatsApp: 91106 03953</p>
                    <span className="separator">|</span>
                    <a
                        href="https://www.instagram.com/teamalpha_crew/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                    >
                        Instagram: @teamalpha_crew
                    </a>
                </div>
            </div>

            <style jsx>{`
        .footer {
          background: #1c1c1c;
          color: #b8b5b0;
          padding: 24px;
        }

        .footer-flex {
          display: flex;
          justify-content: center;
          align-items: center;
          max-width: 1200px;
          margin: auto;
        }

        .footer-contact {
          display: flex;
          gap: 15px;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          font-weight: 300;
        }

        .social-link {
          color: #b8b5b0;
          text-decoration: none;
          transition: color 0.3s;
        }

        .social-link:hover {
          color: #f7f5f2;
        }

        .separator {
          color: #555;
        }
      `}</style>
        </footer>
    );
}
