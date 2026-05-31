"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext(null);
const STORAGE_KEY = "mhb_wishlist_v1";

function read() {
  if (typeof window === "undefined") return [];
  try {
    const arr = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
function write(items) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(read());
    setHydrated(true);
    function onStorage(e) {
      if (e.key === STORAGE_KEY) setItems(read());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next) => {
    setItems(next);
    write(next);
  }, []);

  const has = useCallback((id) => items.some((i) => i.id === id), [items]);

  const add = useCallback(
    (item) => {
      if (!item?.id) return;
      setItems((prev) => {
        if (prev.some((i) => i.id === item.id)) return prev;
        const next = [{ ...item, addedAt: Date.now() }, ...prev];
        write(next);
        return next;
      });
    },
    []
  );

  const remove = useCallback((id) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      write(next);
      return next;
    });
  }, []);

  const toggle = useCallback((item) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      const next = exists
        ? prev.filter((i) => i.id !== item.id)
        : [{ ...item, addedAt: Date.now() }, ...prev];
      write(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => persist([]), [persist]);

  const value = useMemo(
    () => ({ items, count: items.length, hydrated, has, add, remove, toggle, clear }),
    [items, hydrated, has, add, remove, toggle, clear]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
