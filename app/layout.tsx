import type { Metadata } from "next";
import SiteChrome from "./components/ui/SiteChrome";
import "./globals.css";

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
    <html lang="en">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
