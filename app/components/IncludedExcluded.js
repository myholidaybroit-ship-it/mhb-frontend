// Shared "What's included / Not included" block — the green/red two-column
// icon-card design. Used on the package detail page (per-package inclusions /
// exclusions). Markup + styles match the original destination design exactly.

import styles from "./IncludedExcluded.module.css";

const II = {
  bed: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" /><path d="M2 14h20" /><path d="M6 10V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
    </svg>
  ),
  coffee: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    </svg>
  ),
  car: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 17h14l1-5H4l1 5z" /><path d="M4 12l2-6h12l2 6" /><circle cx="7.5" cy="17.5" r="1.5" /><circle cx="16.5" cy="17.5" r="1.5" />
    </svg>
  ),
  cam: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
    </svg>
  ),
  users: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  shield: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  bolt: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  wallet: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 12V8a2 2 0 0 0-2-2H4a2 2 0 0 1 0-4h13" /><path d="M2 6v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4" /><circle cx="17" cy="14" r="1.5" />
    </svg>
  ),
  compass: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
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

const INCLUSION_ICONS = [II.bed, II.coffee, II.car, II.cam, II.users, II.shield];
const EXCLUSION_ICONS = [II.bolt, II.wallet, II.compass, II.shield, II.cam, II.x];

export default function IncludedExcluded({ inclusions = [], exclusions = [] }) {
  if (!inclusions.length && !exclusions.length) return null;
  return (
    <div className={styles.incExcGrid}>
      <div className={`${styles.incBlock} ${styles.incBlockOn}`}>
        <header className={styles.incHead}><span>{II.check(16, "#16a34a")}</span> Included</header>
        <ul className={styles.incList}>
          {inclusions.map((s, i) => (
            <li key={`${s}-${i}`}>
              <span className={styles.incIcon}>{INCLUSION_ICONS[i % INCLUSION_ICONS.length]()}</span>
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className={`${styles.incBlock} ${styles.incBlockOff}`}>
        <header className={styles.incHead}><span>{II.x(16, "#dc2626")}</span> Not included</header>
        <ul className={styles.incList}>
          {exclusions.map((s, i) => (
            <li key={`${s}-${i}`}>
              <span className={styles.excIcon}>{EXCLUSION_ICONS[i % EXCLUSION_ICONS.length]()}</span>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
