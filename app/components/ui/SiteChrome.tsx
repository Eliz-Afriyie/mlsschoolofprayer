"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Navbar from "./Navbar";
import type { SiteSettings } from "@/app/lib/site-content";

export default function SiteChrome({
  children,
  siteContent,
}: {
  children: React.ReactNode;
  siteContent: SiteSettings;
}) {
  const pathname = usePathname();
  const hideChrome = pathname.startsWith("/admin");

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar content={siteContent} />
      {children}
      {siteContent.footerVisible ? <Footer content={siteContent} /> : null}
    </>
  );
}
