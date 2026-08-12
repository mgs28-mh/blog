import { Figtree, Mulish} from "next/font/google";

export const bricolage = Figtree({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "700", "800"],
});

export const publicSans = Mulish({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "700", "800"],
  variable: "--font-public-sans",
});