"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import MonthPicker from "../../../components/MonthPicker";
import { useWishlist } from "../../../components/WishlistContext";
import { forms } from "../../../lib/api";
import { img } from "../../../lib/img";
import { withPackageSlugs } from "../../../lib/packages";
import styles from "./PackageDetail.module.css";

/* ── Inline icons ── */
const Icon = {
  pin: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  clock: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  cal: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  star: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="#f59e0b" aria-hidden>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  check: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  cross: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  download: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  heart: (active) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? "#dc2626" : "none"} stroke={active ? "#dc2626" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
};

/* ── Helpers ── */
function priceNumber(str) {
  const n = parseInt(String(str ?? "").replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}
const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

// Pick a usable image src: a full URL set in admin, else the Wix CDN key.
function pickSrc(maybeUrl, key, w = 1200, h = 800) {
  if (maybeUrl && /^https?:\/\//.test(maybeUrl)) return maybeUrl;
  return img(key, w, h);
}

export default function PackageDetail({ dest, pkg, content }) {
  const nights = pkg.nights ?? Math.max(0, (pkg.days || 1) - 1);

  // Itinerary: prefer the package's own day-by-day, else the destination's,
  // padded out to the package length so the count matches what's sold.
  const itinDays = useMemo(() => {
    const source =
      (pkg.itinerary?.length ? pkg.itinerary : dest.itinerary) || [];
    const base = source.slice(0, pkg.days).map((d) => ({ ...d }));
    while (base.length < (pkg.days || base.length)) {
      const day = base.length + 1;
      const last = day === pkg.days;
      base.push({
        day,
        title: last ? "Departure" : "Leisure & optional add-ons",
        desc: last
          ? "Breakfast at the hotel and your transfer to the airport."
          : "Free day for optional add-ons, spa or shopping — your advisor suggests options to suit you.",
      });
    }
    return base;
  }, [dest, pkg]);

  const inclusions = pkg.inclusions?.length
    ? pkg.inclusions
    : dest.inclusions?.length
    ? dest.inclusions
    : content?.inclusions || [];
  const exclusions = pkg.exclusions?.length
    ? pkg.exclusions
    : dest.exclusions?.length
    ? dest.exclusions
    : content?.exclusions || [];

  const overview =
    pkg.overview?.length ? pkg.overview : dest.overview || [];
  // Highlights come in two shapes: legacy destinations store plain strings,
  // while the admin form saves { text, icon } objects. Normalize to strings so
  // they render either way (rendering an object as a child crashes React).
  const highlights = (dest.highlights || [])
    .map((h) => (typeof h === "string" ? h : h?.text || ""))
    .filter(Boolean);

  // Other packages in this destination, for cross-linking.
  const siblings = useMemo(
    () => withPackageSlugs(dest.packages || []).filter((p) => p.slug !== pkg.slug),
    [dest, pkg]
  );

  const galleryKeys = useMemo(() => {
    const seen = new Set();
    const out = [];
    [dest.imageKey, ...(dest.galleryKeys || [])].forEach((k) => {
      if (k && !seen.has(k)) { seen.add(k); out.push(k); }
    });
    return out.slice(0, 4);
  }, [dest]);

  const now = priceNumber(pkg.price);
  const orig = pkg.original ? priceNumber(pkg.original) : 0;
  const savings = orig && now && orig > now ? orig - now : 0;

  const heroSrc = pickSrc(pkg.image, dest.imageKey, 1600, 900);

  // Wishlist
  const { has, toggle, hydrated } = useWishlist();
  const wishId = `package:${dest.slug}:${pkg.slug}`;
  const wished = hydrated && has(wishId);
  function toggleWish() {
    toggle({
      id: wishId,
      kind: "package",
      name: pkg.name,
      subtitle: dest.name,
      price: pkg.price,
      image: pickSrc(pkg.image, dest.imageKey, 600, 600),
      href: `/destinations/${dest.slug}/${pkg.slug}`,
    });
  }

  // Enquiry form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelMonth, setTravelMonth] = useState("");
  const [sent, setSent] = useState(false);
  function submitEnquiry(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;
    forms
      .enquiry({
        type: "quote",
        name,
        email,
        phone,
        travelMonth,
        destination: dest.name,
        package: `${pkg.name} — ${pkg.days}D/${nights}N · ${pkg.price}`,
      })
      .catch((err) => console.error("Package enquiry failed:", err.message));
    setSent(true);
  }

  return (
    <main className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <div className={styles.crumbInner}>
          <Link href="/">Home</Link>
          <span aria-hidden>›</span>
          <Link href="/destinations">Destinations</Link>
          <span aria-hidden>›</span>
          <Link href={`/destinations/${dest.slug}`}>{dest.name}</Link>
          <span aria-hidden>›</span>
          <span className={styles.crumbCurrent}>{pkg.name}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroImg}>
          <Image src={heroSrc} alt={pkg.name} fill priority sizes="100vw" className={styles.heroImage} />
          <div className={styles.heroOverlay} aria-hidden />
        </div>
        <div className={styles.heroInner}>
          {pkg.tag && <span className={styles.tagBadge}>{pkg.tag}</span>}
          <h1 className={styles.heroTitle}>{pkg.name}</h1>
          <div className={styles.heroMeta}>
            <span>{Icon.pin(15)} {pkg.route || dest.name}</span>
            <span>{Icon.clock(15)} {pkg.days}D / {nights}N</span>
            <span>{Icon.cal(15)} Best: {dest.bestTime || "Year-round"}</span>
            {dest.rating ? (
              <span>{Icon.star(14)} {Number(dest.rating).toFixed(1)} ({dest.reviews || 0})</span>
            ) : null}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className={styles.body}>
        <div className={styles.bodyGrid}>
          {/* Main column */}
          <div className={styles.main}>
            {overview.length > 0 && (
              <Block title={`About the ${pkg.name}`}>
                {overview.map((p, i) => (
                  <p key={i} className={styles.para}>{p}</p>
                ))}
              </Block>
            )}

            {galleryKeys.length > 1 && (
              <div className={styles.gallery}>
                {galleryKeys.map((k, i) => (
                  <div key={k + i} className={styles.galleryCell}>
                    <Image src={img(k, 600, 600)} alt={`${dest.name} ${i + 1}`} fill sizes="(max-width:700px) 50vw, 25vw" className={styles.heroImage} />
                  </div>
                ))}
              </div>
            )}

            {highlights.length > 0 && (
              <Block title="Trip highlights">
                <ul className={styles.highlights}>
                  {highlights.map((h, i) => (
                    <li key={i}>{Icon.check(15)} <span>{h}</span></li>
                  ))}
                </ul>
              </Block>
            )}

            <Block title="Day-by-day itinerary" subtitle={`${pkg.days} days / ${nights} nights`}>
              <ol className={styles.itin}>
                {itinDays.map((d, i) => (
                  <li key={i} className={styles.itinRow}>
                    <span className={styles.itinDay}>Day {d.day ?? i + 1}</span>
                    <div className={styles.itinText}>
                      <strong>{d.title}</strong>
                      {d.desc && <p>{d.desc}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </Block>

            {(inclusions.length > 0 || exclusions.length > 0) && (
              <Block title="What's included">
                <div className={styles.incGrid}>
                  {inclusions.length > 0 && (
                    <div>
                      <h4 className={styles.incHead}>Included</h4>
                      <ul className={styles.incList}>
                        {inclusions.map((s, i) => (
                          <li key={i}>{Icon.check(15)} <span>{s}</span></li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {exclusions.length > 0 && (
                    <div>
                      <h4 className={styles.incHead}>Not included</h4>
                      <ul className={styles.incList}>
                        {exclusions.map((s, i) => (
                          <li key={i}>{Icon.cross(15)} <span>{s}</span></li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Block>
            )}

            <Link href={`/destinations/${dest.slug}`} className={styles.backLink}>
              ← See all {dest.name} packages
            </Link>
          </div>

          {/* Sticky sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.priceCard}>
              <div className={styles.priceRow}>
                <div>
                  {orig > 0 && <span className={styles.strike}>{inr(orig)}</span>}
                  <span className={styles.price}>{pkg.price}</span>
                  <span className={styles.priceUnit}>per person</span>
                </div>
                <button
                  type="button"
                  className={`${styles.wishBtn} ${wished ? styles.wishOn : ""}`}
                  onClick={toggleWish}
                  aria-pressed={wished}
                  aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
                >
                  {Icon.heart(wished)}
                </button>
              </div>
              {savings > 0 && (
                <span className={styles.savings}>You save {inr(savings)}</span>
              )}

              {pkg.pdf?.url && (
                <a className={styles.pdfBtn} href={pkg.pdf.url} target="_blank" rel="noopener noreferrer">
                  {Icon.download(15)} {pkg.pdf.name || "Download brochure"}
                </a>
              )}

              <div className={styles.divider} aria-hidden />

              {sent ? (
                <div className={styles.thanks}>
                  <strong>Thanks, {name.split(" ")[0] || "traveller"}!</strong>
                  <p>Our advisor will reach out shortly with a tailored quote for the {pkg.name}.</p>
                </div>
              ) : (
                <form className={styles.form} onSubmit={submitEnquiry}>
                  <h3 className={styles.formTitle}>Get a free quote</h3>
                  <input className={styles.input} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
                  <input className={styles.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <input className={styles.input} type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  <MonthPicker value={travelMonth} onChange={setTravelMonth} placeholder="Travel month" />
                  <button type="submit" className={styles.cta}>Request quote</button>
                  <p className={styles.formNote}>No spam — just a quick, personalised plan.</p>
                </form>
              )}
            </div>
          </aside>
        </div>

        {/* Other packages */}
        {siblings.length > 0 && (
          <div className={styles.siblings}>
            <h2 className={styles.siblingsTitle}>Other {dest.name} packages</h2>
            <div className={styles.siblingsGrid}>
              {siblings.map((p) => {
                const pOrig = p.original ? priceNumber(p.original) : 0;
                return (
                  <Link key={p.slug} href={`/destinations/${dest.slug}/${p.slug}`} className={styles.sibCard}>
                    <div className={styles.sibImg}>
                      <Image src={pickSrc(p.image, dest.imageKey, 500, 400)} alt={p.name} fill sizes="(max-width:700px) 90vw, 30vw" className={styles.heroImage} />
                    </div>
                    <div className={styles.sibInfo}>
                      <strong>{p.name}</strong>
                      <span className={styles.sibMeta}>{Icon.clock(13)} {p.days}D / {p.nights ?? Math.max(0, p.days - 1)}N</span>
                      <div className={styles.sibPrice}>
                        {pOrig > 0 && <span className={styles.sibStrike}>{inr(pOrig)}</span>}
                        <span>{p.price}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function Block({ title, subtitle, children }) {
  return (
    <section className={styles.block}>
      <div className={styles.blockHead}>
        <h2 className={styles.blockTitle}>{title}</h2>
        {subtitle && <span className={styles.blockSub}>{subtitle}</span>}
      </div>
      {children}
    </section>
  );
}
