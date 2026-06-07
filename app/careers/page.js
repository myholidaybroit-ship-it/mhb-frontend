import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getContent } from "../lib/server";
import styles from "./page.module.css";

export const metadata = {
  title: "Careers · MyHolidayBro",
  description:
    "Build the holiday company you wish existed. Open roles at MyHolidayBro across design, ops, engineering and travel curation.",
};

export default async function Page() {
  const c = (await getContent("careers")) || {};
  const hero = c.hero || {};
  const roles = c.roles || [];
  const perks = c.perks || [];
  const email = c.email || "careers@myholidaybro.com";
  const fallback = c.fallback || {};
  return (
    <>
      <Header />
      <main className={styles.page}>
        {/* Hero */}
        <section className={styles.heroWrap}>
          <div className={styles.container}>
            <span className={styles.kicker}>{hero.kicker || "Careers · MyHolidayBro"}</span>
            <h1 className={styles.heading}>
              {hero.heading || "Build the holiday company you"}{" "}
              <span className={styles.headingAccent}>{hero.accent || "wish existed"}</span>.
            </h1>
            <p className={styles.sub}>
              {hero.sub || "We're a small, very deliberate team obsessed with the craft of a great trip. If that sounds like your kind of room — come build with us."}
            </p>
          </div>
        </section>

        {/* Perks */}
        <section className={styles.perksWrap}>
          <div className={styles.container}>
            <div className={styles.perksGrid}>
              {perks.map((p) => (
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
              {roles.map((r) => (
                <a
                  key={r.id || r.title}
                  href={`mailto:${email}?subject=Application · ${encodeURIComponent(r.title)}`}
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
              <strong>{fallback.title || "Don't see your role?"}</strong>
              <p>
                {fallback.body || (
                  <>We're always open to surprising fits. Send a note to <a href={`mailto:${email}`}>{email}</a> — tell us what you'd build here and why.</>
                )}
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
