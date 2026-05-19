import Image from "next/image";
import styles from "./Weekends.module.css";

const W = (slug, file) =>
  `https://static.wixstatic.com/media/${slug}/v1/fill/w_700,h_500,al_c,q_85,enc_avif,quality_auto/${file}`;

const TRIPS = [
  {
    id: 1,
    name: "Coorg & Chikmagalur",
    subtitle: "Coffee country escape",
    days: 3,
    salePrice: "₹9,999",
    originalPrice: "₹14,999",
    savings: "₹5,000",
    tag: "Weekend Trip",
    image: W(
      "e7beb6_a4c7c25be4b046bbab4e0000027d35d3~mv2.png",
      "e7beb6_a4c7c25be4b046bbab4e0000027d35d3~mv2.png"
    ),
  },
  {
    id: 2,
    name: "Ooty, Coonoor & Isha",
    subtitle: "Hills, gardens & calm",
    days: 3,
    salePrice: "₹6,999",
    originalPrice: "₹9,999",
    savings: "₹3,000",
    tag: "Weekend Trip",
    image: W(
      "e7beb6_791d93ea90f6469abfb1a0d7153a21dd~mv2.jpg",
      "e7beb6_791d93ea90f6469abfb1a0d7153a21dd~mv2.jpg"
    ),
  },
  {
    id: 3,
    name: "Dudhsagar Waterfalls Trek",
    subtitle: "Adventure & jungle trails",
    days: 3,
    salePrice: "₹8,999",
    originalPrice: "₹12,999",
    savings: "₹4,000",
    tag: "Weekend Trek",
    image: W(
      "e7beb6_b674dab6cfb44f669182cd846d17a146~mv2.webp",
      "e7beb6_b674dab6cfb44f669182cd846d17a146~mv2.webp"
    ),
  },
  {
    id: 4,
    name: "Lonavala & Matheran",
    subtitle: "Lake camping + BBQ",
    days: 3,
    salePrice: "₹7,499",
    originalPrice: "₹9,999",
    savings: "₹2,500",
    tag: "Weekend Trip",
    image: W(
      "e7beb6_008d2f6038454f38ada37c53dc9992ba~mv2.jpg",
      "e7beb6_008d2f6038454f38ada37c53dc9992ba~mv2.jpg"
    ),
  },
];

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export default function Weekends() {
  return (
    <section className={styles.section} id="weekends">
      <div className={styles.container}>
        <header className={styles.head}>
          <h2 className={styles.heading}>Weekend trips worth going</h2>
          <p className={styles.sub}>
            3-day getaways with pickup from Hyderabad. Pack a bag and go.
          </p>
        </header>

        <div className={styles.grid}>
          {TRIPS.map((t) => (
            <a key={t.id} href="#" className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  sizes="(max-width: 480px) 100vw, (max-width: 1000px) 50vw, 25vw"
                  className={styles.image}
                />
                <span className={styles.tag}>{t.tag}</span>
                <span className={styles.savings}>Save {t.savings}</span>
              </div>
              <div className={styles.body}>
                <div className={styles.titleRow}>
                  <h3 className={styles.title}>{t.name}</h3>
                  <span className={styles.subtitleText}>{t.subtitle}</span>
                </div>
                <span className={styles.days}>{t.days} days</span>
                <div className={styles.cardFooter}>
                  <div className={styles.priceWrap}>
                    <span className={styles.salePrice}>{t.salePrice}</span>
                    <span className={styles.originalPrice}>
                      {t.originalPrice}
                    </span>
                  </div>
                  <span className={styles.exploreBtn}>
                    Explore <ArrowIcon />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
