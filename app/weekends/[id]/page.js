import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { WEEKEND_TRIPS } from "../../data/weekends";
import WeekendDetail from "./WeekendDetail";

export async function generateStaticParams() {
  return WEEKEND_TRIPS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const trip = WEEKEND_TRIPS.find((t) => t.id === id);
  if (!trip) return { title: "Weekend trip · MyHolidayBro" };
  return {
    title: `${trip.name} · Weekend trip · MyHolidayBro`,
    description: trip.description,
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const trip = WEEKEND_TRIPS.find((t) => t.id === id);
  if (!trip) notFound();
  return (
    <>
      <Header />
      <WeekendDetail trip={trip} />
      <Footer />
    </>
  );
}
