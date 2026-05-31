"use client";

import { useActionState } from "react";
import { BookOpen, FileText, Upload } from "lucide-react";
import {
  createBook,
  createDevotional,
  type AdminActionState,
} from "./actions";

const initialState: AdminActionState = {
  message: "",
};

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-gray-700">
      {label}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-12 rounded-xl border border-gray-200 bg-white px-4 text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15"
      />
    </label>
  );
}

function Message({ state }: { state: AdminActionState }) {
  if (!state.message) {
    return null;
  }

  return (
    <p
      className={`rounded-xl px-4 py-3 text-sm ${
        state.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"
      }`}
      aria-live="polite"
    >
      {state.message}
    </p>
  );
}

export function DevotionalCreateForm() {
  const [state, action, pending] = useActionState(
    createDevotional,
    initialState
  );

  return (
    <form action={action}>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-800">
          <FileText size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-950">
            Upload Devotional
          </h2>
          <p className="text-sm text-gray-500">Publish a new daily reading.</p>
        </div>
      </div>

      <div className="grid gap-4">
        <Field name="title" label="Title" placeholder="Faith for today" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="category" label="Category" placeholder="Prayer" />
          <Field name="date" label="Date" placeholder="May 31, 2026" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="readTime" label="Read Time" placeholder="5 min read" />
          <Field
            name="author"
            label="Author"
            placeholder="Grace & Truth Team"
          />
        </div>
        <Field name="scripture" label="Scripture" placeholder="Psalm 46:10" />
        <label className="grid gap-2 text-sm font-medium text-gray-700">
          Excerpt
          <textarea
            name="excerpt"
            rows={4}
            required
            placeholder="Write the short devotional summary..."
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15"
          />
        </label>
        <Field name="image" label="Image" type="file" required={false} />
        <Message state={state} />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-green-700 px-5 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Upload size={18} />
          {pending ? "Uploading..." : "Upload Devotional"}
        </button>
      </div>
    </form>
  );
}

export function BookCreateForm() {
  const [state, action, pending] = useActionState(createBook, initialState);

  return (
    <form action={action}>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
          <BookOpen size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-950">Upload Book</h2>
          <p className="text-sm text-gray-500">Add a resource to the shop.</p>
        </div>
      </div>

      <div className="grid gap-4">
        <Field name="title" label="Title" placeholder="The Prayer Life" />
        <Field name="author" label="Author" placeholder="Author name" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="category" label="Category" placeholder="Prayer" />
          <Field name="price" label="Price" placeholder="$15.00" />
        </div>
        <Field
          name="rating"
          label="Rating"
          type="number"
          placeholder="4.8"
          required={false}
        />
        <label className="grid gap-2 text-sm font-medium text-gray-700">
          Description
          <textarea
            name="description"
            rows={4}
            required
            placeholder="Write the book description..."
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15"
          />
        </label>
        <Field name="image" label="Image" type="file" required={false} />
        <Message state={state} />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-green-700 px-5 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Upload size={18} />
          {pending ? "Uploading..." : "Upload Book"}
        </button>
      </div>
    </form>
  );
}

export default function AdminForms() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <DevotionalCreateForm />
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <BookCreateForm />
      </div>
    </div>
  );
}
