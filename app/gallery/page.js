"use client";

import React from "react";

export default function GalleryPage() {
    return (
        <div style={{ padding: "40px 0" }}>
            <GallerySection
                title="Engagement"
                link="https://drive.google.com/drive/folders/1VjaFU7u4HEiiHNbpIcHHxHNHzdhfjErZ"
                media={[
                    { type: "image", src: "https://i.pinimg.com/1200x/0e/0d/ad/0e0dad713eaab8331b4d15188825dc14.jpg" },
                    { type: "image", src: "https://i.pinimg.com/736x/18/e2/45/18e24560e26200f541d47ada4cc0c9ff.jpg" },
                    { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
                    { type: "image", src: "https://i.pinimg.com/736x/76/65/58/766558dfb078e2a0b22dee1eb483a000.jpg" },
                    { type: "image", src: "https://i.pinimg.com/736x/60/e7/49/60e749b3314f49de705f84695dcc5ba5.jpg" },
                ]}
            />

            <GallerySection
                title="Wedding"
                link="https://drive.google.com/drive/folders/1-2Tc-9hUT3xun3lpy39HZBvQ4gR9YDYC"
                media={[
                    { type: "image", src: "https://i.pinimg.com/736x/cc/ad/32/ccad32362b224d1351d2063ee1fa224d.jpg" },
                    { type: "video", src: "https://www.w3schools.com/html/movie.mp4" },
                    { type: "image", src: "https://i.pinimg.com/736x/f3/95/0a/f3950a4222012460380c254cb73aab82.jpg" },
                    { type: "image", src: "https://i.pinimg.com/1200x/70/2e/78/702e78a155548d92d4811aa1bc66effb.jpg" },
                ]}
            />

            <GallerySection
                title="Pre-Wedding"
                link="https://drive.google.com/drive/folders/1ckfwHNGIFLIeGEx1nzLzwW1d6bQ5tNUJ"
                media={[
                    { type: "image", src: "https://i.pinimg.com/1200x/04/46/8a/04468a02cf5be2475e5776df455aa64e.jpg" },
                    { type: "image", src: "https://i.pinimg.com/736x/50/e9/1e/50e91ee155917b1f0855cdc0e1b92707.jpg" },
                    { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
                ]}
            />

            <style jsx>{`
        .gallery-section {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 48px;
          padding: 80px 24px;
          max-width: 1200px;
          margin: auto;
          align-items: center;
        }

        :global(.gallery-text h2) {
          font-size: 2.6rem;
          margin-bottom: 16px;
        }

        .gallery-text p {
          color: #1c1c1c;
          max-width: 420px;
          margin-bottom: 24px;
        }

        .explore-btn {
          background: #1c1c1c;
          color: #f7f5f2;
          border: none;
          padding: 14px 32px;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
        }

        .gallery-mosaic {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 140px;
          gap: 12px;
          border-radius: 16px;
          overflow: hidden;
        }

        .media-tile {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
        }

        .media-tile:nth-child(1) {
          grid-row: span 2;
        }

        .media-tile:nth-child(3) {
          grid-column: span 2;
        }

        .media-tile img,
        .media-tile video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 900px) {
          .gallery-section {
            grid-template-columns: 1fr;
          }

          .gallery-mosaic {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
        </div>
    );
}

function GallerySection({ title, media, link }) {
    return (
        <section className="gallery-section">
            <div className="gallery-text">
                <h2>{title}</h2>
                <p>
                    A cinematic blend of moments, emotions, and motion —
                    curated beautifully in an immersive gallery experience.
                </p>
                <button className="explore-btn" onClick={() => window.open(link, "_blank")}>
                    Explore {title}
                </button>
            </div>

            <div className="gallery-mosaic">
                {media.map((item, index) => (
                    <div
                        key={index}
                        className={`media-tile ${item.type === "video" ? "video" : ""}`}
                    >
                        {item.type === "image" ? (
                            <img src={item.src} alt={title} />
                        ) : (
                            <video src={item.src} autoPlay muted loop playsInline />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
