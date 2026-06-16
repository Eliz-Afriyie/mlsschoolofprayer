"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import BookCard from "../components/ui/BookCard";
import type { Book } from "@/app/lib/types";

const pageSize = 8;

export default function BooksBrowser({ books }: { books: Book[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const categories = useMemo(() => {
    return [
      "All Categories",
      ...Array.from(new Set(books.map((item) => item.category))).sort((left, right) =>
        left.localeCompare(right)
      ),
    ];
  }, [books]);

  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return books.filter((book) => {
      const matchesCategory =
        category === "All Categories" || book.category === category;
      const matchesQuery =
        !normalizedQuery ||
        [book.title, book.author, book.category, book.description, book.price]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [books, category, query]);
  const visibleBooks = filteredBooks.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredBooks.length;

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
      <div className="site-container">
        <div className="relative z-30 mx-auto -mt-5 max-w-3xl rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
          <div className="grid gap-2 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex h-10 items-center gap-2 rounded-lg bg-[#F7F8F5] px-3">
              <Search className="text-green-700" size={18} />
              <input
                type="search"
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
                placeholder="Search books..."
                className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
              />
            </div>

            <p className="px-2 text-xs font-semibold text-gray-500 md:text-right">
              {filteredBooks.length} of {books.length}
            </p>
          </div>
        </div>
      </div>

      <section className="site-container py-8 sm:py-10">
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex min-w-max gap-2">
            {categories.map((item) => {
              const active = category === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => updateCategory(item)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "border-green-700 bg-green-700 text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-green-700 hover:text-green-800"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {filteredBooks.length ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {visibleBooks.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  image={book.image}
                  price={book.price}
                  rating={book.rating}
                  description={book.description}
                  amazonUrl={book.amazonUrl}
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
            No books matched your search.
          </div>
        )}
      </section>
    </>
  );
}
