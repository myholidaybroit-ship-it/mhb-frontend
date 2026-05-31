"use client";

import { useWishlist } from "./WishlistContext";
import styles from "./WishlistButton.module.css";

export default function WishlistButton({ item, size = "md", className = "", label }) {
  const { has, toggle, hydrated } = useWishlist();
  const saved = hydrated && has(item.id);

  function onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    toggle(item);
  }

  const sizeClass = size === "sm" ? styles.sm : size === "lg" ? styles.lg : styles.md;
  const ariaLabel = label || (saved ? `Remove ${item.name} from wishlist` : `Add ${item.name} to wishlist`);

  return (
    <button
      type="button"
      className={`${styles.btn} ${sizeClass} ${saved ? styles.saved : ""} ${className}`}
      onClick={onClick}
      aria-pressed={saved}
      aria-label={ariaLabel}
    >
      <svg viewBox="0 0 24 24" aria-hidden focusable="false">
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          fill={saved ? "#dc2626" : "none"}
          stroke={saved ? "#dc2626" : "currentColor"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
