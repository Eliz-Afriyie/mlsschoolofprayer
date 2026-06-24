import Link from "next/link";
import BookCard from "./BookCard";
import { getBooks } from "@/app/lib/content";

export default async function FeaturedBooks({
  heading = "Featured Books",
}: {
  heading?: string;
}) {
  const books = await getBooks();

  return (
    <section className="site-container">
      <div className="mb-8 flex items-start justify-between gap-4">
        <h2 className="text-2xl font-bold sm:text-3xl">{heading}</h2>

        <Link
          href="/books"
          className="shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-700/25 sm:text-base"
        >
          View All -&gt;
        </Link>
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
              amazonUrl={book.amazonUrl}
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
