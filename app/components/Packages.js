"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./Packages.module.css";
import WishlistButton from "./WishlistButton";

const SLUG_OVERRIDE = {
  "France + Switzerland": "france-switzerland",
  "Singapore + Malaysia": "singapore",
};

function toSlug(name) {
  if (SLUG_OVERRIDE[name]) return SLUG_OVERRIDE[name];
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const SLOT_CLASS = [
  "slotWide",
  "slotLeft1",
  "slotLeft2",
  "slotTall",
  "slotRight1",
  "slotRight2",
];

export default function Packages({ data }) {
  const tabs = data?.tabs || [];
  const [tab, setTab] = useState(null);
  const activeTabId = tab ?? tabs[0]?.id ?? null;
  const items = tabs.find((t) => t.id === activeTabId)?.items || [];

  return (
    <section className={styles.section} id="packages">
      <div className={styles.container}>
        <header className={styles.head}>
          <h2 className={styles.heading}>{data?.title || "Packages by duration"}</h2>
          <div className={styles.tabs} role="tablist">
            {tabs.map((t) => {
              const active = activeTabId === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`${styles.tab} ${active ? styles.tabActive : ""}`}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </header>

        <div className={styles.grid} key={activeTabId}>
          {items.map((p, i) => (
            <a
              key={`${activeTabId}-${p.name}`}
              href={`/destinations/${toSlug(p.name)}`}
              className={`${styles.card} ${styles[SLOT_CLASS[i]]}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width: 900px) 50vw, 30vw"
                className={styles.cardImage}
              />
              <WishlistButton
                className={styles.heartBtn}
                item={{
                  id: `package:${toSlug(p.name)}`,
                  kind: "package",
                  name: p.name,
                  price: p.price,
                  image: p.image,
                  href: `/destinations/${toSlug(p.name)}`,
                }}
              />
              <div className={styles.cardLabel}>
                <span className={styles.cardName}>{p.name}</span>
                <span className={styles.cardPrice}>From {p.price}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
