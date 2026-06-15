"use client";

import { useCallback, useEffect, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  FileText,
  Menu,
  Plus,
  ShieldCheck,
} from "lucide-react";
import type { Book, Devotional } from "@/app/lib/types";
import { BookCreateForm, DevotionalCreateForm } from "./AdminForms";
import { BookTable, DevotionalTable } from "./AdminContentTables";
import type { AdminActionState } from "../actions";
import AdminSidebar, { type AdminSection } from "./AdminSidebar";
import {
  EmptyState,
  ModalShell,
  PaginationControls,
  StatCard,
  ToastBanner,
  type ToastState,
} from "./AdminDashboardWidgets";

type Modal = "devotional" | "book" | null;
const recentPageSize = 5;

function formatDate(value?: string) {
  if (!value) {
    return "Unknown";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

type Props = {
  books: Book[];
  devotionals: Devotional[];
};

export default function AdminDashboard({ books, devotionals }: Props) {
  const [section, setSection] = useState<AdminSection>("overview");
  const [modal, setModal] = useState<Modal>(null);
  const [toast, setToast] = useState<ToastState>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recentPage, setRecentPage] = useState(1);
  const today = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
  const booksWithAmazonLinks = books.filter((item) => item.amazonUrl).length;
  const recentItems = [
    ...devotionals.map((item) => ({
      id: item.id,
      type: "Devotional",
      title: item.title,
      category: item.category,
      createdAt: item.createdAt,
      metaLabel: "Created",
      meta: formatDate(item.createdAt),
    })),
    ...books.map((item) => ({
      id: item.id,
      type: "Book",
      title: item.title,
      category: item.category,
      createdAt: item.createdAt,
      metaLabel: "Created",
      meta: formatDate(item.createdAt),
    })),
  ].sort((left, right) => {
    const leftTime = left.createdAt ? new Date(left.createdAt).getTime() : 0;
    const rightTime = right.createdAt ? new Date(right.createdAt).getTime() : 0;

    return rightTime - leftTime;
  });
  const recentTotalPages = Math.max(
    1,
    Math.ceil(recentItems.length / recentPageSize)
  );
  const currentRecentPage = Math.min(recentPage, recentTotalPages);
  const visibleRecentItems = recentItems.slice(
    (currentRecentPage - 1) * recentPageSize,
    currentRecentPage * recentPageSize
  );

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeout = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const handleFormResult = useCallback((state: AdminActionState) => {
    setToast({
      ok: state.ok,
      message: state.message,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  return (
    <main className="min-h-screen bg-[#F7F8F5]">
      {toast ? <ToastBanner toast={toast} /> : null}

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

              <div className="grid gap-6">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="mb-5">
                    <h3 className="text-xl font-bold">Quick Actions</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Add new content from the right section.
                    </p>
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
                  <div className="mb-5">
                    <h3 className="text-xl font-bold">Recent Uploads</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Latest uploads, 5 per page.
                    </p>
                  </div>
                  <div className="mt-4">
                    {recentItems.length ? (
                      <>
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[640px] border-separate border-spacing-y-2 text-left text-sm">
                            <thead className="text-xs uppercase tracking-[2px] text-gray-500">
                              <tr>
                                <th className="px-3 py-2">Type</th>
                                <th className="px-3 py-2">Title</th>
                                <th className="px-3 py-2">Category</th>
                                <th className="px-3 py-2">Info</th>
                              </tr>
                            </thead>
                            <tbody>
                              {visibleRecentItems.map((item) => (
                                <tr
                                  key={`${item.type}-${item.id}`}
                                  className="bg-[#F7F8F5]"
                                >
                                  <td className="rounded-l-xl px-3 py-3">
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase tracking-[1px] text-green-800">
                                      {item.type}
                                    </span>
                                  </td>
                                  <td className="px-3 py-3 font-semibold text-gray-950">
                                    {item.title}
                                  </td>
                                  <td className="px-3 py-3 text-gray-600">
                                    {item.category}
                                  </td>
                                  <td className="rounded-r-xl px-3 py-3 text-gray-500">
                                    <span className="font-semibold text-gray-700">
                                      {item.metaLabel}:
                                    </span>{" "}
                                    {item.meta}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <PaginationControls
                          page={currentRecentPage}
                          totalPages={recentTotalPages}
                          totalItems={recentItems.length}
                          pageSize={recentPageSize}
                          onPageChange={setRecentPage}
                        />
                      </>
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
            <DevotionalTable
              devotionals={devotionals}
              onAdd={() => setModal("devotional")}
            />
          ) : null}

          {section === "books" ? (
            <BookTable books={books} onAdd={() => setModal("book")} />
          ) : null}
        </section>
      </div>

      {modal === "devotional" ? (
        <ModalShell title="Add Devotional" onClose={() => setModal(null)}>
          <DevotionalCreateForm
            onResult={handleFormResult}
            onSuccess={closeModal}
          />
        </ModalShell>
      ) : null}

      {modal === "book" ? (
        <ModalShell title="Add Book" onClose={() => setModal(null)}>
          <BookCreateForm
            onResult={handleFormResult}
            onSuccess={closeModal}
          />
        </ModalShell>
      ) : null}
    </main>
  );
}
