"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./Packages.module.css";
import WishlistButton from "./WishlistButton";

const W = (slug, file) =>
  `https://static.wixstatic.com/media/${slug}/v1/fill/w_900,h_700,al_c,q_85,enc_avif,quality_auto/${file}`;

const IMG = {
  bali: W(
    "nsplsh_657846644f576b59425177~mv2.jpg",
    "nsplsh_657846644f576b59425177~mv2.jpg"
  ),
  thailand: W(
    "nsplsh_6a574b6b2d305a42557967~mv2_d_4439_3072_s_4_2.jpg",
    "nsplsh_6a574b6b2d305a42557967~mv2_d_4439_3072_s_4_2.jpg"
  ),
  singapore: W(
    "nsplsh_df573ee0f6154a9a80b452293e2c0475~mv2.jpg",
    "nsplsh_df573ee0f6154a9a80b452293e2c0475~mv2.jpg"
  ),
  malaysia: W(
    "nsplsh_05291b47a88e40e986ad33b6de021909~mv2.jpg",
    "nsplsh_05291b47a88e40e986ad33b6de021909~mv2.jpg"
  ),
  vietnam: W(
    "11062b_a0faae69bec6475c834fa172822d6ba9~mv2.jpeg",
    "11062b_a0faae69bec6475c834fa172822d6ba9~mv2.jpeg"
  ),
  dubai: W(
    "e7beb6_45e14c300a1f4d98a7b96422aaac6f10~mv2.jpg",
    "e7beb6_45e14c300a1f4d98a7b96422aaac6f10~mv2.jpg"
  ),
  maldives: W(
    "nsplsh_4d314f6278767357566859~mv2.jpg",
    "nsplsh_4d314f6278767357566859~mv2.jpg"
  ),
  maldives2: W(
    "nsplsh_6c543972716647376c6351~mv2_d_5464_3070_s_4_2.jpg",
    "nsplsh_6c543972716647376c6351~mv2_d_5464_3070_s_4_2.jpg"
  ),
  himachal: W(
    "nsplsh_c9a8db6c852e41de80d01c2d166a13ee~mv2.jpg",
    "nsplsh_c9a8db6c852e41de80d01c2d166a13ee~mv2.jpg"
  ),
  northeast: W(
    "nsplsh_ce21f1ca7cb74b3397fee018e612680b~mv2.jpg",
    "nsplsh_ce21f1ca7cb74b3397fee018e612680b~mv2.jpg"
  ),
};

const PACKAGES = {
  short: [
    { name: "Kerala", price: "₹9,999", image: IMG.malaysia },
    { name: "Goa", price: "₹5,999", image: IMG.thailand },
    { name: "Karnataka", price: "₹6,999", image: IMG.northeast },
    { name: "Himachal", price: "₹6,999", image: IMG.himachal },
    { name: "Kashmir", price: "₹13,999", image: IMG.himachal },
    { name: "Rajasthan", price: "₹9,999", image: IMG.dubai },
  ],
  mid: [
    { name: "Singapore + Malaysia", price: "₹38,999", image: IMG.singapore },
    { name: "Vietnam", price: "₹17,999", image: IMG.vietnam },
    { name: "Bali", price: "₹14,999", image: IMG.bali },
    { name: "Thailand", price: "₹14,999", image: IMG.thailand },
    { name: "Dubai", price: "₹24,999", image: IMG.dubai },
    { name: "Malaysia", price: "₹15,999", image: IMG.malaysia },
  ],
  long: [
    { name: "France + Switzerland", price: "₹99,999", image: IMG.himachal },
    { name: "Norway", price: "₹1,49,999", image: IMG.vietnam },
    { name: "Greece", price: "₹99,999", image: IMG.maldives2 },
    { name: "Egypt", price: "₹62,999", image: IMG.dubai },
    { name: "Turkey", price: "₹63,999", image: IMG.bali },
    { name: "Maldives", price: "₹49,999", image: IMG.maldives },
  ],
};

const TABS = [
  { id: "short", label: "3-5 Days" },
  { id: "mid", label: "6-9 Days" },
  { id: "long", label: "10+ Days" },
];

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

export default function Packages() {
  const [tab, setTab] = useState("long");
  const items = PACKAGES[tab];

  return (
    <section className={styles.section} id="packages">
      <div className={styles.container}>
        <header className={styles.head}>
          <h2 className={styles.heading}>Packages by duration</h2>
          <div className={styles.tabs} role="tablist">
            {TABS.map((t) => {
              const active = tab === t.id;
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

        <div className={styles.grid} key={tab}>
          {items.map((p, i) => (
            <a
              key={`${tab}-${p.name}`}
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
