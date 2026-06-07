import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { getContent, getDestination, getDestinations } from "../../lib/server";
import TripDetail from "./TripDetail";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dest = await getDestination(slug);
  if (!dest) return { title: "Trip · MyHolidayBro" };
  return {
    title: `${dest.name} Trip · MyHolidayBro`,
    description: dest.tagline,
  };
}

export default async function TripPage({ params }) {
  const { slug } = await params;
  const [dest, content, all] = await Promise.all([
    getDestination(slug),
    getContent("content"),
    getDestinations(),
  ]);
  if (!dest) notFound();

  const related = (all || []).filter((d) => d.slug !== slug).slice(0, 6);

  return (
    <>
      <Header />
      <TripDetail dest={dest} content={content} related={related} />
      <Footer />
    </>
  );
}
