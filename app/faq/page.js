import Footer from "../components/Footer";
import Header from "../components/Header";
import FaqPage from "./FaqPage";
import { getContent } from "../lib/server";

export const metadata = {
  title: "FAQ · MyHolidayBro",
  description:
    "Frequently asked questions about MyHolidayBro — bookings, payments, cancellations, visas, on-trip support and more.",
};

export default async function Page() {
  const c = await getContent("content");
  const settings = await getContent("settings");
  return (
    <>
      <Header />
      <FaqPage categories={c?.faqCategories || []} intro={c?.faqIntro} faqs={c?.faqs || []} settings={settings} />
      <Footer />
    </>
  );
}
