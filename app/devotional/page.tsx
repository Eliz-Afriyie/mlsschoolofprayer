import { getDevotionals } from "@/app/lib/content";
import DevotionalBrowser from "./DevotionalBrowser";

export default async function DevotionalPage() {
  const devotionals = await getDevotionals();

  return (
    <>
      <main className="bg-[#F7F8F5] min-h-screen">
        <section
          className="relative pt-28 pb-32 overflow-hidden h-80"
          style={{
            backgroundImage: "url('/devotional/devo-hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          {/* Dark Green Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2D16] via-[#0B2D16]/80 to-[#0B2D16]/20" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-5">
                Devotionals
              </h1>

              <p className="text-lg text-gray-200 leading-8">
                Grow your faith daily through God’s Word.
              </p>

              <p className="mt-5 text-sm font-semibold uppercase tracking-[3px] text-amber-300">
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
