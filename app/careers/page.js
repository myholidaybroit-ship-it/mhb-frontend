import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./page.module.css";

export const metadata = {
  title: "Careers · MyHolidayBro",
  description:
    "Build the holiday company you wish existed. Open roles at MyHolidayBro across design, ops, engineering and travel curation.",
};

const ROLES = [
  {
    team: "Trip Design",
    title: "Trip Captain · International",
    type: "Full-time · Hyderabad",
    blurb:
      "Curate international itineraries end-to-end — from first WhatsApp ping to landing back home. 2+ years in travel; obsessive about details.",
  },
  {
    team: "Trip Design",
    title: "Trip Captain · Domestic & Weekends",
    type: "Full-time · Hyderabad / Bangalore",
    blurb:
      "Own the domestic and weekend desk. You know your Coorgs from your Chikmagalurs and can plan a long-weekend in 12 minutes flat.",
  },
  {
    team: "Engineering",
    title: "Frontend Engineer (Next.js)",
    type: "Full-time · Remote-friendly",
    blurb:
      "Help us build a delightful booking experience. Next.js, React, CSS Modules. Bonus: you've shipped travel or marketplace UI.",
  },
  {
    team: "Ops",
    title: "On-trip Support Lead",
    type: "Full-time · Hyderabad",
    blurb:
      "Run the 24×7 traveller support pod. Calm under pressure, fluent across WhatsApp and ground-handler phone trees.",
  },
  {
    team: "Brand",
    title: "Content & Social Designer",
    type: "Contract / Full-time · Hyderabad",
    blurb:
      "Shoot, edit, ship — reels, photo edits, the occasional newsletter cover. A portfolio that doesn't scream stock-template.",
  },
];

const PERKS = [
  { t: "Real travel benefits", d: "Annual offsite trip + discounted MHB packages for you & your family." },
  { t: "Health cover", d: "Comprehensive medical insurance for you, your spouse and kids." },
  { t: "Hybrid by default", d: "Three days from the studio, two from wherever you concentrate best." },
  { t: "Learning budget", d: "₹50k/year for courses, conferences, books — no approvals needed." },
];

export default function Page() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        {/* Hero */}
        <section className={styles.heroWrap}>
          <div className={styles.container}>
            <span className={styles.kicker}>Careers · MyHolidayBro</span>
            <h1 className={styles.heading}>
              Build the holiday company you{" "}
              <span className={styles.headingAccent}>wish existed</span>.
            </h1>
            <p className={styles.sub}>
              We're a small, very deliberate team obsessed with the craft of a great trip.
              If that sounds like your kind of room — come build with us.
            </p>
          </div>
        </section>

        {/* Perks */}
        <section className={styles.perksWrap}>
          <div className={styles.container}>
            <div className={styles.perksGrid}>
              {PERKS.map((p) => (
                <div key={p.t} className={styles.perkCard}>
                  <strong>{p.t}</strong>
                  <p>{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open roles */}
        <section className={styles.rolesWrap}>
          <div className={styles.container}>
            <span className={styles.kicker}>Open roles</span>
            <h2 className={styles.sectionHeading}>
              Looking for the right human to join us.
            </h2>

            <div className={styles.roleList}>
              {ROLES.map((r) => (
                <a
                  key={r.title}
                  href={`mailto:careers@myholidaybro.com?subject=Application · ${encodeURIComponent(r.title)}`}
                  className={styles.roleCard}
                >
                  <div className={styles.roleHead}>
                    <span className={styles.roleTeam}>{r.team}</span>
                    <span className={styles.roleType}>{r.type}</span>
                  </div>
                  <strong className={styles.roleTitle}>{r.title}</strong>
                  <p className={styles.roleBlurb}>{r.blurb}</p>
                  <span className={styles.roleCta}>
                    Apply via email
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 12h14" />
                      <path d="m13 5 7 7-7 7" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>

            <div className={styles.fallback}>
              <strong>Don't see your role?</strong>
              <p>
                We're always open to surprising fits. Send a note to{" "}
                <a href="mailto:careers@myholidaybro.com">careers@myholidaybro.com</a> — tell us
                what you'd build here and why.
              </p>
              <Link href="/contact" className={styles.fallbackCta}>Or say hi via contact</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
