import { Bricolage_Grotesque, Public_Sans } from "next/font/google";

export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "700", "800"],
});

export const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-public-sans",
});
