import Footer from "../components/Footer";
import Header from "../components/Header";
import WeekendsPage from "./WeekendsPage";

export const metadata = {
  title: "Weekend Trips · MyHolidayBro",
  description:
    "Pack a bag and leave Friday. 10 long-weekend escapes with pickup from your city — see the full Weekend Departures Board.",
};

export default function Page() {
  return (
    <>
      <Header />
      <WeekendsPage />
      <Footer />
    </>
  );
}
