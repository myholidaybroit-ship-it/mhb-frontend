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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Travelers />
        <Bookings />
        <Packages />
        <Weekends />
        <Stories />
        <Moments />
        <Partners />
        <WhyUs />
        <FeaturedOn />
        <Blogs />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
