"use client";

import { Barlow, Inter } from "next/font/google";

const barlow = Barlow({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-barlow",
});

const inter = Inter({ subsets: ["latin"] });

export default function FontStyles() {
  return (
    <style jsx global>{`
      :root {
        --font-barlow: ${barlow.style.fontFamily};
        --font-inter: ${inter.style.fontFamily};
      }
    `}</style>
  );
}

export { barlow, inter };
