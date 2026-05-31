"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import styles from "../components/AuthShell.module.css";

function LoginInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/account";
  const { login, isLoggedIn, hydrated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (hydrated && isLoggedIn) router.replace(next);
  }, [hydrated, isLoggedIn, next, router]);

  function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const res = login({ email, password });
    setSubmitting(false);
    if (!res.ok) setError(res.error);
    else router.push(next);
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.formSide}>
          <Link href="/" className={styles.backLink}>← Back to MHB</Link>
          <span className={styles.kicker}>Welcome back</span>
          <h1 className={styles.heading}>
            Log in to <span className={styles.headingAccent}>MyHolidayBro</span>.
          </h1>
          <p className={styles.sub}>
            Pick up your wishlist, manage upcoming trips, and check on past holidays.
          </p>

          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <label className={styles.field}>
              <span>Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span>Password</span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {error && <div className={styles.error}>{error}</div>}

            <button type="submit" className={styles.submit} disabled={submitting}>
              {submitting ? "Signing you in…" : "Log in"}
            </button>
          </form>

          <p className={styles.altLine}>
            New here?{" "}
            <Link href={`/signup${next !== "/account" ? `?next=${encodeURIComponent(next)}` : ""}`} className={styles.altLink}>
              Create an account
            </Link>
          </p>
        </div>

        <aside className={styles.visualSide} aria-hidden>
          <div className={styles.visualOverlay} />
          <div className={styles.visualText}>
            <span className={styles.visualKicker}>Trusted by 1,000+ travellers</span>
            <h2>
              "MHB had us in <span>Bali by Thursday</span> — we WhatsApp'd them Tuesday morning."
            </h2>
            <span className={styles.visualWho}>Hari · Mumbai · Bali, Feb 2026</span>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
