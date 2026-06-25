// Shared "What's included / Not included" block — the green/red two-column
// icon-card design. Used on the package detail page (per-package inclusions /
// exclusions). Markup + styles match the original destination design exactly.

import styles from "./IncludedExcluded.module.css";

// Only the ✓ / ✗ header marks — the per-item travel icons were removed.
const II = {
  check: (s = 16, color = "#16a34a") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  x: (s = 16, color = "#dc2626") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
};

export default function IncludedExcluded({ inclusions = [], exclusions = [] }) {
  if (!inclusions.length && !exclusions.length) return null;
  return (
    <div className={styles.incExcGrid}>
      <div className={`${styles.incBlock} ${styles.incBlockOn}`}>
        <header className={styles.incHead}><span>{II.check(16, "#16a34a")}</span> Included</header>
        <ul className={styles.incList}>
          {inclusions.map((s, i) => (
            <li key={`${s}-${i}`}>{s}</li>
          ))}
        </ul>
      </div>
      <div className={`${styles.incBlock} ${styles.incBlockOff}`}>
        <header className={styles.incHead}><span>{II.x(16, "#dc2626")}</span> Not included</header>
        <ul className={styles.incList}>
          {exclusions.map((s, i) => (
            <li key={`${s}-${i}`}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
