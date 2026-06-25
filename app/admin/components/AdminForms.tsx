"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { BookOpen, FileText, Loader2, Upload } from "lucide-react";
import {
  createBook,
  createDevotional,
  type AdminActionState,
} from "../actions";

const initialState: AdminActionState = {
  message: "",
};

type FormProps = {
  onResult?: (state: AdminActionState) => void;
  onSuccess?: () => void;
};

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  accept,
  minLength,
  maxLength,
  min,
  max,
  step,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  accept?: string;
  minLength?: number;
  maxLength?: number;
  min?: string;
  max?: string;
  step?: string;
}) {
  return (
    <label className="grid min-w-0 gap-2 text-sm font-medium text-gray-700">
      {label}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        accept={accept}
        minLength={minLength}
        maxLength={maxLength}
        min={min}
        max={max}
        step={step}
        className="h-12 w-full min-w-0 max-w-full rounded-xl border border-gray-200 bg-white px-4 text-gray-900 outline-none transition file:max-w-full focus:border-green-700 focus:ring-2 focus:ring-green-700/15"
      />
    </label>
  );
}

function PriceField() {
  return (
    <label className="grid min-w-0 gap-2 text-sm font-medium text-gray-700">
      Price
      <div className="grid min-w-0 gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
        <input
          name="priceAmount"
          type="number"
          min="0"
          step="0.01"
          placeholder="20.00"
          required
          className="h-12 w-full min-w-0 rounded-xl border border-gray-200 bg-white px-4 text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15"
        />
        <select
          name="priceCurrency"
          defaultValue="GHS"
          className="h-12 w-full min-w-0 rounded-xl border border-gray-200 bg-white px-4 text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15 sm:w-auto"
        >
          <option value="GHS">GHS</option>
          <option value="USD">USD</option>
        </select>
      </div>
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

function SubmitButton({
  label,
  pendingLabel,
}: {
  label: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-green-700 px-5 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <Upload size={18} />
      )}
      {pending ? pendingLabel : label}
    </button>
  );
}

export function DevotionalCreateForm({ onResult, onSuccess }: FormProps) {
  const [state, action] = useActionState(createDevotional, initialState);
  const onResultRef = useRef(onResult);
  const onSuccessRef = useRef(onSuccess);

  useEffect(() => {
    onResultRef.current = onResult;
    onSuccessRef.current = onSuccess;
  }, [onResult, onSuccess]);

  useEffect(() => {
    if (!state.message) {
      return;
    }

    onResultRef.current?.(state);

    if (state.ok) {
      onSuccessRef.current?.();
    }
  }, [state]);

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
        <Field
          name="title"
          label="Title"
          placeholder="Faith for today"
          minLength={3}
          maxLength={120}
        />
        <Field
          name="category"
          label="Category"
          placeholder="Prayer"
          minLength={2}
          maxLength={60}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            name="readTime"
            label="Read Time"
            placeholder="5 min read"
            minLength={3}
            maxLength={30}
          />
          <Field
            name="author"
            label="Author"
            placeholder="Grace & Truth Team"
            minLength={2}
            maxLength={80}
          />
        </div>
        <Field
          name="scripture"
          label="Scripture"
          placeholder="Psalm 46:10"
          minLength={3}
          maxLength={80}
        />
        <label className="grid min-w-0 gap-2 text-sm font-medium text-gray-700">
          Excerpt
          <textarea
            name="excerpt"
            rows={4}
            required
            minLength={20}
            maxLength={500}
            placeholder="Write the short devotional summary..."
            className="w-full min-w-0 max-w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15"
          />
        </label>
        <Field
          name="image"
          label="Cover Image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          required={false}
        />
        <Field
          name="pdf"
          label="Downloadable PDF"
          type="file"
          accept="application/pdf"
          required={false}
        />
        <Message state={state} />
        <SubmitButton label="Upload Devotional" pendingLabel="Uploading..." />
      </div>
    </form>
  );
}

export function BookCreateForm({ onResult, onSuccess }: FormProps) {
  const [state, action] = useActionState(createBook, initialState);
  const onResultRef = useRef(onResult);
  const onSuccessRef = useRef(onSuccess);

  useEffect(() => {
    onResultRef.current = onResult;
    onSuccessRef.current = onSuccess;
  }, [onResult, onSuccess]);

  useEffect(() => {
    if (!state.message) {
      return;
    }

    onResultRef.current?.(state);

    if (state.ok) {
      onSuccessRef.current?.();
    }
  }, [state]);

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
        <Field
          name="title"
          label="Title"
          placeholder="The Prayer Life"
          minLength={3}
          maxLength={120}
        />
        <Field
          name="author"
          label="Author"
          placeholder="Author name"
          minLength={2}
          maxLength={80}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            name="category"
            label="Category"
            placeholder="Prayer"
            minLength={2}
            maxLength={60}
          />
          <PriceField />
        </div>
        <Field
          name="rating"
          label="Rating"
          type="number"
          placeholder="4.8"
          min="0"
          max="5"
          step="0.1"
          required={false}
        />
        <Field
          name="amazonUrl"
          label="Amazon Link"
          type="url"
          placeholder="https://www.amazon.com/..."
          maxLength={300}
          required={false}
        />
        <label className="grid min-w-0 gap-2 text-sm font-medium text-gray-700">
          Short Excerpt
          <textarea
            name="excerpt"
            rows={3}
            required
            minLength={20}
            maxLength={400}
            placeholder="Write a short summary for cards and previews..."
            className="w-full min-w-0 max-w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15"
          />
        </label>
        <Field
          name="image"
          label="Cover Image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          required={false}
        />
        <Message state={state} />
        <SubmitButton label="Upload Book" pendingLabel="Uploading..." />
      </div>
    </form>
  );
}

export default function AdminForms() {
  return (
    <div className="grid min-w-0 gap-8 lg:grid-cols-2">
      <div className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <DevotionalCreateForm />
      </div>
      <div className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <BookCreateForm />
      </div>
    </div>
  );
}
