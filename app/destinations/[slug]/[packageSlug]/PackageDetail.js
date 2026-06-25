"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import QuoteForm from "../../../components/QuoteForm";
import IncludedExcluded from "../../../components/IncludedExcluded";
import Moments from "../../../components/Moments";
import { TravelIcon } from "../../../lib/travelIcons";
import { useWishlist } from "../../../components/WishlistContext";
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
  chevDown: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m6 9 6 6 6-6" />
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

export default function PackageDetail({ dest, pkg, content, moments = [] }) {
  const nights = pkg.nights ?? Math.max(0, (pkg.days || 1) - 1);

  // Strictly the package's OWN day-by-day itinerary — no destination fallback and
  // no synthesized filler days. If the package has none set in the admin, the
  // section is hidden (add days under Itinerary → this package in the admin).
  const itinDays = useMemo(
    () => (pkg.itinerary || []).filter((d) => d && (d.title || d.desc || (d.points || []).length)),
    [pkg]
  );

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

  // About is per-package — strictly the package's own intro, independent of the
  // destination's "About" (each can be different). Hidden when the package has none.
  const overview = pkg.overview || [];
  // Highlights come in two shapes: legacy destinations store plain strings,
  // while the admin form saves { text, icon } objects. Normalize to strings so
  // they render either way (rendering an object as a child crashes React).
  // Trip highlights are per-package — strictly the package's own (no destination
  // fallback). The section is hidden when the package has none set.
  const highlights = (pkg.highlights || [])
    .map((h) => (typeof h === "string" ? h : h?.text || ""))
    .filter(Boolean);

  // Rich content — prefer the package's own values, fall back to the destination,
  // then the global content singleton, so admin edits at any level reflect here.
  const idealFor = (pkg.idealFor || dest.idealFor || "")
    .split("·").map((s) => s.trim()).filter(Boolean);
  // FAQs and good-to-know are package-specific — managed separately from the
  // destination (no cross-fallback) so each page can show different content.
  const goodToKnow = pkg.goodToKnow || [];
  const faqs = (pkg.faqs || []).slice(0, 6);

  // Other packages in this destination, for cross-linking.
  const siblings = useMemo(
    () => withPackageSlugs(dest.packages || []).filter((p) => p.slug !== pkg.slug),
    [dest, pkg]
  );

  const galleryKeys = useMemo(() => {
    const seen = new Set();
    const out = [];
    [dest.image, dest.imageKey, ...(dest.galleryKeys || [])].forEach((k) => {
      if (k && !seen.has(k)) { seen.add(k); out.push(k); }
    });
    return out.slice(0, 4);
  }, [dest]);

  const now = priceNumber(pkg.price);
  const orig = pkg.original ? priceNumber(pkg.original) : 0;
  const savings = orig && now && orig > now ? orig - now : 0;

  const heroSrc = pickSrc(pkg.image || dest.image, dest.imageKey, 1600, 900);

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
      image: pickSrc(pkg.image || dest.image, dest.imageKey, 600, 600),
      href: `/destinations/${dest.slug}/${pkg.slug}`,
    });
  }

  const [openFaq, setOpenFaq] = useState(0);
  const [openDay, setOpenDay] = useState(0);

  // All packages in this destination (for the quote form's package dropdown),
  // with the current package preselected.
  const allPackages = useMemo(() => withPackageSlugs(dest.packages || []), [dest]);
  const currentPkgIdx = Math.max(0, allPackages.findIndex((p) => p.slug === pkg.slug));

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

            {idealFor.length > 0 && (
              <Block title="Who it's for">
                <div className={styles.whoRow}>
                  {idealFor.map((w) => (
                    <span key={w} className={styles.whoPill}>{w}</span>
                  ))}
                </div>
              </Block>
            )}

            {itinDays.length > 0 && (
            <Block title="Day-by-day itinerary" subtitle={`${pkg.days} days / ${nights} nights`}>
              <div className={styles.itinAcc}>
                {itinDays.map((d, i) => {
                  const open = openDay === i;
                  const points = (d.points || []).filter((p) => p && p.text);
                  return (
                    <div key={i} className={`${styles.itinItem} ${open ? styles.itinItemOpen : ""}`}>
                      <button
                        type="button"
                        className={styles.itinHead}
                        onClick={() => setOpenDay(open ? -1 : i)}
                        aria-expanded={open}
                      >
                        <span className={styles.itinDayBadge}>Day {d.day ?? i + 1}</span>
                        <span className={styles.itinHeadTitle}>{d.title}</span>
                        <span className={styles.itinChev}>{Icon.chevDown(18)}</span>
                      </button>
                      {open && (
                        <div className={styles.itinBody}>
                          {d.desc && <p className={styles.itinDesc}>{d.desc}</p>}
                          {points.length > 0 && (
                            <ul className={styles.itinPoints}>
                              {points.map((p, k) => (
                                <li key={k}>
                                  <span className={styles.itinPointIcon}>
                                    <TravelIcon name={p.icon || "mappin"} size={15} />
                                  </span>
                                  {p.text}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Block>
            )}

            {(inclusions.length > 0 || exclusions.length > 0) && (
              <Block title="What's included">
                <IncludedExcluded inclusions={inclusions} exclusions={exclusions} />
              </Block>
            )}

            {goodToKnow.length > 0 && (
              <Block title="Good to know">
                <div className={styles.factsGrid}>
                  {goodToKnow.map((f, i) => (
                    <div key={i} className={styles.factCard}>
                      <span className={styles.factLabel}>{f.label}</span>
                      <strong className={styles.factValue}>{f.value}</strong>
                    </div>
                  ))}
                </div>
              </Block>
            )}

            {faqs.length > 0 && (
              <Block title="Quick FAQs">
                <div className={styles.faqList}>
                  {faqs.map((f, i) => {
                    const open = openFaq === i;
                    return (
                      <div key={i} className={`${styles.faqRow} ${open ? styles.faqOpen : ""}`}>
                        <button type="button" className={styles.faqHead} onClick={() => setOpenFaq(open ? -1 : i)} aria-expanded={open}>
                          <span>{f.q}</span>
                          <span className={styles.faqIcon}>{open ? "–" : "+"}</span>
                        </button>
                        {open && <p className={styles.faqBody}>{f.a}</p>}
                      </div>
                    );
                  })}
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

              {pkg.pdf?.url ? (
                <a className={styles.pdfBtn} href={pkg.pdf.url} target="_blank" rel="noopener noreferrer" download>
                  {Icon.download(15)} {pkg.pdf.name || "Download package PDF"}
                </a>
              ) : (
                <span className={styles.pdfUnavailable}>
                  {Icon.download(15)} PDF not available for this package
                </span>
              )}
            </div>

            {/* Exact same enquiry form as the destination page */}
            <QuoteForm
              destName={dest.name}
              packages={allPackages}
              initialPkgIdx={currentPkgIdx}
              fallbackPkg={pkg}
            />
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
                      <Image src={pickSrc(p.image || dest.image, dest.imageKey, 500, 400)} alt={p.name} fill sizes="(max-width:700px) 90vw, 30vw" className={styles.heroImage} />
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

      {/* Traveller stories — the same section as the home page */}
      {moments?.length > 0 && (
        <Moments data={{ items: moments }} />
      )}
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
