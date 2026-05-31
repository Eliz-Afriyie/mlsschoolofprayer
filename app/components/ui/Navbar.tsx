"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { LogIn, Search, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Devotionals", href: "/devotional" },
  { name: "Books", href: "/books" },
  { name: "Articles", href: "/articles" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 40);

    updateScrolled();
    window.addEventListener("scroll", updateScrolled);

    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return;
    }

    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  }

  return (
    <header
      className={`top-0 z-50 w-full transition-all duration-300 ${
        isHome ? "fixed" : "sticky"
      } ${
        transparent
          ? "border-b border-white/20 bg-black/45 text-white shadow-lg backdrop-blur-sm"
          : "border-b border-gray-200 bg-white text-gray-900 shadow-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full font-bold transition ${
                transparent
                  ? "bg-white/20 text-white"
                  : "bg-green-700 text-white"
              }`}
            >
              +
            </div>

            <div>
              <h1
                className={`text-lg font-bold ${
                  transparent ? "text-white" : "text-[#17361D]"
                }`}
              >
                mlsschoolofprayer
              </h1>

              <p
                className={`text-xs ${
                  transparent ? "text-white/75" : "text-gray-500"
                }`}
              >
                Reflections of His Word & Prayer
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition duration-300 ${
                    isActive
                      ? transparent
                        ? "text-amber-300"
                        : "text-green-700"
                      : transparent
                      ? "text-white/85 hover:text-white"
                      : "text-gray-700 hover:text-green-700"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute left-0 -bottom-2 h-[2px] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    } ${transparent ? "bg-amber-300" : "bg-green-700"}`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <form
              onSubmit={handleSearch}
              className={`hidden items-center overflow-hidden rounded-full border transition-all md:flex ${
                searchOpen
                  ? "w-64 px-3"
                  : "w-9 justify-center border-transparent"
              } ${
                transparent
                  ? "border-white/30 bg-white/15"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <button
                type={searchOpen ? "submit" : "button"}
                onClick={() => setSearchOpen(true)}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                  transparent ? "hover:bg-white/10" : "hover:bg-gray-100"
                }`}
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {searchOpen ? (
                <>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search..."
                    className={`h-9 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-current placeholder:opacity-60 ${
                      transparent ? "text-white" : "text-gray-900"
                    }`}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setSearchOpen(false);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full"
                    aria-label="Close search"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : null}
            </form>

            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition md:hidden ${
                transparent ? "hover:bg-white/10" : "hover:bg-gray-100"
              }`}
              aria-label="Open search"
            >
              <Search size={20} />
            </button>

            <Link
              href="/admin/login"
              className={`inline-flex h-9 items-center gap-2 rounded-xl px-3 text-sm font-medium transition ${
                transparent
                  ? "bg-white/20 text-white hover:bg-white hover:text-green-950"
                  : "bg-green-700 text-white hover:bg-green-800"
              }`}
            >
              <LogIn size={18} />
              <span className="hidden sm:inline">Login</span>
            </Link>
          </div>
        </div>
      </div>

      {searchOpen ? (
        <form
          onSubmit={handleSearch}
          className={`border-t px-6 py-3 md:hidden ${
            transparent
              ? "border-white/15 bg-green-950/70"
              : "border-gray-200 bg-white"
          }`}
        >
          <div
            className={`flex h-12 items-center gap-3 rounded-xl border px-4 ${
              transparent
                ? "border-white/20 bg-white/10"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-current placeholder:opacity-60"
              autoFocus
            />
          </div>
        </form>
      ) : null}
    </header>
  );
}
