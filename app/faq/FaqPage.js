"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./FaqPage.module.css";

function Chevron({ open }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function FaqPage({ categories = [], intro, faqs = [], settings }) {
  const [openKey, setOpenKey] = useState("0-0");
  const [query, setQuery] = useState("");

  // CMS FAQ categories, fed in from the server.
  const [cats] = useState(categories);

  const visibleCats = cats.map((c) => ({
    ...c,
    items: c.items.filter((it) =>
      `${it.q} ${it.a}`.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((c) => c.items.length > 0);

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.heroWrap}>
        <div className={styles.container}>
          <span className={styles.kicker}>{intro?.eyebrow}</span>
          <h1 className={styles.heading}>{intro?.title}</h1>
          <p className={styles.sub}>{intro?.subtitle}</p>

          <label className={styles.searchWrap}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              placeholder="Search the FAQ…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
      </section>

      {/* FAQ list */}
      <section className={styles.listWrap}>
        <div className={styles.container}>
          {visibleCats.length === 0 ? (
            <div className={styles.empty}>
              <strong>Nothing matches "{query}".</strong>
              <p>Try a different keyword — or just ask us directly.</p>
              <Link href="/contact" className={styles.emptyCta}>Ask the team →</Link>
            </div>
          ) : (
            visibleCats.map((cat, ci) => (
              <div key={cat.title} className={styles.cat}>
                <h2 className={styles.catTitle}>{cat.title}</h2>
                <div className={styles.faqList}>
                  {cat.items.map((it, ii) => {
                    const key = `${ci}-${ii}`;
                    const open = openKey === key;
                    return (
                      <div key={key} className={`${styles.faqItem} ${open ? styles.faqItemOpen : ""}`}>
                        <button
                          type="button"
                          className={styles.faqQ}
                          onClick={() => setOpenKey(open ? null : key)}
                          aria-expanded={open}
                        >
                          <span>{it.q}</span>
                          <Chevron open={open} />
                        </button>
                        {open && <div className={styles.faqA}>{it.a}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaWrap}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <div>
              <span className={styles.kicker}>Still curious?</span>
              <h3 className={styles.ctaTitle}>
                Drop us a message — we <span className={styles.headingAccent}>reply fast</span>.
              </h3>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/contact" className={styles.ctaPrimary}>Contact us</Link>
              <a href={`https://wa.me/${settings?.whatsapp || ""}`} target="_blank" rel="noreferrer" className={styles.ctaGhost}>
                WhatsApp {settings?.supportPhone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
