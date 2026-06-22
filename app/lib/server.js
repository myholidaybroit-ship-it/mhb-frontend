// Server-side data fetching from the backend-mhb API, for use in Next.js
// server components (pages/layouts). `no-store` keeps content live so admin
// edits show immediately. Falls back to null/[] on any error so a backend
// hiccup degrades gracefully rather than crashing the render.

import { resolvePackages } from "./packages";

const BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

async function apiGet(path) {
  try {
    const res = await fetch(`${BASE}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getDestinations() {
  const r = await apiGet("/destinations?limit=500&sort=name");
  return r?.data || [];
}
export async function getDestination(slug) {
  const r = await apiGet(`/destinations/${slug}`);
  return r?.data || null;
}
// A single package within a destination, with its parent destination for
// context. Returns { destination, package } or null.
export async function getPackage(slug, packageSlug) {
  const r = await apiGet(`/destinations/${slug}/packages/${packageSlug}`);
  return r?.data || null;
}

// Resolve a package for its detail page. Tries the dedicated API endpoint first
// (real, admin-authored packages); for destinations with no real packages it
// falls back to the synthesized placeholders so every package card still opens
// a working page. Returns { destination, package } or null.
export async function loadPackage(slug, packageSlug) {
  const direct = await getPackage(slug, packageSlug);
  if (direct?.package) return direct;

  const dest = await getDestination(slug);
  if (!dest) return null;
  const pkg = resolvePackages(dest).find((p) => p.slug === packageSlug);
  if (!pkg) return null;
  return { destination: dest, package: pkg };
}
export async function getWeekends() {
  const r = await apiGet("/weekends?limit=500");
  return r?.data || [];
}
// Blog posts — the public API only ever returns published posts. Each doc's
// business key is its `_id`; expose it as `slug` for the UI.
const withSlug = (b) => ({ ...b, slug: b.slug || b._id });
export async function getBlogs() {
  const r = await apiGet("/blogs?limit=200&sort=-publishedAt");
  return (r?.data || []).map(withSlug);
}
export async function getBlog(slug) {
  const r = await apiGet(`/blogs/${slug}`);
  return r?.data ? withSlug(r.data) : null;
}
export async function getWeekend(id) {
  const r = await apiGet(`/weekends/${id}`);
  return r?.data || null;
}
export async function getContent(key) {
  const r = await apiGet(`/content/${key}`);
  return r?.data || null;
}
// Collections behind the Stories / Moments sections. Migrated docs carry an
// `order` field; admin-added docs don't and float to the front (newest first).
const byOrder = (a, b) => (a.order ?? -1) - (b.order ?? -1);

export async function getMoments() {
  const r = await apiGet("/moments?limit=200");
  return (r?.data || []).map((m) => ({ id: m._id, ...m })).sort(byOrder);
}
export async function getTestimonials() {
  const r = await apiGet("/testimonials?limit=200");
  return (r?.data || []).map((t) => ({ id: t._id, ...t })).sort(byOrder);
}
