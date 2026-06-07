"use client";

// Auth context — now backed by the backend-mhb API (JWT). The public surface
// (user, isLoggedIn, hydrated, initial, login, signup, logout) is unchanged, so
// the login/account/header components keep working. login() and signup() are
// now async and resolve to { ok, error? }.

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { auth as authApi, getToken } from "../lib/api";

const AuthContext = createContext(null);

// Seeded demo account (lives in the backend now). Shown as a hint on /login.
export const DEMO_CREDENTIALS = {
  email: "test@gmail.com",
  password: "Test@71922",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  // Restore the session from a stored token on first mount.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!getToken()) { setHydrated(true); return; }
      try {
        const { user: me } = await authApi.me();
        if (!cancelled) setUser(me);
      } catch {
        authApi.logout(); // token expired/invalid
      } finally {
        if (!cancelled) setHydrated(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const signup = useCallback(async ({ name, email, password }) => {
    if (!name || !email || !password) return { ok: false, error: "Please fill every field." };
    if (password.length < 6) return { ok: false, error: "Password needs at least 6 characters." };
    try {
      const { user: me } = await authApi.signup({ name: name.trim(), email, password });
      setUser(me);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message || "Couldn't create your account." };
    }
  }, []);

  const login = useCallback(async ({ email, password }) => {
    if (!email || !password) return { ok: false, error: "Email and password required." };
    try {
      const { user: me } = await authApi.login({ email, password });
      setUser(me);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message || "Email or password doesn't match." };
    }
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
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
