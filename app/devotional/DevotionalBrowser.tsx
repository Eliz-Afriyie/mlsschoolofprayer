"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import DevotionalCard from "../components/ui/DevotionalCard";
import type { Devotional } from "@/app/lib/types";

const pageSize = 8;

export default function DevotionalBrowser({
  devotionals,
}: {
  devotionals: Devotional[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const categories = useMemo(
    () => [
      "All Categories",
      ...Array.from(new Set(devotionals.map((item) => item.category))).sort(),
    ],
    [devotionals]
  );

  const filteredDevotionals = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return devotionals.filter((item) => {
      const matchesCategory =
        category === "All Categories" || item.category === category;
      const matchesQuery =
        !normalizedQuery ||
        [
          item.title,
          item.category,
          item.author,
          item.scripture,
          item.excerpt,
          item.date,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, devotionals, query]);
  const visibleDevotionals = filteredDevotionals.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredDevotionals.length;

  function updateQuery(value: string) {
    setQuery(value);
    setVisibleCount(pageSize);
  }

  function updateCategory(value: string) {
    setCategory(value);
    setVisibleCount(pageSize);
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative z-30 -mt-8 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1fr_220px_auto] md:items-center">
            <div className="flex h-12 items-center gap-3 rounded-xl bg-[#F7F8F5] px-4">
              <Search className="text-green-700" size={20} />
              <input
                type="search"
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
                placeholder="Search devotionals..."
                className="w-full bg-transparent text-gray-700 outline-none placeholder:text-gray-400"
              />
            </div>

            <label className="relative flex h-12 items-center rounded-xl bg-[#F7F8F5] px-4 text-gray-700">
              <select
                value={category}
                onChange={(event) => updateCategory(event.target.value)}
                className="w-full appearance-none bg-transparent outline-none"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none" size={20} />
            </label>

            <p className="px-2 text-sm font-medium text-gray-500 md:text-right">
              {filteredDevotionals.length} of {devotionals.length}
            </p>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        {filteredDevotionals.length ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {visibleDevotionals.map((item) => (
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

            {canLoadMore ? (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + pageSize)}
                  className="rounded-xl border border-green-700 px-6 py-3 font-semibold text-green-800 transition hover:bg-green-700 hover:text-white"
                >
                  Load More
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600">
            No devotionals matched your search.
          </div>
        )}
      </section>
    </>
  );
}
