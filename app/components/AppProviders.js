"use client";

import { AuthProvider } from "./AuthContext";
import { WishlistProvider } from "./WishlistContext";

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </AuthProvider>
  );
}
