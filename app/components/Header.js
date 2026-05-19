"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { label: "Destinations", href: "#destinations" },
  { label: "Adventure Styles", href: "#adventure-styles" },
  { label: "Moments", href: "#moments" },
  { label: "Deals", href: "#deals" },
  { label: "Contact", href: "#contact" },
];

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

function UserIcon() {
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
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
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
  const [userOpen, setUserOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const userWrapRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (
        userWrapRef.current &&
        !userWrapRef.current.contains(e.target)
      ) {
        setUserOpen(false);
      }
    }
    function onEsc(e) {
      if (e.key === "Escape") {
        setUserOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  function openUser() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setUserOpen(true);
  }

  function scheduleCloseUser() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setUserOpen(false), 140);
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="MyHolidayBro home">
          <Image
            src="https://res.cloudinary.com/dyxxkrq8r/image/upload/v1779211833/MHB_Logo_Black_bdpszg.avif"
            alt="MyHolidayBro"
            width={260}
            height={60}
            priority
            className={styles.logoImg}
          />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Wishlist"
          >
            <HeartIcon />
          </button>

          <div
            ref={userWrapRef}
            className={styles.userWrap}
            onMouseEnter={openUser}
            onMouseLeave={scheduleCloseUser}
          >
            <button
              type="button"
              className={styles.iconBtn}
              aria-label="Account"
              aria-haspopup="menu"
              aria-expanded={userOpen}
              onClick={() => setUserOpen((v) => !v)}
            >
              <UserIcon />
            </button>

            {userOpen && (
              <div className={styles.dropdown} role="menu">
                <div className={styles.dropdownHead}>
                  <span className={styles.dropdownTitle}>Welcome</span>
                  <span className={styles.dropdownSub}>
                    Sign in to plan your next trip
                  </span>
                </div>
                <div className={styles.dropdownActions}>
                  <button className={styles.btnPrimary} type="button">
                    Login
                  </button>
                  <button className={styles.btnOutline} type="button">
                    Sign up
                  </button>
                </div>
              </div>
            )}
          </div>

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
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={styles.mobileLink}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
