"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./NewsletterPage.module.css";

const C = (path) => `https://res.cloudinary.com/dyxxkrq8r/image/upload/${path}`;

const PERKS = [
  {
    title: "One email a month",
    body: "No spam. No 9 AM newsletters about a Tuesday flash sale. Just one well-edited dispatch on the first Sunday.",
  },
  {
    title: "Insider deals",
    body: "First dibs on early-bird departures, partner-hotel upgrades, and limited-seat group trips.",
  },
  {
    title: "Real itineraries",
    body: "A monthly deep-dive into a destination — what to skip, where to eat, what to book six months ahead.",
  },
  {
    title: "Travel trends",
    body: "What our trip captains are booking right now — useful when you're trying to figure out where to go next.",
  },
];

const ISSUES = [
  {
    no: "#012",
    date: "May 2026",
    title: "Five nights in Sri Lanka most people get wrong",
    blurb: "Why Ella before Galle, and the south-coast hotel we've quietly upgraded everyone to.",
    img: C("v1779220324/WhatsApp_Image_2026-05-16_at_1.32.34_PM_eyigio.jpg"),
  },
  {
    no: "#011",
    date: "Apr 2026",
    title: "The Maldives sweet spot for Indian travellers",
    blurb: "Resort tier breakdown, the seaplane vs speedboat math, and a 5-night plan under ₹1.6L per person.",
    img: C("v1779220323/WhatsApp_Image_2026-05-16_at_1.22.01_PM_2_htpd1q.jpg"),
  },
  {
    no: "#010",
    date: "Mar 2026",
    title: "Vietnam in 8 days: north, centre, south",
    blurb: "Hanoi street-food walk, Halong overnight, Hoi An lanterns, Saigon nightlife — without the rush.",
    img: C("v1779220324/WhatsApp_Image_2026-05-16_at_1.32.34_PM_1_buerwk.jpg"),
  },
];

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.heroWrap}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <span className={styles.kicker}>MHB Insider · monthly</span>
              <h1 className={styles.heading}>
                One email a month.{" "}
                <span className={styles.headingAccent}>Big trip ideas</span>.
              </h1>
              <p className={styles.sub}>
                The dispatch our trip captains read themselves — destinations we're loving,
                hidden hotel finds, and early-access offers before they hit the site.
              </p>

              {done ? (
                <div className={styles.successCard}>
                  <strong>You're in.</strong>
                  <p>
                    First issue lands in your inbox on the first Sunday of next month. We sent a
                    confirmation to <strong>{email}</strong> — open it, click the link, and you're set.
                  </p>
                </div>
              ) : (
                <form className={styles.form} onSubmit={onSubmit} noValidate>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className={styles.submit}>
                    Subscribe
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 12h14" />
                      <path d="m13 5 7 7-7 7" />
                    </svg>
                  </button>
                </form>
              )}

              <p className={styles.fineprint}>
                Free forever. Unsubscribe in one click — no awkward exit survey.
              </p>
            </div>

            <aside className={styles.heroVisual} aria-hidden>
              <div className={styles.envelope}>
                <div className={styles.envelopeFlap} />
                <div className={styles.envelopeStamp}>MHB</div>
                <div className={styles.envelopeLine} style={{ width: "70%" }} />
                <div className={styles.envelopeLine} style={{ width: "55%" }} />
                <div className={styles.envelopeLine} style={{ width: "82%" }} />
                <div className={styles.envelopeLine} style={{ width: "40%" }} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className={styles.perksWrap}>
        <div className={styles.container}>
          <div className={styles.perksGrid}>
            {PERKS.map((p) => (
              <div key={p.title} className={styles.perkCard}>
                <strong>{p.title}</strong>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past issues */}
      <section className={styles.issuesWrap}>
        <div className={styles.container}>
          <span className={styles.kicker}>Past issues</span>
          <h2 className={styles.sectionHeading}>
            A peek at what <span className={styles.headingAccent}>lands in your inbox</span>.
          </h2>
          <div className={styles.issuesGrid}>
            {ISSUES.map((i) => (
              <article key={i.no} className={styles.issueCard}>
                <div className={styles.issueImg}>
                  <Image src={i.img} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" className={styles.issueImgEl} />
                </div>
                <div className={styles.issueBody}>
                  <span className={styles.issueMeta}>{i.no} · {i.date}</span>
                  <h3>{i.title}</h3>
                  <p>{i.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
