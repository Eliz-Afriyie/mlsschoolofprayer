import Link from "next/link";
import DevotionalCard from "./DevotionalCard";
import { getDevotionals } from "@/app/lib/content";

export default async function FeaturedDevotionals() {
  const devotionals = await getDevotionals();

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="mb-8 flex items-start justify-between gap-4">
        <h2 className="text-2xl font-bold sm:text-3xl">Latest Devotionals</h2>

        <button className="shrink-0 text-sm font-semibold text-green-700 sm:text-base">
          <Link href="/devotional">View All →</Link>
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {devotionals.slice(0, 4).map((item) => (
          <DevotionalCard
            key={item.id}
            title={item.title}
            category={item.category}
            image={item.image}
            date={item.date}
            readTime={item.readTime}
            excerpt={item.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
