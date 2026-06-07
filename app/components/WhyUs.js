import Image from "next/image";
import styles from "./WhyUs.module.css";

function SmileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function RouteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  );
}

// Stat icons in display order — matched to CMS stats by index.
const STAT_ICONS = [SmileIcon, GlobeIcon, RouteIcon, ClockIcon, HeartIcon, SparkleIcon];

export default function WhyUs({ data }) {
  const collage = data?.collage || [];
  const stats = (data?.stats || []).map((s, i) => ({
    ...s,
    Icon: STAT_ICONS[i % STAT_ICONS.length],
  }));
  const paragraphs = data?.bodyParagraphs || [];
  return (
    <section className={styles.section} id="why-us">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.collage}>
            {collage.map((src, i) => (
              <div
                key={src}
                className={`${styles.tile} ${styles[`tile${i + 1}`]}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 50vw, 25vw"
                  className={styles.tileImage}
                />
              </div>
            ))}
          </div>

          <div className={styles.content}>
            <span className={styles.eyebrow}>{data?.eyebrow}</span>
            <h2 className={styles.heading}>
              Why <span className={styles.headingAccent}>{data?.heading}</span>
            </h2>

            <blockquote className={styles.quote}>
              &ldquo;{data?.quote}&rdquo;
            </blockquote>

            {paragraphs.map((para, i) => (
              <p className={styles.body} key={i}>{para}</p>
            ))}

            <a href="#" className={styles.viewMore}>
              View more
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </a>

            <div className={styles.stats}>
              {stats.map(({ Icon, value, label }) => (
                <div key={label} className={styles.statCard}>
                  <span className={styles.statIcon}>
                    <Icon />
                  </span>
                  <span className={styles.statValue}>{value}</span>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
