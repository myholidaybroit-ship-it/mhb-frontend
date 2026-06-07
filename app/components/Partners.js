"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./Partners.module.css";

const PER_SLIDE = 4;

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

export default function Partners({ data }) {
  const slides = chunk(data?.items || [], PER_SLIDE);
  const [slide, setSlide] = useState(0);

  function prev() {
    setSlide((s) => Math.max(0, s - 1));
  }

  function next() {
    setSlide((s) => Math.min(slides.length - 1, s + 1));
  }

  return (
    <section className={styles.section} id="partners">
      <div className={styles.container}>
        <div className={styles.head}>
          <h2 className={styles.heading}>
            {data?.title ? (
              data.title
            ) : (
              <>
                Tourism Board{" "}
                <span className={styles.headingAccent}>Partners</span>
              </>
            )}
          </h2>
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
              disabled={slide === slides.length - 1}
              aria-label="Next"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{ transform: `translate3d(-${slide * 100}%, 0, 0)` }}
          >
            {slides.map((cards, slideIdx) => (
              <div
                key={slideIdx}
                className={styles.slide}
                aria-hidden={slide !== slideIdx}
              >
                {cards.map((c) => (
                  <div key={c.id} className={styles.card} title={c.name}>
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 25vw"
                      className={styles.bgImage}
                    />
                    <div className={styles.overlay} aria-hidden />
                    <div className={styles.logoWrap}>
                      <Image
                        src={c.logo}
                        alt={c.name}
                        fill
                        sizes="(max-width: 900px) 30vw, 16vw"
                        className={styles.logo}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.dots} role="tablist">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={slide === i}
              aria-label={`Slide ${i + 1}`}
              className={`${styles.dot} ${slide === i ? styles.dotActive : ""}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
