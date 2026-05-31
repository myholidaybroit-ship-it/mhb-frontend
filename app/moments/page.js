import Footer from "../components/Footer";
import Header from "../components/Header";
import MomentsPage from "./MomentsPage";

export const metadata = {
  title: "Moments · MyHolidayBro",
  description:
    "Real trips, real photos, real reviews. A look at where MyHolidayBro travellers have been recently.",
};

export default function Page() {
  return (
    <>
      <Header />
      <MomentsPage />
      <Footer />
    </>
  );
}
