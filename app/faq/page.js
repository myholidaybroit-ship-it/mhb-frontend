import Footer from "../components/Footer";
import Header from "../components/Header";
import FaqPage from "./FaqPage";

export const metadata = {
  title: "FAQ · MyHolidayBro",
  description:
    "Frequently asked questions about MyHolidayBro — bookings, payments, cancellations, visas, on-trip support and more.",
};

export default function Page() {
  return (
    <>
      <Header />
      <FaqPage />
      <Footer />
    </>
  );
}
