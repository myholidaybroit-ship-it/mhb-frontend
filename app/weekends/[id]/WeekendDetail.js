"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import WishlistButton from "../../components/WishlistButton";
import { WEEKEND_TRIPS } from "../../data/weekends";
import styles from "./WeekendDetail.module.css";

const sv = (path, sw = 2) => (s = 18) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>{path}</svg>
);
const I = {
  pin: sv(<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>),
  clock: sv(<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>),
  star: (s = 14) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="#f59e0b" aria-hidden><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
  check: sv(<><path d="M20 6 9 17l-5-5" /></>, 2.4),
  bus: sv(<><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 12h18M7 18v2M17 18v2" /><circle cx="7" cy="15" r="1" /><circle cx="17" cy="15" r="1" /></>),
  bed: sv(<><path d="M3 7v14M21 21V11a4 4 0 0 0-4-4H3" /><circle cx="8" cy="12" r="2" /></>),
  utensils: sv(<><path d="M3 2v7a3 3 0 0 0 6 0V2M6 9v13M14 2v20M14 12h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v8Z" /></>),
  ticket: sv(<><path d="M2 9V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4Z" /><path d="M13 5v14" /></>),
  arrow: sv(<><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></>, 2.4),
  share: sv(<><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" /></>),
};

const INCLUSIONS = [
  { icon: "bus", text: "Round-trip transport from your city" },
  { icon: "bed", text: "Stay in vetted boutique properties" },
  { icon: "utensils", text: "Daily breakfast included" },
  { icon: "ticket", text: "Activities & entry tickets covered" },
];

const EXCLUSIONS = [
  "Personal expenses (laundry, calls, tips)",
  "Lunches & dinners unless mentioned",
  "Any activity not in the itinerary",
  "Travel insurance",
];

function Day({ n, title, body, open, onClick }) {
  return (
    <article className={`${styles.day} ${open ? styles.dayOpen : ""}`}>
      <button type="button" className={styles.dayHead} onClick={onClick} aria-expanded={open}>
        <span className={styles.dayN}>Day {n}</span>
        <span className={styles.dayTitle}>{title}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} aria-hidden>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && <div className={styles.dayBody}>{body}</div>}
    </article>
  );
}

// Generic Cloudinary photo pool for the gallery — mixed with the trip's own hero image
const GALLERY_POOL = [
  "https://res.cloudinary.com/dyxxkrq8r/image/upload/v1779220324/WhatsApp_Image_2026-05-16_at_1.32.35_PM_gmlnpp.jpg",
  "https://res.cloudinary.com/dyxxkrq8r/image/upload/v1779220324/WhatsApp_Image_2026-05-16_at_1.32.34_PM_eyigio.jpg",
  "https://res.cloudinary.com/dyxxkrq8r/image/upload/v1779220324/WhatsApp_Image_2026-05-16_at_1.32.34_PM_1_buerwk.jpg",
  "https://res.cloudinary.com/dyxxkrq8r/image/upload/v1779220324/WhatsApp_Image_2026-05-16_at_1.22.01_PM_y8n52r.jpg",
  "https://res.cloudinary.com/dyxxkrq8r/image/upload/v1779220323/WhatsApp_Image_2026-05-16_at_1.22.01_PM_2_htpd1q.jpg",
  "https://res.cloudinary.com/dyxxkrq8r/image/upload/v1779220323/WhatsApp_Image_2026-05-16_at_1.22.00_PM_ij9msi.jpg",
  "https://res.cloudinary.com/dyxxkrq8r/image/upload/v1779220323/WhatsApp_Image_2026-05-16_at_1.22.01_PM_1_jhjtxh.jpg",
  "https://res.cloudinary.com/dyxxkrq8r/image/upload/v1779220323/WhatsApp_Image_2026-05-16_at_1.21.56_PM_xizioz.jpg",
  "https://res.cloudinary.com/dyxxkrq8r/image/upload/v1779220322/WhatsApp_Image_2026-05-16_at_1.19.05_PM_yvw52x.jpg",
  "https://res.cloudinary.com/dyxxkrq8r/image/upload/v1779220322/WhatsApp_Image_2026-05-16_at_1.20.03_PM_gq7ecr.jpg",
];

