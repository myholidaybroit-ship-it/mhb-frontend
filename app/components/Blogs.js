import Image from "next/image";
import styles from "./Blogs.module.css";

const W = (slug, w = 800, h = 500) =>
  `https://static.wixstatic.com/media/${slug}/v1/fill/w_${w},h_${h},al_c,q_85,enc_avif,quality_auto/${slug}`;

const IMG = {
  bali: W("nsplsh_657846644f576b59425177~mv2.jpg"),
  thailand: W("nsplsh_6a574b6b2d305a42557967~mv2_d_4439_3072_s_4_2.jpg"),
  malaysia: W("nsplsh_05291b47a88e40e986ad33b6de021909~mv2.jpg"),
  maldives: W("nsplsh_4d314f6278767357566859~mv2.jpg"),
  himachal: W("nsplsh_c9a8db6c852e41de80d01c2d166a13ee~mv2.jpg", 1200, 700),
  northeast: W("nsplsh_ce21f1ca7cb74b3397fee018e612680b~mv2.jpg"),
};

const FEATURED = {
  date: "Published on 8 Apr",
  read: "12 minutes read",
  title: "25 Best Places to Visit in May in India (2026 Travel Guide)",
  excerpt:
    "From snow-tipped Ladakh roads to the cool valleys of Sikkim — here are the destinations worth packing your bag for this May.",
  image: IMG.himachal,
};

const POSTS = [
  {
    id: 1,
    date: "Published on 30 Jul",
    read: "6 minutes read",
    title: "Why MyHolidayBro Is the Perfect Choice for Family Trips",
    image: IMG.bali,
  },
  {
    id: 2,
    date: "Published on 25 Jun",
    read: "5 minutes read",
    title: "Book Now, Pay Later with MyHolidayBro · Travel Now, Pay in EMIs",
    image: IMG.northeast,
  },
  {
    id: 3,
    date: "Published on 18 Sep",
    read: "9 minutes read",
    title: "How to Plan the Perfect Honeymoon: 10 Stays Couples Love",
    image: IMG.maldives,
  },
];

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export default function Blogs() {
  return (
    <section className={styles.section} id="blogs">
      <div className={styles.container}>
        <header className={styles.head}>
          <span className={styles.eyebrow}>Blogs</span>
          <h2 className={styles.heading}>
            Stories &amp; <span className={styles.headingAccent}>guides</span>
          </h2>
        </header>

        <div className={styles.grid}>
          <div className={styles.leftCol}>
            {POSTS.map((p) => (
              <a key={p.id} href="#" className={styles.smallCard}>
                <div className={styles.smallImageWrap}>
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="200px"
                    className={styles.smallImage}
                  />
                </div>
                <div className={styles.smallBody}>
                  <div className={styles.metaRow}>
                    <span>{p.date}</span>
                    <span>{p.read}</span>
                  </div>
                  <h3 className={styles.smallTitle}>{p.title}</h3>
                </div>
              </a>
            ))}
          </div>

          <a href="#" className={styles.featured}>
            <div className={styles.featuredImageWrap}>
              <Image
                src={FEATURED.image}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.featuredImage}
              />
              <div className={styles.featuredOverlay} aria-hidden />
              <span className={styles.featuredKicker}>
                Featured · Travel Guide
              </span>
            </div>
            <div className={styles.featuredBody}>
              <div className={styles.metaRow}>
                <span>{FEATURED.date}</span>
                <span>{FEATURED.read}</span>
              </div>
              <h3 className={styles.featuredTitle}>{FEATURED.title}</h3>
              <p className={styles.featuredExcerpt}>{FEATURED.excerpt}</p>
            </div>
          </a>
        </div>

        <div className={styles.viewAllWrap}>
          <a href="#" className={styles.viewAll}>
            View all blogs
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
