import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import type { SiteSettings } from "@/app/lib/site-content";

export default function Footer({ content }: { content: SiteSettings }) {
  const phoneHref = `tel:${content.phone.replace(/[^\d+]/g, "")}`;
  const linkClass =
    "transition hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300";

  return (
    <footer className="bg-[#0F2E14] text-white">
      <div className="site-container grid gap-10 py-12 sm:py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className={`inline-block ${linkClass}`}>
            {content.footerImage ? (
              <img
                src={content.footerImage}
                alt={content.siteName}
                className="h-28 w-44 rounded-2xl object-cover"
              />
            ) : null}
            <h2 className="mb-4 mt-4 text-2xl font-bold">{content.siteName}</h2>
          </Link>
          <p className="leading-7 text-gray-300">{content.footerDescription}</p>
        </div>

        <div>
          <h3 className="mb-5 font-semibold">Quick Links</h3>
          <ul className="space-y-3 text-gray-300">
            <li><Link href="/" className={linkClass}>Home</Link></li>
            <li><Link href="/devotional" className={linkClass}>Devotionals</Link></li>
            <li><Link href="/books" className={linkClass}>Books</Link></li>
            <li><Link href="/about" className={linkClass}>About</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 font-semibold">Resources</h3>
          <ul className="space-y-3 text-gray-300">
            <li><Link href="/contact" className={linkClass}>Contact</Link></li>
            <li><Link href="/privacy" className={linkClass}>Privacy Policy</Link></li>
            <li><Link href="/terms" className={linkClass}>Terms of Use</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 font-semibold">Contact</h3>
          <ul className="space-y-3 text-gray-300">
            {content.email ? (
              <li>
                <a
                  href={`mailto:${content.email}`}
                  className={`inline-flex items-center gap-2 break-all ${linkClass}`}
                >
                  <Mail className="shrink-0" size={17} />
                  {content.email}
                </a>
              </li>
            ) : null}
            {content.phone ? (
              <li>
                <a
                  href={phoneHref}
                  className={`inline-flex items-center gap-2 ${linkClass}`}
                >
                  <Phone className="shrink-0" size={17} />
                  {content.phone}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} {content.siteName}. All rights reserved.
      </div>
    </footer>
  );
}
