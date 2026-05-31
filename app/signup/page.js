import Footer from "../components/Footer";
import Header from "../components/Header";
import SignupPage from "./SignupPage";

export const metadata = {
  title: "Sign up · MyHolidayBro",
  description: "Create your MyHolidayBro account to save trips, manage wishlists and unlock insider deals.",
};

export default function Page() {
  return (
    <>
      <Header />
      <SignupPage />
      <Footer />
    </>
  );
}
