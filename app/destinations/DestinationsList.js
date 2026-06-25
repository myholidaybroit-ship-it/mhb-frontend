"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useWishlist } from "../components/WishlistContext";
import { img } from "../lib/img";
import styles from "./DestinationsList.module.css";

/* ─────── Icons (inline) ─────── */

const Star = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#f59e0b" aria-hidden>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const Clock = (props) => (
  <svg width={props.size || 14} height={props.size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const Pin = (props) => (
  <svg width={props.size || 18} height={props.size || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const Calendar = (props) => (
  <svg width={props.size || 18} height={props.size || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const UsersTwo = (props) => (
  <svg width={props.size || 18} height={props.size || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M9 21v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 11l-3-3-3 3" />
  </svg>
);
const Heart = ({ active }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? "#dc2626" : "none"} stroke={active ? "#dc2626" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const SearchIcon = (props) => (
  <svg width={props.size || 16} height={props.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const ChevronDown = (props) => (
  <svg width={props.size || 14} height={props.size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const ChevronLeft = (props) => (
  <svg width={props.size || 18} height={props.size || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m15 18-6-6 6-6" />
  </svg>
);
const ChevronRight = (props) => (
  <svg width={props.size || 18} height={props.size || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m9 18 6-6-6-6" />
  </svg>
);
const Minus = (props) => (
  <svg width={props.size || 16} height={props.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14" />
  </svg>
);
const Plus = (props) => (
  <svg width={props.size || 16} height={props.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M12 5v14" />
  </svg>
);
const X = (props) => (
  <svg width={props.size || 12} height={props.size || 12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const ShareIcon = (props) => (
  <svg width={props.size || 16} height={props.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);
const DownloadIcon = (props) => (
  <svg width={props.size || 14} height={props.size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

/* ─────── Constants ─────── */

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const REGIONS = ["All regions", "India", "International"];

const STYLES = [
  "Mountains",
  "Beaches",
  "Heritage",
  "Desert",
  "Backpacking",
  "Spiritual",
  "City Lights",
  "Tropical",
];

const DURATIONS = [
  { id: "any", label: "Any duration" },
  { id: "short", label: "Up to 5 days", min: 0, max: 5 },
  { id: "mid", label: "6 – 8 days", min: 6, max: 8 },
  { id: "long", label: "9+ days", min: 9, max: 99 },
];

const SORTS = [
  { id: "popular", label: "Most popular" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "duration-asc", label: "Shortest first" },
];

/* ─── Static marketing content for the bottom bands ─── */

/* ─────── Helpers ─────── */

function priceNumber(str) {
  const n = parseInt(String(str).replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) ? n : Number.MAX_SAFE_INTEGER;
}

function destStyles(d) {
  // Themes are the new adventure-style tags (Mountains, Beaches, etc.). Falls
  // back to the legacy idealFor field for any destination missing themes.
  if (Array.isArray(d.themes) && d.themes.length) return d.themes;
  return (d.idealFor || "").split("·").map((s) => s.trim()).filter(Boolean);
}

function badgeFor(d, i) {
  if (i % 5 === 0) return { label: "Filling fast", tone: "hot" };
  if (i % 5 === 1) return { label: "Best seller", tone: "ok" };
  if (i % 5 === 3) return { label: "New itinerary", tone: "info" };
  return null;
}

const MONTH_IDX = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

function monthIdx(name) {
  return MONTH_IDX[name.trim().toLowerCase().slice(0, 3)];
}

function rangeToSet(start, end) {
  const set = new Set();
  let m = start;
  // walk forward wrapping around 12
  for (let i = 0; i < 13; i++) {
    set.add(m);
    if (m === end) break;
    m = (m + 1) % 12;
  }
  return set;
}

function parseBestTime(str) {
  if (!str || /year[-\s]?round/i.test(str)) {
    return new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  }
  const set = new Set();
  str.split(",").forEach((part) => {
    const m = part.trim().match(/([A-Za-z]+)\s*[–\-—]\s*([A-Za-z]+)/);
    if (m) {
      const a = monthIdx(m[1]);
      const b = monthIdx(m[2]);
      if (a !== undefined && b !== undefined) {
        rangeToSet(a, b).forEach((x) => set.add(x));
      }
    } else {
      const single = part.trim().match(/([A-Za-z]+)/);
      if (single) {
        const a = monthIdx(single[1]);
        if (a !== undefined) set.add(a);
      }
    }
  });
  return set;
}

function formatMonth(m) {
  if (!m) return "Any month";
  return `${MONTHS_SHORT[m.month]} ${m.year}`;
}

function formatTravelers(adults, children) {
  const parts = [];
  parts.push(`${adults} Adult${adults === 1 ? "" : "s"}`);
  if (children > 0) parts.push(`${children} Child${children === 1 ? "" : "ren"}`);
  return parts.join(", ");
}

function nextMonths(count = 6) {
  const out = [];
  const d = new Date();
  for (let i = 0; i < count; i++) {
    out.push({ month: d.getMonth(), year: d.getFullYear() });
    d.setMonth(d.getMonth() + 1);
  }
  return out;
}

/* ─────── Filter sub-components ─────── */

function FilterCard({ title, children, openByDefault = false, rightSlot }) {
  const [open, setOpen] = useState(openByDefault);
  return (
    <div className={`${styles.filterCard} ${open ? styles.filterOpen : ""}`}>
      <button
        type="button"
        className={styles.filterHead}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className={styles.filterHeadRight}>
          {rightSlot}
          <span className={styles.filterChevron}>
            <ChevronDown />
          </span>
        </span>
      </button>
      {open && <div className={styles.filterBody}>{children}</div>}
    </div>
  );
}

function CheckRow({ type, name, checked, onChange, label, count }) {
  return (
    <label className={styles.checkRow}>
      <span className={styles.checkLeft}>
        <input
          type={type}
          name={name}
          checked={checked}
          onChange={onChange}
          className={type === "radio" ? styles.radioInput : styles.checkInput}
        />
        <span className={styles.checkBox} aria-hidden />
        <span className={styles.checkLabel}>{label}</span>
      </span>
      {count !== undefined && (
        <span className={styles.checkCount}>{count}</span>
      )}
    </label>
  );
}

/* ─────── Component ─────── */

export default function DestinationsList({ destinations }) {
  // Live list from the API (passed by the server page); falls back to the
  // bundled data if the API returned nothing.
  const LIST = destinations || [];
  // Headline search state — seed from ?where= so the home hero can deep-link.
  const searchParams = useSearchParams();
  const [where, setWhere] = useState(() => searchParams?.get("where") || "");
  const [month, setMonth] = useState(null); // {month, year} or null
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [openPicker, setOpenPicker] = useState(null); // null | 'where' | 'date' | 'travelers'
  const [pickerYear, setPickerYear] = useState(() => new Date().getFullYear());
  const [dropdownQuery, setDropdownQuery] = useState("");
  const dropdownInputRef = useRef(null);

  // Filter state
  const [region, setRegion] = useState("All regions");
  const [styleFilters, setStyleFilters] = useState(() => {
    // Pre-apply a style filter when arriving via /adventure-styles?style=Foo
    const initial = searchParams?.get("style");
    return initial ? [initial] : [];
  });
  const [maxDays, setMaxDays] = useState(15);
  const [maxPrice, setMaxPrice] = useState(150000);
  const [sort, setSort] = useState("popular");
  const { has: wishlistHas, toggle: wishlistToggle, hydrated: wishlistHydrated } = useWishlist();
  // Defer all interactive rendering until after client mount. This sidesteps an
  // SSR/client mismatch in the date pickers (new Date() crosses a month boundary)
  // that was bailing the entire tree out of hydration and leaving every button
  // (including the wishlist heart) dead.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const today = useMemo(() => {
    const d = new Date();
    return { month: d.getMonth(), year: d.getFullYear() };
  }, []);

  const searchRef = useRef(null);
  const resultsAnchor = useRef(null);
  const sentinelRef = useRef(null);

  // Infinite scroll: show 8 cards per page, IntersectionObserver loads more.
  const PAGE_SIZE = 8;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Close popovers on outside click + Escape
  useEffect(() => {
    if (!openPicker) return;
    function onDown(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setOpenPicker(null);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpenPicker(null);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openPicker]);

  // Autofocus the dropdown search when the destinations popover opens.
  useEffect(() => {
    if (openPicker === "where") {
      const id = setTimeout(() => dropdownInputRef.current?.focus(), 50);
      return () => clearTimeout(id);
    }
    setDropdownQuery("");
  }, [openPicker]);

  // Reset visible count whenever the filter inputs change.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [
    where,
    region,
    maxDays,
    maxPrice,
    sort,
    styleFilters.length,
    month?.month,
    month?.year,
  ]);

  // Scroll-based infinite loader. Listens once and reads the sentinel's
  // position on each scroll; when the sentinel enters the viewport (with a
  // 300px lead-in), bump the visible count by PAGE_SIZE.
  useEffect(() => {
    function onScroll() {
      const node = sentinelRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      if (rect.top - window.innerHeight < 300) {
        setVisibleCount((c) => c + PAGE_SIZE);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    // Also fire once on mount in case the sentinel is already on-screen.
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dropdownFiltered = useMemo(() => {
    const q = dropdownQuery.trim().toLowerCase();
    if (!q) return LIST;
    return LIST.filter((d) =>
      `${d.name} ${d.country} ${d.tagline} ${d.region}`.toLowerCase().includes(q)
    );
  }, [dropdownQuery]);

  function toggleStyle(s) {
    setStyleFilters((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  function toggleWish(d) {
    const pkg = d.packages?.[0];
    wishlistToggle({
      id: `destination:${d.slug}`,
      kind: "destination",
      name: d.name,
      subtitle: d.country,
      price: pkg?.price,
      image: img(d.image || d.imageKey, 600, 600),
      href: `/destinations/${d.slug}`,
    });
  }

  function clearAll() {
    setWhere("");
    setMonth(null);
    setAdults(2);
    setChildren(0);
    setRegion("All regions");
    setStyleFilters([]);
    setMaxDays(15);
    setMaxPrice(150000);
  }

  function runSearch() {
    setOpenPicker(null);
    resultsAnchor.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const filtered = useMemo(() => {
    const q = where.trim().toLowerCase();
    let list = LIST.filter((d) => {
      if (q && !`${d.name} ${d.country} ${d.tagline}`.toLowerCase().includes(q))
        return false;
      if (region !== "All regions" && d.region !== region) return false;
      if (styleFilters.length) {
        const has = destStyles(d);
        if (!styleFilters.some((s) => has.includes(s))) return false;
      }
      const days = d.packages[0]?.days || 0;
      if (days > maxDays) return false;
      const price = priceNumber(d.fromPrice);
      if (price > maxPrice) return false;
      if (month) {
        if (!parseBestTime(d.bestTime).has(month.month)) return false;
      }
      return true;
    });

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => priceNumber(a.fromPrice) - priceNumber(b.fromPrice));
        break;
      case "price-desc":
        list.sort((a, b) => priceNumber(b.fromPrice) - priceNumber(a.fromPrice));
        break;
      case "duration-asc":
        list.sort(
          (a, b) => (a.packages[0]?.days || 0) - (b.packages[0]?.days || 0)
        );
        break;
      default:
        break;
    }
    return list;
  }, [where, region, styleFilters, maxDays, maxPrice, sort, month]);

  const activeFilters = [
    region !== "All regions" && {
      key: "region",
      label: region,
      onClear: () => setRegion("All regions"),
    },
    maxDays < 15 && {
      key: "duration",
      label: `Up to ${maxDays} days`,
      onClear: () => setMaxDays(15),
    },
    maxPrice < 150000 && {
      key: "price",
      label: `Under ₹${maxPrice.toLocaleString("en-IN")}`,
      onClear: () => setMaxPrice(150000),
    },
    month && {
      key: "month",
      label: formatMonth(month),
      onClear: () => setMonth(null),
    },
    ...styleFilters.map((s) => ({
      key: "style-" + s,
      label: s,
      onClear: () => toggleStyle(s),
    })),
    where.trim() && {
      key: "where",
      label: `“${where.trim()}”`,
      onClear: () => setWhere(""),
    },
  ].filter(Boolean);

  if (!mounted) {
    return <main className={styles.page} aria-busy />;
  }

  return (
    <main className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <div className={styles.crumbInner}>
          <Link href="/">Home</Link>
          <span aria-hidden>›</span>
          <span className={styles.crumbCurrent}>Destinations</span>
        </div>
      </nav>

      {/* Hero — search bar only */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          {/* New 3-field search pill */}
          <div className={styles.searchBar} ref={searchRef}>
            {/* Where to — searchable destinations dropdown */}
            <div className={styles.fieldWrap}>
              <button
                type="button"
                className={styles.field}
                onClick={() =>
                  setOpenPicker((p) => (p === "where" ? null : "where"))
                }
                aria-haspopup="dialog"
                aria-expanded={openPicker === "where"}
              >
                <span className={styles.fieldIcon}><Pin /></span>
                <span className={styles.fieldText}>
                  <span className={styles.fieldLabel}>Where to?</span>
                  <span
                    className={`${styles.fieldValue} ${
                      !where ? styles.fieldValueMuted : ""
                    }`}
                  >
                    {where || "Anywhere"}
                  </span>
                </span>
              </button>
              {openPicker === "where" && (
                <div
                  className={`${styles.popover} ${styles.popoverWhere}`}
                  role="dialog"
                  aria-label="Pick a destination"
                >
                  <div className={styles.dropdownSearch}>
                    <SearchIcon size={16} />
                    <input
                      ref={dropdownInputRef}
                      type="search"
                      placeholder="Search destinations, country…"
                      value={dropdownQuery}
                      onChange={(e) => setDropdownQuery(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className={styles.dropdownAny}
                    onClick={() => {
                      setWhere("");
                      setOpenPicker(null);
                    }}
                  >
                    <span>
                      <strong>Any destination</strong>
                      <span className={styles.dropdownAnySub}>
                        Browse all {LIST.length} trips
                      </span>
                    </span>
                    <span className={styles.dropdownRegion}>
                      {where ? "Reset" : "Default"}
                    </span>
                  </button>
                  <div className={styles.dropdownList}>
                    {dropdownFiltered.map((d) => (
                      <button
                        key={d.slug}
                        type="button"
                        className={styles.dropdownItem}
                        onClick={() => {
                          setWhere(d.name);
                          setOpenPicker(null);
                        }}
                      >
                        <span className={styles.dropdownThumb}>
                          <Image
                            src={img(d.image || d.imageKey, 120, 120)}
                            alt={d.name}
                            fill
                            sizes="40px"
                          />
                        </span>
                        <span className={styles.dropdownItemText}>
                          <strong>{d.name}</strong>
                          <span>
                            {d.country} · from {d.fromPrice}
                          </span>
                        </span>
                        <span className={styles.dropdownRegion}>
                          {d.region}
                        </span>
                      </button>
                    ))}
                    {dropdownFiltered.length === 0 && (
                      <span className={styles.dropdownEmpty}>
                        No matches for &ldquo;{dropdownQuery}&rdquo;
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <span className={styles.searchDivider} aria-hidden />

            {/* Travel month */}
            <div className={styles.fieldWrap}>
              <button
                type="button"
                className={styles.field}
                onClick={() => {
                  setOpenPicker((p) => (p === "date" ? null : "date"));
                  setPickerYear(month?.year || today.year);
                }}
                aria-haspopup="dialog"
                aria-expanded={openPicker === "date"}
              >
                <span className={styles.fieldIcon}><Calendar /></span>
                <span className={styles.fieldText}>
                  <span className={styles.fieldLabel}>When</span>
                  <span
                    className={`${styles.fieldValue} ${
                      !month ? styles.fieldValueMuted : ""
                    }`}
                  >
                    {formatMonth(month)}
                  </span>
                </span>
              </button>
              {openPicker === "date" && (
                <div className={styles.popover} role="dialog" aria-label="Select departure month">
                  <h3 className={styles.popTitle}>Select departure month</h3>
                  <div className={styles.yearRow}>
                    <strong>{pickerYear}</strong>
                    <div className={styles.yearNav}>
                      <button
                        type="button"
                        className={styles.navBtn}
                        onClick={() => setPickerYear((y) => y - 1)}
                        disabled={pickerYear <= today.year}
                        aria-label="Previous year"
                      >
                        <ChevronLeft />
                      </button>
                      <button
                        type="button"
                        className={styles.navBtn}
                        onClick={() => setPickerYear((y) => y + 1)}
                        disabled={pickerYear >= today.year + 2}
                        aria-label="Next year"
                      >
                        <ChevronRight />
                      </button>
                    </div>
                  </div>
                  <div className={styles.monthGrid}>
                    {MONTHS_SHORT.map((label, i) => {
                      const past =
                        pickerYear < today.year ||
                        (pickerYear === today.year && i < today.month);
                      const selected =
                        month && month.year === pickerYear && month.month === i;
                      return (
                        <button
                          key={label}
                          type="button"
                          className={`${styles.monthTile} ${
                            past ? styles.monthPast : ""
                          } ${selected ? styles.monthOn : ""}`}
                          disabled={past}
                          onClick={() => {
                            setMonth({ month: i, year: pickerYear });
                            setOpenPicker(null);
                          }}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                  {month && (
                    <button
                      type="button"
                      className={styles.popClear}
                      onClick={() => {
                        setMonth(null);
                        setOpenPicker(null);
                      }}
                    >
                      Clear selection
                    </button>
                  )}
                </div>
              )}
            </div>

            <span className={styles.searchDivider} aria-hidden />

            {/* Travelers */}
            <div className={styles.fieldWrap}>
              <button
                type="button"
                className={styles.field}
                onClick={() =>
                  setOpenPicker((p) => (p === "travelers" ? null : "travelers"))
                }
                aria-haspopup="dialog"
                aria-expanded={openPicker === "travelers"}
              >
                <span className={styles.fieldIcon}><UsersTwo /></span>
                <span className={styles.fieldText}>
                  <span className={styles.fieldLabel}>Travellers</span>
                  <span className={styles.fieldValue}>
                    {formatTravelers(adults, children)}
                  </span>
                </span>
              </button>
              {openPicker === "travelers" && (
                <div
                  className={`${styles.popover} ${styles.popoverTravelers}`}
                  role="dialog"
                  aria-label="Who is travelling"
                >
                  <h3 className={styles.popTitle}>Who is travelling?</h3>
                  <div className={styles.travRow}>
                    <div className={styles.travText}>
                      <strong>Adults</strong>
                      <span>Ages 18 or above</span>
                    </div>
                    <div className={styles.stepper}>
                      <button
                        type="button"
                        className={styles.stepBtn}
                        onClick={() => setAdults((n) => Math.max(1, n - 1))}
                        disabled={adults <= 1}
                        aria-label="Decrease adults"
                      >
                        <Minus />
                      </button>
                      <span className={styles.stepCount}>{adults}</span>
                      <button
                        type="button"
                        className={styles.stepBtn}
                        onClick={() => setAdults((n) => Math.min(20, n + 1))}
                        aria-label="Increase adults"
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                  <div className={styles.travRow}>
                    <div className={styles.travText}>
                      <strong>Children</strong>
                      <span>Under 18</span>
                    </div>
                    <div className={styles.stepper}>
                      <button
                        type="button"
                        className={styles.stepBtn}
                        onClick={() => setChildren((n) => Math.max(0, n - 1))}
                        disabled={children <= 0}
                        aria-label="Decrease children"
                      >
                        <Minus />
                      </button>
                      <span className={styles.stepCount}>{children}</span>
                      <button
                        type="button"
                        className={styles.stepBtn}
                        onClick={() => setChildren((n) => Math.min(20, n + 1))}
                        aria-label="Increase children"
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles.applyBtn}
                    onClick={() => setOpenPicker(null)}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            <button type="button" className={styles.searchBtn} onClick={runSearch}>
              <SearchIcon /> Search
            </button>
          </div>
        </div>
      </section>

      {/* Body — sidebar filters + results column */}
      <section className={styles.listBody} ref={resultsAnchor}>
        <div className={styles.listInner}>
          {/* Sidebar filters */}
          <aside className={styles.sidebar} aria-label="Filters">
            {activeFilters.length > 0 && (
              <FilterCard
                title="Applied filters"
                openByDefault
                rightSlot={
                  <button
                    type="button"
                    className={styles.cardClear}
                    onClick={clearAll}
                  >
                    Clear all
                  </button>
                }
              >
                <div className={styles.appliedList}>
                  {activeFilters.map((f) => (
                    <button
                      key={f.key}
                      type="button"
                      className={styles.appliedChip}
                      onClick={f.onClear}
                    >
                      {f.label} <X />
                    </button>
                  ))}
                </div>
              </FilterCard>
            )}

            <FilterCard title="Sort by" openByDefault>
              <div className={styles.selectWrap}>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className={styles.sortSelect}
                  aria-label="Sort destinations by"
                >
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
                <span className={styles.selectChev} aria-hidden>
                  <ChevronDown />
                </span>
              </div>
            </FilterCard>

            <FilterCard title="Region" openByDefault>
              <div className={styles.segmented}>
                {REGIONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    className={`${styles.segBtn} ${region === r ? styles.segBtnOn : ""}`}
                    onClick={() => setRegion(r)}
                  >
                    {r === "All regions" ? "All" : r}
                  </button>
                ))}
              </div>
            </FilterCard>

            <FilterCard title="Duration" openByDefault>
              <div className={styles.sliderBlock}>
                <div className={styles.sliderHead}>
                  <span className={styles.sliderValue}>
                    Up to <strong>{maxDays}</strong> days
                  </span>
                  <span className={styles.sliderRange}>1 — 15</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={maxDays}
                  onChange={(e) => setMaxDays(Number(e.target.value))}
                  className={styles.slider}
                  style={{ "--p": `${((maxDays - 1) / 14) * 100}%` }}
                  aria-label="Maximum trip length in days"
                />
                <div className={styles.sliderTicks} aria-hidden>
                  <span>1</span><span>5</span><span>10</span><span>15</span>
                </div>
              </div>
            </FilterCard>

            <FilterCard title="Departure month" openByDefault>
              <div className={styles.chipsRow}>
                <button
                  type="button"
                  className={`${styles.filterChip} ${!month ? styles.filterChipOn : ""}`}
                  onClick={() => setMonth(null)}
                >
                  Any
                </button>
                {nextMonths(6).map((m) => {
                  const isOn =
                    month && month.month === m.month && month.year === m.year;
                  return (
                    <button
                      key={`${m.year}-${m.month}`}
                      type="button"
                      className={`${styles.filterChip} ${isOn ? styles.filterChipOn : ""}`}
                      onClick={() =>
                        setMonth(isOn ? null : { month: m.month, year: m.year })
                      }
                    >
                      {MONTHS_SHORT[m.month]}
                    </button>
                  );
                })}
              </div>
            </FilterCard>

            <FilterCard title="Budget (per person)" openByDefault>
              <div className={styles.sliderBlock}>
                <div className={styles.sliderHead}>
                  <span className={styles.sliderValue}>
                    Under <strong>₹{maxPrice.toLocaleString("en-IN")}</strong>
                  </span>
                  <span className={styles.sliderRange}>₹5k — ₹1.5L</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="150000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className={styles.slider}
                  style={{ "--p": `${((maxPrice - 5000) / 145000) * 100}%` }}
                  aria-label="Maximum budget per person"
                />
                <div className={styles.sliderTicks} aria-hidden>
                  <span>₹5k</span><span>₹50k</span><span>₹1L</span><span>₹1.5L</span>
                </div>
              </div>
            </FilterCard>

            <FilterCard title="Adventure style">
              <div className={styles.chipsRow}>
                {STYLES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`${styles.filterChip} ${styleFilters.includes(s) ? styles.filterChipOn : ""}`}
                    onClick={() => toggleStyle(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </FilterCard>
          </aside>

          {/* Results column */}
          <div className={styles.resultsCol}>
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <strong>No trips match those filters.</strong>
                <p>Try clearing a filter or broadening your search.</p>
                <button
                  type="button"
                  className={styles.emptyBtn}
                  onClick={clearAll}
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className={styles.resultList}>
                {filtered.slice(0, visibleCount).map((d, i) => {
                  const wished = wishlistHydrated && wishlistHas(`destination:${d.slug}`);
                  const badge = badgeFor(d, i);
                  const pkg = d.packages[0];
                  const discount =
                    pkg?.original &&
                    Math.round(
                      ((priceNumber(pkg.original) - priceNumber(pkg.price)) /
                        priceNumber(pkg.original)) *
                        100
                    );
                  return (
                    <article key={d.slug} className={styles.resultCard}>
                      <Link
                        href={`/destinations/${d.slug}`}
                        className={styles.resultImg}
                        aria-label={`View ${d.name}`}
                      >
                        <Image
                          src={img(d.image || d.imageKey, 600, 600)}
                          alt={d.name}
                          fill
                          sizes="(max-width: 900px) 100vw, 280px"
                          className={styles.image}
                        />
                        <span className={styles.regionPill}>
                          <Pin size={12} /> {d.country}
                        </span>
                        {discount > 0 && (
                          <span className={styles.resultDiscount}>
                            {discount}% off
                          </span>
                        )}
                      </Link>

                      <div className={styles.resultMid}>
                        <Link
                          href={`/destinations/${d.slug}`}
                          className={styles.resultTitleLink}
                        >
                          <h3 className={styles.resultTitle}>{d.name}</h3>
                        </Link>
                        <div className={styles.resultMetaLine}>
                          <span className={styles.metaChip}>
                            <Clock /> {pkg?.days || 5} days
                          </span>
                          {d.packages.length > 1 && (
                            <span className={styles.metaChip}>
                              {d.packages.length} packages
                            </span>
                          )}
                        </div>
                      </div>

                      <div className={styles.resultRight}>
                        <button
                          type="button"
                          className={`${styles.resultWish} ${
                            wished ? styles.resultWishOn : ""
                          }`}
                          onClick={() => toggleWish(d)}
                          aria-label={
                            wished
                              ? "Remove from wishlist"
                              : "Save to wishlist"
                          }
                          aria-pressed={wished}
                        >
                          <Heart active={wished} />
                        </button>
                        <span className={styles.resultPriceBlock}>
                          {pkg?.original && (
                            <span className={styles.resultStrike}>
                              {pkg.original}
                            </span>
                          )}
                          <span className={styles.resultPrice}>
                            {pkg?.price || d.fromPrice}
                          </span>
                          <span className={styles.resultUnit}>per person</span>
                        </span>
                        <Link
                          href={`/destinations/${d.slug}`}
                          className={styles.resultCta}
                        >
                          View trip
                        </Link>
                      </div>
                    </article>
                  );
                })}
                {visibleCount < filtered.length ? (
                  <div ref={sentinelRef} className={styles.scrollSentinel}>
                    <span className={styles.scrollDot} />
                    <span className={styles.scrollDot} />
                    <span className={styles.scrollDot} />
                    <span className={styles.scrollText}>
                      Loading more trips…
                    </span>
                  </div>
                ) : (
                  filtered.length > PAGE_SIZE && (
                    <div className={styles.scrollEnd}>
                      You&apos;ve seen all {filtered.length} trips.
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
