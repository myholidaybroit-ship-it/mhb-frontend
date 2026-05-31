import Image from "next/image";
import Link from "next/link";
import { WEEKEND_TRIPS } from "../data/weekends";
import styles from "./Weekends.module.css";
import WishlistButton from "./WishlistButton";

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export default function Weekends() {
  // Show first 4 on the home page; the full list lives on /weekends.
  const preview = WEEKEND_TRIPS.slice(0, 4);

  return (
    <section className={styles.section} id="weekends">
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <h2 className={styles.heading}>Weekend trips worth going</h2>
            <p className={styles.sub}>
              3-day getaways with pickup from your city. Pack a bag and go.
            </p>
          </div>
          <Link href="/weekends" className={styles.seeAll}>
            See all weekends <ArrowIcon />
          </Link>
        </header>

        <div className={styles.grid}>
          {preview.map((t) => (
            <Link key={t.id} href="/weekends" className={styles.card}>
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
                <WishlistButton
                  className={styles.heartBtn}
                  item={{
                    id: `weekend:${t.id}`,
                    kind: "weekend",
                    name: t.name,
                    subtitle: t.subtitle,
                    price: t.salePrice,
                    image: t.image,
                    href: "/weekends",
                    days: t.days,
                  }}
                />
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
