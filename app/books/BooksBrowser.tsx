"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import BookCard from "../components/ui/BookCard";
import type { Book } from "@/app/lib/types";

const pageSize = 8;

export default function BooksBrowser({ books }: { books: Book[] }) {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return books;
    }

    return books.filter((book) =>
      [
        book.title,
        book.author,
        book.category,
        book.description,
        book.price,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [books, query]);
  const visibleBooks = filteredBooks.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredBooks.length;

  function updateQuery(value: string) {
    setQuery(value);
    setVisibleCount(pageSize);
  }

  return (
    <>
      <div className="site-container">
        <div className="relative z-30 -mt-8 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex h-12 items-center gap-3 rounded-xl bg-[#F7F8F5] px-4">
              <Search className="text-green-700" size={20} />
              <input
                type="search"
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
                placeholder="Search books..."
                className="w-full bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
              />
            </div>

            <p className="px-2 text-sm font-medium text-gray-500 md:text-right">
              {filteredBooks.length} of {books.length}
            </p>
          </div>
        </div>
      </div>

      <section className="site-container py-10 sm:py-12">
        {filteredBooks.length ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {visibleBooks.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  image={book.image}
                  category={book.category}
                  price={book.price}
                  rating={book.rating}
                  description={book.description}
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
