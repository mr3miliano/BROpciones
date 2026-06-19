"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import styles from "./PropertyGallery.module.css";

interface PropertyGalleryProps {
  images: string[];
  title: string;
  statusLabel: string;
  typeLabel: string;
  status: "sale" | "rent";
}

export default function PropertyGallery({
  images,
  title,
  statusLabel,
  typeLabel,
  status,
}: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const isVideoFile = (url: string) => {
    const videoExtensions = [".mp4", ".mov", ".webm", ".avi", ".ogv", ".m4v"];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext)) || url.toLowerCase().includes("video-") || url.toLowerCase().includes("file-");
  };

  const activeMedia = images[activeIndex] || "/placeholder-property.jpg";
  const activeIsVideo = isVideoFile(activeMedia);

  return (
    <div className={styles.container}>
      {/* Visor Principal */}
      <div className={styles.viewer}>
        {activeIsVideo ? (
          <video
            src={activeMedia}
            controls
            autoPlay
            muted
            loop
            className={`${styles.media} ${styles.videoMedia}`}
          />
        ) : (
          <img
            src={activeMedia}
            alt={title}
            className={styles.media}
          />
        )}

        {/* Badges */}
        <div className={styles.badgeContainer}>
          <span
            className={`${styles.statusBadge} ${status === "sale" ? styles.statusSale : styles.statusRent}`}
          >
            En {statusLabel}
          </span>
          <span className={styles.typeBadge}>
            {typeLabel}
          </span>
        </div>
      </div>

      {/* Miniaturas (Thumbs) */}
      {images.length > 1 && (
        <div className={styles.thumbs}>
          {images.map((mediaUrl, idx) => {
            const isVideo = isVideoFile(mediaUrl);
            const isActive = idx === activeIndex;

            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`${styles.thumbBtn} ${isActive ? styles.thumbBtnActive : ""}`}
              >
                {isVideo ? (
                  <div className={styles.thumbMedia}>
                    <video src={mediaUrl} className={styles.thumbMedia} muted />
                    <div className={styles.videoThumbOverlay}>
                      <Play size={16} className={styles.playIcon} />
                    </div>
                  </div>
                ) : (
                  <img
                    src={mediaUrl}
                    alt={`${title} miniatura ${idx + 1}`}
                    className={styles.thumbMedia}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
