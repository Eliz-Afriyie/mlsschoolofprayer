"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Menu, Search, UserCircle, X } from "lucide-react";
import type { SiteSettings } from "@/app/lib/site-content";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Devotionals", href: "/devotional" },
  { name: "Books", href: "/books" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar({ content }: { content: SiteSettings }) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;

    if ((!searchOpen && !menuOpen) || !isMobile) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen, searchOpen]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return;
    }

    setQuery("");
    setSearchOpen(false);
    setMenuOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  }

  return (
    <header
      className={`top-0 z-[100] w-full transition-all duration-300 ${
        isHome ? "fixed" : "sticky"
      } ${
        transparent
          ? "border-b border-white/20 bg-black/45 text-white shadow-lg backdrop-blur-sm"
          : "border-b border-gray-200 bg-white text-gray-900 shadow-sm"
      }`}
    >
      <div className="site-container">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full font-bold transition ${
                transparent
                  ? "bg-white/20 text-white"
                  : "bg-green-700 text-white"
              }`}
            >
              +
            </div>

            <div className="min-w-0">
              <h1
                className={`truncate text-base font-bold sm:text-lg ${
                  transparent ? "text-white" : "text-[#17361D]"
                }`}
              >
                {content.siteName}
              </h1>

              <p
                className={`hidden text-xs sm:block ${
                  transparent ? "text-white/75" : "text-gray-500"
                }`}
              >
                {content.tagline}
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

          <div className="flex items-center gap-2 sm:gap-3">
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
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition md:hidden ${
                transparent ? "hover:bg-white/10" : "hover:bg-gray-100"
              }`}
              aria-label="Open search"
            >
              <Search size={20} />
            </button>

            <Link
              href="/admin/login"
              className={`hidden h-9 w-9 items-center justify-center rounded-full transition sm:inline-flex ${
                transparent
                  ? "bg-white/20 text-white hover:bg-white hover:text-green-950"
                  : "bg-green-700 text-white hover:bg-green-800"
              }`}
              aria-label="Admin login"
            >
              <UserCircle size={20} />
            </Link>

            <button
              type="button"
              onClick={() => {
                setSearchOpen(false);
                setMenuOpen((open) => !open);
              }}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition lg:hidden ${
                transparent ? "hover:bg-white/10" : "hover:bg-gray-100"
              }`}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[110] px-4 py-5 text-white backdrop-blur-lg transition-opacity duration-300 md:hidden ${
          searchOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        style={{ backgroundColor: "rgba(6, 36, 18, 0.99)" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.18),transparent_36%)]" />
        <form
          onSubmit={handleSearch}
          className={`relative z-10 mx-auto mt-16 w-full max-w-xl rounded-3xl border border-white/15 bg-green-950 p-4 shadow-2xl shadow-black/30 transition-transform duration-300 ${
            searchOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[3px] text-amber-300">
                Search
              </p>
              <h2 className="mt-2 text-2xl font-bold">Find resources</h2>
            </div>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-white hover:text-green-950"
              aria-label="Close search"
            >
              <X size={21} />
            </button>
          </div>

          <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/30 bg-white px-4 text-gray-950 shadow-2xl shadow-black/20">
            <Search className="text-amber-200" size={20} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search devotionals and books..."
              className="min-w-0 flex-1 bg-transparent text-base text-gray-950 outline-none placeholder:text-gray-500"
              autoFocus={searchOpen}
            />
            <button
              type="submit"
              className="rounded-xl bg-amber-300 px-4 py-2 text-sm font-bold text-green-950 transition hover:bg-amber-200"
            >
              Go
            </button>
          </div>
        </form>
      </div>

      <div
        className={`fixed inset-0 z-[120] backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.72)" }}
      >
        <button
          type="button"
          className="absolute inset-0 h-full w-full cursor-default"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        />

        <div
          className={`fixed right-0 top-0 z-[130] flex h-dvh min-h-screen w-[88vw] max-w-sm flex-col overflow-y-auto bg-white p-5 text-gray-950 shadow-2xl transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[3px] text-green-700">
                Menu
              </p>
              <h2 className="mt-2 text-2xl font-bold">{content.siteName}</h2>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="grid gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-2xl px-4 py-4 text-base font-semibold transition ${
                    isActive
                      ? "bg-green-700 text-white"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-800"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              href="/admin/login"
              onClick={() => setMenuOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 py-4 text-base font-semibold text-white transition hover:bg-green-800"
            >
              <UserCircle size={18} />
              Login
            </Link>
          </nav>

          <p className="mt-auto border-t border-gray-100 pt-5 text-sm leading-6 text-gray-500">
            {content.tagline}
          </p>
        </div>
      </div>
    </header>
  );
}
