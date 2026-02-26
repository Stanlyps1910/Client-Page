"use client";

import React from "react";
import Link from "next/link";

export default function HomePage() {
    return (
        <main id="home">
            <Hero />
            <Testimonials />
            <CTA />

            <style jsx>{`
        .hero {
          height: 90vh;
          background: url("https://i.pinimg.com/1200x/06/5a/97/065a971bd2079220ac781b1bc4e956b8.jpg") center/cover no-repeat;
          display: flex;
          align-items: center;
          padding-left: 48px;
          color: #f7f5f2;
        }

        :global(.hero h2) {
          font-size: 3rem;
        }

        .primary-btn {
          background: #1c1c1c;
          color: #f7f5f2;
          padding: 14px 36px;
          border-radius: 4px;
          text-decoration: none;
          display: inline-block;
        }

        .testimonials {
          text-align: center;
          padding: 80px 24px;
        }

        .cta {
          background: #1c1c1c;
          color: #f7f5f2;
          padding: 80px 24px;
          text-align: center;
        }
      `}</style>
        </main>
    );
}

function Hero() {
    return (
        <section className="hero">
            <div className="hero-overlay">
                <h2>Luxury Wedding Photography</h2>
                <p>
                    Capturing emotions, moments, and timeless love stories
                    with elegance and authenticity.
                </p>
                <Link href="/gallery" className="primary-btn">
                    View Gallery
                </Link>
            </div>
        </section>
    );
}

function Testimonials() {
    return (
        <section className="testimonials">
            <h3>Real Stories. Real Emotions.</h3>
            <blockquote>
                "Team Alpha didn't just photograph our wedding, they told our story beautifully."
            </blockquote>
            <a href="#" className="video-link">Watch Video Testimonials</a>
        </section>
    );
}

function CTA() {
    return (
        <section id="contact" className="cta">
            <h3>Let's Tell Your Story</h3>
            <p>Limited bookings available for premium weddings.</p>
        </section>
    );
}
