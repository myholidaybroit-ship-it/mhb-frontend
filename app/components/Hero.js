"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./Hero.module.css";

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export default function Hero({ data }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const videoUrl = data?.videoUrl;
  const accent = data?.accentWord || "Holiday";
  const headline = data?.headline; // e.g. "Plan your next Holiday"
  const lede = data?.subheading || "Handpicked trips, ready when you are.";
  const placeholder = data?.searchPlaceholder || "Where do you want to go?";

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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className={styles.searchBtn}>
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
