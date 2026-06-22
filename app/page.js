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
import { getContent, getWeekends, getMoments, getTestimonials, getDestinations, getBlogs } from "./lib/server";

// Home content is served live from the CMS (`home` singleton) + the weekends,
// testimonials and moments collections — so the admin's Weekend Trips and
// Moments pages drive these sections directly. Each section receives its slice
// and falls back to built-in defaults if missing, so the page never degrades.
export default async function Home() {
  const [home, weekends, testimonials, moments, settings, destinations, blogs] = await Promise.all([
    getContent("home"), getWeekends(), getTestimonials(), getMoments(), getContent("settings"), getDestinations(), getBlogs(),
  ]);
  const h = home || {};
  const s = settings || {};
  return (
    <>
      <Header />
      <main>
        <Hero data={h.hero} destinations={destinations} />
        <Travelers data={h.travelers} />
        <Bookings data={h.bookings} />
        <Packages data={h.packages} />
        <Weekends trips={weekends} />
        <Stories data={{
          title: h.stories?.title,
          score: s.googleRating || h.stories?.score,
          ratingText: s.googleReviews ? `${s.googleReviews} reviews` : h.stories?.ratingText,
          items: testimonials,
        }} />
        <Moments data={{ title: h.moments?.title, items: moments }} />
        <Partners data={h.partners} />
        <WhyUs data={h.whyUs} />
        <FeaturedOn data={h.featuredOn} />
        <Blogs data={h.blogs} posts={blogs} />
        <Newsletter data={h.newsletter} />
      </main>
      <Footer />
    </>
  );
}
