import Blogs from "./components/Blogs";
import Bookings from "./components/Bookings";
import FeaturedOn from "./components/FeaturedOn";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Moments from "./components/Moments";
import Newsletter from "./components/Newsletter";
import Packages from "./components/Packages";
import Partners from "./components/Partners";
import Stories from "./components/Stories";
import Travelers from "./components/Travelers";
import Weekends from "./components/Weekends";
import WhyUs from "./components/WhyUs";
import { getContent, getWeekends } from "./lib/server";

// Home content is served live from the CMS (`home` singleton) + the weekends
// collection. Each section receives its slice and falls back to built-in
// defaults if missing, so the page never degrades.
export default async function Home() {
  const [home, weekends] = await Promise.all([getContent("home"), getWeekends()]);
  const h = home || {};
  return (
    <>
      <Header />
      <main>
        <Hero data={h.hero} />
        <Travelers data={h.travelers} />
        <Bookings data={h.bookings} />
        <Packages data={h.packages} />
        <Weekends trips={weekends} />
        <Stories data={h.stories} />
        <Moments data={h.moments} />
        <Partners data={h.partners} />
        <WhyUs data={h.whyUs} />
        <FeaturedOn data={h.featuredOn} />
        <Blogs data={h.blogs} />
        <Newsletter data={h.newsletter} />
      </main>
      <Footer />
    </>
  );
}
