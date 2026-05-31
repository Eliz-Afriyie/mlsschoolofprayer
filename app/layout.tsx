import type { Metadata } from "next";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
