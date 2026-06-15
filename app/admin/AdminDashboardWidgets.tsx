import type { ReactNode } from "react";
import { FileText, X } from "lucide-react";

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
  return (
    <input
      name={name}
      type={type}
      defaultValue={defaultValue}
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

export function ModalShell({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
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
