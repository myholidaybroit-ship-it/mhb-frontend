import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getContent } from "../lib/server";
import styles from "./page.module.css";

export const metadata = {
  title: "Terms of Use · MyHolidayBro",
  description:
    "Read the MyHolidayBro Terms of Use — booking, payment, cancellation, refund, insurance and liability terms that govern your use of the website and our services.",
};

// Renders a CMS section body: blank-line-separated paragraphs, with lines
// beginning "•" grouped into a bullet list.
function Body({ text = "" }) {
  const blocks = String(text).split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className={styles.blockBody}>
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        const isList = lines.length > 0 && lines.every((l) => l.startsWith("•"));
        if (isList) {
          return (
            <ul key={i}>
              {lines.map((l, j) => <li key={j}>{l.replace(/^•\s*/, "")}</li>)}
            </ul>
          );
        }
        return <p key={i}>{block}</p>;
      })}
    </div>
  );
}

export default async function TermsPage() {
  const p = (await getContent("policies")) || {};
  const sections = p.sections || [];
  const accent = p.accent || "Use";
  const titleText = (p.title || "Terms of Use").replace(accent, "").trimEnd();

  return (
    <>
      <Header />
      <main className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <div className={styles.crumbInner}>
            <Link href="/">Home</Link>
            <span aria-hidden>›</span>
            <span className={styles.crumbCurrent}>{p.title || "Terms of Use"}</span>
          </div>
        </nav>

        <header className={styles.hero}>
          <div className={styles.heroInner}>
            {p.kicker && <span className={styles.kicker}>{p.kicker}</span>}
            <h1 className={styles.title}>
              {titleText} <span className={styles.accent}>{accent}</span>
            </h1>
            {p.subtitle && <p className={styles.subtitle}>{p.subtitle}</p>}
            {p.lastUpdated && <span className={styles.meta}>{p.lastUpdated}</span>}
          </div>
        </header>

        <section className={styles.bodyWrap}>
          <div className={styles.bodyInner}>
            <aside className={styles.toc} aria-label="On this page">
              <span className={styles.tocLabel}>On this page</span>
              <ul className={styles.tocList}>
                {sections.map((s) => (
                  <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
                ))}
              </ul>
            </aside>

            <article className={styles.content}>
              {sections.map((s) => (
                <section id={s.id} key={s.id} className={styles.block}>
                  <h2 className={styles.blockTitle}>
                    <a href={`#${s.id}`} className={styles.anchor} aria-label={`Anchor to ${s.title}`}>#</a>
                    {s.title}
                  </h2>
                  <Body text={s.body} />
                </section>
              ))}

              <div className={styles.footnote}>
                <p>
                  Questions about these Terms? Reach our team at{" "}
                  <a href={`mailto:${p.contactEmail || ""}`} className={styles.inlineLink}>
                    {p.contactEmail}
                  </a>{" "}
                  or <a href={`tel:${(p.contactPhone || "").replace(/\s/g, "")}`} className={styles.inlineLink}>{p.contactPhone}</a>.
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
