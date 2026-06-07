"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { DEMO_CREDENTIALS, useAuth } from "../components/AuthContext";
import AuthVisual from "../components/AuthVisual";
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

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const res = await login({ email, password });
    setSubmitting(false);
    if (!res.ok) setError(res.error);
    else router.push(next);
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.formSide}>
          <Link href="/" className={styles.backLink}>← Back to MHB</Link>
          <h1 className={styles.heading}>Log in</h1>

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

          <div className={styles.demoBox}>
            <div className={styles.demoHead}>
              <strong>Try with the demo account</strong>
              <button
                type="button"
                className={styles.demoFill}
                onClick={() => {
                  setEmail(DEMO_CREDENTIALS.email);
                  setPassword(DEMO_CREDENTIALS.password);
                }}
              >
                Fill demo creds
              </button>
            </div>
            <dl className={styles.demoList}>
              <div>
                <dt>Email</dt>
                <dd><code>{DEMO_CREDENTIALS.email}</code></dd>
              </div>
              <div>
                <dt>Password</dt>
                <dd><code>{DEMO_CREDENTIALS.password}</code></dd>
              </div>
            </dl>
          </div>
        </div>

        <AuthVisual />

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
