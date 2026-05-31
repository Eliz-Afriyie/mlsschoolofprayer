"use client";

import { useState } from "react";
import { BookOpen, FileText, LayoutDashboard, Pencil, Trash2 } from "lucide-react";
import type { Book, Devotional } from "@/app/lib/types";
import AdminForms from "./AdminForms";
import {
  editBook,
  editDevotional,
  logoutAdmin,
  removeBook,
  removeDevotional,
} from "./actions";

type Section = "overview" | "devotionals" | "books";

type Props = {
  books: Book[];
  devotionals: Devotional[];
};

const menu = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "devotionals", label: "Devotionals", icon: FileText },
  { id: "books", label: "Books", icon: BookOpen },
] as const;

function Input({
  name,
  defaultValue,
  type = "text",
}: {
  name: string;
  defaultValue: string | number;
  type?: string;
}) {
  return (
    <input
      name={name}
      type={type}
      defaultValue={defaultValue}
      className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-green-700"
    />
  );
}

export default function AdminDashboard({ books, devotionals }: Props) {
  const [section, setSection] = useState<Section>("overview");

  return (
    <main className="min-h-screen bg-[#F7F8F5]">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="flex min-h-[calc(100vh-8rem)] flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-20">
          <div>
            <div className="mb-8 rounded-2xl bg-green-900 p-4 text-white">
              <p className="text-xs font-semibold uppercase tracking-[3px] text-amber-300">
                Admin
              </p>
              <h1 className="mt-2 text-2xl font-bold">Content</h1>
              <p className="mt-2 text-sm text-white/65">Manage uploads</p>
            </div>

            <nav className="grid gap-2">
              {menu.map((item) => {
                const Icon = item.icon;
                const active = section === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSection(item.id)}
                    className={`flex h-12 items-center gap-3 rounded-xl px-3 text-left font-medium transition ${
                      active
                        ? "bg-green-700 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <form action={logoutAdmin} className="mt-auto border-t border-gray-100 pt-4">
            <button className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100">
              Sign Out
            </button>
          </form>
        </aside>

        <section className="min-w-0">
          {section === "overview" ? (
            <div className="grid gap-6">
              <div className="rounded-2xl bg-green-900 p-7 text-white">
                <p className="text-sm font-semibold uppercase tracking-[3px] text-amber-300">
                  Dashboard
                </p>
                <h2 className="mt-3 text-3xl font-bold">Manage uploads</h2>
                <p className="mt-3 max-w-2xl text-white/75">
                  Create, review, edit, and delete uploaded devotionals and books.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-gray-500">
                    Uploaded Devotionals
                  </p>
                  <p className="mt-2 text-3xl font-bold">{devotionals.length}</p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-gray-500">
                    Uploaded Books
                  </p>
                  <p className="mt-2 text-3xl font-bold">{books.length}</p>
                </div>
              </div>

              <AdminForms />
            </div>
          ) : null}

          {section === "devotionals" ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-5 text-2xl font-bold">Devotionals</h2>
              <div className="grid gap-4">
                {devotionals.map((item) => (
                  <details key={item.id} className="rounded-xl border border-gray-200 p-4">
                    <summary className="cursor-pointer list-none font-semibold">
                      {item.title}
                    </summary>
                    <form action={editDevotional} className="mt-4 grid gap-3">
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="currentImage" value={item.image} />
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
                      <div className="flex flex-wrap gap-2">
                        <button className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white">
                          <Pencil size={16} />
                          Save
                        </button>
                      </div>
                    </form>
                    <form action={removeDevotional} className="mt-2">
                      <input type="hidden" name="id" value={item.id} />
                      <button className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700">
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </form>
                  </details>
                ))}
                {!devotionals.length ? <p className="text-gray-500">No uploaded devotionals yet.</p> : null}
              </div>
            </div>
          ) : null}

          {section === "books" ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-5 text-2xl font-bold">Books</h2>
              <div className="grid gap-4">
                {books.map((item) => (
                  <details key={item.id} className="rounded-xl border border-gray-200 p-4">
                    <summary className="cursor-pointer list-none font-semibold">
                      {item.title}
                    </summary>
                    <form action={editBook} className="mt-4 grid gap-3">
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="currentImage" value={item.image} />
                      <Input name="title" defaultValue={item.title} />
                      <Input name="author" defaultValue={item.author} />
                      <div className="grid gap-3 md:grid-cols-3">
                        <Input name="category" defaultValue={item.category} />
                        <Input name="price" defaultValue={item.price} />
                        <Input name="rating" defaultValue={item.rating} type="number" />
                      </div>
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
                      <button className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700">
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </form>
                  </details>
                ))}
                {!books.length ? <p className="text-gray-500">No uploaded books yet.</p> : null}
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
