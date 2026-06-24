import type { ReactNode } from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  FileText,
  X,
} from "lucide-react";

export type ToastState = {
  ok?: boolean;
  message: string;
} | null;

export function ToastBanner({
  toast,
  onClose,
}: {
  toast: NonNullable<ToastState>;
  onClose: () => void;
}) {
  const Icon = toast.ok ? CheckCircle2 : AlertCircle;

  return (
    <div
      className={`fixed right-4 top-4 z-[150] flex w-[min(92vw,390px)] items-start gap-3 rounded-2xl border px-4 py-3 text-sm shadow-2xl ${
        toast.ok
          ? "border-green-200 bg-green-50 text-green-800"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
      role="status"
      aria-live="polite"
    >
      <Icon className="mt-0.5 shrink-0" size={20} />
      <div className="min-w-0 flex-1">
        <p className="font-bold">{toast.ok ? "Success" : "Something went wrong"}</p>
        <p className="mt-0.5 leading-5">{toast.message}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition hover:bg-black/5"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export function Input({
  name,
  defaultValue,
  type = "text",
  accept,
  required = true,
  minLength,
  maxLength,
  min,
  max,
  step,
}: {
  name: string;
  defaultValue: string | number;
  type?: string;
  accept?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: string;
  max?: string;
  step?: string;
}) {
  const valueProps =
    type === "file" ? {} : { defaultValue };

  return (
    <input
      name={name}
      type={type}
      {...valueProps}
      accept={accept}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
      min={min}
      max={max}
      step={step}
      className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-green-700"
    />
  );
}

export function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-800">
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-gray-950">{value}</p>
    </div>
  );
}

export function EmptyState({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-[#F7F8F5] p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-800">
        <FileText size={22} />
      </div>
      <h3 className="font-bold text-gray-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
        {text}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function ConfirmationModal({
  title,
  description,
  onClose,
  children,
  tone = "danger",
}: {
  title: string;
  description: string;
  onClose: () => void;
  children: ReactNode;
  tone?: "danger" | "warning";
}) {
  const warning = tone === "warning";

  return (
    <div
      className="fixed inset-0 z-[140] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-title"
    >
      <button
        type="button"
        className="absolute inset-0 h-full w-full cursor-default"
        onClick={onClose}
        aria-label="Cancel action"
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${
            warning
              ? "bg-amber-100 text-amber-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <AlertTriangle size={23} />
        </div>
        <h2 id="confirmation-title" className="mt-5 text-xl font-bold text-gray-950">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

export function PaginationControls({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
      <p>
        Showing {start}-{end} of {totalItems}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-gray-200 px-3 py-2 font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <span className="rounded-lg bg-[#F7F8F5] px-3 py-2 font-semibold text-gray-800">
          {page} / {totalPages}
        </span>
        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border border-gray-200 px-3 py-2 font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export function ModalShell({
  title,
  onClose,
  children,
  size = "default",
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  size?: "default" | "wide";
}) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 px-4 py-6">
      <div
        className={`max-h-[90vh] w-full overflow-hidden rounded-2xl bg-white shadow-2xl ${
          size === "wide" ? "max-w-4xl" : "max-w-2xl"
        }`}
      >
        <div className="thin-scrollbar max-h-[90vh] overflow-y-auto p-6 pr-7 sm:p-8 sm:pr-9">
          <div className="mb-5 flex items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold text-gray-950">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
