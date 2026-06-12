"use client";

// Branded month picker for enquiry forms — replaces the browser's native
// <input type="month"> UI. Value stays "YYYY-MM" so the API contract is
// unchanged. Past months are disabled (you can't plan a trip backwards).

import { useEffect, useRef, useState } from "react";
import styles from "./MonthPicker.module.css";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_FULL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function MonthPicker({ value, onChange, placeholder = "Any month works", id }) {
  const now = new Date();
  const minYear = now.getFullYear();
  const maxYear = minYear + 2;

  const sel = value ? { y: Number(value.split("-")[0]), m: Number(value.split("-")[1]) } : null;
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(sel?.y || minYear);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    function onKey(e) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isPast = (y, m) => y < minYear || (y === minYear && m < now.getMonth() + 1);
  const isSel = (y, m) => sel && sel.y === y && sel.m === m;
  const label = sel ? `${MONTHS_FULL[sel.m - 1]} ${sel.y}` : null;

  const pick = (m) => {
    onChange(`${year}-${String(m).padStart(2, "0")}`);
    setOpen(false);
  };

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        type="button"
        id={id}
        className={`${styles.trigger} ${label ? "" : styles.empty}`}
        onClick={() => { setOpen((o) => !o); if (sel) setYear(sel.y); }}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        <span className={styles.label}>{label || placeholder}</span>
        {label && (
          <span
            className={styles.clear}
            role="button"
            tabIndex={-1}
            aria-label="Clear month"
            onClick={(e) => { e.stopPropagation(); onChange(""); }}
          >
            ✕
          </span>
        )}
      </button>

      {open && (
        <div className={styles.pop} role="dialog" aria-label="Pick a travel month">
          <div className={styles.head}>
            <button type="button" className={styles.nav} disabled={year <= minYear} onClick={() => setYear((y) => Math.max(minYear, y - 1))} aria-label="Previous year">‹</button>
            <span className={styles.year}>{year}</span>
            <button type="button" className={styles.nav} disabled={year >= maxYear} onClick={() => setYear((y) => Math.min(maxYear, y + 1))} aria-label="Next year">›</button>
          </div>
          <div className={styles.grid}>
            {MONTHS.map((m, i) => {
              const num = i + 1;
              const past = isPast(year, num);
              return (
                <button
                  type="button"
                  key={m}
                  className={`${styles.month} ${isSel(year, num) ? styles.on : ""}`}
                  disabled={past}
                  onClick={() => pick(num)}
                >
                  {m}
                </button>
              );
            })}
          </div>
          <div className={styles.foot}>
            <button type="button" className={styles.link} onClick={() => { onChange(""); setOpen(false); }}>Not sure yet</button>
            <button type="button" className={styles.link} onClick={() => { setYear(minYear); pick(now.getMonth() + 1); }}>This month</button>
          </div>
        </div>
      )}
    </div>
  );
}
