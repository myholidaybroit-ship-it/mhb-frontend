"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Stories.module.css";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" width="22" height="22" aria-hidden>
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#fbbf24" aria-hidden>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default function Stories({ data }) {
  const TRAVELLERS = data?.items || [];
  const [active, setActive] = useState(null);
  const scrollerRef = useRef(null);

  function scrollBy(dir) {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: dir * 280, behavior: "smooth" });
  }

  useEffect(() => {
    if (active === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEsc = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onEsc);
    };
  }, [active]);

  const activeStory = active !== null ? TRAVELLERS[active] : null;

  return (
    <section className={styles.section} id="stories">
      <div className={styles.container}>
        <div className={styles.head}>
          <h2 className={styles.heading}>
            {data?.title || "Straight from our travellers"}{" "}
            <span aria-hidden>&#10084;&#65039;</span>
          </h2>
          <div className={styles.rating}>
            <GoogleIcon />
            <span className={styles.ratingText}>
              <span className={styles.ratingScore}>
                {data?.score || ""}<span className={styles.ratingSub}>/5</span>
                <StarIcon />
              </span>
              <span className={styles.ratingCount}>{data?.ratingText || "1,000 reviews"}</span>
            </span>
          </div>
        </div>

        <div className={styles.carouselWrap}>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navLeft}`}
            onClick={() => scrollBy(-1)}
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navRight}`}
            onClick={() => scrollBy(1)}
            aria-label="Next"
          >
            <ChevronRight />
          </button>

          <div className={styles.scroller} ref={scrollerRef}>
            {TRAVELLERS.map((t, idx) => (
              <button
                key={t.id}
                type="button"
                className={styles.card}
                onClick={() => setActive(idx)}
                aria-label={`Play ${t.name} story`}
              >
                <div className={styles.videoWrap}>
                  <video
                    src={t.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className={styles.video}
                  />
                  <span className={styles.playOverlay} aria-hidden>
                    <PlayIcon />
                  </span>
                </div>
                <span className={styles.cardName}>{t.name}</span>
                <span className={styles.destPill}>{t.dest}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeStory && (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeStory.name} story`}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className={styles.modalClose}
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <XIcon />
          </button>
          <div
            className={styles.modalInner}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={activeStory.id}
              src={activeStory.video}
              controls
              autoPlay
              loop
              playsInline
              className={styles.modalVideo}
            />
            <div className={styles.modalCaption}>
              <span className={styles.modalName}>{activeStory.name}</span>
              <span className={styles.destPill}>{activeStory.dest}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
