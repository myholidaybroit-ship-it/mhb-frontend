"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { catalog } from "../lib/api";
import { img } from "../lib/img";
import styles from "./AuthShell.module.css";

// Minimal inline fallback so the auth screens never look broken if the
// backend is unreachable or returns nothing.
const FALLBACK_TILES = [
  { image: img("maldives", 600, 800), name: "Maldives" },
  { image: img("bali", 600, 800), name: "Bali" },
  { image: img("thailand", 600, 800), name: "Thailand" },
  { image: img("singapore", 600, 800), name: "Singapore" },
  { image: img("dubai", 600, 800), name: "Dubai" },
  { image: img("himachal", 600, 800), name: "Himachal" },
];

export default function AuthVisual() {
  const [tiles, setTiles] = useState(FALLBACK_TILES);

  useEffect(() => {
    let cancelled = false;
    catalog
      .destinations("?limit=6&sort=name")
      .then((r) => {
        const list = (r?.data || []).slice(0, 6);
        if (!cancelled && list.length) {
          setTiles(list.map((d) => ({ image: d.image, name: d.name })));
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <aside className={styles.visualSide} aria-hidden>
      <div className={styles.visualCollage}>
        {tiles.map((t, i) => (
          <span key={t.name} className={`${styles.visualTile} ${styles[`visualTile${i + 1}`]}`}>
            <Image
              src={t.image}
              alt={t.name}
              fill
              sizes="(max-width: 900px) 50vw, 300px"
              className={styles.visualTileImg}
            />
            <span className={styles.visualTileLabel}>{t.name}</span>
          </span>
        ))}
      </div>
    </aside>
  );
}
