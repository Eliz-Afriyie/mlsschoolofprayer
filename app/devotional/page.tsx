import { getDevotionals } from "@/app/lib/content";
import DevotionalBrowser from "./DevotionalBrowser";

export default async function DevotionalPage() {
  const devotionals = await getDevotionals();

  return (
    <>
      <main className="bg-[#F7F8F5] min-h-screen">
        <section
          className="relative h-72 overflow-hidden px-6 pb-24 pt-24 sm:h-80 sm:pb-32 sm:pt-28"
          style={{
            backgroundImage: "url('/devotional/devo-hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          {/* Dark Green Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2D16] via-[#0B2D16]/80 to-[#0B2D16]/20" />

          {/* Hero Content */}
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                Devotionals
              </h1>

              <p className="text-base leading-7 text-gray-200 sm:text-lg sm:leading-8">
                Grow your faith daily through God’s Word.
              </p>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[3px] text-amber-300 sm:text-sm">
                Search by title, scripture, theme, or category below.
              </p>
            </div>
          </div>
        </section>
        <DevotionalBrowser devotionals={devotionals} />
      </main>
    </>
  );
}
