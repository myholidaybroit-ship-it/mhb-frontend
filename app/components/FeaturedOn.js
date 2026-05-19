import Image from "next/image";
import styles from "./FeaturedOn.module.css";

const LOGOS = [
  {
    name: "SiliconIndia · Startup City · Travel Tech 2023",
    src: "https://static.wixstatic.com/media/e7beb6_e6bfb02ae16c46c4b9475f0c6f5d8d20~mv2.jpeg/v1/crop/x_0,y_36,w_253,h_127/fill/w_708,h_350,al_c,lg_1,q_85,enc_avif,quality_auto/featured.jpeg",
    width: 708,
    height: 350,
    sub: "Travel Tech Startups · 2023",
  },
  {
    name: "YourStory",
    src: "https://static.wixstatic.com/media/e7beb6_a06072ca5f484e0f8e25554bf216e9bc~mv2.jpg/v1/fill/w_888,h_344,al_c,lg_1,q_85,enc_avif,quality_auto/e7beb6_a06072ca5f484e0f8e25554bf216e9bc~mv2.jpg",
    width: 888,
    height: 344,
    sub: "Founder Story · 2024",
  },
];

export default function FeaturedOn() {
  return (
    <section className={styles.section} id="featured-on">
      <div className={styles.container}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>Featured On</span>
          <h2 className={styles.heading}>
            Recognised by{" "}
            <span className={styles.headingAccent}>leading press</span>
          </h2>
        </div>

        <div className={styles.logos}>
          {LOGOS.map((l) => (
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
