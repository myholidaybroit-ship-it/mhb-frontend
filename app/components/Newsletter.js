"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./Newsletter.module.css";
import { forms } from "../lib/api";

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export default function Newsletter({ data }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const bg = data?.backgroundImage;
  const eyebrow = data?.eyebrow || "Join the crew";
  const sub = data?.subheading || "The best deals, hidden gems, and travel hacks — twice a month, hand-picked by our team. Never spammy.";

  function onSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    forms.subscribe(email, "newsletter-section").catch((err) => console.error("Subscribe failed:", err.message));
    setDone(true);
  }

  return (
    <section className={styles.section} id="newsletter">
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.imageWrap}>
            {bg && (
              <Image
                src={bg}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.image}
              />
            )}
          </div>

          <div className={styles.content}>
            <span className={styles.eyebrow}>{eyebrow}</span>
            <h2 className={styles.heading}>
              {data?.heading ? (
                data.heading
              ) : (
                <>
                  Trip ideas, in your{" "}
                  <span className={styles.headingAccent}>inbox</span>.
                </>
              )}
            </h2>
            <p className={styles.sub}>{sub}</p>

            {done ? (
              <div className={styles.success}>
                {data?.successMessage ? (
                  data.successMessage
                ) : (
                  <>
                    You&apos;re in. Keep an eye on your inbox{" "}
                    <span aria-hidden>📬</span>
                  </>
                )}
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
                  {data?.buttonLabel || "Subscribe"}
                  <ArrowIcon />
                </button>
              </form>
            )}

            <span className={styles.note}>
              {data?.footnote || "No spam. Unsubscribe anytime."}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
