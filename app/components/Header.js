"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { useWishlist } from "./WishlistContext";
import { content } from "../lib/api";
import logoFallback from "../../assets/MHB Logo_Black.avif";

function HeartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      {open ? (
        <>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </>
      ) : (
        <>
          <path d="M3 6h18" />
          <path d="M3 12h18" />
          <path d="M3 18h18" />
        </>
      )}
    </svg>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { count, hydrated: wlHydrated } = useWishlist();
  const wishlistBadge = wlHydrated && count > 0 ? count : null;

  // Nav + logo from the CMS (admin-editable), falling back to the defaults.
  const [nav, setNav] = useState(null);
  useEffect(() => {
    content.section("nav").then((r) => r?.data && setNav(r.data)).catch(() => {});
  }, []);
  const navItems = nav?.items || [];
  // Use the admin-editable logo when present; otherwise fall back to the
  // bundled brand logo so the header is never blank.
  const logoSrc = nav?.logoBlack || logoFallback;

  useEffect(() => {
    function onEsc(e) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="MyHolidayBro home">
          {logoSrc && (
            <Image
              src={logoSrc}
              alt="MyHolidayBro"
              width={260}
              height={60}
              priority
              className={styles.logoImg}
            />
          )}
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`${styles.navLink} ${item.highlight ? styles.navLinkHl : ""}`}
            >
              {item.label}
              {item.highlight && <span className={styles.navDot} aria-hidden />}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link
            href="/wishlist"
            className={styles.iconBtn}
            aria-label={wishlistBadge ? `Wishlist (${count} items)` : "Wishlist"}
          >
            <HeartIcon />
            {wishlistBadge && <span className={styles.iconBadge}>{wishlistBadge}</span>}
          </Link>

          <button
            type="button"
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className={styles.mobilePanel}>
          <nav className={styles.mobileNav} aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`${styles.mobileLink} ${item.highlight ? styles.mobileLinkHl : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
                {item.highlight && <span className={styles.navDot} aria-hidden />}
              </Link>
            ))}
            <Link
              href="/wishlist"
              className={styles.mobileLink}
              onClick={() => setMobileOpen(false)}
            >
              Wishlist {count > 0 && `(${count})`}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
