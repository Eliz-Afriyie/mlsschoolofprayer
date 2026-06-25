"use client";

import { useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  Eye,
  Loader2,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import type { Book, Devotional } from "@/app/lib/types";
import {
  EmptyState,
  ConfirmationModal,
  Input,
  ModalShell,
  PaginationControls,
} from "./AdminDashboardWidgets";
import {
  editBook,
  editDevotional,
  removeBook,
  removeDevotional,
} from "../actions";

const tablePageSize = 7;

type ActionSheetProps = {
  title: string;
  onClose: () => void;
  onEdit: () => void;
  deleteAction: (formData: FormData) => void;
  id: number;
  position: { top: number; left: number };
};

function ActionSheet({
  title,
  onClose,
  onEdit,
  deleteAction,
  id,
  position,
}: ActionSheetProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="fixed inset-0 z-[90]">
      <button
        type="button"
        className="absolute inset-0 h-full w-full cursor-default"
        onClick={onClose}
        aria-label="Close actions"
      />
      <div
        className="absolute z-10 w-44 rounded-xl border border-gray-200 bg-white p-2 text-left shadow-2xl"
        style={{ top: position.top, left: position.left }}
      >
        <p className="line-clamp-1 px-3 pb-1 text-xs font-bold text-gray-500">
          {title}
        </p>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-green-800 hover:bg-green-50"
        >
          <Eye size={16} />
          View/Edit
        </button>
        <button
          type="button"
          onClick={() => setConfirmDelete(true)}
          className="inline-flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>

      {confirmDelete ? (
        <ConfirmationModal
          title={`Delete "${title}"?`}
          description="This permanently removes the item from the website and database. This action cannot be undone."
          onClose={() => setConfirmDelete(false)}
        >
          <form action={deleteAction}>
            <input type="hidden" name="id" value={id} />
            <button className="w-full rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 sm:w-auto">
              Yes, delete
            </button>
          </form>
        </ConfirmationModal>
      ) : null}
    </div>
  );
}

function SearchBar({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="mb-5 flex h-12 w-full min-w-0 items-center gap-3 rounded-xl bg-[#F7F8F5] px-3 text-gray-600 sm:px-4">
      <Search className="shrink-0" size={18} />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
      />
    </label>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="inline-flex w-fit items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <Loader2 className="animate-spin" size={16} />
      ) : (
        <Pencil size={16} />
      )}
      {pending ? "Saving..." : "Save Changes"}
    </button>
  );
}

