import AppProviders from "./components/AppProviders";
import { tripSans, tripSansMono } from "./fonts";
import "./globals.css";

const FAVICON =
  "https://res.cloudinary.com/dyxxkrq8r/image/upload/v1782410977/MHB_Favicon_xh0zii.png";

export const metadata = {
  title: "MyHolidayBro",
  description: "Your buddy for the perfect getaway.",
  icons: {
    icon: FAVICON,
    shortcut: FAVICON,
    apple: FAVICON,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${tripSans.variable} ${tripSansMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
