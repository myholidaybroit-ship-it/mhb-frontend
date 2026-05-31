"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import { useWishlist } from "../components/WishlistContext";
import styles from "./AccountPage.module.css";

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoggedIn, hydrated, logout, initial } = useAuth();
  const { count, hydrated: wlHydrated } = useWishlist();

  useEffect(() => {
    if (hydrated && !isLoggedIn) router.replace("/login?next=/account");
  }, [hydrated, isLoggedIn, router]);

  if (!hydrated || !isLoggedIn) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p className={styles.loading}>Loading your account…</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.avatarLg} aria-hidden>{initial}</div>
          <div className={styles.heroText}>
            <span className={styles.kicker}>Your account</span>
            <h1 className={styles.heading}>
              Hey {user.name.split(" ")[0]} <span className={styles.wave}>👋</span>
            </h1>
            <p className={styles.sub}>
              Signed in as <strong>{user.email}</strong>. Manage your saved trips below.
            </p>
          </div>
          <button type="button" className={styles.logoutBtn} onClick={logout}>
            Log out
          </button>
        </section>

        <section className={styles.grid}>
          <Link href="/wishlist" className={styles.tileLg}>
            <div className={styles.tileTop}>
              <span className={styles.tileLabel}>Wishlist</span>
              <span className={styles.tileCount}>{wlHydrated ? count : "…"}</span>
            </div>
            <strong>Your saved trips</strong>
            <p>Everything you've hearted across the site, ready to send to a trip captain.</p>
            <span className={styles.tileCta}>Open wishlist →</span>
          </Link>

          <Link href="/contact" className={styles.tile}>
            <span className={styles.tileLabel}>Plan a trip</span>
            <strong>Talk to a trip captain</strong>
            <p>Custom quote in under 30 minutes during IST hours.</p>
            <span className={styles.tileCta}>Start →</span>
          </Link>

          <Link href="/newsletter" className={styles.tile}>
            <span className={styles.tileLabel}>Newsletter</span>
            <strong>MHB Insider</strong>
            <p>Subscribe for one curated email a month — first Sunday.</p>
            <span className={styles.tileCta}>Subscribe →</span>
          </Link>

          <Link href="/moments" className={styles.tile}>
            <span className={styles.tileLabel}>Inspiration</span>
            <strong>Traveller moments</strong>
            <p>Photos, video reviews and ideas from people who just got back.</p>
            <span className={styles.tileCta}>Browse →</span>
          </Link>

          <Link href="/destinations" className={styles.tile}>
            <span className={styles.tileLabel}>Explore</span>
            <strong>All destinations</strong>
            <p>Search by country, theme or budget.</p>
            <span className={styles.tileCta}>Discover →</span>
          </Link>
        </section>

        <section className={styles.card}>
          <strong>Bookings</strong>
          <p>
            You haven't booked a trip yet. When you do, you'll see itineraries, vouchers and
            payment receipts here. <Link href="/contact" className={styles.inlineLink}>Plan your first trip →</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
