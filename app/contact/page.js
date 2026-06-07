import Footer from "../components/Footer";
import Header from "../components/Header";
import ContactPage from "./ContactPage";
import { getContent } from "../lib/server";

export const metadata = {
  title: "Contact · MyHolidayBro",
  description:
    "Got questions? Need travel tips? Just want to share your latest holiday story? We're all ears at MyHolidayBro — call, WhatsApp or drop us a note.",
};

export default async function Page() {
  const c = await getContent("contact");
  const s = await getContent("settings");
  return (
    <>
      <Header />
      <ContactPage content={c} settings={s} />
      <Footer />
    </>
  );
}
