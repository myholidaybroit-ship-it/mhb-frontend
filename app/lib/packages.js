// Per-package slug helpers — must mirror the backend's
// src/utils/packageSlugs.js so the URLs the frontend links to resolve on the
// API. Each package in a destination gets a stable, unique slug derived from
// its name (admin-supplied slug wins), de-duplicated within the destination.

export const slugify = (s = "") =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// Return a copy of the packages array with a guaranteed `.slug` on each entry.
export function withPackageSlugs(packages = []) {
  const seen = new Set();
  return packages.map((p, i) => {
    const base = slugify(p?.slug || p?.name || "") || `package-${i + 1}`;
    let slug = base;
    let n = 2;
    while (seen.has(slug)) slug = `${base}-${n++}`;
    seen.add(slug);
    return { ...p, slug };
  });
}

// The public URL for a single package detail page.
export function packageHref(destSlug, pkgSlug) {
  return `/destinations/${destSlug}/${pkgSlug}`;
}

// The canonical, slugged package list for a destination — strictly the real
// packages the admin authored. No synthesized placeholders: when a destination
// has no packages the list is empty, so the UI hides package sections instead
// of inventing trips the team never created.
export function resolvePackages(dest) {
  return withPackageSlugs(dest?.packages || []);
}
