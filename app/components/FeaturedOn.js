import Image from "next/image";
import styles from "./FeaturedOn.module.css";

export default function FeaturedOn({ data }) {
  const items = data?.items || [];
  return (
    <section className={styles.section} id="featured-on">
      <div className={styles.container}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>{data?.eyebrow || "Featured On"}</span>
          <h2 className={styles.heading}>
            Recognised by{" "}
            <span className={styles.headingAccent}>leading press</span>
          </h2>
        </div>

        <div className={styles.logos}>
          {items.map((l) => (
            <a key={l.name} href="#" className={styles.logoCard}>
              <div className={styles.logoFrame}>
                <Image
                  src={l.src}
                  alt={l.name}
                  width={l.width}
                  height={l.height}
                  className={styles.logoImg}
                />
              </div>
              <span className={styles.logoCaption}>{l.sub}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
