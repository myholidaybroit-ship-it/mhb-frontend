"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Moments.module.css";

const SLOT_CLASS = [
  "slot1",
  "slot2",
  "slot3",
  "slot4",
  "slot5",
  "slot6",
  "slot7",
];

const PER_SLIDE = SLOT_CLASS.length;

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
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

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
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

export default function Moments({ data }) {
  const SLIDES = chunk(data?.items || [], PER_SLIDE);
  const [slide, setSlide] = useState(0);
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
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

  function prev() {
    setSlide((s) => Math.max(0, s - 1));
  }

  function next() {
    setSlide((s) => Math.min(SLIDES.length - 1, s + 1));
  }

  return (
    <section className={styles.section} id="moments">
      <div className={styles.container}>
        <div className={styles.head}>
          <h2 className={styles.heading}>
            {data?.title ? (
              data.title
            ) : (
              <>
                Read the stories, then{" "}
                <span className={styles.headingAccent}>go for it</span>
              </>
            )}
          </h2>
          <div className={styles.controls}>
            <div className={styles.arrows}>
              <button
                type="button"
                className={styles.arrowBtn}
                onClick={prev}
                disabled={slide === 0}
                aria-label="Previous"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                className={styles.arrowBtn}
                onClick={next}
                disabled={slide === SLIDES.length - 1}
                aria-label="Next"
              >
                <ChevronRight />
              </button>
            </div>
            <button type="button" className={styles.seeMore}>
              See more
            </button>
          </div>
        </div>

        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{ transform: `translate3d(-${slide * 100}%, 0, 0)` }}
          >
            {SLIDES.map((cards, slideIdx) => (
              <div key={slideIdx} className={styles.slide} aria-hidden={slide !== slideIdx}>
                {cards.map((c, idx) => (
                  <button
                    type="button"
                    key={c.id}
                    className={`${styles.card} ${styles[SLOT_CLASS[idx]]}`}
                    onClick={() => setActive(c)}
                    aria-label={`Open ${c.name}'s postcard`}
                  >
                    <Image
                      src={c.image}
                      alt={c.caption}
                      fill
                      sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 20vw"
                      className={styles.cardImage}
                    />
                    <div className={styles.overlayTop}>
                      <span className={styles.avatar}>{c.initial}</span>
                      <span className={styles.avatarName}>{c.name}</span>
                    </div>
                    <div className={styles.overlayBottom}>
                      <span className={styles.caption}>{c.caption}</span>
                      <span className={styles.arrowChip} aria-hidden>
                        <ArrowIcon />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.dots} role="tablist" aria-label="Slide navigation">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={slide === i}
              aria-label={`Go to slide ${i + 1}`}
              className={`${styles.dot} ${slide === i ? styles.dotActive : ""}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </div>

      {active && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name}'s review`}
        >
          <button
            type="button"
            className={styles.lightboxBack}
            onClick={() => setActive(null)}
            aria-label="Back"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back
          </button>
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <XIcon />
          </button>
          <div className={styles.lightboxBody}>
            <div className={styles.lightboxImageWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.image}
                alt={active.caption}
                className={styles.lightboxImage}
              />
            </div>
            <aside className={styles.lightboxReview}>
              <div className={styles.reviewHead}>
                <span className={styles.reviewAvatar}>{active.initial}</span>
                <div className={styles.reviewWho}>
                  <span className={styles.reviewName}>{active.name}</span>
                  <span className={styles.reviewCity}>
                    From {active.city}
                  </span>
                </div>
              </div>

              <div className={styles.reviewRating}>
                <span className={styles.stars} aria-hidden>
                  {"★".repeat(active.rating)}
                </span>
                <span className={styles.ratingValue}>
                  {active.rating}.0
                </span>
                <span className={styles.ratingMeta}>· Verified trip</span>
              </div>

              <div className={styles.reviewMeta}>
                <span className={styles.metaPill}>{active.destination}</span>
                <span className={styles.metaPill}>{active.duration}</span>
              </div>

              <h3 className={styles.reviewTitle}>{active.title}</h3>
              <p className={styles.reviewBody}>{active.review}</p>

              <div className={styles.reviewFooter}>
                Traveled with MyHolidayBro · {active.date}
              </div>
            </aside>
          </div>
        </div>
      )}
    </section>
  );
}
