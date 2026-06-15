import { getBooks } from "@/app/lib/content";
import BooksBrowser from "./BooksBrowser";

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <main className="bg-[#F7F8F5] min-h-screen">
      {/* Hero */}
      <section
        className="relative h-72 overflow-hidden pb-20 pt-16 text-white sm:h-80 sm:pb-24 sm:pt-20"
        style={{
          backgroundImage: "url('/books/book-3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2D16] via-[#0B2D16]/80 to-[#0B2D16]/20" />

        <div className="site-container relative z-10">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-4xl font-bold sm:text-5xl md:text-6xl">
              Christian Books
            </h1>

            <p className="text-base leading-7 text-gray-200 sm:text-lg sm:leading-8">
              Discover powerful Christian books that will strengthen your faith
              and deepen your walk with God.
            </p>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[3px] text-amber-300 sm:text-sm">
              Search by title, author, topic, or price below.
            </p>
          </div>
        </div>
      </section>

      <BooksBrowser books={books} />
    </main>
  );
}
