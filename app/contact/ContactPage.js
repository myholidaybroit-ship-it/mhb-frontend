"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./ContactPage.module.css";
import { forms } from "../lib/api";

const C = (path) => `https://res.cloudinary.com/dyxxkrq8r/image/upload/${path}`;

/* ─────────── Icons ─────────── */
const sv = (path, { fill = "none", sw = 2 } = {}) => (s) =>
  (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke={fill === "none" ? "currentColor" : "none"} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {path}
    </svg>
  );

const I = {
  phone: sv(<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />),
  mail: sv(<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></>),
  wa: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.17-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52ZM12 22a9.93 9.93 0 0 1-5.07-1.39l-.36-.21-3.66.96.98-3.57-.24-.37A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10Zm5.46-7.54c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.58-.9-2.16-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  ),
  pin: sv(<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>),
  arrow: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  ),
  cam: sv(<><path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" /></>),
  book: sv(<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></>),
  chat: sv(<path d="M21 12a8 8 0 0 1-11.6 7.15L4 21l1.85-5.4A8 8 0 1 1 21 12Z" />),
  pen: sv(<><path d="M12 19l7-7 3 3-7 7H12v-3Z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5Z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></>),

  /* ── Category icons ── */
  sparkle: sv(<><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></>, { sw: 2.2 }),
  globe: sv(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>),
  beach: sv(<><path d="M12 4a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8Z" /><path d="M12 4v16" /><path d="M3 20h18" /></>),
  heart: sv(<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />),
  family: sv(<><circle cx="9" cy="7" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" /><path d="M14 20v-1a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v1" /></>),
  mountain: sv(<><path d="M3 20h18L14 8l-3 5-2-3-6 10Z" /><circle cx="17" cy="6" r="1.6" /></>),
  sun: sv(<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>),
  girls: sv(<><circle cx="9" cy="7" r="3" /><circle cx="17" cy="7" r="3" /><path d="M3 21v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" /><path d="M13 21v-1a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v1" /></>),
  plane: sv(<path d="M22 16v-2l-8.5-5V3.5a1.5 1.5 0 0 0-3 0V9L2 14v2l8.5-2.5V19L8 20.5v1.5l4-1 4 1V20.5L13.5 19v-5.5L22 16Z" fill="currentColor" sw={0} />, { fill: "currentColor", sw: 0 }),
  flag: sv(<><path d="M4 22V3" /><path d="M4 4h14l-2.5 4L18 12H4" /></>),
  briefcase: sv(<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M2 13h20" /></>),
  cap: sv(<><path d="M22 10 12 4 2 10l10 6 10-6Z" /><path d="M6 12v5c2 1.5 4 2 6 2s4-.5 6-2v-5" /></>),
};


export default function ContactPage({ content, settings }) {
  const heroCollage = content?.heroCollage || [];
  const companions = content?.companions || [];
  const quickLinks = content?.quickLinks || [];

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
  });

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    forms
      .enquiry({
        type: "contact",
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.query,
      })
      .catch((err) => console.error("Contact enquiry failed:", err.message));
    setSubmitted(true);
  }

  return (
    <main className={styles.page}>
      {/* ─── Hero banner ─── */}
      <section className={styles.heroWrap}>
        <div className={styles.heroFrame}>
          <div className={styles.heroCollage} aria-hidden>
            {heroCollage.map((src, i) => (
              <span key={i} className={`${styles.heroTile} ${styles[`heroTile${i + 1}`]}`}>
                <Image
                  src={src}
                  alt=""
                  fill
                  priority={i < 4}
                  sizes="(max-width: 700px) 50vw, 25vw"
                  className={styles.heroTileImg}
                />
              </span>
            ))}
          </div>
          <div className={styles.heroOverlay} aria-hidden />
        </div>

        <div className={styles.container}>
          <div className={styles.heroText}>
            <h1 className={styles.heroHeading}>
              Your next holiday is just a{" "}
              <span className={styles.headingAccent}>chat away</span>.
            </h1>
            <p className={styles.heroSub}>
              Got questions? Need travel tips? Want to share your latest trip story?
              We're all ears — MyHolidayBro isn't just about selling holidays, we're
              about crafting the ones you'll talk about for years. So let's start the
              conversation.
            </p>

            <div className={styles.heroQuickRow}>
              <a href={`tel:${settings?.supportPhone || ""}`} className={styles.heroQuickCard}>
                <span className={styles.heroQuickIcon}>{I.phone(20)}</span>
                <span className={styles.heroQuickMeta}>
                  <strong>{settings?.supportPhone}</strong>
                  <span>Call us · 9 AM – 11 PM IST</span>
                </span>
              </a>
              <a
                href={`https://wa.me/${settings?.whatsapp || ""}`}
                target="_blank"
                rel="noreferrer"
                className={`${styles.heroQuickCard} ${styles.heroQuickWa}`}
              >
                <span className={styles.heroQuickIcon}>{I.wa(20)}</span>
                <span className={styles.heroQuickMeta}>
                  <strong>WhatsApp us</strong>
                  <span>Fastest way to a plan</span>
                </span>
              </a>
              <a href={`mailto:${settings?.supportEmail || ""}`} className={styles.heroQuickCard}>
                <span className={styles.heroQuickIcon}>{I.mail(20)}</span>
                <span className={styles.heroQuickMeta}>
                  <strong>{settings?.supportEmail}</strong>
                  <span>For longer briefs & invoices</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Companions ─── */}
      <section className={styles.compWrap}>
        <div className={styles.container}>
          <div className={styles.compHead}>
            <span className={styles.kicker}>Your MHB Companions</span>
            <h2 className={styles.sectionHeading}>
              Pick the desk that <span className={styles.headingAccent}>fits your trip</span>.
            </h2>
            <p className={styles.sectionSub}>
              One tap on WhatsApp connects you to a specialist who plans this kind of trip every day.
            </p>
          </div>

          <div className={styles.compGrid}>
            {companions.map((col) => (
              <div key={col.label} className={styles.compCol}>
                <div className={styles.compColHead}>
                  <span className={styles.compColIcon} aria-hidden>{I[col.icon](22)}</span>
                  <div>
                    <strong>{col.label}</strong>
                    <span>{col.sub}</span>
                  </div>
                </div>
                <div className={styles.compList}>
                  {col.items.map((it) => (
                    <a
                      key={it.name}
                      href={`https://wa.me/${settings?.whatsapp || ""}`}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.compTile}
                    >
                      <span className={styles.compTileIcon} aria-hidden>{I[it.icon](20)}</span>
                      <span className={styles.compTileName}>{it.name}</span>
                      <span className={styles.compTileWa} aria-hidden>{I.wa(16)}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Form section ─── */}
      <section className={styles.formWrap}>
        <div className={styles.container}>
          <div className={styles.formGrid}>
            {/* Side panel — Trip Captains card */}
            <aside className={styles.captainCard}>
              <div className={styles.captainBg} aria-hidden>
                <Image
                  src={content?.captainImage || C("v1779220324/WhatsApp_Image_2026-05-16_at_1.32.35_PM_gmlnpp.jpg")}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 460px"
                  className={styles.captainBgImg}
                />
                <div className={styles.captainBgOverlay} />
              </div>

              <div className={styles.captainBody}>
                <span className={styles.captainKicker}>
                  Meet Your <span className={styles.headingAccent}>Trip Captains</span>
                </span>
                <p className={styles.captainCopy}>
                  Our trip designers don't just sell packages — they've slept in the riads, taken
                  the seaplane, queued for the temple. They know which beach is calm at 6 AM and
                  which guide tells the best stories.
                </p>

                <ul className={styles.captainPerks}>
                  <li><span className={styles.captainPerkDot} />Hand-picked, vetted on every trip</li>
                  <li><span className={styles.captainPerkDot} />24×7 on-trip support, every itinerary</li>
                  <li><span className={styles.captainPerkDot} />Mother-tongue local guides where it counts</li>
                  <li><span className={styles.captainPerkDot} />Honest pricing — no hidden line items</li>
                </ul>
              </div>
            </aside>

            {/* Form card */}
            <div className={styles.formCard}>
              <span className={styles.kicker}>Don't think · just ask</span>
              <h2 className={styles.sectionHeading}>
                Tell us about your <span className={styles.headingAccent}>dream holiday</span>.
              </h2>
              <p className={styles.sectionSub}>
                Fill this in — a real human will reply within 30 minutes during IST working hours.
              </p>

              {submitted ? (
                <div className={styles.successCard}>
                  <span className={styles.successEmoji} aria-hidden>🎒</span>
                  <strong>Got it, {form.name || "traveller"} — packing your reply now.</strong>
                  <p>
                    A trip captain will WhatsApp you on{" "}
                    <strong>{form.phone || "your number"}</strong> shortly. Meanwhile, scroll down
                    to peek at our travellers' stories.
                  </p>
                  <button
                    type="button"
                    className={styles.successReset}
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", phone: "", query: "" });
                    }}
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={onSubmit} noValidate>
                  <div className={styles.formRow}>
                    <label className={styles.field}>
                      <span>Your name *</span>
                      <input
                        type="text"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                      />
                    </label>
                    <label className={styles.field}>
                      <span>Email *</span>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                      />
                    </label>
                  </div>

                  <div className={styles.formRow}>
                    <label className={styles.field}>
                      <span>Phone *</span>
                      <div className={styles.phoneRow}>
                        <span className={styles.phoneCode}>🇮🇳 +91</span>
                        <input
                          type="tel"
                          required
                          placeholder="98xxx xxxxx"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                        />
                      </div>
                    </label>
                  </div>

                  <label className={`${styles.field} ${styles.fieldFull}`}>
                    <span>Your message *</span>
                    <textarea
                      rows={4}
                      required
                      placeholder="Travel dates, group size, where you want to go — anything we should know…"
                      value={form.query}
                      onChange={(e) => update("query", e.target.value)}
                    />
                  </label>

                  <button type="submit" className={styles.submitBtn}>
                    See you in the mountains
                    <span className={styles.submitArrow} aria-hidden>{I.arrow(16)}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Share + Collab cards ─── */}
      <section className={styles.dualWrap}>
        <div className={styles.container}>
          <div className={styles.dualGrid}>
            <a href="mailto:stories@myholidaybro.com" className={`${styles.dualCard} ${styles.dualA}`}>
              <span className={styles.dualIcon}>{I.pen(18)}</span>
              <strong>Share Your Stories</strong>
              <p>
                Just back from a trip with us? Send us your photos, videos and reviews — you might
                get featured on the blog and our socials.
              </p>
              <span className={styles.dualCta}>
                stories@myholidaybro.com {I.arrow(14)}
              </span>
            </a>

            <a href="mailto:partners@myholidaybro.com" className={`${styles.dualCard} ${styles.dualB}`}>
              <span className={styles.dualIcon}>{I.chat(18)}</span>
              <strong>Collaboration & Media</strong>
              <p>
                Creator, journalist or brand? We work with bloggers, influencers and media folks
                we genuinely love. Pitch us.
              </p>
              <span className={styles.dualCta}>
                partners@myholidaybro.com {I.arrow(14)}
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Quick Links ─── */}
      <section className={styles.quickWrap}>
        <div className={styles.container}>
          <div className={styles.quickHead}>
            <span className={styles.kicker}>Quick links</span>
            <h2 className={styles.sectionHeading}>
              Maybe what you need is <span className={styles.headingAccent}>already here</span>.
            </h2>
          </div>

          <div className={styles.quickGrid}>
            {quickLinks.map((q) => (
              <Link key={q.title} href={q.href} className={styles.quickCard} style={{ "--tint": q.tint }}>
                <div className={styles.quickImg}>
                  <Image src={q.image} alt="" fill sizes="(max-width: 700px) 50vw, 25vw" className={styles.quickImgEl} />
                  <span className={styles.quickGlow} aria-hidden />
                </div>
                <div className={styles.quickBody}>
                  <strong>{q.title}</strong>
                  <span>{q.sub}</span>
                  <span className={styles.quickArrow} aria-hidden>{I.arrow(14)}</span>
                </div>
              </Link>
            ))}
          </div>

          <p className={styles.closingLine}>
            At MyHolidayBro, we believe every great trip starts with a conversation. So — let's
            chat and start planning your next adventure.
          </p>
        </div>
      </section>

      {/* ─── Office map ─── */}
      <section className={styles.mapWrap}>
        <div className={styles.container}>
          <div className={styles.mapHead}>
            <div>
              <span className={styles.kicker}>Drop by</span>
              <h2 className={styles.sectionHeading}>Find us at <span className={styles.headingAccent}>HQ</span>.</h2>
            </div>
            <div className={styles.mapAddresses}>
              {(content?.offices || []).map((o) => (
                <div key={o.city} className={styles.mapAddress}>
                  <strong><span>{I.pin(14)}</span>{o.city}</strong>
                  <span>{o.address}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.mapFrame}>
            <iframe
              title="MyHolidayBro · Hyderabad office"
              src="https://www.google.com/maps?q=Hitech+City,+Hyderabad&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
}
