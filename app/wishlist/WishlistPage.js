"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "../components/WishlistContext";
import styles from "./WishlistPage.module.css";

const KIND_LABEL = {
  package: "Package",
  weekend: "Weekend trip",
  destination: "Destination",
  moment: "Moment",
};

function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#dc2626" stroke="#dc2626" strokeWidth="1.6" strokeLinejoin="round" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export default function WishlistPage() {
  const { items, hydrated, remove, clear } = useWishlist();

  if (!hydrated) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p className={styles.loading}>Loading your wishlist…</p>
        </div>
      </main>
    );
  }

  const wishlistSummary = items
    .map((i, idx) => `${idx + 1}. ${i.name}${i.price ? ` (from ${i.price})` : ""}`)
    .join("%0A");
  const whatsappHref = `https://wa.me/919966698990?text=${encodeURIComponent(
    `Hey MHB, I'd love a quote on these saved trips:\n\n`
  )}${wishlistSummary}`;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <span className={styles.kicker}>
              <HeartIcon /> Your wishlist
            </span>
            <h1 className={styles.heading}>
              {items.length === 0
                ? "No trips saved yet."
                : `${items.length} ${items.length === 1 ? "trip" : "trips"} ready to plan.`}
            </h1>
            <p className={styles.sub}>
              {items.length === 0
                ? "Tap the heart on any package, weekend trip or destination to save it here."
                : "Saved on this device. Share the list with a trip captain whenever you're ready."}
            </p>
          </div>

          {items.length > 0 && (
            <div className={styles.headActions}>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className={styles.ctaPrimary}>
                Send list to WhatsApp
              </a>
              <button type="button" className={styles.ctaGhost} onClick={clear}>
                Clear all
              </button>
            </div>
          )}
        </header>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyHeart}><HeartIcon /></span>
            <strong>Empty for now — but not for long.</strong>
            <p>
              Browse packages, weekends or destinations and tap the heart on anything you'd love
              to do. They'll all show up here.
            </p>
            <div className={styles.emptyActions}>
              <Link href="/destinations" className={styles.ctaPrimary}>Explore destinations</Link>
              <Link href="/weekends" className={styles.ctaGhost}>Browse weekend trips</Link>
            </div>
          </div>
        ) : (
          <div className={styles.grid}>
            {items.map((it) => (
              <article key={it.id} className={styles.card}>
                <div className={styles.cardImg}>
                  {it.image ? (
                    <Image
                      src={it.image}
                      alt={it.name}
                      fill
                      sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
                      className={styles.cardImgEl}
                    />
                  ) : (
                    <div className={styles.cardImgFallback}>{it.name.charAt(0)}</div>
                  )}
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => remove(it.id)}
                    aria-label={`Remove ${it.name}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardKind}>{KIND_LABEL[it.kind] || "Saved"}</span>
                  <strong className={styles.cardName}>{it.name}</strong>
                  {it.subtitle && <span className={styles.cardSub}>{it.subtitle}</span>}
                  {it.price && <span className={styles.cardPrice}>From {it.price}</span>}
                  <div className={styles.cardActions}>
                    {it.href && (
                      <Link href={it.href} className={styles.cardCta}>
                        View details
                      </Link>
                    )}
                    <a
                      href={`https://wa.me/919966698990?text=${encodeURIComponent(`Hey MHB, can I get a quote for ${it.name}?`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.cardCtaGhost}
                    >
                      WhatsApp quote
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
