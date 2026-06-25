"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWishlist } from "../../components/WishlistContext";
import MonthPicker from "../../components/MonthPicker";
import { forms } from "../../lib/api";
import { img } from "../../lib/img";
import { resolvePackages } from "../../lib/packages";
import styles from "./TripDetail.module.css";

/* ─────────── Icons ─────────── */
const I = {
  star: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="#f59e0b" aria-hidden>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  pin: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  clock: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  heart: (active) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? "#dc2626" : "none"} stroke={active ? "#dc2626" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  share: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  download: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  chevDown: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  chevRight: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  check: (s = 14, color = "#16a34a") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  x: (s = 14, color = "#dc2626") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" />
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
  play: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <polygon points="6 4 20 12 6 20 6 4" />
    </svg>
  ),
  phone: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  cal: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  moon: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  route: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  ),
  users: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  compass: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  bed: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
      <path d="M2 14h20" />
      <path d="M6 10V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
    </svg>
  ),
  coffee: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    </svg>
  ),
  car: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 17h14l1-5H4l1 5z" />
      <path d="M4 12l2-6h12l2 6" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="16.5" cy="17.5" r="1.5" />
    </svg>
  ),
  cam: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
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
      <path d="M20 12V8a2 2 0 0 0-2-2H4a2 2 0 0 1 0-4h13" />
      <path d="M2 6v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4" />
      <circle cx="17" cy="14" r="1.5" />
    </svg>
  ),
  passport: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <circle cx="12" cy="10" r="3" />
      <path d="M8 16h8" />
    </svg>
  ),
  globe: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
    </svg>
  ),
  sun: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  ),
  plug: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 2v6M15 2v6M7 8h10v3a5 5 0 0 1-10 0V8zM12 16v6" />
    </svg>
  ),
  copy: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  whatsapp: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  ),
  twitter: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  facebook: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  mail: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  user: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  zoom: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
      <line x1="11" y1="8" x2="11" y2="14" />
    </svg>
  ),
  arrowL: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m15 18-6-6 6-6" />
    </svg>
  ),
  arrowR: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  close: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  wifi: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12.55a11 11 0 0 1 14 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  ),
};

/* ─────────── Helpers ─────────── */

