"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { img } from "../lib/img";
import styles from "./Hero.module.css";

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function Hero({ data, destinations = [] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const videoUrl = data?.videoUrl;
  const accent = data?.accentWord || "Holiday";
  const headline = data?.headline; // e.g. "Plan your next Holiday"
  const lede = data?.subheading || "Handpicked trips, ready when you are.";
  const placeholder = data?.searchPlaceholder || "Where do you want to go?";

  // Live results — filter the destinations list as the user types.
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return destinations
      .filter((d) =>
        `${d.name} ${d.country} ${d.tagline} ${d.region}`.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query, destinations]);

  // Close the results dropdown on outside click / Escape.
  useEffect(() => {
    function onDown(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    function onEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  function goToDestination(slug) {
    setOpen(false);
    router.push(`/destinations/${slug}`);
  }

  function submit(e) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/destinations?where=${encodeURIComponent(q)}` : "/destinations");
  }

  // Render the headline with the accent word highlighted; fall back to the
  // built-in two-line layout when the CMS has no headline.
  function renderHeadline() {
    if (!headline) {
      return (<>Plan your<br />next <span className={styles.accent}>Holiday</span>.</>);
    }
    if (accent && headline.includes(accent)) {
      const [before, after] = headline.split(accent);
      return (<>{before}<span className={styles.accent}>{accent}</span>{after}</>);
    }
    return headline;
  }

  return (
    <section className={styles.hero}>
      <video
        className={styles.video}
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className={styles.overlay} aria-hidden />

      <div className={styles.content}>
        <h1 className={styles.headline}>{renderHeadline()}</h1>

        <p className={styles.lede}>{lede}</p>

        <div className={styles.searchWrap} ref={wrapRef}>
          <form
            className={styles.searchBar}
            onSubmit={submit}
            role="search"
            aria-label="Search trips"
          >
            <span className={styles.searchIcon} aria-hidden>
              <SearchIcon />
            </span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder={placeholder}
              autoComplete="off"
              aria-label="Search trips and destinations"
              aria-expanded={open && matches.length > 0}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
            />
            <button type="submit" className={styles.searchBtn}>
              Search
            </button>
          </form>

          {open && query.trim() && (
            <div className={styles.results} role="listbox" aria-label="Search results">
              {matches.length > 0 ? (
                <>
                  {matches.map((d) => (
                    <button
                      key={d.slug}
                      type="button"
                      role="option"
                      className={styles.resultRow}
                      onClick={() => goToDestination(d.slug)}
                    >
                      <span className={styles.resultThumb}>
                        <Image
                          src={img(d.image || d.imageKey, 120, 120)}
                          alt={d.name}
                          fill
                          sizes="44px"
                        />
                      </span>
                      <span className={styles.resultText}>
                        <span className={styles.resultName}>{d.name}</span>
                        <span className={styles.resultMeta}>
                          <PinIcon /> {d.country}
                          {d.fromPrice ? ` · from ${d.fromPrice}` : ""}
                        </span>
                      </span>
                      {d.region && (
                        <span className={styles.resultRegion}>{d.region}</span>
                      )}
                    </button>
                  ))}
                  <button
                    type="button"
                    className={styles.resultsAll}
                    onClick={submit}
                  >
                    See all results for &ldquo;{query.trim()}&rdquo;
                  </button>
                </>
              ) : (
                <div className={styles.resultsEmpty}>
                  No trips match &ldquo;{query.trim()}&rdquo;.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
