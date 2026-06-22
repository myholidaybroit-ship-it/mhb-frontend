import Image from "next/image";
import Link from "next/link";
import styles from "./Blogs.module.css";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function fmtDate(iso) {
  if (!iso) return "";
  try {
    return `Published ${new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`;
  } catch {
    return "";
  }
}

// Normalise a real blog doc → the card shape this section renders.
function toCard(post) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    image: post.coverImage,
    date: fmtDate(post.publishedAt),
    read: post.readTime || "",
    href: `/blog/${post.slug}`,
  };
}

export default function Blogs({ data, posts = [] }) {
  // Prefer real, published posts from the API; fall back to the seeded home
  // content so the section never renders empty.
  const live = (posts || []).map(toCard);
  const featured = live.length
    ? live[0]
    : { ...(data?.featured || {}), href: "/blog" };
  const cards = live.length
    ? live.slice(1, 4)
    : (data?.posts || []).map((p) => ({ ...p, href: "/blog" }));

  if (!featured?.title && cards.length === 0) return null;

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
            {cards.map((p) => (
              <Link key={p.slug || p.title} href={p.href} className={styles.smallCard}>
                <div className={styles.smallImageWrap}>
                  {p.image && (
                    <Image src={p.image} alt="" fill sizes="200px" className={styles.smallImage} />
                  )}
                </div>
                <div className={styles.smallBody}>
                  <div className={styles.metaRow}>
                    <span>{p.date}</span>
                    <span>{p.read}</span>
                  </div>
                  <h3 className={styles.smallTitle}>{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>

          <Link href={featured.href || "/blog"} className={styles.featured}>
            <div className={styles.featuredImageWrap}>
              {featured.image && (
                <Image
                  src={featured.image}
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
                <span>{featured.date}</span>
                <span>{featured.read}</span>
              </div>
              <h3 className={styles.featuredTitle}>{featured.title}</h3>
              <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
            </div>
          </Link>
        </div>

        <div className={styles.viewAllWrap}>
          <Link href="/blog" className={styles.viewAll}>
            View all blogs
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
