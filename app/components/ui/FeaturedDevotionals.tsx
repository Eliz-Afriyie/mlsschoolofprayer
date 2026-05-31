import Link from "next/link";
import DevotionalCard from "./DevotionalCard";
import { getDevotionals } from "@/app/lib/content";

export default async function FeaturedDevotionals() {
  const devotionals = await getDevotionals();

  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Latest Devotionals</h2>

        <button className="text-green-700 font-semibold">
          <Link href="/devotional">View All →</Link>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
