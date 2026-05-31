"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./Hero.module.css";

const HERO_VIDEO =
  "https://res.cloudinary.com/dyxxkrq8r/video/upload/v1779188622/Hero_MHB_Video_aicsk2.mp4";

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function submit(e) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/destinations?where=${encodeURIComponent(q)}` : "/destinations");
  }

  return (
    <section className={styles.hero}>
      <video
        className={styles.video}
        src={HERO_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className={styles.overlay} aria-hidden />

      <div className={styles.content}>
        <h1 className={styles.headline}>
          Plan your
          <br />
          next <span className={styles.accent}>Holiday</span>.
        </h1>

        <p className={styles.lede}>
          Handpicked trips, ready when you are.
        </p>

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
            placeholder="Where do you want to go?"
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
