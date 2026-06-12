import Footer from "../components/Footer";
import Header from "../components/Header";
import MomentsPage from "./MomentsPage";
import { getMoments, getTestimonials } from "../lib/server";

export const metadata = {
  title: "Moments · MyHolidayBro",
  description:
    "Real trips, real photos, real reviews. A look at where MyHolidayBro travellers have been recently.",
};

export default async function Page() {
  const [moments, videos] = await Promise.all([getMoments(), getTestimonials()]);
  return (
    <>
      <Header />
      <MomentsPage moments={moments} videos={videos} />
      <Footer />
    </>
  );
}
