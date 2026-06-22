import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getBlogs } from "../lib/server";
import styles from "./blog.module.css";

export const metadata = {
  title: "Travel Blog — Guides, Tips & Stories | MyHolidayBro",
  description:
    "Travel guides, destination tips and stories from the MyHolidayBro team — plan smarter and travel better.",
  alternates: { canonical: "/blog" },
};

function fmtDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return "";
  }
}

export default async function BlogIndex() {
  const posts = await getBlogs();
  const featured = posts.find((p) => p.featured) || posts[0] || null;
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <Header />
      <main className={styles.page}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>The MyHolidayBro Blog</span>
          <h1 className={styles.title}>Stories &amp; <span className={styles.titleAccent}>guides</span></h1>
          <p className={styles.lede}>Destination guides, travel tips and tales from the road — to help you plan your next trip.</p>
        </header>

        {posts.length === 0 ? (
          <div className={styles.empty}>No posts published yet. Check back soon!</div>
        ) : (
          <>
            {featured && (
              <Link href={`/blog/${featured.slug}`} className={styles.featured}>
                <div className={styles.featuredImg}>
                  {featured.coverImage && (
                    <Image src={featured.coverImage} alt={featured.title} fill sizes="(max-width: 900px) 100vw, 60vw" className={styles.cover} priority />
                  )}
                  <span className={styles.featuredBadge}>Featured{featured.category ? ` · ${featured.category}` : ""}</span>
                </div>
                <div className={styles.featuredBody}>
                  <div className={styles.meta}>
                    <span>{fmtDate(featured.publishedAt)}</span>
                    {featured.readTime && <span>· {featured.readTime}</span>}
                  </div>
                  <h2 className={styles.featuredTitle}>{featured.title}</h2>
                  {featured.excerpt && <p className={styles.featuredExcerpt}>{featured.excerpt}</p>}
                  <span className={styles.readMore}>Read article →</span>
                </div>
              </Link>
            )}

            {rest.length > 0 && (
              <div className={styles.grid}>
                {rest.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className={styles.card}>
                    <div className={styles.cardImg}>
                      {p.coverImage && (
                        <Image src={p.coverImage} alt={p.title} fill sizes="(max-width: 700px) 100vw, 33vw" className={styles.cover} />
                      )}
                      {p.category && <span className={styles.cardCat}>{p.category}</span>}
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.meta}>
                        <span>{fmtDate(p.publishedAt)}</span>
                        {p.readTime && <span>· {p.readTime}</span>}
                      </div>
                      <h3 className={styles.cardTitle}>{p.title}</h3>
                      {p.excerpt && <p className={styles.cardExcerpt}>{p.excerpt}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
