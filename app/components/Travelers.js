import Image from "next/image";
import styles from "./Travelers.module.css";

export default function Travelers({ data }) {
  const items = data?.items || [];
  return (
    <section className={styles.section} id="travelers">
      <div className={styles.container}>
        <header className={styles.head}>
          <h2 className={styles.heading}>{data?.title || "How do you travel?"}</h2>
          <p className={styles.sub}>{data?.subtitle || "Trips made for every kind of crew."}</p>
        </header>

        <div className={styles.grid}>
          {items.map((t) => (
            <a key={t.name} href="/destinations" className={styles.card}>
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
