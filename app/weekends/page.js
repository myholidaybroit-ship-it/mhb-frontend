import Footer from "../components/Footer";
import Header from "../components/Header";
import WeekendsPage from "./WeekendsPage";
import { getWeekends } from "../lib/server";

export const metadata = {
  title: "Weekend Trips · MyHolidayBro",
  description:
    "Pack a bag and leave Friday. 10 long-weekend escapes with pickup from your city — see the full Weekend Departures Board.",
};

export default async function Page() {
  const trips = await getWeekends();
  return (
    <>
      <Header />
      <WeekendsPage trips={trips} />
      <Footer />
    </>
  );
}