function CoverImagePreview({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  if (!image) {
    return null;
  }

  return (
    <div className="grid gap-2">
      <p className="text-sm font-semibold text-gray-700">Current Cover Image</p>
      <img
        src={image}
        alt={`${title} cover image`}
        className="h-56 w-full rounded-xl border border-gray-200 object-cover"
      />
    </div>
  );
}

function FileField({
  label,
  name,
  accept,
}: {
  label: string;
  name: string;
  accept?: string;
}) {
  return (
    <label className="grid min-w-0 gap-2 text-sm font-semibold text-gray-700">
      {label}
      <Input
        name={name}
        defaultValue=""
        type="file"
        accept={accept}
        required={false}
      />
    </label>
  );
}

function parsePrice(value: string) {
  const normalized = value.trim();
  const currency = normalized.startsWith("$") ? "USD" : "GHS";
  const amount = normalized.replace(/[^\d.]/g, "");

  return {
    amount,
    currency,
  };
}

function PriceEditor({ price }: { price: string }) {
  const parsed = parsePrice(price);

  return (
    <label className="grid min-w-0 gap-2 text-sm font-semibold text-gray-700">
      Price
      <div className="grid min-w-0 gap-2 md:grid-cols-[minmax(0,1fr)_auto]">
        <Input
          name="priceAmount"
          defaultValue={parsed.amount}
          type="number"
          min="0"
          step="0.01"
        />
        <select
          name="priceCurrency"
          defaultValue={parsed.currency}
          className="h-10 w-full min-w-0 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-green-700 md:w-auto"
        >
          <option value="GHS">GHS</option>
          <option value="USD">USD</option>
        </select>
      </div>
    </label>
  );
}

export function DevotionalTable({
  devotionals,
  onAdd,
}: {
  devotionals: Devotional[];
  onAdd: () => void;
}) {
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Devotional | null>(null);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return devotionals.filter((item) =>
      [item.title, item.category, item.author, item.scripture, item.excerpt]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [devotionals, query]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / tablePageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * tablePageSize,
    currentPage * tablePageSize
  );

  function updateQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Devotionals</h2>
          <p className="mt-1 text-sm text-gray-500">
            Review, edit, delete, or add devotional uploads.
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-700/25"
        >
          <Plus size={17} />
          Add New
        </button>
      </div>

      <SearchBar
        value={query}
        onChange={updateQuery}
        placeholder="Search devotionals by title, author, scripture..."
      />

      {filtered.length ? (
        <div className="min-w-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-separate border-spacing-y-2 text-left text-sm">
              <thead className="text-xs uppercase tracking-[2px] text-gray-500">
              <tr>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2">Scripture</th>
                <th className="px-3 py-2">Excerpt</th>
                <th className="px-3 py-2">PDF</th>
                <th className="px-3 py-2 text-right">Action</th>
              </tr>
              </thead>
              <tbody>
              {paginated.map((item) => (
                <tr key={item.id} className="bg-[#F7F8F5]">
                  <td className="rounded-l-xl px-3 py-3 font-semibold">
                    {item.title}
                  </td>
                  <td className="px-3 py-3">{item.category}</td>
                  <td className="px-3 py-3">{item.scripture}</td>
                  <td className="max-w-[220px] px-3 py-3 text-xs leading-5 text-gray-500">
                    <p className="line-clamp-2">{item.excerpt}</p>
                  </td>
                  <td className="px-3 py-3">
                    {item.pdfUrl ? (
                      <a
                        href={item.pdfUrl}
                        target="_blank"
                        className="font-semibold text-green-700"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </td>
                  <td className="rounded-r-xl px-3 py-3 text-right">
                    <button
                      type="button"
                      onClick={(event) => {
                        const rect = event.currentTarget.getBoundingClientRect();
                        setMenuPosition({
                          top: rect.bottom + 8,
                          left: Math.max(16, rect.right - 176),
                        });
                        setOpenMenu(openMenu === item.id ? null : item.id);
                      }}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition hover:bg-gray-100"
                      aria-label={`Open actions for ${item.title}`}
                    >
                      <MoreVertical size={18} />
                    </button>

                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          <PaginationControls
            page={currentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            pageSize={tablePageSize}
            onPageChange={setPage}
          />
        </div>
      ) : (
        <EmptyState
          title={devotionals.length ? "No devotionals matched" : "No devotionals yet"}
          text={
            devotionals.length
              ? "Try a different search term."
              : "Create your first devotional upload for the website."
          }
          action={
            !devotionals.length ? (
              <button
                type="button"
                onClick={onAdd}
                className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white"
              >
                Add Devotional
              </button>
            ) : null
          }
        />
      )}

      {openMenu ? (
        <ActionSheet
          id={openMenu}
          title={
            devotionals.find((item) => item.id === openMenu)?.title ??
            "Devotional"
          }
          position={menuPosition}
          onClose={() => setOpenMenu(null)}
          onEdit={() => {
            const item = devotionals.find((entry) => entry.id === openMenu);
            if (item) {
              setEditing(item);
            }
            setOpenMenu(null);
          }}
          deleteAction={removeDevotional}
        />
      ) : null}

      {editing ? (
        <ModalShell
          title="View/Edit Devotional"
          onClose={() => setEditing(null)}
          size="wide"
        >
          <form action={editDevotional} className="grid gap-3">
            <input type="hidden" name="id" value={editing.id} />
            <input type="hidden" name="currentImage" value={editing.image} />
            <input type="hidden" name="currentPdf" value={editing.pdfUrl ?? ""} />
            <CoverImagePreview title={editing.title} image={editing.image} />
            <Input name="title" defaultValue={editing.title} />
            <div className="grid gap-3 md:grid-cols-2">
              <Input name="category" defaultValue={editing.category} />
              <Input name="readTime" defaultValue={editing.readTime} />
            </div>
            <Input name="author" defaultValue={editing.author} />
            <Input name="scripture" defaultValue={editing.scripture} />
            <textarea
              name="excerpt"
              defaultValue={editing.excerpt}
              rows={8}
              required
              minLength={20}
              maxLength={500}
              className="w-full min-w-0 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-700"
            />
            <FileField
              name="image"
              label="Cover Image"
              accept="image/jpeg,image/png,image/webp,image/gif"
            />
            <FileField
              name="pdf"
              label="Downloadable PDF"
              accept="application/pdf"
            />
            <SaveButton />
          </form>
        </ModalShell>
      ) : null}
    </div>
  );
}

export function BookTable({ books, onAdd }: { books: Book[]; onAdd: () => void }) {
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Book | null>(null);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return books.filter((item) =>
      [item.title, item.author, item.category, item.price, item.excerpt, item.amazonUrl]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [books, query]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / tablePageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * tablePageSize,
    currentPage * tablePageSize
  );

  function updateQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Books</h2>
          <p className="mt-1 text-sm text-gray-500">
            Review, edit, delete, or add book uploads.
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-700/25"
        >
          <Plus size={17} />
          Add New
        </button>
      </div>

      <SearchBar
        value={query}
        onChange={updateQuery}
        placeholder="Search books by title, author, category..."
      />

      {filtered.length ? (
        <div className="min-w-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-separate border-spacing-y-2 text-left text-sm">
              <thead className="text-xs uppercase tracking-[2px] text-gray-500">
              <tr>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Excerpt</th>
                <th className="px-3 py-2">URL</th>
                <th className="px-3 py-2 text-right">Action</th>
              </tr>
              </thead>
              <tbody>
              {paginated.map((item) => (
                <tr key={item.id} className="bg-[#F7F8F5]">
                  <td className="rounded-l-xl px-3 py-3 font-semibold">
                    {item.title}
                  </td>
                  <td className="px-3 py-3">{item.category}</td>
                  <td className="px-3 py-3">{item.price}</td>
                  <td className="max-w-[220px] px-3 py-3 text-xs leading-5 text-gray-500">
                    <p className="line-clamp-2">
                      {item.excerpt ?? item.description}
                    </p>
                  </td>
                  <td className="px-3 py-3">
                    {item.amazonUrl ? (
                      <a
                        href={item.amazonUrl}
                        target="_blank"
                        className="font-semibold text-green-700"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </td>
                  <td className="rounded-r-xl px-3 py-3 text-right">
                    <button
                      type="button"
                      onClick={(event) => {
                        const rect = event.currentTarget.getBoundingClientRect();
                        setMenuPosition({
                          top: rect.bottom + 8,
                          left: Math.max(16, rect.right - 176),
                        });
                        setOpenMenu(openMenu === item.id ? null : item.id);
                      }}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition hover:bg-gray-100"
                      aria-label={`Open actions for ${item.title}`}
                    >
                      <MoreVertical size={18} />
                    </button>

                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          <PaginationControls
            page={currentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            pageSize={tablePageSize}
            onPageChange={setPage}
          />
        </div>
      ) : (
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
                onClick={onAdd}
                className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white"
              >
                Add Book
              </button>
            ) : null
          }
        />
      )}

      {openMenu ? (
        <ActionSheet
          id={openMenu}
          title={books.find((item) => item.id === openMenu)?.title ?? "Book"}
          position={menuPosition}
          onClose={() => setOpenMenu(null)}
          onEdit={() => {
            const item = books.find((entry) => entry.id === openMenu);
            if (item) {
              setEditing(item);
            }
            setOpenMenu(null);
          }}
          deleteAction={removeBook}
        />
      ) : null}

      {editing ? (
        <ModalShell
          title="View/Edit Book"
          onClose={() => setEditing(null)}
          size="wide"
        >
          <form action={editBook} className="grid gap-3">
            <input type="hidden" name="id" value={editing.id} />
            <input type="hidden" name="currentImage" value={editing.image} />
            <CoverImagePreview title={editing.title} image={editing.image} />
            <Input name="title" defaultValue={editing.title} />
            <Input name="author" defaultValue={editing.author} />
            <div className="grid gap-3 md:grid-cols-2">
              <Input name="category" defaultValue={editing.category} />
              <Input
                name="rating"
                defaultValue={editing.rating}
                type="number"
                min="0"
                max="5"
                step="0.1"
              />
            </div>
            <PriceEditor price={editing.price} />
            <Input
              name="amazonUrl"
              defaultValue={editing.amazonUrl ?? ""}
              type="url"
              required={false}
            />
            <textarea
              name="excerpt"
              defaultValue={editing.excerpt ?? editing.description}
              rows={7}
              required
              minLength={20}
              maxLength={400}
              className="w-full min-w-0 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-700"
            />
            <FileField
              name="image"
              label="Cover Image"
              accept="image/jpeg,image/png,image/webp,image/gif"
            />
            <SaveButton />
          </form>
        </ModalShell>
      ) : null}
    </div>
  );
}
