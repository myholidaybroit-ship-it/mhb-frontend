import Footer from "../components/Footer";
import Header from "../components/Header";
import ContactPage from "./ContactPage";

export const metadata = {
  title: "Contact · MyHolidayBro",
  description:
    "Got questions? Need travel tips? Just want to share your latest holiday story? We're all ears at MyHolidayBro — call, WhatsApp or drop us a note.",
};

export default function Page() {
  return (
    <>
      <Header />
      <ContactPage />
      <Footer />
    </>
  );
}
