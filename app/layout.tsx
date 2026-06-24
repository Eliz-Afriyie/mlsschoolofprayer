import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import SiteChrome from "./components/ui/SiteChrome";
import { getSiteContent } from "./lib/site-content";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteContent = await getSiteContent("site");

  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body>
        <SiteChrome siteContent={siteContent}>{children}</SiteChrome>
      </body>
    </html>
  );
}
