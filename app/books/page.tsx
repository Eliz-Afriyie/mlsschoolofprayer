import { getBooks } from "@/app/lib/content";
import BooksBrowser from "./BooksBrowser";

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <main className="bg-[#F7F8F5] min-h-screen">
      {/* Hero */}
      <section className="bg-green-900 px-6 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-5 text-4xl font-bold sm:text-5xl">
            Christian Books
          </h1>

          <p className="max-w-2xl text-base leading-7 text-gray-200 sm:text-lg sm:leading-8">
            Discover powerful Christian books that will strengthen your faith
            and deepen your walk with God.
          </p>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[3px] text-amber-300 sm:text-sm">
            Search by title, author, topic, or price below.
          </p>
        </div>
      </section>

      <BooksBrowser books={books} />
    </main>
  );
}
