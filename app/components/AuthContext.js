"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "mhb_auth_v1";
const USERS_KEY = "mhb_users_v1";

function readUsers() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}
function writeUsers(map) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(map));
}
function readSession() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}
function writeSession(user) {
  if (typeof window === "undefined") return;
  if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  else localStorage.removeItem(STORAGE_KEY);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(readSession());
    setHydrated(true);
    function onStorage(e) {
      if (e.key === STORAGE_KEY) setUser(readSession());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const signup = useCallback(({ name, email, password }) => {
    const e = (email || "").trim().toLowerCase();
    if (!name || !e || !password) {
      return { ok: false, error: "Please fill every field." };
    }
    if (password.length < 6) {
      return { ok: false, error: "Password needs at least 6 characters." };
    }
    const users = readUsers();
    if (users[e]) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const account = {
      id: `u_${Date.now().toString(36)}`,
      name: name.trim(),
      email: e,
      password, // demo only — never store plaintext passwords in real apps
      createdAt: Date.now(),
    };
    users[e] = account;
    writeUsers(users);
    const session = { id: account.id, name: account.name, email: account.email };
    writeSession(session);
    setUser(session);
    return { ok: true };
  }, []);

  const login = useCallback(({ email, password }) => {
    const e = (email || "").trim().toLowerCase();
    if (!e || !password) return { ok: false, error: "Email and password required." };
    const users = readUsers();
    const account = users[e];
    if (!account || account.password !== password) {
      return { ok: false, error: "Email or password doesn't match." };
    }
    const session = { id: account.id, name: account.name, email: account.email };
    writeSession(session);
    setUser(session);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    writeSession(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      hydrated,
      isLoggedIn: !!user,
      initial: user?.name ? user.name.trim().charAt(0).toUpperCase() : "",
      login,
      signup,
      logout,
    }),
    [user, hydrated, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
