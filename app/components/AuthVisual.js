"use client";

import Image from "next/image";
import { img } from "../data/destinations";
import styles from "./AuthShell.module.css";

const TILES = [
  { key: "maldives", label: "Maldives" },
  { key: "bali", label: "Bali" },
  { key: "thailand", label: "Thailand" },
  { key: "singapore", label: "Singapore" },
  { key: "dubai", label: "Dubai" },
  { key: "himachal", label: "Himachal" },
];

export default function AuthVisual() {
  return (
    <aside className={styles.visualSide} aria-hidden>
      <div className={styles.visualCollage}>
        {TILES.map((t, i) => (
          <span key={t.key} className={`${styles.visualTile} ${styles[`visualTile${i + 1}`]}`}>
            <Image
              src={img(t.key, 600, 800)}
              alt={t.label}
              fill
              sizes="(max-width: 900px) 50vw, 300px"
              className={styles.visualTileImg}
            />
            <span className={styles.visualTileLabel}>{t.label}</span>
          </span>
        ))}
      </div>
    </aside>
  );
}
