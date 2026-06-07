"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Bookings.module.css";

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m6 9 6 6 6-6" />
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

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function Bookings({ data }) {
  const BOOKINGS = data?.items || [];
  const PRICE_RANGES = data?.priceRanges || [];
  const DESTINATIONS = [
    { id: "all", label: "All Destinations" },
    ...(data?.destinations || []),
  ];

  const [dest, setDest] = useState("all");
  const [price, setPrice] = useState("all");
  const [destOpen, setDestOpen] = useState(false);
  const dropdownRef = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDestOpen(false);
      }
    }
    function onEsc(e) {
      if (e.key === "Escape") setDestOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const filtered = useMemo(() => {
    return BOOKINGS.filter((b) => {
      const destMatch = dest === "all" || (b.dests || []).includes(dest);
      let priceMatch = true;
      if (price !== "all") {
        const range = PRICE_RANGES.find((p) => p.id === price);
        if (range) {
          const noUpperBound = range.max == null;
          priceMatch =
            b.priceNum >= range.min && (noUpperBound || b.priceNum < range.max);
        }
      }
      return destMatch && priceMatch;
    });
  }, [BOOKINGS, PRICE_RANGES, dest, price]);

  function scrollBy(dir) {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: dir * 380, behavior: "smooth" });
  }

  const selectedDest = DESTINATIONS.find((d) => d.id === dest) || DESTINATIONS[0];

  return (
    <section className={styles.section} id="bookings">
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.filterGroup}>
            <div ref={dropdownRef} className={styles.dropdownWrap}>
              <button
                type="button"
                className={styles.dropdownBtn}
                onClick={() => setDestOpen((v) => !v)}
                aria-expanded={destOpen}
                aria-haspopup="menu"
              >
                {selectedDest.label}
                <ChevronDown />
              </button>
              {destOpen && (
                <div className={styles.dropdownMenu} role="menu">
                  {DESTINATIONS.map((d) => {
                    const active = dest === d.id;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        role="menuitemradio"
                        aria-checked={active}
                        className={`${styles.dropdownItem} ${
                          active ? styles.dropdownItemActive : ""
                        }`}
                        onClick={() => {
                          setDest(d.id);
                          setDestOpen(false);
                        }}
                      >
                        <span
                          className={`${styles.radio} ${
                            active ? styles.radioActive : ""
                          }`}
                        />
                        <span>{d.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {PRICE_RANGES.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`${styles.pill} ${
                  price === p.id ? styles.pillActive : ""
                }`}
                onClick={() => setPrice(price === p.id ? "all" : p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className={styles.arrows}>
            <button
              type="button"
              className={styles.arrowBtn}
              aria-label="Previous"
              onClick={() => scrollBy(-1)}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className={styles.arrowBtn}
              aria-label="Next"
              onClick={() => scrollBy(1)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className={styles.mainGrid}>
          <div className={styles.headingCol}>
            <h2 className={styles.heading}>
              Just
              <br />
              <span className={styles.headingAccent}>booked</span>
              <br />
              this week
            </h2>
            <span className={styles.bookedPill}>
              <span className={styles.heart} aria-hidden>
                &#10084;
              </span>
              {BOOKINGS.length}+ trips booked this week
            </span>
          </div>

          <div className={styles.cardsScroll} ref={scrollerRef}>
            {filtered.map((b) => (
              <article key={b.id} className={styles.card}>
                <div className={styles.cardHead}>
                  <span className={styles.avatar}>{b.initial}</span>
                  <span className={styles.cardHeadText}>
                    <strong>
                      {b.name} from {b.city}
                    </strong>
                    <span className={styles.cardHeadDot}> &middot; </span>
                    <span className={styles.cardHeadAgo}>{b.timeAgo}</span>
                  </span>
                </div>
                <div className={styles.cardImageWrap}>
                  <Image
                    src={b.image}
                    alt={b.title}
                    fill
                    sizes="360px"
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{b.title}</h3>
                  <div className={styles.cardLoc}>
                    <PinIcon />
                    <span>{b.location}</span>
                  </div>
                  <span className={styles.tag}>{b.tag}</span>
                  <div className={styles.cardFooter}>
                    <div className={styles.priceWrap}>
                      <span className={styles.price}>{b.priceText}</span>
                      <span className={styles.priceSub}>
                        {b.nights} nights / person
                      </span>
                    </div>
                    <a href="/destinations" className={styles.viewBtn}>
                      View Details
                    </a>
                  </div>
                </div>
              </article>
            ))}
            {filtered.length === 0 && (
              <div className={styles.empty}>
                No itineraries match your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
