import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { getBlog, getBlogs } from "../../lib/server";
import styles from "../blog.module.css";

function fmtDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return "";
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post) return { title: "Blog · MyHolidayBro" };
  const title = post.seoTitle || `${post.title} | MyHolidayBro`;
  const description = post.seoDescription || post.excerpt || "";
  const image = post.coverImage;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt || undefined,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

// Render one content block.
function Block({ block }) {
  if (!block) return null;
  switch (block.type) {
    case "heading":
      return <h2 className={styles.h2}>{block.text}</h2>;
    case "quote":
      return <blockquote className={styles.quote}>{block.text}</blockquote>;
    case "image":
      return block.url ? (
        <figure className={styles.figure}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.url} alt={block.caption || ""} loading="lazy" className={styles.figImg} />
          {block.caption && <figcaption className={styles.figCap}>{block.caption}</figcaption>}
        </figure>
      ) : null;
    case "list":
      return (
        <ul className={styles.bullets}>
          {(block.items || []).map((it, i) => <li key={i}>{it}</li>)}
        </ul>
      );
    case "paragraph":
    default:
      return <p className={styles.para}>{block.text}</p>;
  }
}

export default async function BlogArticle({ params }) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getBlog(slug), getBlogs()]);
  if (!post) notFound();

  const related = (all || []).filter((p) => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt || "",
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: post.publishedAt || undefined,
    author: { "@type": post.author ? "Person" : "Organization", name: post.author || "MyHolidayBro" },
    publisher: { "@type": "Organization", name: "MyHolidayBro" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `/blog/${slug}` },
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className={styles.page}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden>›</span>
          <Link href="/blog">Blog</Link>
          <span aria-hidden>›</span>
          <span className={styles.crumbCurrent}>{post.title}</span>
        </nav>

        <article className={styles.article}>
          <div className={styles.articleHead}>
            {post.category && <span className={styles.articleCat}>{post.category}</span>}
            <h1 className={styles.articleTitle}>{post.title}</h1>
            {post.excerpt && <p className={styles.articleLede}>{post.excerpt}</p>}
            <div className={styles.byline}>
              {post.author && <span className={styles.author}>{post.author}{post.authorRole ? `, ${post.authorRole}` : ""}</span>}
              <span className={styles.meta}>
                <span>{fmtDate(post.publishedAt)}</span>
                {post.readTime && <span>· {post.readTime}</span>}
              </span>
            </div>
          </div>

          {post.coverImage && (
            <div className={styles.articleCover}>
              <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 900px) 100vw, 800px" className={styles.cover} priority />
            </div>
          )}

          <div className={styles.articleBody}>
            {(post.body || []).map((block, i) => <Block key={i} block={block} />)}
          </div>

          {(post.tags || []).length > 0 && (
            <div className={styles.tags}>
              {post.tags.map((t) => <span key={t} className={styles.tag}>#{t}</span>)}
            </div>
          )}

          <Link href="/blog" className={styles.backLink}>← Back to all posts</Link>
        </article>

        {related.length > 0 && (
          <section className={styles.related}>
            <h2 className={styles.relatedTitle}>Keep reading</h2>
            <div className={styles.grid}>
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className={styles.card}>
                  <div className={styles.cardImg}>
                    {p.coverImage && <Image src={p.coverImage} alt={p.title} fill sizes="(max-width: 700px) 100vw, 33vw" className={styles.cover} />}
                    {p.category && <span className={styles.cardCat}>{p.category}</span>}
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.meta}>
                      <span>{fmtDate(p.publishedAt)}</span>
                      {p.readTime && <span>· {p.readTime}</span>}
                    </div>
                    <h3 className={styles.cardTitle}>{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