function buildGallery(trip) {
  // Use the trip's hero first, then 9 more from the pool — rotated by id so each
  // trip's gallery feels different even with a shared pool.
  const seed = (trip.id || "x").charCodeAt(0) % GALLERY_POOL.length;
  const rotated = [...GALLERY_POOL.slice(seed), ...GALLERY_POOL.slice(0, seed)];
  return [trip.image, ...rotated.filter((u) => u !== trip.image)].slice(0, 10);
}

function defaultItinerary(trip) {
  // Generate a plausible 3-day itinerary from trip data if none is provided.
  const base = [
    {
      n: 1,
      title: `Arrive in ${trip.to.split("·")[0].trim()}`,
      body: `Pickup from ${trip.from} early morning. Drive to ${trip.to.split("·")[0].trim()} with a coffee stop. Check in to your boutique stay, freshen up, and head out for a relaxed local-walk + dinner.`,
    },
    {
      n: 2,
      title: `Highlights of ${trip.to}`,
      body: `A guided day across the trip's headline spots — ${trip.highlights?.join(", ") || "scenic viewpoints and the most-loved attractions"}. Lunch at a local favourite. Evening at leisure with optional bonfire add-on.`,
    },
    {
      n: 3,
      title: `Slow morning, drive back to ${trip.from}`,
      body: `Late breakfast, last walk through the property or nearby market, then a comfortable drive back to ${trip.from} — usually back home before dinner.`,
    },
  ];
  return base;
}

