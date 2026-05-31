import Link from "next/link";
import BookCard from "./BookCard";
import { getBooks } from "@/app/lib/content";

export default async function FeaturedBooks() {
  const books = await getBooks();

  return (
    <section className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Featured Books</h2>

        <button className="text-green-700 font-semibold">
          <Link href="/books">View All →</Link>
        </button>
      </div>

      {/* Books Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
