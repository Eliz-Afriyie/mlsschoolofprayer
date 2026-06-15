import Link from "next/link";
import BookCard from "./BookCard";
import { getBooks } from "@/app/lib/content";

export default async function FeaturedBooks() {
  const books = await getBooks();

  return (
    <section className="site-container">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <h2 className="text-2xl font-bold sm:text-3xl">Featured Books</h2>

        <button className="shrink-0 text-sm font-semibold text-green-700 sm:text-base">
          <Link href="/books">View All →</Link>
        </button>
      </div>

      {/* Books Grid */}
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
            category={book.category}
          />
        ))}
      </div>
    </section>
  );
}
