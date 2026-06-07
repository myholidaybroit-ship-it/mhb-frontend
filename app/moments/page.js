import Footer from "../components/Footer";
import Header from "../components/Header";
import MomentsPage from "./MomentsPage";
import { getContent, getTestimonials } from "../lib/server";

export const metadata = {
  title: "Moments · MyHolidayBro",
  description:
    "Real trips, real photos, real reviews. A look at where MyHolidayBro travellers have been recently.",
};

export default async function Page() {
  const home = await getContent("home");
  const moments = home?.moments?.items || [];
  const videos = await getTestimonials();
  return (
    <>
      <Header />
      <MomentsPage moments={moments} videos={videos} />
      <Footer />
    </>
  );
}
