import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { getContent, getWeekend, getWeekends } from "../../lib/server";
import WeekendDetail from "./WeekendDetail";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const trip = await getWeekend(id);
  if (!trip) return { title: "Weekend trip · MyHolidayBro" };
  return {
    title: `${trip.name} · Weekend trip · MyHolidayBro`,
    description: trip.description,
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const [trip, content, all] = await Promise.all([
    getWeekend(id),
    getContent("content"),
    getWeekends(),
  ]);
  if (!trip) notFound();

  const related = (all || []).filter((w) => (w.id || w._id) !== id).slice(0, 4);

  return (
    <>
      <Header />
      <WeekendDetail trip={trip} content={content} related={related} />
      <Footer />
    </>
  );
}
