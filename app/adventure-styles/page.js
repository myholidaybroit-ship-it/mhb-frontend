import Footer from "../components/Footer";
import Header from "../components/Header";
import { img } from "../lib/img";
import { getContent, getDestinations } from "../lib/server";
import styles from "./AdventureStyles.module.css";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Adventure Styles · MyHolidayBro",
  description:
    "Find a trip that matches your style — honeymoon, family, friends, luxury, adventure and more.",
};

export default async function Page() {
  const [cms, destinations] = await Promise.all([getContent("adventureStyles"), getDestinations()]);
  const c = cms || {};
  const list = c.styles || [];
  const countFor = (id) => destinations.filter((d) => Array.isArray(d.themes) && d.themes.includes(id)).length;

  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.headWrap}>
          <div className={styles.container}>
            <span className={styles.kicker}>{c.kicker || "Adventure styles"}</span>
            <h1 className={styles.heading}>{c.heading || "How do you like to travel?"}</h1>
            <p className={styles.sub}>
              {c.subheading || "Pick a style — we'll show trips that fit how you want to go."}
            </p>
          </div>
        </section>

        <section className={styles.gridWrap}>
          <div className={styles.container}>
            <div className={styles.grid}>
              {list.map((s) => {
                const id = s.name || s.id;
                const count = countFor(id);
                const src = s.image || img(s.imageKey || "bali", 700, 850);
                return (
                  <Link
                    key={id}
                    href={`/destinations?style=${encodeURIComponent(id)}`}
                    className={styles.card}
                  >
                    <div className={styles.imageWrap}>
                      <Image src={src} alt={id} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw" className={styles.image} />
                      <div className={styles.gradient} aria-hidden />
                      <span className={styles.count}>{count} {count === 1 ? "trip" : "trips"}</span>
                      <div className={styles.body}>
                        <h2 className={styles.name}>{id}</h2>
                        {s.tagline && <p className={styles.tagline}>{s.tagline}</p>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
