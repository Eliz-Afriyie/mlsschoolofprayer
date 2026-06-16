import Link from "next/link";
import DevotionalCard from "./DevotionalCard";
import { getDevotionals } from "@/app/lib/content";

export default async function FeaturedDevotionals() {
  const devotionals = await getDevotionals();

  return (
    <section className="site-container">
      <div className="mb-8 flex items-start justify-between gap-4">
        <h2 className="text-2xl font-bold sm:text-3xl">Latest Devotionals</h2>

        <Link
          href="/devotional"
          className="shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-700/25 sm:text-base"
        >
          View All -&gt;
        </Link>
      </div>

      {devotionals.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {devotionals.slice(0, 4).map((item) => (
            <DevotionalCard
              key={item.id}
              title={item.title}
              image={item.image}
              date={item.date}
              readTime={item.readTime}
              excerpt={item.excerpt}
              pdfUrl={item.pdfUrl}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600">
          No devotionals have been published yet.
        </div>
      )}
    </section>
  );
}
