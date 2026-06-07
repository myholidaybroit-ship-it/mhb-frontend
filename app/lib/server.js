// Server-side data fetching from the backend-mhb API, for use in Next.js
// server components (pages/layouts). `no-store` keeps content live so admin
// edits show immediately. Falls back to null/[] on any error so a backend
// hiccup degrades gracefully rather than crashing the render.

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
export async function getWeekends() {
  const r = await apiGet("/weekends?limit=500");
  return r?.data || [];
}
export async function getWeekend(id) {
  const r = await apiGet(`/weekends/${id}`);
  return r?.data || null;
}
export async function getContent(key) {
  const r = await apiGet(`/content/${key}`);
  return r?.data || null;
}
export async function getMoments() {
  const r = await apiGet("/moments");
  return r?.data || [];
}
export async function getTestimonials() {
  const r = await apiGet("/testimonials");
  return r?.data || [];
}
