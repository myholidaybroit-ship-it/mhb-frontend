"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import styles from "../components/AuthShell.module.css";

function SignupInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/account";
  const { signup, isLoggedIn, hydrated } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (hydrated && isLoggedIn) router.replace(next);
  }, [hydrated, isLoggedIn, next, router]);

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const res = signup(form);
    setSubmitting(false);
    if (!res.ok) setError(res.error);
    else router.push(next);
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.formSide}>
          <Link href="/" className={styles.backLink}>← Back to MHB</Link>
          <span className={styles.kicker}>Create your account</span>
          <h1 className={styles.heading}>
            Join <span className={styles.headingAccent}>MyHolidayBro</span>.
          </h1>
          <p className={styles.sub}>
            Save trips to a wishlist, get insider newsletter drops, and reach a trip captain in one tap.
          </p>

          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <label className={styles.field}>
              <span>Full name</span>
              <input
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span>Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span>Password</span>
              <input
                type="password"
                required
                autoComplete="new-password"
                minLength={6}
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
              />
              <small className={styles.hint}>Minimum 6 characters.</small>
            </label>

            {error && <div className={styles.error}>{error}</div>}

            <button type="submit" className={styles.submit} disabled={submitting}>
              {submitting ? "Creating your account…" : "Create account"}
            </button>
          </form>

          <p className={styles.altLine}>
            Already on MHB?{" "}
            <Link href={`/login${next !== "/account" ? `?next=${encodeURIComponent(next)}` : ""}`} className={styles.altLink}>
              Log in
            </Link>
          </p>
        </div>

        <aside className={styles.visualSide} aria-hidden>
          <div className={styles.visualOverlay} />
          <div className={styles.visualText}>
            <span className={styles.visualKicker}>Why sign up?</span>
            <h2>
              Save trips to your <span>wishlist</span>, get a single-click reply on WhatsApp.
            </h2>
            <span className={styles.visualWho}>It's free. Always will be.</span>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupInner />
    </Suspense>
  );
}
