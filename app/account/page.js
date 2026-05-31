import Footer from "../components/Footer";
import Header from "../components/Header";
import AccountPage from "./AccountPage";

export const metadata = {
  title: "Your account · MyHolidayBro",
  description: "Manage your MyHolidayBro account, wishlist and bookings.",
};

export default function Page() {
  return (
    <>
      <Header />
      <AccountPage />
      <Footer />
    </>
  );
}
