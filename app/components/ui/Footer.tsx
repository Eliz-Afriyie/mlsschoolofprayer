import Link from "next/link";
import type { SiteSettings } from "@/app/lib/site-content";

export default function Footer({ content }: { content: SiteSettings }) {
  return (
    <footer className="bg-[#0F2E14] text-white">
      <div className="site-container grid gap-10 py-12 sm:py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src={content.footerImage}
            alt={content.siteName}
            className="h-28 w-44 rounded-2xl object-cover"
          />
          <h2 className="mb-4 mt-4 text-2xl font-bold">{content.siteName}</h2>
          <p className="leading-7 text-gray-300">{content.footerDescription}</p>
        </div>

        <div>
          <h3 className="mb-5 font-semibold">Quick Links</h3>
          <ul className="space-y-3 text-gray-300">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/devotional">Devotionals</Link></li>
            <li><Link href="/books">Books</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 font-semibold">Resources</h3>
          <ul className="space-y-3 text-gray-300">
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/">Privacy Policy</Link></li>
            <li><Link href="/">Terms of Use</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 font-semibold">Contact</h3>
          <ul className="space-y-3 text-gray-300">
            <li>{content.email}</li>
            <li>{content.phone}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm text-gray-400">
        &copy; 2026 {content.siteName}. All rights reserved.
      </div>
    </footer>
  );
}
