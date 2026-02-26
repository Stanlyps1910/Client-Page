import React, { useState, useEffect } from "react";

// CRITICAL: Ensure CLOUD_NAME is correct
const CLOUD_NAME = "dvgftu6wm";
const CLIENT_TAG = "cclient";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (CLOUD_NAME === "YOUR_CLOUD_NAME_HERE") {
        setLoading(false);
        return;
      }

      // Fetch both images and videos tagged with CLIENT_TAG
      const fetchByTag = async (resourceType) => {
        try {
          const response = await fetch(
            `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/list/${CLIENT_TAG}.json`
          );
          console.log(`Cloudinary ${resourceType} Fetch Status:`, response.status);
          if (response.ok) {
            const json = await response.json();
            console.log(`Cloudinary ${resourceType} JSON resources:`, json.resources);
            return json.resources.map(res => {
              const type = res.type || "upload";
              // Cloudinary URL format: res.cloudinary.com/<cloud_name>/<resource_type>/<type>/v<version>/<public_id>.<format>
              const encodedPublicId = res.public_id.split('/').map(encodeURIComponent).join('/');
              const url = `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/${type}/v${res.version}/${encodedPublicId}.${res.format}`;
              return {
                type: resourceType,
                src: url,
                publicId: res.public_id
              };
            });
          }
        } catch (err) {
          console.error(`Error fetching ${resourceType}:`, err);
        }
        return [];
      };

      try {
        const [imgs, vids] = await Promise.all([
          fetchByTag("image"),
          fetchByTag("video")
        ]);

        const fetchedImages = [...imgs, ...vids];

        if (fetchedImages.length > 0) {
          console.log("Total resources found:", fetchedImages.length);
          // Randomly shuffle images
          for (let i = fetchedImages.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [fetchedImages[i], fetchedImages[j]] = [fetchedImages[j], fetchedImages[i]];
          }
          setImages(fetchedImages);
        } else {
          console.warn("No resources found for tag:", CLIENT_TAG);
        }
      } catch (error) {
        console.error("Critical Error during fetching:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const downloadMedia = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loader-content">
          <p>Curating your moments...</p>
          <div className="shimmer-bar"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <h2>Our Gallery</h2>
        <div className="header-line"></div>
        <p>A curated collection of captured emotions and timeless stories.</p>
      </header>

      <main className="gallery-grid-wrapper">
        {images.length > 0 ? (
          <div className="gallery-mosaic">
            {images.map((item, index) => (
              <div
                key={index}
                className={`media-tile tile-size-${(index % 5) + 1}`}
                onClick={() => setSelectedMedia(item)}
              >
                {item.type === "image" ? (
                  <img src={item.src} alt="Gallery item" loading="lazy" />
                ) : (
                  <video src={item.src} muted playsInline autoPlay loop />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No photos tagged with <code>{CLIENT_TAG}</code> found in Cloudinary.</p>
          </div>
        )}
      </main>

      {selectedMedia && (
        <ImageModal
          media={selectedMedia}
          onClose={() => setSelectedMedia(null)}
          onDownload={downloadMedia}
        />
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
                .gallery-container {
                    padding: 80px 0;
                    background: #fff;
                    min-height: 100vh;
                }

                .gallery-header {
                    text-align: center;
                    margin-bottom: 60px;
                    padding: 0 24px;
                }

                .gallery-header h2 {
                    font-size: 3rem;
                    font-family: "Playfair Display", serif;
                    text-transform: uppercase;
                    letter-spacing: 8px;
                    margin-bottom: 16px;
                }

                .header-line {
                    height: 2px;
                    width: 60px;
                    background: #000;
                    margin: 0 auto 24px;
                }

                .gallery-header p {
                    font-family: "Inter", sans-serif;
                    color: #666;
                    font-style: italic;
                    letter-spacing: 1px;
                }

                .gallery-grid-wrapper {
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 0 16px;
                }

                .gallery-mosaic {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    grid-auto-rows: 280px;
                    grid-auto-flow: dense;
                    gap: 12px;
                }

                .media-tile {
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;
                    background: #f8f8f8;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .media-tile:hover {
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    z-index: 10;
                }

                /* Premium Masonry-like sizing */
                .tile-size-1 { grid-column: span 1; grid-row: span 1; }
                .tile-size-2 { grid-column: span 2; grid-row: span 2; }
                .tile-size-3 { grid-column: span 1; grid-row: span 2; }
                .tile-size-4 { grid-column: span 2; grid-row: span 1; }
                .tile-size-5 { grid-column: span 1; grid-row: span 1; }

                .media-tile img,
                .media-tile video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    filter: grayscale(10%);
                    transition: all 0.6s ease;
                }

                .media-tile:hover img,
                .media-tile:hover video {
                    transform: scale(1.08);
                    filter: grayscale(0%);
                }

                .media-tile::after {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.2);
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .media-tile:hover::after {
                    opacity: 1;
                }

                .modal-backdrop {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(255,255,255,0.98);
                    z-index: 2000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    backdrop-filter: blur(10px);
                }

                .modal-content {
                    position: relative;
                    max-width: 95%;
                    max-height: 95%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .modal-media {
                    max-width: 100%;
                    max-height: 80vh;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.15);
                }

                .modal-actions {
                    margin-top: 32px;
                    display: flex;
                    gap: 30px;
                }

                .modal-btn {
                    background: #000;
                    color: #fff;
                    border: none;
                    padding: 14px 40px;
                    cursor: pointer;
                    font-family: "Inter", sans-serif;
                    font-size: 0.75rem;
                    font-weight: 600;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    transition: all 0.3s;
                }

                .modal-btn:hover {
                    background: #333;
                    transform: translateY(-2px);
                }

                .close-modal {
                    position: absolute;
                    top: -60px;
                    right: 0;
                    color: #000;
                    font-size: 3rem;
                    cursor: pointer;
                    background: none;
                    border: none;
                    font-weight: 200;
                }

                .loading-state {
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: "Playfair Display", serif;
                }

                .loader-content {
                    text-align: center;
                }

                .shimmer-bar {
                    width: 200px;
                    height: 2px;
                    background: #eee;
                    margin: 20px auto;
                    position: relative;
                    overflow: hidden;
                }

                .shimmer-bar::after {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%;
                    width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, #000, transparent);
                    animation: shimmer 2s infinite;
                }

                @keyframes shimmer {
                    100% { left: 100%; }
                }

                .empty-state {
                    text-align: center;
                    padding: 100px 0;
                    color: #999;
                    font-family: "Inter", sans-serif;
                }

                @media (max-width: 768px) {
                    .gallery-header h2 { font-size: 1.8rem; letter-spacing: 4px; }
                    .gallery-mosaic {
                        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                        grid-auto-rows: 140px;
                    }
                    .modal-actions { flex-direction: column; gap: 10px; width: 100%; }
                    .modal-btn { width: 100%; }
                }
            `}} />
    </div>
  );
}

function ImageModal({ media, onClose, onDownload }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>&times;</button>
        {media.type === "image" ? (
          <img src={media.src.replace('/upload/', '/upload/q_auto,f_auto/')} className="modal-media" alt="Full view" />
        ) : (
          <video src={media.src} controls autoPlay className="modal-media" />
        )}
        <div className="modal-actions">
          <button
            className="modal-btn"
            onClick={() => onDownload(media.src, `${media.publicId}.${media.src.split('.').pop()}`)}
          >
            Save Memory
          </button>
          <button className="modal-btn" style={{ background: '#eee', color: '#000' }} onClick={onClose}>Back</button>
        </div>
      </div>
    </div>
  );
}
