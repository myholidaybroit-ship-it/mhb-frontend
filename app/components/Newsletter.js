"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./Newsletter.module.css";

const HERO_IMAGE =
  "https://static.wixstatic.com/media/nsplsh_657846644f576b59425177~mv2.jpg/v1/fill/w_1200,h_1200,al_c,q_85,enc_avif,quality_auto/nsplsh_657846644f576b59425177~mv2.jpg";

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export default function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  }

  return (
    <section className={styles.section} id="newsletter">
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.imageWrap}>
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.image}
            />
          </div>

          <div className={styles.content}>
            <span className={styles.eyebrow}>Join the crew</span>
            <h2 className={styles.heading}>
              Trip ideas, in your{" "}
              <span className={styles.headingAccent}>inbox</span>.
            </h2>
            <p className={styles.sub}>
              The best deals, hidden gems, and travel hacks — twice a month,
              hand-picked by our team. Never spammy.
            </p>

            {done ? (
              <div className={styles.success}>
                You&apos;re in. Keep an eye on your inbox <span aria-hidden>📬</span>
              </div>
            ) : (
              <form className={styles.form} onSubmit={onSubmit} noValidate>
                <div className={styles.fields}>
                  <label className={styles.field}>
                    <span className={styles.label}>First name</span>
                    <input
                      type="text"
                      placeholder="Shiv"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={styles.input}
                      autoComplete="given-name"
                    />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>Email</span>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.input}
                      autoComplete="email"
                      required
                    />
                  </label>
                </div>
                <button type="submit" className={styles.button}>
                  Subscribe
                  <ArrowIcon />
                </button>
              </form>
            )}

            <span className={styles.note}>
              No spam. Unsubscribe anytime.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
