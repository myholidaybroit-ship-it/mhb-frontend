"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import styles from "./Header.module.css";
import { useWishlist } from "./WishlistContext";
import { content } from "../lib/api";

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
  const router = useRouter();

  const { user, isLoggedIn, hydrated, initial, logout } = useAuth();
  const { count, hydrated: wlHydrated } = useWishlist();
  const wishlistBadge = wlHydrated && count > 0 ? count : null;

  // Nav + logo from the CMS (admin-editable), falling back to the defaults.
  const [nav, setNav] = useState(null);
  useEffect(() => {
    content.section("nav").then((r) => r?.data && setNav(r.data)).catch(() => {});
  }, []);
  const navItems = nav?.items || [];
  const logoSrc = nav?.logoBlack;

  useEffect(() => {
    function onDocClick(e) {
      if (userWrapRef.current && !userWrapRef.current.contains(e.target)) {
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

  function handleLogout() {
    logout();
    setUserOpen(false);
    router.push("/");
  }

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

          <div
            ref={userWrapRef}
            className={styles.userWrap}
            onMouseEnter={openUser}
            onMouseLeave={scheduleCloseUser}
          >
            <button
              type="button"
              className={`${styles.iconBtn} ${isLoggedIn ? styles.avatarBtn : ""}`}
              aria-label={isLoggedIn ? `Account · ${user?.name || ""}` : "Account"}
              aria-haspopup="menu"
              aria-expanded={userOpen}
              onClick={() => setUserOpen((v) => !v)}
            >
              {hydrated && isLoggedIn ? (
                <span className={styles.avatar}>{initial}</span>
              ) : (
                <UserIcon />
              )}
            </button>

            {userOpen && (
              <div className={styles.dropdown} role="menu">
                {hydrated && isLoggedIn ? (
                  <>
                    <div className={styles.dropdownHead}>
                      <span className={styles.dropdownTitle}>Hey, {user.name.split(" ")[0]}</span>
                      <span className={styles.dropdownSub}>{user.email}</span>
                    </div>
                    <div className={styles.dropdownActions}>
                      <Link href="/account" className={styles.btnOutline} onClick={() => setUserOpen(false)}>
                        Your account
                      </Link>
                      <Link href="/wishlist" className={styles.btnOutline} onClick={() => setUserOpen(false)}>
                        Wishlist {count > 0 && `(${count})`}
                      </Link>
                      <button className={styles.btnPrimary} type="button" onClick={handleLogout}>
                        Log out
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.dropdownHead}>
                      <span className={styles.dropdownTitle}>Welcome</span>
                      <span className={styles.dropdownSub}>
                        Sign in to save trips & manage bookings
                      </span>
                    </div>
                    <div className={styles.dropdownActions}>
                      <Link href="/login" className={styles.btnPrimary} onClick={() => setUserOpen(false)}>
                        Login
                      </Link>
                      <Link href="/signup" className={styles.btnOutline} onClick={() => setUserOpen(false)}>
                        Sign up
                      </Link>
                    </div>
                  </>
                )}
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
            {hydrated && isLoggedIn ? (
              <>
                <Link href="/account" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
                  Your account
                </Link>
                <button type="button" className={styles.mobileLink} onClick={() => { handleLogout(); setMobileOpen(false); }}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
                <Link href="/signup" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
