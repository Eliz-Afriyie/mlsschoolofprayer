import Link from "next/link";
import { Search } from "lucide-react";
import { getBooks, getDevotionals } from "@/app/lib/content";
import BookCard from "../components/ui/BookCard";
import DevotionalCard from "../components/ui/DevotionalCard";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const normalizedQuery = query.toLowerCase();
  const books = await getBooks();
  const devotionals = await getDevotionals();

  const matchedBooks = normalizedQuery
    ? books.filter((book) =>
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
      )
    : [];

  const matchedDevotionals = normalizedQuery
    ? devotionals.filter((item) =>
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
          .includes(normalizedQuery)
      )
    : [];

  return (
    <main className="min-h-screen bg-[#F7F8F5]">
      <section className="bg-green-900 py-20 text-white">
        <div className="site-container">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
            <Search size={24} />
          </div>
          <h1 className="text-4xl font-bold md:text-5xl">Search</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-200">
            {query
              ? `Results for "${query}"`
              : "Use the header search to find devotionals and books."}
          </p>
        </div>
      </section>

      <section className="site-container py-16">
        {!query ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-gray-600">
            Enter a search term from the header to begin.
          </div>
        ) : null}

        {query && !matchedBooks.length && !matchedDevotionals.length ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-gray-600">
            No results found. Try a different word or browse{" "}
            <Link href="/devotional" className="font-semibold text-green-700">
              devotionals
            </Link>{" "}
            and{" "}
            <Link href="/books" className="font-semibold text-green-700">
              books
            </Link>
            .
          </div>
        ) : null}

        {matchedDevotionals.length ? (
          <div className="mb-14">
            <h2 className="mb-6 text-2xl font-bold text-gray-950">
              Devotionals
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {matchedDevotionals.map((item) => (
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
          </div>
        ) : null}

        {matchedBooks.length ? (
          <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-950">Books</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {matchedBooks.map((book) => (
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
          </div>
        ) : null}
      </section>
    </main>
  );
}
