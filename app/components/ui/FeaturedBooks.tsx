import Link from "next/link";
import BookCard from "./BookCard";
import { getBooks } from "@/app/lib/content";

export default async function FeaturedBooks() {
  const books = await getBooks();

  return (
    <section className="site-container">
      <div className="mb-8 flex items-start justify-between gap-4">
        <h2 className="text-2xl font-bold sm:text-3xl">Featured Books</h2>

        <button className="shrink-0 text-sm font-semibold text-green-700 sm:text-base">
          <Link href="/books">View All -&gt;</Link>
        </button>
      </div>

      {books.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {books.slice(0, 4).map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              image={book.image}
              price={book.price}
              rating={book.rating}
              description={book.description}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600">
          No books have been published yet.
        </div>
      )}
    </section>
  );
}
