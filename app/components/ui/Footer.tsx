import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0F2E14] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="align-items-center">
          <img
            src="/devotional/devo6.jpg"
            alt="image"
            className=" w-44 h-28 rounded-2xl align-items-center"
          />
          <h2 className="text-2xl font-bold mb-4">mlsschoolofprayer</h2>

          <p className="text-gray-300 leading-7">
            Inspiring hearts and equipping believers through God&apos;s Word.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-5">Quick Links</h3>

          <ul className="space-y-3 text-gray-300">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/devotional">Devotionals</Link>
            </li>
            <li>
              <Link href="/books">Books</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-5">Resources</h3>

          <ul className="space-y-3 text-gray-300">
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/">Terms of Use</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-5">Contact</h3>

          <ul className="space-y-3 text-gray-300">
            <li>hello@graceandtruth.com</li>
            <li>+1 (234) 456-7890</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-gray-400 text-sm">
        © 2026 mlsschoolofprayer. All rights reserved.
      </div>
    </footer>
  );
}
