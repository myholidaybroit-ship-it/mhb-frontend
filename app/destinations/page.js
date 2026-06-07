import { Suspense } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import DestinationsList from "./DestinationsList";
import { getDestinations } from "../lib/server";

export const metadata = {
  title: "All Destinations · MyHolidayBro",
  description:
    "Browse every MyHolidayBro trip — search, filter and find your next holiday across India and the world.",
};

export default async function DestinationsIndex() {
  const destinations = await getDestinations();
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <DestinationsList destinations={destinations} />
      </Suspense>
      <Footer />
    </>
  );
}
