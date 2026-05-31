"use client";

import Image from "next/image";
import { WEEKEND_TRIPS } from "../data/weekends";
import styles from "./WeekendsPage.module.css";

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function priceNum(s) {
  return parseInt(String(s).replace(/[^\d]/g, ""), 10) || 0;
}

export default function WeekendsPage() {
  const minPrice = WEEKEND_TRIPS.reduce(
    (lo, t) => Math.min(lo, priceNum(t.salePrice)),
    Infinity
  );
  const fromPrice = `₹${minPrice.toLocaleString("en-IN")}`;

  return (
    <main className={styles.page}>
      <section className={styles.headWrap}>
        <div className={styles.container}>
          <div className={styles.headRow}>
            <div className={styles.headText}>
              <span className={styles.headKicker}>
                <span className={styles.headKickerDot} aria-hidden /> Weekend escapes
              </span>
              <h1 className={styles.heading}>
                Weekend <span className={styles.headingAccent}>trips</span>
              </h1>
              <p className={styles.sub}>
                3-day getaways with pickup from your city. Pack a bag and go.
              </p>
            </div>
            <div className={styles.headStats}>
              <div className={styles.headStat}>
                <strong>{WEEKEND_TRIPS.length}</strong>
                <span>Routes</span>
              </div>
              <div className={styles.headStatDivider} aria-hidden />
              <div className={styles.headStat}>
                <strong>3</strong>
                <span>Days each</span>
              </div>
              <div className={styles.headStatDivider} aria-hidden />
              <div className={styles.headStat}>
                <strong>{fromPrice}</strong>
                <span>Starting</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.gridWrap}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {WEEKEND_TRIPS.map((t) => (
              <a key={t.id} href="#" className={styles.card}>
                <div className={styles.imageWrap}>
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
                    className={styles.image}
                  />
                  <span className={styles.savings}>Save {t.savings}</span>
                </div>
                <div className={styles.body}>
                  <h3 className={styles.title}>{t.name}</h3>
                  <span className={styles.subtitle}>{t.subtitle}</span>
                  <span className={styles.days}>{t.days} days</span>
                  <div className={styles.footer}>
                    <div className={styles.priceWrap}>
                      <span className={styles.price}>{t.salePrice}</span>
                      <span className={styles.original}>{t.originalPrice}</span>
                    </div>
                    <span className={styles.explore}>
                      Explore <ArrowIcon />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
