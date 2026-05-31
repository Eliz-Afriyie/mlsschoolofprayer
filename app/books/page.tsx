import { getBooks } from "@/app/lib/content";
import BooksBrowser from "./BooksBrowser";

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <main className="bg-[#F7F8F5] min-h-screen">
      {/* Hero */}
      <section className="bg-green-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-5">Christian Books</h1>

          <p className="text-lg text-gray-200 max-w-2xl leading-8">
            Discover powerful Christian books that will strengthen your faith
            and deepen your walk with God.
          </p>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[3px] text-amber-300">
            Search by title, author, topic, or price below.
          </p>
        </div>
      </section>

      <BooksBrowser books={books} />
    </main>
  );
}
