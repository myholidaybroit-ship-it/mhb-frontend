import { Suspense } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import DestinationsList from "./DestinationsList";

export const metadata = {
  title: "All Destinations · MyHolidayBro",
  description:
    "Browse every MyHolidayBro trip — search, filter and find your next holiday across India and the world.",
};

export default function DestinationsIndex() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <DestinationsList />
      </Suspense>
      <Footer />
    </>
  );
}
