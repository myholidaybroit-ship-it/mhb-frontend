import localFont from "next/font/local";

export const tripSans = localFont({
  src: [
    { path: "./fonts/trip-sans.otf", weight: "400", style: "normal" },
    { path: "./fonts/trip-sans-medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/trip-sans-bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/trip-sans-ultra.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-trip-sans",
  display: "swap",
});

export const tripSansMono = localFont({
  src: "./fonts/trip-sans-mono-regular.otf",
  variable: "--font-trip-sans-mono",
  display: "swap",
  weight: "400",
});
