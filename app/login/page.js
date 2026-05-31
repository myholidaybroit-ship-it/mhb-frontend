import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginPage from "./LoginPage";

export const metadata = {
  title: "Login · MyHolidayBro",
  description: "Sign in to your MyHolidayBro account to manage trips, view your wishlist and continue planning your next holiday.",
};

export default function Page() {
  return (
    <>
      <Header />
      <LoginPage />
      <Footer />
    </>
  );
}
