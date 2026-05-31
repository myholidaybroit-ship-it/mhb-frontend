import Footer from "../components/Footer";
import Header from "../components/Header";
import { DESTINATION_LIST, img } from "../data/destinations";
import styles from "./AdventureStyles.module.css";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Adventure Styles · MyHolidayBro",
  description:
    "Find a trip that matches your style — honeymoon, family, friends, luxury, adventure and more.",
};

const STYLES = [
  { id: "Mountains",    tagline: "Snow peaks, valleys and high passes.",     imageKey: "himachal" },
  { id: "Beaches",      tagline: "Sand, sun and salt in the air.",           imageKey: "maldives" },
  { id: "Heritage",     tagline: "Forts, palaces and ancient stones.",       imageKey: "vietnam" },
  { id: "Desert",       tagline: "Dunes, camels and starry nights.",         imageKey: "dubai" },
  { id: "Backpacking",  tagline: "Light bag, big stories.",                  imageKey: "thailand" },
  { id: "Spiritual",    tagline: "Monasteries, meditation and quiet.",       imageKey: "northeast" },
  { id: "City Lights",  tagline: "Skylines, food halls and nightlife.",      imageKey: "singapore" },
  { id: "Tropical",     tagline: "Palms, lagoons and island time.",          imageKey: "bali" },
];

function countFor(styleId) {
  return DESTINATION_LIST.filter((d) =>
    Array.isArray(d.themes) && d.themes.includes(styleId)
  ).length;
}

export default function Page() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.headWrap}>
          <div className={styles.container}>
            <span className={styles.kicker}>Adventure styles</span>
            <h1 className={styles.heading}>How do you like to travel?</h1>
            <p className={styles.sub}>
              Pick a style — we&apos;ll show trips that fit how you want to go.
            </p>
          </div>
        </section>

        <section className={styles.gridWrap}>
          <div className={styles.container}>
            <div className={styles.grid}>
              {STYLES.map((s) => {
                const count = countFor(s.id);
                return (
                  <Link
                    key={s.id}
                    href={`/destinations?style=${encodeURIComponent(s.id)}`}
                    className={styles.card}
                  >
                    <div className={styles.imageWrap}>
                      <Image
                        src={img(s.imageKey, 700, 850)}
                        alt={s.id}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
                        className={styles.image}
                      />
                      <div className={styles.gradient} aria-hidden />
                      <span className={styles.count}>
                        {count} {count === 1 ? "trip" : "trips"}
                      </span>
                      <div className={styles.body}>
                        <h2 className={styles.name}>{s.id}</h2>
                        <p className={styles.tagline}>{s.tagline}</p>
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
