import Footer from "../components/Footer";
import Header from "../components/Header";
import NewsletterPage from "./NewsletterPage";

export const metadata = {
  title: "Newsletter · MyHolidayBro",
  description:
    "MHB Insider — one curated email a month. Big trip ideas, hidden deals and the destinations we're loving right now.",
};

export default function Page() {
  return (
    <>
      <Header />
      <NewsletterPage />
      <Footer />
    </>
  );
}
