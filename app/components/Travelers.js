import Image from "next/image";
import styles from "./Travelers.module.css";

const TRAVELERS = [
  {
    name: "Couple",
    image:
      "https://res.cloudinary.com/dyxxkrq8r/image/upload/v1779215503/Couples_nt67ps.png",
  },
  {
    name: "Solo",
    image:
      "https://res.cloudinary.com/dyxxkrq8r/image/upload/v1779215503/Solo_etaj0n.png",
  },
  {
    name: "Family",
    image:
      "https://res.cloudinary.com/dyxxkrq8r/image/upload/v1779215503/Family_gmbhfx.png",
  },
  {
    name: "Friends",
    image:
      "https://res.cloudinary.com/dyxxkrq8r/image/upload/v1779215503/Friends_tgw3p3.png",
  },
];

export default function Travelers() {
  return (
    <section className={styles.section} id="travelers">
      <div className={styles.container}>
        <header className={styles.head}>
          <h2 className={styles.heading}>How do you travel?</h2>
          <p className={styles.sub}>Trips made for every kind of crew.</p>
        </header>

        <div className={styles.grid}>
          {TRAVELERS.map((t) => (
            <a key={t.name} href="#" className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
                  className={styles.image}
                />
              </div>
              <span className={styles.name}>{t.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
