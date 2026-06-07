"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./MomentsPage.module.css";

/* ─────────── Icons ─────────── */
const I = {
  star: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="#f59e0b" aria-hidden>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  pin: (s = 12) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  cal: (s = 12) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  clock: (s = 12) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  quote: (s = 24) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M9 7H5a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h2v-2a4 4 0 0 0-4-4V8a1 1 0 0 1 1-1h5v0zm12 0h-4a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h2v-2a4 4 0 0 0-4-4V8a1 1 0 0 1 1-1h5v0z" />
    </svg>
  ),
  close: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  arrowL: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m15 18-6-6 6-6" />
    </svg>
  ),
  arrowR: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  play: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
};

// Cycle through aspect ratios so the masonry feels organic.
const ASPECTS = ["4 / 5", "3 / 4", "1 / 1", "5 / 6", "4 / 5", "3 / 4"];

export default function MomentsPage({ moments = [], videos = [] }) {
  const MOMENTS = moments;
  // A few photos to feather across the hero strip as a moving backdrop.
  const HERO_STRIP = MOMENTS.slice(0, 12);
  const [active, setActive] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const videoScrollerRef = useRef(null);

  function scrollVideos(dir) {
    const el = videoScrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: "smooth" });
  }

  /* ─── Photo lightbox: keyboard + scroll lock ─── */
  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(() => {
    setActive((m) => {
      if (!m) return m;
      const i = MOMENTS.findIndex((x) => x.id === m.id);
      return MOMENTS[(i + MOMENTS.length - 1) % MOMENTS.length];
    });
  }, [MOMENTS]);
  const next = useCallback(() => {
    setActive((m) => {
      if (!m) return m;
      const i = MOMENTS.findIndex((x) => x.id === m.id);
      return MOMENTS[(i + 1) % MOMENTS.length];
    });
  }, [MOMENTS]);

  useEffect(() => {
    if (!active && !activeVideo) return;
    function onKey(e) {
      if (e.key === "Escape") {
        if (activeVideo) setActiveVideo(null);
        else close();
      } else if (active && e.key === "ArrowLeft") prev();
      else if (active && e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, activeVideo, close, prev, next]);

  return (
    <main className={styles.page}>
      {/* ─── Hero band with animated film-strip ─── */}
      <section className={styles.headWrap}>
        <div className={styles.stripWrap} aria-hidden>
          <div className={styles.strip}>
            {[...HERO_STRIP, ...HERO_STRIP].map((m, i) => (
              <span key={`s-${i}`} className={styles.stripTile}>
                <Image src={m.image} alt="" fill sizes="160px" className={styles.stripImg} />
              </span>
            ))}
          </div>
          <div className={styles.stripFade} />
        </div>

        <div className={styles.container}>
          <div className={styles.headRow}>
            <div className={styles.headText}>
              <span className={styles.kicker}>Moments · postcards from travellers</span>
              <h1 className={styles.heading}>
                Real trips. <span className={styles.headingAccent}>Real photos.</span>
                <br />
                <span className={styles.headingScript}>Real reviews.</span>
              </h1>
              <p className={styles.sub}>
                Hundreds of holidays. Zero scripted reviews. Tap a postcard for the full story —
                or hit play on a traveller's video below.
              </p>
              <div className={styles.headCtas}>
                <a href="#videos" className={styles.ctaPrimary}>
                  <span className={styles.ctaPlay} aria-hidden>{I.play(14)}</span>
                  Watch testimonials
                </a>
                <a href="#gallery" className={styles.ctaGhost}>
                  Browse the gallery
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Testimonial videos ─── */}
      <section className={styles.videosWrap} id="videos">
        <div className={styles.container}>
          <div className={styles.videosHead}>
            <span className={styles.kicker}>60-second stories</span>
            <h2 className={styles.sectionHeading}>
              Hear it from the <span className={styles.headingAccent}>travellers themselves</span>
            </h2>
            <p className={styles.sectionSub}>
              Unfiltered video reviews — straight from people who travelled with us last month.
            </p>
          </div>

          <div className={styles.videoRail}>
            <button
              type="button"
              className={`${styles.railArrow} ${styles.railArrowLeft}`}
              onClick={() => scrollVideos(-1)}
              aria-label="Scroll videos left"
            >
              {I.arrowL(18)}
            </button>
            <button
              type="button"
              className={`${styles.railArrow} ${styles.railArrowRight}`}
              onClick={() => scrollVideos(1)}
              aria-label="Scroll videos right"
            >
              {I.arrowR(18)}
            </button>
            <div className={styles.videoScroller} ref={videoScrollerRef}>
            {videos.map((v, i) => (
              <button
                key={v.id}
                type="button"
                className={styles.videoCard}
                onClick={() => setActiveVideo(v)}
                style={{ animationDelay: `${i * 60}ms` }}
                aria-label={`Play ${v.name}'s testimonial`}
              >
                <video
                  src={v.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className={styles.videoEl}
                />
                <span className={styles.videoGradient} aria-hidden />
                <span className={styles.videoPlay} aria-hidden>{I.play(20)}</span>
                <div className={styles.videoCaption}>
                  <span className={styles.videoQuote}>"{v.quote}"</span>
                  <div className={styles.videoMeta}>
                    <strong>{v.name}</strong>
                    <span className={styles.videoDest}>
                      {I.pin(10)} {v.dest}
                    </span>
                  </div>
                </div>
              </button>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Masonry grid ─── */}
      <section className={styles.gridWrap} id="gallery">
        <div className={styles.container}>
          <div className={styles.galleryHead}>
            <span className={styles.kicker}>The full gallery</span>
            <h2 className={styles.sectionHeading}>
              Every recent <span className={styles.headingAccent}>postcard</span>.
            </h2>
            <p className={styles.sectionSub}>
              {MOMENTS.length} stories and counting. Tap any moment to read the full review.
            </p>
          </div>

          <div className={styles.grid}>
            {MOMENTS.map((m, i) => (
              <button
                key={m.id}
                type="button"
                className={styles.card}
                onClick={() => setActive(m)}
                style={{
                  "--ar": ASPECTS[i % ASPECTS.length],
                  "--tilt": `${((i % 5) - 2) * 0.35}deg`,
                  animationDelay: `${i * 35}ms`,
                }}
              >
                <div className={styles.cardImg}>
                  <Image
                    src={m.image}
                    alt={`${m.name} in ${m.destination}`}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
                    className={styles.image}
                  />
                  <div className={styles.cardGradient} aria-hidden />
                  <span className={styles.cardDate}>
                    {I.cal(11)} {m.date}
                  </span>
                  <span className={styles.cardHoverCue} aria-hidden>
                    {I.quote(14)} Read story
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.author}>
                    <span className={styles.avatar} aria-hidden>{m.initial}</span>
                    <div className={styles.authorMeta}>
                      <strong>{m.name}</strong>
                      <span>{m.city}</span>
                    </div>
                    <span className={styles.rating}>
                      {Array.from({ length: m.rating }).map((_, k) => (
                        <span key={k}>{I.star(12)}</span>
                      ))}
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{m.title}</h3>
                  <span className={styles.cardDest}>
                    {I.pin(11)} {m.destination}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA strip ─── */}
      <section className={styles.ctaWrap}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaText}>
              <span className={styles.kicker}>Your turn</span>
              <h3 className={styles.ctaTitle}>
                The next postcard could be <span className={styles.headingAccent}>yours</span>.
              </h3>
              <p className={styles.ctaSub}>
                Tell us where you'd love to go — we'll build a plan in under 24 hours.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <a href="/#packages" className={styles.ctaPrimary}>Start planning</a>
              <a href="https://wa.me/" target="_blank" rel="noreferrer" className={styles.ctaGhost}>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Photo lightbox ─── */}
      {active && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={`Moment by ${active.name}`}
          onClick={close}
        >
          <button
            type="button"
            className={`${styles.modalBtn} ${styles.modalClose}`}
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Close"
          >
            {I.close()}
          </button>
          <button
            type="button"
            className={`${styles.modalBtn} ${styles.modalPrev}`}
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
          >
            {I.arrowL()}
          </button>
          <button
            type="button"
            className={`${styles.modalBtn} ${styles.modalNext}`}
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
          >
            {I.arrowR()}
          </button>

          <article className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalImg}>
              <Image
                src={active.image}
                alt={active.name}
                fill
                sizes="(max-width: 900px) 100vw, 540px"
                className={styles.image}
                priority
              />
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalAuthor}>
                <span className={styles.avatarLg} aria-hidden>{active.initial}</span>
                <div>
                  <strong>{active.name}</strong>
                  <span>{active.city}</span>
                </div>
                <span className={styles.rating}>
                  {Array.from({ length: active.rating }).map((_, k) => (
                    <span key={k}>{I.star(14)}</span>
                  ))}
                </span>
              </div>

              <span className={styles.modalQuote} aria-hidden>{I.quote(36)}</span>
              <h2 className={styles.modalTitle}>{active.title}</h2>
              <p className={styles.modalReview}>{active.review}</p>

              <div className={styles.modalMeta}>
                <span className={styles.modalMetaCell}>{I.pin(13)} {active.destination}</span>
                <span className={styles.modalMetaCell}>{I.clock(13)} {active.duration}</span>
                <span className={styles.modalMetaCell}>{I.cal(13)} {active.date}</span>
              </div>
              <span className={styles.modalCaption}>"{active.caption}"</span>
            </div>
          </article>
        </div>
      )}

      {/* ─── Video lightbox ─── */}
      {activeVideo && (
        <div
          className={styles.videoModal}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeVideo.name}'s video testimonial`}
          onClick={() => setActiveVideo(null)}
        >
          <button
            type="button"
            className={`${styles.modalBtn} ${styles.modalClose}`}
            onClick={(e) => { e.stopPropagation(); setActiveVideo(null); }}
            aria-label="Close"
          >
            {I.close()}
          </button>
          <div className={styles.videoModalInner} onClick={(e) => e.stopPropagation()}>
            <video
              key={activeVideo.id}
              src={activeVideo.video}
              autoPlay
              controls
              playsInline
              className={styles.videoModalEl}
            />
            <div className={styles.videoModalCaption}>
              <div>
                <strong>{activeVideo.name}</strong>
                <span className={styles.videoDest}>
                  {I.pin(11)} {activeVideo.dest}
                </span>
              </div>
              <span className={styles.videoModalQuote}>"{activeVideo.quote}"</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
