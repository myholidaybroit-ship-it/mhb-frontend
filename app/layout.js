import AppProviders from "./components/AppProviders";
import { tripSans, tripSansMono } from "./fonts";
import "./globals.css";

export const metadata = {
  title: "MyHolidayBro",
  description: "Your buddy for the perfect getaway.",
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
