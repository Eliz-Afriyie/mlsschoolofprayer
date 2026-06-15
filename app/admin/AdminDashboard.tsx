"use client";

import { useState } from "react";
import {
  BookOpen,
  CalendarDays,
  FileText,
  Menu,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import type { Book, Devotional } from "@/app/lib/types";
import { BookCreateForm, DevotionalCreateForm } from "./AdminForms";
import AdminSidebar, { type AdminSection } from "./AdminSidebar";
import {
  EmptyState,
  Input,
  ModalShell,
  StatCard,
} from "./AdminDashboardWidgets";
import {
  editBook,
  editDevotional,
  removeBook,
  removeDevotional,
} from "./actions";

type Modal = "devotional" | "book" | null;

type Props = {
  books: Book[];
  devotionals: Devotional[];
};

export default function AdminDashboard({ books, devotionals }: Props) {
  const [section, setSection] = useState<AdminSection>("overview");
  const [modal, setModal] = useState<Modal>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [devotionalQuery, setDevotionalQuery] = useState("");
  const [bookQuery, setBookQuery] = useState("");
  const today = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
  const filteredDevotionals = devotionals.filter((item) =>
    [item.title, item.category, item.author, item.scripture, item.pdfUrl]
      .join(" ")
      .toLowerCase()
      .includes(devotionalQuery.trim().toLowerCase())
  );
  const filteredBooks = books.filter((item) =>
    [
      item.title,
      item.author,
      item.category,
      item.price,
      item.excerpt,
      item.amazonUrl,
    ]
      .join(" ")
      .toLowerCase()
      .includes(bookQuery.trim().toLowerCase())
  );
  const booksWithAmazonLinks = books.filter((item) => item.amazonUrl).length;
  const recentItems = [
    ...devotionals.slice(0, 3).map((item) => ({
      type: "Devotional",
      title: item.title,
      meta: item.date,
    })),
    ...books.slice(0, 3).map((item) => ({
      type: "Book",
      title: item.title,
      meta: item.author,
    })),
  ].slice(0, 4);

  return (
    <main className="min-h-screen bg-[#F7F8F5]">
      <div className="grid min-h-screen gap-6 px-4 py-5 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-0 lg:py-0">
        <AdminSidebar
          section={section}
          setSection={setSection}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <section className="min-w-0 py-2 lg:py-8 lg:pr-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="mb-4 inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white shadow-sm lg:hidden"
          >
            <Menu size={18} />
            Menu
          </button>
          {section === "overview" ? (
            <div className="grid gap-6">
              <div className="rounded-2xl bg-green-900 p-7 text-white">
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[3px] text-amber-300">
                      Dashboard
                    </p>
                    <h2 className="mt-3 text-3xl font-bold">
                      Manage uploads
                    </h2>
                    <p className="mt-3 max-w-2xl text-white/75">
                      Create, review, edit, and delete uploaded devotionals and
                      books.
                    </p>
                  </div>
                  <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">
                    <CalendarDays size={16} />
                    {today}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  icon={<FileText size={20} />}
                  label="Devotionals Published"
                  value={devotionals.length}
                />
                <StatCard
                  icon={<BookOpen size={20} />}
                  label="Books Listed"
                  value={books.length}
                />
                <StatCard
                  icon={<Plus size={20} />}
                  label="Total Content"
                  value={books.length + devotionals.length}
                />
                <StatCard
                  icon={<ShieldCheck size={20} />}
                  label="Amazon Links"
                  value={booksWithAmazonLinks}
                />
              </div>

              <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold">Quick Actions</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Add new content from the right section.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSection("devotionals");
                        setModal("devotional");
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 font-semibold text-white"
                    >
                      <Plus size={18} />
                      New Devotional
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSection("books");
                        setModal("book");
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-700 px-4 py-3 font-semibold text-green-800"
                    >
                      <Plus size={18} />
                      New Book
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h3 className="text-xl font-bold">Recent Uploads</h3>
                  <div className="mt-4 grid gap-3">
                    {recentItems.length ? (
                      recentItems.map((item) => (
                        <div
                          key={`${item.type}-${item.title}`}
                          className="rounded-xl bg-[#F7F8F5] p-3"
                        >
                          <p className="text-xs font-semibold uppercase tracking-[2px] text-green-700">
                            {item.type}
                          </p>
                          <p className="mt-1 font-semibold text-gray-950">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500">{item.meta}</p>
                        </div>
                      ))
                    ) : (
                      <EmptyState
                        title="No uploads yet"
                        text="Start by adding a devotional or book from Quick Actions."
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {section === "devotionals" ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Devotionals</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Review, edit, delete, or add devotional uploads.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModal("devotional")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  <Plus size={17} />
                  Add New
                </button>
              </div>
              <label className="mb-5 flex h-12 items-center gap-3 rounded-xl bg-[#F7F8F5] px-4 text-gray-600">
                <Search size={18} />
                <input
                  type="search"
                  value={devotionalQuery}
                  onChange={(event) => setDevotionalQuery(event.target.value)}
                  placeholder="Search devotionals by title, author, scripture..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                />
              </label>
              <div className="grid gap-4">
                {filteredDevotionals.map((item) => (
                  <details
                    key={item.id}
                    className="rounded-xl border border-gray-200 p-4"
                  >
                    <summary className="cursor-pointer list-none font-semibold">
                      {item.title}
                    </summary>
                    <form action={editDevotional} className="mt-4 grid gap-3">
                      <input type="hidden" name="id" value={item.id} />
                      <input
                        type="hidden"
                        name="currentImage"
                        value={item.image}
                      />
                      <input
                        type="hidden"
                        name="currentPdf"
                        value={item.pdfUrl ?? ""}
                      />
                      <Input name="title" defaultValue={item.title} />
                      <div className="grid gap-3 md:grid-cols-3">
                        <Input name="category" defaultValue={item.category} />
                        <Input name="date" defaultValue={item.date} />
                        <Input name="readTime" defaultValue={item.readTime} />
                      </div>
                      <Input name="author" defaultValue={item.author} />
                      <Input name="scripture" defaultValue={item.scripture} />
                      <textarea
                        name="excerpt"
                        defaultValue={item.excerpt}
                        rows={3}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-700"
                      />
                      <Input name="image" defaultValue="" type="file" />
                      <Input
                        name="pdf"
                        defaultValue=""
                        type="file"
                        accept="application/pdf"
                      />
                      {item.pdfUrl ? (
                        <a
                          href={item.pdfUrl}
                          className="text-sm font-semibold text-green-700"
                          target="_blank"
                        >
                          View current PDF
                        </a>
                      ) : null}
                      <div className="flex flex-wrap gap-2">
                        <button className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white">
                          <Pencil size={16} />
                          Save
                        </button>
                      </div>
                    </form>
                    <form action={removeDevotional} className="mt-2">
                      <input type="hidden" name="id" value={item.id} />
                      <button
                        onClick={(event) => {
                          if (
                            !confirm(
                              `Delete devotional "${item.title}" permanently?`
                            )
                          ) {
                            event.preventDefault();
                          }
                        }}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </form>
                  </details>
                ))}
                {!filteredDevotionals.length ? (
                  <EmptyState
                    title={
                      devotionals.length
                        ? "No devotionals matched"
                        : "No devotionals yet"
                    }
                    text={
                      devotionals.length
                        ? "Try a different search term."
                        : "Create your first devotional upload for the website."
                    }
                    action={
                      !devotionals.length ? (
                        <button
                          type="button"
                          onClick={() => setModal("devotional")}
                          className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white"
                        >
                          Add Devotional
                        </button>
                      ) : null
                    }
                  />
                ) : null}
              </div>
            </div>
          ) : null}

          {section === "books" ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Books</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Review, edit, delete, or add book uploads.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModal("book")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  <Plus size={17} />
                  Add New
                </button>
              </div>
              <label className="mb-5 flex h-12 items-center gap-3 rounded-xl bg-[#F7F8F5] px-4 text-gray-600">
                <Search size={18} />
                <input
                  type="search"
                  value={bookQuery}
                  onChange={(event) => setBookQuery(event.target.value)}
                  placeholder="Search books by title, author, category..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                />
              </label>
              <div className="grid gap-4">
                {filteredBooks.map((item) => (
                  <details
                    key={item.id}
                    className="rounded-xl border border-gray-200 p-4"
                  >
                    <summary className="cursor-pointer list-none font-semibold">
                      {item.title}
                    </summary>
                    <form action={editBook} className="mt-4 grid gap-3">
                      <input type="hidden" name="id" value={item.id} />
                      <input
                        type="hidden"
                        name="currentImage"
                        value={item.image}
                      />
                      <Input name="title" defaultValue={item.title} />
                      <Input name="author" defaultValue={item.author} />
                      <div className="grid gap-3 md:grid-cols-3">
                        <Input name="category" defaultValue={item.category} />
                        <Input name="price" defaultValue={item.price} />
                        <Input
                          name="rating"
                          defaultValue={item.rating}
                          type="number"
                        />
                      </div>
                      <Input
                        name="amazonUrl"
                        defaultValue={item.amazonUrl ?? ""}
                        type="url"
                      />
                      <textarea
                        name="excerpt"
                        defaultValue={item.excerpt ?? ""}
                        rows={2}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-700"
                      />
                      <textarea
                        name="description"
                        defaultValue={item.description}
                        rows={3}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-700"
                      />
                      <Input name="image" defaultValue="" type="file" />
                      <button className="inline-flex w-fit items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white">
                        <Pencil size={16} />
                        Save
                      </button>
                    </form>
                    <form action={removeBook} className="mt-2">
                      <input type="hidden" name="id" value={item.id} />
                      <button
                        onClick={(event) => {
                          if (
                            !confirm(`Delete book "${item.title}" permanently?`)
                          ) {
                            event.preventDefault();
                          }
                        }}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </form>
                  </details>
                ))}
                {!filteredBooks.length ? (
                  <EmptyState
                    title={books.length ? "No books matched" : "No books yet"}
                    text={
                      books.length
                        ? "Try a different search term."
                        : "Create your first book upload for the website."
                    }
                    action={
                      !books.length ? (
                        <button
                          type="button"
                          onClick={() => setModal("book")}
                          className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white"
                        >
                          Add Book
                        </button>
                      ) : null
                    }
                  />
                ) : null}
              </div>
            </div>
          ) : null}
        </section>
      </div>

      {modal === "devotional" ? (
        <ModalShell title="Add Devotional" onClose={() => setModal(null)}>
          <DevotionalCreateForm />
        </ModalShell>
      ) : null}

      {modal === "book" ? (
        <ModalShell title="Add Book" onClose={() => setModal(null)}>
          <BookCreateForm />
        </ModalShell>
      ) : null}
    </main>
  );
}
