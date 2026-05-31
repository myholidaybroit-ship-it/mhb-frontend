import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import {
  DESTINATION_SLUGS,
  getDestination,
} from "../../data/destinations";
import TripDetail from "./TripDetail";

export function generateStaticParams() {
  return DESTINATION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) return { title: "Trip · MyHolidayBro" };
  return {
    title: `${dest.name} Trip · MyHolidayBro`,
    description: dest.tagline,
  };
}

export default async function TripPage({ params }) {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) notFound();

  return (
    <>
      <Header />
      <TripDetail dest={dest} />
      <Footer />
    </>
  );
}