export default function WeekendDetail({ trip }) {
  const [openDay, setOpenDay] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const itinerary = defaultItinerary(trip);
  const gallery = buildGallery(trip);

  function update(k, v) { setForm((f) => ({ ...f, [k]: v })); }
  function onSubmit(e) { e.preventDefault(); setSubmitted(true); }

  useEffect(() => {
    if (!galleryOpen) return;
    function onKey(e) {
      if (e.key === "Escape") setGalleryOpen(false);
      else if (e.key === "ArrowLeft") setGalleryIdx((i) => (i - 1 + gallery.length) % gallery.length);
      else if (e.key === "ArrowRight") setGalleryIdx((i) => (i + 1) % gallery.length);
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [galleryOpen, gallery.length]);

  const related = WEEKEND_TRIPS.filter((t) => t.id !== trip.id).slice(0, 3);

  const faqs = [
    { q: "How do I get picked up?", a: `Pickup from ${trip.from} happens early morning on Day 1. We share the exact point + driver contact 24 hours before.` },
    { q: "Can I extend by a day?", a: "Absolutely — message your trip captain. We rebuild the plan and add the extra night's stay + transport at cost." },
    { q: "What's the cancellation policy?", a: "Free up to 14 days before departure. 50% refund 7–14 days out. After that, the booking is non-refundable but transferable." },
    { q: "Is this trip safe for solo travellers?", a: "Yes. Most weekend trips have 60–70% solo travellers. The group is small (usually 8–12) and the trip captain is on-call throughout." },
  ];

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.heroWrap}>
        <div className={styles.heroFrame}>
          <Image
            src={trip.image}
            alt={trip.name}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay} aria-hidden />
          <div className={styles.heroTopRow}>
            <Link href="/weekends" className={styles.backChip}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m15 18-6-6 6-6" />
              </svg>
              All weekend trips
            </Link>
            <WishlistButton
              size="lg"
              item={{
                id: `weekend:${trip.id}`,
                kind: "weekend",
                name: trip.name,
                subtitle: trip.subtitle,
                price: trip.salePrice,
                image: trip.image,
                href: `/weekends/${trip.id}`,
                days: trip.days,
              }}
            />
          </div>
          <div className={styles.heroBottom}>
            <span className={styles.heroTag}>{trip.tag}</span>
            <h1 className={styles.heroTitle}>{trip.name}</h1>
            <span className={styles.heroSub}>{trip.subtitle}</span>
            <div className={styles.heroMeta}>
              <span className={styles.metaPill}>{I.pin(13)} {trip.to}</span>
              <span className={styles.metaPill}>{I.clock(13)} {trip.days} days · {trip.nights} nights</span>
              <span className={styles.metaPill}>{I.star(13)} <strong>{trip.rating.toFixed(1)}</strong> ({trip.reviews})</span>
              <span className={styles.metaPill}>Best · {trip.bestTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className={styles.bodyWrap}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Left column */}
            <div className={styles.main}>
              <div className={styles.card}>
                <span className={styles.kicker}>About the trip</span>
                <p className={styles.about}>{trip.description}</p>
                <div className={styles.highlightsRow}>
                  {(trip.highlights || []).map((h) => (
                    <span key={h} className={styles.highlightChip}>
                      <span className={styles.highlightDot} /> {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.card}>
                <span className={styles.kicker}>Day-by-day plan</span>
                <h2 className={styles.h2}>{trip.days} days mapped out.</h2>
                <div className={styles.dayList}>
                  {itinerary.map((d, i) => (
                    <Day
                      key={d.n}
                      n={d.n}
                      title={d.title}
                      body={d.body}
                      open={openDay === i}
                      onClick={() => setOpenDay(openDay === i ? -1 : i)}
                    />
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div className={styles.card}>
                <div className={styles.galleryHead}>
                  <div>
                    <span className={styles.kicker}>Gallery</span>
                    <h2 className={styles.h2}>Postcards from this trip.</h2>
                  </div>
                  <button
                    type="button"
                    className={styles.expandBtn}
                    onClick={() => { setGalleryIdx(0); setGalleryOpen(true); }}
                  >
                    Expand gallery
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M3 8V3h5M21 8V3h-5M3 16v5h5M21 16v5h-5" />
                    </svg>
                  </button>
                </div>
                <div className={styles.galleryGrid}>
                  {gallery.slice(0, 5).map((src, i) => (
                    <button
                      type="button"
                      key={src + i}
                      className={`${styles.galleryTile} ${styles[`galleryTile${i + 1}`]}`}
                      onClick={() => { setGalleryIdx(i); setGalleryOpen(true); }}
                      aria-label={`Open gallery from photo ${i + 1}`}
                    >
                      <Image
                        src={src}
                        alt={`${trip.name} photo ${i + 1}`}
                        fill
                        sizes="(max-width: 700px) 50vw, 33vw"
                        className={styles.galleryImg}
                      />
                      {i === 4 && gallery.length > 5 && (
                        <span className={styles.galleryMore}>+{gallery.length - 5}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.card}>
                <span className={styles.kicker}>What's included</span>
                <div className={styles.incExc}>
                  <div>
                    <strong>Included</strong>
                    <ul>
                      {INCLUSIONS.map((it) => (
                        <li key={it.text}><span className={styles.checkOk}>{I.check(14)}</span> {it.text}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Not included</strong>
                    <ul>
                      {EXCLUSIONS.map((t) => (
                        <li key={t}><span className={styles.checkNo}>×</span> {t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.card}>
                <span className={styles.kicker}>FAQs</span>
                <h2 className={styles.h2}>Quick answers.</h2>
                <div className={styles.faqList}>
                  {faqs.map((f, i) => {
                    const open = openFaq === i;
                    return (
                      <div key={f.q} className={`${styles.faq} ${open ? styles.faqOpen : ""}`}>
                        <button type="button" className={styles.faqQ} onClick={() => setOpenFaq(open ? -1 : i)} aria-expanded={open}>
                          <span>{f.q}</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} aria-hidden>
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                        {open && <p className={styles.faqA}>{f.a}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right column — sticky booking card */}
            <aside className={styles.aside}>
              <div className={styles.bookCard}>
                <div className={styles.priceRow}>
                  <div className={styles.priceBlock}>
                    <span className={styles.priceFrom}>From</span>
                    <strong className={styles.priceNow}>{trip.salePrice}</strong>
                    <span className={styles.priceWas}>{trip.originalPrice}</span>
                  </div>
                  <span className={styles.savePill}>Save {trip.savings}</span>
                </div>
                <span className={styles.perPerson}>per person, twin sharing</span>

                {submitted ? (
                  <div className={styles.successBox}>
                    <strong>Got it, {form.name || "traveller"}.</strong>
                    <p>A trip captain will reach out on <strong>{form.phone}</strong> shortly with departure dates & a final quote.</p>
                  </div>
                ) : (
                  <form className={styles.form} onSubmit={onSubmit} noValidate>
                    <label className={styles.field}>
                      <span>Your name</span>
                      <input type="text" required value={form.name} onChange={(e) => update("name", e.target.value)} />
                    </label>
                    <label className={styles.field}>
                      <span>Email</span>
                      <input type="email" required placeholder="you@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
                    </label>
                    <label className={styles.field}>
                      <span>Phone</span>
                      <input type="tel" required placeholder="+91 98xxx xxxxx" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                    </label>
                    <button type="submit" className={styles.bookBtn}>
                      Request a callback
                      <span className={styles.bookBtnArrow}>{I.arrow(14)}</span>
                    </button>
                  </form>
                )}

                <a
                  href={`https://wa.me/919966698990?text=${encodeURIComponent(`Hey MHB, I'd love a quote for the ${trip.name} weekend trip.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.whatsBtn}
                >
                  Or WhatsApp us directly
                </a>

                <div className={styles.trustRow}>
                  <span>✓ Small groups</span>
                  <span>✓ 24×7 on-trip support</span>
                  <span>✓ Free changes upto 14 days</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Gallery lightbox */}
      {galleryOpen && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${trip.name} gallery`}
          onClick={() => setGalleryOpen(false)}
        >
          <button
            type="button"
            className={`${styles.lbBtn} ${styles.lbClose}`}
            onClick={(e) => { e.stopPropagation(); setGalleryOpen(false); }}
            aria-label="Close gallery"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.lbBtn} ${styles.lbPrev}`}
            onClick={(e) => { e.stopPropagation(); setGalleryIdx((i) => (i - 1 + gallery.length) % gallery.length); }}
            aria-label="Previous photo"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.lbBtn} ${styles.lbNext}`}
            onClick={(e) => { e.stopPropagation(); setGalleryIdx((i) => (i + 1) % gallery.length); }}
            aria-label="Next photo"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
          <figure className={styles.lbFigure} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lbImageWrap}>
              <Image
                key={galleryIdx}
                src={gallery[galleryIdx]}
                alt={`${trip.name} photo ${galleryIdx + 1}`}
                fill
                priority
                sizes="(max-width: 1000px) 100vw, 900px"
                className={styles.lbImage}
              />
            </div>
            <figcaption className={styles.lbCaption}>
              <span>{trip.name}</span>
              <span>{galleryIdx + 1} / {gallery.length}</span>
            </figcaption>
            <div className={styles.lbThumbs}>
              {gallery.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  className={`${styles.lbThumb} ${i === galleryIdx ? styles.lbThumbOn : ""}`}
                  onClick={() => setGalleryIdx(i)}
                  aria-label={`Go to photo ${i + 1}`}
                >
                  <Image src={src} alt="" fill sizes="80px" className={styles.lbThumbImg} />
                </button>
              ))}
            </div>
          </figure>
        </div>
      )}

      {/* Related */}
      <section className={styles.relWrap}>
        <div className={styles.container}>
          <div className={styles.relHead}>
            <span className={styles.kicker}>More weekend trips</span>
            <h2 className={styles.h2}>Other quick getaways travellers love.</h2>
          </div>
          <div className={styles.relGrid}>
            {related.map((t) => (
              <Link key={t.id} href={`/weekends/${t.id}`} className={styles.relCard}>
                <div className={styles.relImg}>
                  <Image src={t.image} alt={t.name} fill sizes="(max-width: 800px) 100vw, 33vw" className={styles.relImgEl} />
                  <span className={styles.relTag}>Save {t.savings}</span>
                </div>
                <div className={styles.relBody}>
                  <strong>{t.name}</strong>
                  <span>{t.subtitle}</span>
                  <div className={styles.relFoot}>
                    <span>{t.salePrice}</span>
                    <span className={styles.relCta}>Explore {I.arrow(12)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
