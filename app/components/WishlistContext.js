"use client";

// Wishlist context. When the visitor is logged in, the wishlist lives in the
// backend (per-user). Guests still get a localStorage wishlist, which is merged
// into their account on the next login. Public surface is unchanged
// (items, count, hydrated, has, add, remove, toggle, clear).

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { account, getToken } from "../lib/api";

const WishlistContext = createContext(null);
const STORAGE_KEY = "mhb_wishlist_v1";

const loggedIn = () => !!getToken();

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
    let cancelled = false;
    (async () => {
      if (loggedIn()) {
        try {
          let server = (await account.wishlist()).items || [];
          // Merge any items the visitor saved as a guest before logging in.
          const local = read();
          if (local.length) {
            const ids = new Set(server.map((i) => i.id));
            const merged = [...server, ...local.filter((i) => !ids.has(i.id))];
            if (merged.length !== server.length) server = (await account.setWishlist(merged)).items;
            write([]);
          }
          if (!cancelled) setItems(server);
        } catch {
          if (!cancelled) setItems(read());
        }
      } else if (!cancelled) {
        setItems(read());
      }
      if (!cancelled) setHydrated(true);
    })();

    function onStorage(e) {
      if (e.key === STORAGE_KEY && !loggedIn()) setItems(read());
    }
    window.addEventListener("storage", onStorage);
    return () => { cancelled = true; window.removeEventListener("storage", onStorage); };
  }, []);

  const has = useCallback((id) => items.some((i) => i.id === id), [items]);

  const add = useCallback((item) => {
    if (!item?.id) return;
    setItems((prev) => (prev.some((i) => i.id === item.id) ? prev : [{ ...item, addedAt: Date.now() }, ...prev]));
    if (loggedIn()) account.addWishlist(item).then((r) => setItems(r.items)).catch(() => {});
    else setItems((prev) => { write(prev); return prev; });
  }, []);

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (loggedIn()) account.removeWishlist(id).then((r) => setItems(r.items)).catch(() => {});
    else setItems((prev) => { write(prev); return prev; });
  }, []);

  const toggle = useCallback((item) => {
    const exists = items.some((i) => i.id === item.id);
    if (exists) remove(item.id);
    else add(item);
  }, [items, add, remove]);

  const clear = useCallback(() => {
    setItems([]);
    if (loggedIn()) account.clearWishlist().catch(() => {});
    else write([]);
  }, []);

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
