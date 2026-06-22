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

// Placeholder packages for destinations the admin hasn't added real packages to
// yet. Mirrors the fallback the destination detail page renders, so the cards
// and their detail pages stay in sync.
export function defaultPackagesFor(dest = {}) {
  return [
    {
      name: `${dest.name} Getaway`,
      days: 5,
      nights: 4,
      price: dest.fromPrice || "On request",
      route: dest.name,
      tag: (dest.idealFor || "Trip").split("·")[0].trim(),
    },
    {
      name: `${dest.name} Explorer`,
      days: 7,
      nights: 6,
      price: dest.fromPrice || "On request",
      route: dest.name,
      tag: "Explorer",
    },
  ];
}

// The canonical, slugged package list for a destination — real packages when
// present, else the placeholders. Every package here has a usable `.slug`.
export function resolvePackages(dest) {
  const list = dest?.packages?.length ? dest.packages : defaultPackagesFor(dest || {});
  return withPackageSlugs(list);
}
