"use client";

// Shared "Get a free quote" enquiry form — used identically on the destination
// detail page and the package detail page so both show the exact same form.
//
// Package selection can be controlled (pass `pkgIdx` + `onPkgChange`, e.g. so the
// destination page keeps the form's dropdown in sync with its package cards) or
// uncontrolled (pass `initialPkgIdx`). `fallbackPkg` supplies pricing when the
// destination has no real packages yet.

import { useState } from "react";
import Link from "next/link";
import MonthPicker from "./MonthPicker";
import { forms } from "../lib/api";
import styles from "./QuoteForm.module.css";

const I = {
  user: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  mail: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  phone: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  pin: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  compass: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  chevDown: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  plus: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  minus: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14" />
    </svg>
  ),
  check: (s = 14, color = "#16a34a") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

const priceNumber = (str) => {
  const n = parseInt(String(str ?? "").replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
};
const formatINR = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

export default function QuoteForm({
  destName,
  packages = [],
  initialPkgIdx = 0,
  pkgIdx,
  onPkgChange,
  fallbackPkg = null,
}) {
  const controlled = typeof pkgIdx === "number" && typeof onPkgChange === "function";
  const [internalIdx, setInternalIdx] = useState(initialPkgIdx);
  const idx = controlled ? pkgIdx : internalIdx;
  const setIdx = controlled ? onPkgChange : setInternalIdx;
  const safeIdx = packages.length ? Math.min(Math.max(0, idx), packages.length - 1) : 0;
  const pkg = (packages.length ? packages[safeIdx] : fallbackPkg) || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [travelMonth, setTravelMonth] = useState("");
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const basePrice = priceNumber(pkg.price);
  const taxesPerHead = Math.round(basePrice * 0.05);
  const grandTotal =
    (basePrice + taxesPerHead) * adults +
    Math.round((basePrice + taxesPerHead) * 0.6) * kids;

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;
    forms
      .enquiry({
        type: "quote",
        name,
        email,
        phone,
        city,
        travelMonth,
        destination: destName,
        package: pkg?.name ? `${pkg.name} — ${pkg.days}D · ${pkg.price}` : undefined,
        adults,
        children: kids,
        total: formatINR(grandTotal),
      })
      .catch((err) => console.error("Quote enquiry failed:", err.message));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={styles.bookCard}>
        <div className={styles.successCard}>
          <span className={styles.successIcon}>{I.check(28, "#16a34a")}</span>
          <h3>Enquiry sent</h3>
          <p>
            Our advisor will call <strong>{phone}</strong> within 2 hours about
            your <strong>{pkg.name || destName}</strong> trip.
          </p>
          <button
            type="button"
            className={styles.ctaGhost}
            onClick={() => {
              setSubmitted(false);
              setName(""); setEmail(""); setPhone(""); setCity(""); setTravelMonth("");
            }}
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.bookCard} onSubmit={handleSubmit} noValidate>
      <header className={styles.formIntro}>
        <h3>Get a free quote</h3>
        <p>Will get in touch shortly.</p>
      </header>

      <div className={styles.formGroup}>
        <label htmlFor="enq-name" className={styles.formLabel}>
          <span className={styles.formLabelIcon}>{I.user(12)}</span> Full name
        </label>
        <input id="enq-name" type="text" required autoComplete="name" value={name}
          onChange={(e) => setName(e.target.value)} placeholder="Your name" className={styles.formInput} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="enq-email" className={styles.formLabel}>
          <span className={styles.formLabelIcon}>{I.mail(12)}</span> Email
        </label>
        <input id="enq-email" type="email" required autoComplete="email" value={email}
          onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className={styles.formInput} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="enq-phone" className={styles.formLabel}>
          <span className={styles.formLabelIcon}>{I.phone(12)}</span> Phone
        </label>
        <input id="enq-phone" type="tel" required autoComplete="tel" value={phone}
          onChange={(e) => setPhone(e.target.value)} placeholder="+91 9XXXXXXXXX" className={styles.formInput} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="enq-city" className={styles.formLabel}>
          <span className={styles.formLabelIcon}>{I.pin(12)}</span> Your city
        </label>
        <input id="enq-city" type="text" autoComplete="address-level2" value={city}
          onChange={(e) => setCity(e.target.value)} placeholder="Mumbai" className={styles.formInput} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="enq-month" className={styles.formLabel}>
          <span className={styles.formLabelIcon}>{I.compass(12)}</span> Planning to travel in
        </label>
        <MonthPicker id="enq-month" value={travelMonth} onChange={setTravelMonth} />
      </div>

      {packages.length > 0 && (
        <div className={styles.formGroup}>
          <label htmlFor="enq-pkg" className={styles.formLabel}>
            <span className={styles.formLabelIcon}>{I.compass(12)}</span> Package
          </label>
          <div className={styles.selectWrap}>
            <select id="enq-pkg" value={safeIdx} onChange={(e) => setIdx(Number(e.target.value))} className={styles.formSelect}>
              {packages.map((p, i) => (
                <option key={p.slug || p.name || i} value={i}>
                  {p.name} — {p.days}D · {p.price}
                </option>
              ))}
            </select>
            <span className={styles.selectChev}>{I.chevDown(14)}</span>
          </div>
        </div>
      )}

      <div className={styles.travRow}>
        <div className={styles.travText}><strong>Adults</strong><span>18+</span></div>
        <div className={styles.stepper}>
          <button type="button" onClick={() => setAdults((n) => Math.max(1, n - 1))} disabled={adults <= 1} aria-label="Decrease adults">{I.minus()}</button>
          <span>{adults}</span>
          <button type="button" onClick={() => setAdults((n) => Math.min(20, n + 1))} aria-label="Increase adults">{I.plus()}</button>
        </div>
      </div>
      <div className={styles.travRow}>
        <div className={styles.travText}><strong>Children</strong><span>Under 18</span></div>
        <div className={styles.stepper}>
          <button type="button" onClick={() => setKids((n) => Math.max(0, n - 1))} disabled={kids <= 0} aria-label="Decrease children">{I.minus()}</button>
          <span>{kids}</span>
          <button type="button" onClick={() => setKids((n) => Math.min(20, n + 1))} aria-label="Increase children">{I.plus()}</button>
        </div>
      </div>

      <div className={styles.totalRow}>
        <span>Total ({adults + kids} pax)</span>
        <strong>{formatINR(grandTotal)}</strong>
      </div>

      <button type="submit" className={styles.cta}>Send enquiry</button>
      <a href="tel:+910000000000" className={styles.ctaGhost}>{I.phone()} Talk to advisor</a>
      <p className={styles.bookFoot}>
        No payment now · we&apos;ll get in touch shortly.<br />
        By submitting you agree to our{" "}
        <Link href="/terms" className={styles.policyLink}>Terms</Link> &amp;{" "}
        <Link href="/terms#privacy" className={styles.policyLink}>Privacy</Link>.
      </p>
    </form>
  );
}
