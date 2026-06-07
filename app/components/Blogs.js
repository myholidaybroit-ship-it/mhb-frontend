import Image from "next/image";
import styles from "./Blogs.module.css";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export default function Blogs({ data }) {
  const FEAT = data?.featured || {};
  const posts = data?.posts || [];
  return (
    <section className={styles.section} id="blogs">
      <div className={styles.container}>
        <header className={styles.head}>
          <span className={styles.eyebrow}>{data?.eyebrow || "Blogs"}</span>
          <h2 className={styles.heading}>
            Stories &amp; <span className={styles.headingAccent}>guides</span>
          </h2>
        </header>

        <div className={styles.grid}>
          <div className={styles.leftCol}>
            {posts.map((p) => (
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
              {FEAT.image && (
                <Image
                  src={FEAT.image}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className={styles.featuredImage}
                />
              )}
              <div className={styles.featuredOverlay} aria-hidden />
              <span className={styles.featuredKicker}>
                Featured · Travel Guide
              </span>
            </div>
            <div className={styles.featuredBody}>
              <div className={styles.metaRow}>
                <span>{FEAT.date}</span>
                <span>{FEAT.read}</span>
              </div>
              <h3 className={styles.featuredTitle}>{FEAT.title}</h3>
              <p className={styles.featuredExcerpt}>{FEAT.excerpt}</p>
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
