import Footer from "../components/Footer";
import Header from "../components/Header";
import WishlistPage from "./WishlistPage";

export const metadata = {
  title: "Wishlist · MyHolidayBro",
  description: "Trips you've saved to your MyHolidayBro wishlist — ready to share with a trip captain.",
};

export default function Page() {
  return (
    <>
      <Header />
      <WishlistPage />
      <Footer />
    </>
  );
}
