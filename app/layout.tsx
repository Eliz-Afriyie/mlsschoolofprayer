import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import SiteChrome from "./components/ui/SiteChrome";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "mlsschoolofprayer",
  description:
    "STRATEGIC PRAYER EDUCATION AND DIRECTIONS FOR THE BODY OF CHRIST",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