function priceNumber(str) {
  const n = parseInt(String(str).replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}
function formatINR(n) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function formatReviews(n) {
  if (n >= 1000) {
    const k = Math.floor(n / 100) / 10;
    return `${k}k+`;
  }
  return `${n}+`;
}

const AGE_BUCKETS = [
  { id: "kids", label: "5 – 17", note: "Kid-friendly", on: false },
  { id: "youth", label: "18 – 25", note: "Youth", on: true },
  { id: "adults", label: "26 – 40", note: "Couples", on: true },
  { id: "seniors", label: "41 – 65", note: "Family", on: true },
];

// Compute carousel position (-2, -1, 0, 1, 2) or "hidden" for cards far from active.
function relativePos(i, active, n) {
  const half = Math.floor(n / 2);
  let rel = i - active;
  if (rel > half) rel -= n;
  if (rel < -half) rel += n;
  if (Math.abs(rel) > 2) return "hidden";
  return String(rel);
}

// Map a backend payment-method icon key to its SVG renderer.
const PAY_ICONS = { wallet: I.wallet, shield: I.shield, bolt: I.bolt };

function quickFacts(dest) {
  const india = dest.region === "India";
  return [
    { key: "currency", icon: I.wallet, label: "Currency", value: india ? "INR (₹)" : "Pay in ₹" },
    { key: "visa", icon: I.passport, label: "Visa", value: india ? "Not required" : dest.visa || "Check requirements" },
    { key: "best", icon: I.sun, label: "Best time", value: dest.bestTime },
    { key: "lang", icon: I.globe, label: "Language", value: india ? "Hindi · English" : "English guides" },
    { key: "plug", icon: I.plug, label: "Plug", value: india ? "Type C / D / M" : "Universal adapter" },
    { key: "wifi", icon: I.wifi, label: "Connectivity", value: india ? "4G / 5G strong" : "eSIM works" },
  ];
}

const INCLUSION_ICONS = [I.bed, I.coffee, I.car, I.cam, I.users, I.shield];
const EXCLUSION_ICONS = [I.bolt, I.wallet, I.compass, I.shield, I.cam, I.x];

/* ─────────── Component ─────────── */

export default function TripDetail({ dest, content, related = [] }) {
  const REFUND_TIERS = content?.cancellationTiers || [];
  const PAY_METHODS = content?.paymentMethods || [];
  const PAY_STAGES = content?.paymentStages || [];
  const TRAVEL_TESTIMONIALS = content?.travelDiaries || [];

  // Destinations may ship without packaged trips / itinerary / overview. We read
  // only real, admin-authored packages (no invented ones) and derive safe
  // fallbacks below so a thin destination still renders fully and never crashes.
  const packages = resolvePackages(dest);
  const hasPackages = packages.length > 0;
  const itinerary = dest.itinerary || [];
  const overview = dest.overview || [];
  // Highlights come in two shapes: legacy destinations store plain strings,
  // while the admin form saves { text, icon } objects. Normalize to strings so
  // the cards render either way (rendering an object as a child crashes React).
  const highlights = (dest.highlights || [])
    .map((h) => (typeof h === "string" ? h : h?.text || ""))
    .filter(Boolean);

  const [pkgIdx, setPkgIdx] = useState(0);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [openDay, setOpenDay] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const { has: wishlistHas, toggle: wishlistToggle, hydrated: wishlistHydrated } = useWishlist();
  const wishlistId = `destination:${dest.slug}`;
  const wished = wishlistHydrated && wishlistHas(wishlistId);
  function toggleWished() {
    const pkg = packages?.[0];
    wishlistToggle({
      id: wishlistId,
      kind: "destination",
      name: dest.name,
      subtitle: dest.country,
      price: pkg?.price,
      image: img(dest.image || dest.imageKey, 600, 600),
      href: `/destinations/${dest.slug}`,
    });
  }

  // Enquiry form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [travelMonth, setTravelMonth] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleEnquirySubmit(e) {
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
        destination: dest.name,
        package: pkg ? `${pkg.name} — ${pkg.days}D · ${pkg.price}` : undefined,
        adults,
        children: kids,
        total: formatINR(grandTotal),
      })
      .catch((err) => console.error("Quote enquiry failed:", err.message));
    setSubmitted(true);
  }

  // Share + PDF modal state
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfSent, setPdfSent] = useState(false);
  const [pdfFirst, setPdfFirst] = useState("");
  const [pdfLast, setPdfLast] = useState("");
  const [pdfPhone, setPdfPhone] = useState("");
  const [pdfEmail, setPdfEmail] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") setShareUrl(window.location.href);
  }, [dest.slug]);

  // Lock background scroll while either modal is open + close on Esc
  useEffect(() => {
    const open = shareOpen || pdfOpen;
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") { setShareOpen(false); setPdfOpen(false); }
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [shareOpen, pdfOpen]);

  async function copyShareUrl() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard may be blocked (insecure context); fall back to select.
      const el = document.getElementById("share-url-input");
      el?.select?.();
    }
  }

  function handlePdfSubmit(e) {
    e.preventDefault();
    if (!pdfFirst.trim() || !pdfPhone.trim() || !pdfEmail.trim()) return;
    // Stub: in production this would POST to /api/itinerary-pdf
    setPdfSent(true);
  }

  function closePdf() {
    setPdfOpen(false);
    // Reset after the close animation so user re-opens fresh.
    setTimeout(() => {
      setPdfSent(false);
      setPdfFirst(""); setPdfLast(""); setPdfPhone(""); setPdfEmail("");
    }, 250);
  }

  // Real selected package, or a safe summary derived from the destination itself
  // (used for the pricing widget / quick facts when no packages exist yet).
  const pkg = packages[Math.min(pkgIdx, packages.length - 1)] || {
    name: dest.name,
    days: 5,
    nights: 4,
    price: dest.fromPrice || "On request",
    route: dest.name,
  };

  const basePrice = priceNumber(pkg.price);
  const taxesPerHead = Math.round(basePrice * 0.05);
  const grandTotal =
    (basePrice + taxesPerHead) * adults +
    Math.round((basePrice + taxesPerHead) * 0.6) * kids;

  // Build a deduped pool of every image we have for this destination.
  const allImages = useMemo(() => {
    const seen = new Set();
    const out = [];
    [dest.image, dest.imageKey, ...(dest.galleryKeys || [])].forEach((k) => {
      if (k && !seen.has(k)) { seen.add(k); out.push(k); }
    });
    return out;
  }, [dest]);

  // First 4 unique images fill the hero grid. Cycle the pool if we somehow
  // have fewer than 4 — keeps the layout intact for thin destinations.
  const heroImages = useMemo(
    () => Array.from({ length: 4 }, (_, i) => allImages[i % allImages.length]),
    [allImages]
  );

  // Same pool feeds the lower bands (memories / insta / blogs).
  const galleryImages = heroImages;

  const [lightbox, setLightbox] = useState(null);
  const [testimonialIdx, setTestimonialIdx] = useState(
    Math.floor(TRAVEL_TESTIMONIALS.length / 2)
  );
  const openLightbox = useCallback((key) => {
    const idx = allImages.indexOf(key);
    setLightbox(idx >= 0 ? idx : 0);
  }, [allImages]);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImage = useCallback(
    () => setLightbox((i) => (i + allImages.length - 1) % allImages.length),
    [allImages]
  );
  const nextImage = useCallback(
    () => setLightbox((i) => (i + 1) % allImages.length),
    [allImages]
  );

  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e) {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "ArrowRight") nextImage();
    }
    document.addEventListener("keydown", onKey);
    // Stop background scroll while the viewer is open.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox, closeLightbox, prevImage, nextImage]);

  const promo = useMemo(
    () =>
      related.find((d) => d.slug !== dest.slug && d.region === dest.region) ||
      related[0] ||
      null,
    [related, dest]
  );

  const stats = [
    { icon: I.cal, value: pkg.days, label: "Days" },
    { icon: I.moon, value: pkg.nights ?? pkg.days - 1, label: "Nights" },
    { icon: I.route, value: (pkg.route || dest.name).split("·").length, label: "Cities" },
    // Group size is hidden by default (solo travellers welcome). The admin can
    // toggle it on per destination, in which case the real min–max shows.
    ...(dest.showGroupSize
      ? [{ icon: I.users, value: `${dest.groupMin || 2} – ${dest.groupMax || 12}`, label: "Group size" }]
      : []),
    { icon: I.compass, value: (dest.idealFor || "").split("·")[0].trim() || "Trip", label: "Style" },
  ];

  // Sync the day-by-day list to the active package length. If the package
  // has more days than the destination's authored itinerary, pad with leisure
  // / departure days so the count matches what the customer is booking.
  const itinDays = useMemo(() => {
    const base = itinerary.slice(0, pkg.days).map((d) => ({ ...d }));
    while (base.length < pkg.days) {
      const day = base.length + 1;
      const last = day === pkg.days;
      base.push({
        day,
        title: last ? "Departure" : "Leisure & optional add-ons",
        desc: last
          ? "Breakfast at the hotel and your transfer to the airport."
          : "Free day for an optional add-on tour, spa or shopping. Your advisor will suggest options that suit your style.",
      });
    }
    return base;
  }, [dest, pkg]);

  // Map a highlight to a category tag for the "Don't miss these" cards.
  const mustDoCategory = (i) =>
    ["Sightseeing", "Nature", "Culture", "Adventure", "Food & drink", "Evening"][i % 6];
  const mustDoPace = (i) =>
    ["Half-day", "Full-day", "Evening", "Morning", "Optional", "2 – 3 hrs"][i % 6];
  const mustDoIcon = (i) => [I.cam, I.compass, I.route, I.sun, I.coffee, I.bed][i % 6];

  function selectPackage(i) {
    setPkgIdx(i);
  }

  // Prefer the admin's per-destination content; fall back to the global content
  // singleton so edits made on the Destination editor actually reflect here.
  const facts = useMemo(
    () =>
      dest.goodToKnow?.length
        ? dest.goodToKnow.map((g, i) => ({ key: `gtk${i}`, icon: I.compass, label: g.label, value: g.value }))
        : quickFacts(dest),
    [dest]
  );
  const inclusions = dest.inclusions?.length ? dest.inclusions : content?.inclusions || [];
  const exclusions = dest.exclusions?.length ? dest.exclusions : content?.exclusions || [];
  const usps = content?.usps || [];
  // FAQs are per-destination — strictly the destination's own set, independent of
  // packages and the global content FAQs (each destination has different FAQs).
  const faqs = (dest.faqs || []).slice(0, 6);

  return (
    <main className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <div className={styles.crumbInner}>
          <Link href="/">Home</Link>
          <span aria-hidden>›</span>
          <Link href="/destinations">Destinations</Link>
          <span aria-hidden>›</span>
          <span className={styles.crumbCurrent}>{dest.name}</span>
        </div>
      </nav>

      {/* ─── Hero gallery ─── */}
      <section className={styles.heroWrap}>
        <div className={styles.hero}>
          <div className={styles.galleryGrid}>
            <button
              type="button"
              className={`${styles.galTile} ${styles.galLarge}`}
              onClick={() => openLightbox(heroImages[0])}
              aria-label={`Open ${dest.name} photo 1`}
            >
              <Image
                src={img(heroImages[0], 1200, 900)}
                alt={`${dest.name} hero`}
                fill
                sizes="(max-width: 900px) 100vw, 60vw"
                className={styles.galImg}
                priority
              />
              <span className={styles.galZoom}>{I.zoom()}</span>
            </button>
            <div className={styles.galStack}>
              {[1, 2, 3].map((i) => {
                const isLast = i === 3;
                const remaining = allImages.length - 4;
                const showMoreBadge = isLast && remaining > 0;
                return (
                  <button
                    key={i}
                    type="button"
                    className={styles.galTile}
                    onClick={() => setLightbox(showMoreBadge ? 3 : allImages.indexOf(heroImages[i]))}
                    aria-label={
                      showMoreBadge
                        ? `View all ${allImages.length} photos`
                        : `Open ${dest.name} photo ${i + 1}`
                    }
                  >
                    <Image
                      src={img(heroImages[i], 800, 600)}
                      alt={`${dest.name} ${i + 1}`}
                      fill
                      sizes="(max-width: 900px) 50vw, 25vw"
                      className={styles.galImg}
                    />
                    {showMoreBadge ? (
                      <span className={styles.galMore}>
                        <span className={styles.galMoreNum}>+{remaining}</span>
                        <span className={styles.galMoreLabel}>View all photos</span>
                      </span>
                    ) : (
                      <span className={styles.galZoom}>{I.zoom()}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title strip */}
          <header className={styles.titleStrip}>
            <div className={styles.titleLeft}>
              <h1 className={styles.title}>{dest.name}</h1>
              <p className={styles.tagline}>{dest.tagline}</p>
              <div className={styles.titleMeta}>
                <span className={styles.metaChip}>{I.clock()} {pkg.days}D · {pkg.nights ?? pkg.days - 1}N</span>
                <span className={styles.metaChip}>{I.pin(13)} {pkg.route}</span>
              </div>
            </div>

            <div className={styles.titleRight}>
              <button
                type="button"
                className={`${styles.iconBtn} ${wished ? styles.iconBtnOn : ""}`}
                onClick={toggleWished}
                aria-pressed={wished}
                aria-label="Save to wishlist"
              >
                {I.heart(wished)}
              </button>
              <button
                type="button"
                className={styles.iconBtn}
                aria-label="Share trip"
                onClick={() => setShareOpen(true)}
              >
                {I.share()}
              </button>
            </div>
          </header>

        </div>
      </section>

      {/* ─── Main grid ─── */}
      <section className={styles.mainWrap}>
        <div className={styles.mainInner}>
          <div className={styles.contentCol}>

            {/* Stats strip */}
            <div className={styles.statsStrip}>
              {stats.map((s) => (
                <div key={s.label} className={styles.statCell}>
                  <span className={styles.statIcon}>{s.icon()}</span>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Overview — one short paragraph + visual highlight cards */}
            <Section title={`Why ${dest.name}?`} kicker={dest.region === "India" ? "Indian escape" : "Curated overseas"}>
              <p className={styles.lead}>{overview[0]}</p>
              <div className={styles.highlightGrid}>
                {highlights.slice(0, 6).map((h, i) => (
                  <div key={h} className={styles.highlightCard}>
                    <span className={styles.highlightIcon}>
                      {[I.cam, I.compass, I.route, I.bed, I.sun, I.coffee][i % 6]()}
                    </span>
                    <span className={styles.highlightText}>{h}</span>
                  </div>
                ))}
              </div>
            </Section>


            {/* Packages — image-poster cards */}
            {hasPackages && (
            <Section title={`${dest.name} packages`} kicker="Pick the trip that fits" id="packages">
              <div
                className={styles.pkgGrid}
                style={{ "--pkg-cols": Math.min(packages.length, 4) }}
              >
                {packages.map((p, i) => {
                  const active = i === pkgIdx;
                  const pNights = p.nights ?? p.days - 1;
                  const pImg = p.image || heroImages[i % heroImages.length];
                  const pOrig = p.original ? Number(String(p.original).replace(/[^\d]/g, "")) : null;
                  const pNow = Number(String(p.price).replace(/[^\d]/g, ""));
                  const savings = pOrig && pNow < pOrig ? pOrig - pNow : 0;
                  return (
                    <article
                      key={p.name}
                      className={`${styles.pkgCard} ${active ? styles.pkgCardOn : ""}`}
                      role="button"
                      tabIndex={0}
                      aria-pressed={active}
                      onClick={() => selectPackage(i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          selectPackage(i);
                        }
                      }}
                    >
                      <div className={styles.pkgImg}>
                        <Image
                          src={img(pImg, 700, 900)}
                          alt={p.name}
                          fill
                          sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 24vw"
                          className={styles.galImg}
                        />
                        <div className={styles.pkgImgGradient} aria-hidden />
                        <div className={styles.pkgImgInner}>
                          <h3 className={styles.pkgImgTitle}>{p.name}</h3>
                          <span className={styles.pkgImgLocation}>
                            {I.pin(11)} {p.route}
                          </span>
                        </div>
                        {active && (
                          <span className={styles.pkgActive}>
                            {I.check(11, "#fff")} Selected
                          </span>
                        )}
                      </div>

                      <div className={styles.pkgInfo}>
                        <div className={styles.pkgMetaRow}>
                          <span className={styles.pkgMetaCell}>
                            {I.clock(13)} {pNights}N/{p.days}D
                          </span>
                          <span className={styles.pkgMetaSep} aria-hidden>|</span>
                          <span className={styles.pkgMetaCell}>
                            {I.cal(13)} {dest.bestTime}
                          </span>
                        </div>

                        <div className={styles.pkgPriceRow}>
                          <div className={styles.pkgPriceCol}>
                            {pOrig && (
                              <span className={styles.pkgStrike}>
                                ₹{pOrig.toLocaleString("en-IN")}
                              </span>
                            )}
                            <span className={styles.pkgPrice}>{p.price}</span>
                          </div>

                          {savings > 0 && (
                            <span className={styles.pkgDiscountBadge}>
                              <span className={styles.pkgDiscountSm}>Upto</span>
                              <strong>{savings.toLocaleString("en-IN")}</strong>
                              <span className={styles.pkgDiscountSm}>OFF</span>
                            </span>
                          )}
                        </div>

                        <Link
                          href={`/destinations/${dest.slug}/${p.slug}`}
                          className={styles.pkgDetailsLink}
                          onClick={(e) => e.stopPropagation()}
                        >
                          View full details {I.chevRight(13)}
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </Section>
            )}

            {/* Don't miss these — must-do activities */}
            <Section title="Don't miss these" kicker="Top experiences on this trip">
              <div className={styles.mustGrid}>
                {highlights.slice(0, 6).map((h, i) => {
                  const IconC = mustDoIcon(i);
                  return (
                    <article key={h} className={styles.mustCard}>
                      <div className={styles.mustImg}>
                        <Image
                          src={img(allImages[(i + 1) % allImages.length], 700, 800)}
                          alt={h}
                          fill
                          sizes="(max-width: 900px) 90vw, 22vw"
                          className={styles.galImg}
                        />
                        <span className={styles.mustCat}>{mustDoCategory(i)}</span>
                      </div>
                      <div className={styles.mustBody}>
                        <span className={styles.mustIcon}>{IconC(16)}</span>
                        <h3 className={styles.mustTitle}>{h}</h3>
                        <span className={styles.mustPace}>
                          {I.clock(12)} {mustDoPace(i)}
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </Section>

            {/* Age limit */}
            <Section title="Who this trip is for">
              <div className={styles.ageRow}>
                {AGE_BUCKETS.map((a) => (
                  <div key={a.id} className={`${styles.agePill} ${a.on ? styles.agePillOn : ""}`}>
                    <span className={styles.ageDot} />
                    <strong>{a.label}</strong>
                    <span>{a.note}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Promo banner */}
            {promo && (
              <Link href={`/destinations/${promo.slug}`} className={styles.promoBanner}>
                <Image
                  src={img(promo.image || promo.imageKey, 1400, 500)}
                  alt={`${promo.name}`}
                  fill
                  sizes="(max-width: 900px) 100vw, 800px"
                  className={styles.galImg}
                />
                <div className={styles.promoOverlay}>
                  <span className={styles.promoKicker}>Pair with</span>
                  <h3 className={styles.promoTitle}>{promo.name}</h3>
                  <span className={styles.promoCta}>From {promo.fromPrice} {I.chevRight()}</span>
                </div>
              </Link>
            )}

            {/* Payment policy — 2 stage cards + methods */}
            <Section title="Payment policy">
              <div className={styles.payGrid}>
                {PAY_STAGES.map((p) => (
                  <div
                    key={p.step}
                    className={`${styles.payCard} ${p.tone === "dark" ? styles.payCardDark : ""}`}
                  >
                    <span className={styles.payStep}>{p.step}</span>
                    <strong className={styles.payAmt}>{p.amount}</strong>
                    <span className={styles.payTitle}>{p.title}</span>
                    <span className={styles.paySub}>{p.sub}</span>
                  </div>
                ))}
              </div>
              <div className={styles.payMethods}>
                <span className={styles.payMethodsLabel}>Pay via</span>
                {PAY_METHODS.map((m) => (
                  <span key={m.label} className={styles.payMethod}>
                    <span className={styles.payMethodIcon}>{(PAY_ICONS[m.icon] || I.wallet)()}</span>
                    {m.label}
                  </span>
                ))}
              </div>
              <p className={styles.payNote}>
                Convenience fees apply on payments made after the booking date (except direct bank transfers).
                See <Link href="/terms" className={styles.policyLink}>Terms of Use</Link> for full details.
              </p>
            </Section>

            {/* Quick facts grid */}
            <Section title="Good to know">
              <div className={styles.factsGrid}>
                {facts.map((f) => (
                  <div key={f.key} className={styles.factCard}>
                    <span className={styles.factIcon}>{f.icon()}</span>
                    <span className={styles.factLabel}>{f.label}</span>
                    <strong className={styles.factValue}>{f.value}</strong>
                  </div>
                ))}
              </div>
            </Section>

            {/* FAQs */}
            {faqs.length > 0 && (
            <Section title="Quick FAQs">
              <div className={styles.faqList}>
                {faqs.map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <div key={f.q} className={`${styles.faqRow} ${open ? styles.faqOpen : ""}`}>
                      <button
                        type="button"
                        className={styles.faqHead}
                        onClick={() => setOpenFaq(open ? -1 : i)}
                        aria-expanded={open}
                      >
                        <span>{f.q}</span>
                        <span className={styles.faqIcon}>{open ? I.minus() : I.plus()}</span>
                      </button>
                      {open && <p className={styles.faqBody}>{f.a}</p>}
                    </div>
                  );
                })}
              </div>
            </Section>
            )}
          </div>

          {/* ─── Sticky enquiry form ─── */}
          <aside className={styles.sideCol}>
            {submitted ? (
              <div className={styles.bookCard}>
                <div className={styles.successCard}>
                  <span className={styles.successIcon}>{I.check(28, "#16a34a")}</span>
                  <h3>Enquiry sent</h3>
                  <p>
                    Our advisor will call <strong>{phone}</strong> within 2 hours about
                    your <strong>{pkg.name}</strong> trip.
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
            ) : (
              <form className={styles.bookCard} onSubmit={handleEnquirySubmit} noValidate>
                <header className={styles.formIntro}>
                  <h3>Get a free quote</h3>
                  <p>Will get in touch shortly.</p>
                </header>

                <div className={styles.formGroup}>
                  <label htmlFor="enq-name" className={styles.formLabel}>
                    <span className={styles.formLabelIcon}>{I.user(12)}</span> Full name
                  </label>
                  <input
                    id="enq-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="enq-email" className={styles.formLabel}>
                    <span className={styles.formLabelIcon}>{I.mail(12)}</span> Email
                  </label>
                  <input
                    id="enq-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="enq-phone" className={styles.formLabel}>
                    <span className={styles.formLabelIcon}>{I.phone(12)}</span> Phone
                  </label>
                  <input
                    id="enq-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9XXXXXXXXX"
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="enq-city" className={styles.formLabel}>
                    <span className={styles.formLabelIcon}>{I.pin ? I.pin(12) : I.compass(12)}</span> Your city
                  </label>
                  <input
                    id="enq-city"
                    type="text"
                    autoComplete="address-level2"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Mumbai"
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="enq-month" className={styles.formLabel}>
                    <span className={styles.formLabelIcon}>{I.calendar ? I.calendar(12) : I.compass(12)}</span> Planning to travel in
                  </label>
                  <MonthPicker id="enq-month" value={travelMonth} onChange={setTravelMonth} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="enq-pkg" className={styles.formLabel}>
                    <span className={styles.formLabelIcon}>{I.compass(12)}</span> Package
                  </label>
                  <div className={styles.selectWrap}>
                    <select
                      id="enq-pkg"
                      value={pkgIdx}
                      onChange={(e) => setPkgIdx(Number(e.target.value))}
                      className={styles.formSelect}
                    >
                      {packages.map((p, i) => (
                        <option key={p.name} value={i}>
                          {p.name} — {p.days}D · {p.price}
                        </option>
                      ))}
                    </select>
                    <span className={styles.selectChev}>{I.chevDown(14)}</span>
                  </div>
                </div>

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
            )}

            <div className={styles.uspCard}>
              {usps.map((u, i) => (
                <div key={u.title} className={styles.uspRow}>
                  <span className={styles.uspIcon}>{[I.shield, I.wallet, I.users, I.star][i % 4]()}</span>
                  <div>
                    <strong>{u.title}</strong>
                    <span>{u.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* ─── Travel diaries (3D postcard carousel) ─── */}
      <section className={styles.diaryBand}>
        <span className={styles.diaryGlobe} aria-hidden>✈</span>
        <span className={styles.diaryGlobe2} aria-hidden>✈</span>
        <div className={styles.diaryInner}>
          <header className={styles.diaryHead}>
            <span className={styles.kicker}>Travel diaries</span>
            <h2 className={styles.diaryTitle}>
              Real postcards from <span className={styles.accent}>{dest.name}</span> travellers
            </h2>
            <p className={styles.diaryLead}>
              Stories straight from MyHolidayBro travellers — flipped from their journals.
            </p>
          </header>

          <div className={styles.diaryStage}>
            <button
              type="button"
              className={`${styles.diaryNav} ${styles.diaryNavPrev}`}
              onClick={() =>
                setTestimonialIdx(
                  (i) => (i + TRAVEL_TESTIMONIALS.length - 1) % TRAVEL_TESTIMONIALS.length
                )
              }
              aria-label="Previous postcard"
            >
              {I.arrowL(20)}
            </button>

            <div className={styles.diaryTrack}>
              {TRAVEL_TESTIMONIALS.map((t, i) => {
                const pos = relativePos(i, testimonialIdx, TRAVEL_TESTIMONIALS.length);
                return (
                  <article
                    key={t.name}
                    className={styles.diaryCard}
                    data-pos={pos}
                    onClick={() => setTestimonialIdx(i)}
                    style={{
                      "--card-bg": t.color,
                      "--card-accent": t.accent,
                    }}
                  >
                    <div className={styles.diaryStamp} aria-hidden>
                      <span className={styles.diaryStampInner}>
                        <span className={styles.diaryStampTop}>· VISITED ·</span>
                        <span className={styles.diaryStampMid}>{t.trip}</span>
                        <span className={styles.diaryStampBot}>MyHolidayBro</span>
                      </span>
                    </div>

                    <div className={styles.diaryQuoteMark} aria-hidden>“</div>
                    <p className={styles.diaryQuote}>{t.body}</p>

                    <footer className={styles.diaryFoot}>
                      <span
                        className={styles.diaryAvatar}
                        style={{ background: t.accent }}
                      >
                        {t.initials}
                      </span>
                      <div className={styles.diaryMeta}>
                        <strong>{t.name}</strong>
                        <span>{t.city} · {t.when}</span>
                      </div>
                    </footer>

                    <div className={styles.diaryEdge} aria-hidden />
                  </article>
                );
              })}
            </div>

            <button
              type="button"
              className={`${styles.diaryNav} ${styles.diaryNavNext}`}
              onClick={() =>
                setTestimonialIdx((i) => (i + 1) % TRAVEL_TESTIMONIALS.length)
              }
              aria-label="Next postcard"
            >
              {I.arrowR(20)}
            </button>
          </div>

          <div className={styles.diaryDots}>
            {TRAVEL_TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.diaryDot} ${i === testimonialIdx ? styles.diaryDotOn : ""}`}
                onClick={() => setTestimonialIdx(i)}
                aria-label={`Show postcard ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Related trips ─── */}
      <section className={styles.bandWrap}>
        <div className={styles.bandInner}>
          <header className={styles.bandHead}>
            <span className={styles.kicker}>Keep exploring</span>
            <h2 className={styles.bandTitle}>Related <span className={styles.accent}>trips</span></h2>
          </header>
          <div className={styles.relGrid}>
            {related.map((r) => {
              const p = r.packages?.[0];
              return (
                <Link key={r.slug} href={`/destinations/${r.slug}`} className={styles.relCard}>
                  <div className={styles.relImg}>
                    <Image
                      src={img(r.image || r.imageKey, 600, 700)}
                      alt={r.name}
                      fill
                      sizes="(max-width: 900px) 45vw, 24vw"
                      className={styles.galImg}
                    />
                    <span className={styles.relPill}>{I.pin(11)} {r.country}</span>
                  </div>
                  <div className={styles.relBody}>
                    <h4>{r.name}</h4>
                    <span className={styles.relMeta}>{I.clock(12)} {p?.days || 5}D</span>
                    <span className={styles.relPrice}>From <strong>{r.fromPrice}</strong></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Share modal ─── */}
      {shareOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShareOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Share trip"
        >
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <header className={styles.modalHead}>
              <div>
                <h3 className={styles.modalTitle}>Share this trip</h3>
                <p className={styles.modalSub}>Send the {dest.name} trip to friends & family</p>
              </div>
              <button
                type="button"
                className={styles.modalClose}
                onClick={() => setShareOpen(false)}
                aria-label="Close"
              >
                {I.close(18)}
              </button>
            </header>

            <div className={styles.shareUrlRow}>
              <span className={styles.shareUrlIcon}>{I.share(14)}</span>
              <input
                id="share-url-input"
                type="text"
                readOnly
                value={shareUrl}
                onFocus={(e) => e.target.select()}
                className={styles.shareUrlInput}
              />
              <button
                type="button"
                className={`${styles.shareCopyBtn} ${copied ? styles.shareCopyOn : ""}`}
                onClick={copyShareUrl}
              >
                {copied ? <>{I.check(14, "currentColor")} Copied</> : <>{I.copy(14)} Copy</>}
              </button>
            </div>

            <div className={styles.shareDivider}><span>or share via</span></div>

            <div className={styles.shareGrid}>
              <a
                className={styles.shareSocial}
                href={`https://wa.me/?text=${encodeURIComponent(`Check this ${dest.name} trip on MyHolidayBro: ${shareUrl}`)}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.shareSocialIcon} style={{ background: "#25D366" }}>
                  {I.whatsapp(18)}
                </span>
                WhatsApp
              </a>
              <a
                className={styles.shareSocial}
                href={`mailto:?subject=${encodeURIComponent(`Check this ${dest.name} trip`)}&body=${encodeURIComponent(`Found this on MyHolidayBro:\n\n${shareUrl}`)}`}
              >
                <span className={styles.shareSocialIcon} style={{ background: "#ea4335" }}>
                  {I.mail(16)}
                </span>
                Email
              </a>
              <a
                className={styles.shareSocial}
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check this ${dest.name} trip on @MyHolidayBro`)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.shareSocialIcon} style={{ background: "#000" }}>
                  {I.twitter(15)}
                </span>
                X / Twitter
              </a>
              <a
                className={styles.shareSocial}
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.shareSocialIcon} style={{ background: "#1877F2" }}>
                  {I.facebook(15)}
                </span>
                Facebook
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─── Lightbox ─── */}
      {lightbox !== null && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className={`${styles.lbBtn} ${styles.lbClose}`}
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            aria-label="Close viewer"
          >
            {I.close()}
          </button>
          <button
            type="button"
            className={`${styles.lbBtn} ${styles.lbPrev}`}
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="Previous photo"
          >
            {I.arrowL()}
          </button>
          <button
            type="button"
            className={`${styles.lbBtn} ${styles.lbNext}`}
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="Next photo"
          >
            {I.arrowR()}
          </button>
          <figure
            className={styles.lbFrame}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={img(allImages[lightbox], 1600, 1100)}
              alt={`${dest.name} photo ${lightbox + 1}`}
              fill
              sizes="92vw"
              className={styles.lbImg}
              priority
            />
            <figcaption className={styles.lbCount}>
              {lightbox + 1} / {allImages.length}
            </figcaption>
          </figure>
          <div className={styles.lbThumbs} onClick={(e) => e.stopPropagation()}>
            {allImages.map((k, i) => (
              <button
                key={k + i}
                type="button"
                className={`${styles.lbThumb} ${i === lightbox ? styles.lbThumbOn : ""}`}
                onClick={() => setLightbox(i)}
                aria-label={`Go to photo ${i + 1}`}
              >
                <Image
                  src={img(k, 200, 200)}
                  alt=""
                  fill
                  sizes="80px"
                  className={styles.galImg}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

/* ─────────── Sub-components ─────────── */

function Section({ kicker, title, children, id }) {
  return (
    <section className={styles.section} id={id}>
      {kicker && <span className={styles.sectionKicker}>{kicker}</span>}
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

