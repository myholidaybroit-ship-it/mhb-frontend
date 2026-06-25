import { notFound } from "next/navigation";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { getContent, loadPackage, getMoments } from "../../../lib/server";
import PackageDetail from "./PackageDetail";

// Strip "₹12,999" → 12999 for structured-data price fields.
function priceValue(str) {
  const n = parseInt(String(str ?? "").replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) ? n : undefined;
}

export async function generateMetadata({ params }) {
  const { slug, packageSlug } = await params;
  const data = await loadPackage(slug, packageSlug);
  if (!data?.package) return { title: "Package · MyHolidayBro" };

  const { package: pkg, destination: dest } = data;
  const nights = pkg.nights ?? Math.max(0, (pkg.days || 1) - 1);
  const title =
    pkg.seoTitle ||
    `${pkg.name} — ${pkg.days}D/${nights}N ${dest.name} Package | MyHolidayBro`;
  const description =
    pkg.seoDescription ||
    `Book the ${pkg.name} in ${dest.name}${dest.country ? `, ${dest.country}` : ""} from ${pkg.price}. ${pkg.days} days / ${nights} nights${pkg.route ? ` covering ${pkg.route}` : ""}. Handpicked itinerary, inclusions and instant quotes.`;
  const image = pkg.image || dest.image;

  return {
    title,
    description,
    alternates: { canonical: `/destinations/${slug}/${packageSlug}` },
    openGraph: {
      title,
      description,
      type: "website",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function PackagePage({ params }) {
  const { slug, packageSlug } = await params;
  const [data, content, moments] = await Promise.all([
    loadPackage(slug, packageSlug),
    getContent("content"),
    getMoments(),
  ]);
  if (!data?.package) notFound();

  const { package: pkg, destination: dest } = data;
  const nights = pkg.nights ?? Math.max(0, (pkg.days || 1) - 1);

  // Product / TouristTrip structured data for rich search results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pkg.name,
    description:
      pkg.seoDescription ||
      `${pkg.name} — ${pkg.days} days / ${nights} nights in ${dest.name}.`,
    image: [pkg.image || dest.image].filter(Boolean),
    brand: { "@type": "Brand", name: "MyHolidayBro" },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: priceValue(pkg.price),
      availability: "https://schema.org/InStock",
      url: `/destinations/${slug}/${packageSlug}`,
    },
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PackageDetail dest={dest} pkg={pkg} content={content} moments={moments} />
      <Footer />
    </>
  );
}
