"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Contact,
  FileText,
  Home,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { logoutAdmin } from "../actions";
import { ConfirmationModal } from "./AdminDashboardWidgets";

export type AdminSection =
  | "overview"
  | "home"
  | "about"
  | "contact"
  | "site"
  | "devotionals"
  | "books";

const menu = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "home", label: "Homepage", icon: Home },
  { id: "about", label: "About Page", icon: UserRound },
  { id: "contact", label: "Contact Page", icon: Contact },
  { id: "site", label: "Site Settings", icon: Settings },
  { id: "devotionals", label: "Devotionals", icon: FileText },
  { id: "books", label: "Books", icon: BookOpen },
] as const;

function SidebarContent({
  section,
  setSection,
  onNavigate,
}: {
  section: AdminSection;
  setSection: (section: AdminSection) => void;
  onNavigate?: () => void;
}) {
  const [confirmSignOut, setConfirmSignOut] = useState(false);

  return (
    <>
      <div>
        <div className="mb-8 rounded-2xl bg-green-900 p-4 text-white">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-amber-300">
            <ShieldCheck size={22} />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[3px] text-amber-300">
            Admin Portal
          </p>
          <h1 className="mt-2 text-2xl font-bold">Content Studio</h1>
          <p className="mt-2 text-sm text-white/65">
            Manage your website
          </p>
        </div>

        <nav className="grid gap-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = section === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSection(item.id);
                  onNavigate?.();
                }}
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

      <Link
        href="/"
        className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-300 px-4 py-3 text-sm font-bold text-green-950 shadow-sm transition hover:bg-amber-200"
      >
        <ArrowLeft size={16} />
        Back to website
      </Link>

      <div className="mt-3 border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={() => setConfirmSignOut(true)}
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Sign Out
        </button>
      </div>

      {confirmSignOut ? (
        <ConfirmationModal
          title="Sign out?"
          description="You will leave the admin portal and need to log in again to manage content."
          onClose={() => setConfirmSignOut(false)}
          tone="warning"
        >
          <form action={logoutAdmin}>
            <button className="w-full rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 sm:w-auto">
              Yes, sign out
            </button>
          </form>
        </ConfirmationModal>
      ) : null}
    </>
  );
}

export default function AdminSidebar({
  section,
  setSection,
  open,
  onClose,
}: {
  section: AdminSection;
  setSection: (section: AdminSection) => void;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <aside className="hidden flex-col border-r border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-0 lg:flex lg:h-screen">
        <SidebarContent section={section} setSection={setSection} />
      </aside>

      <div
        className={`fixed inset-0 z-[90] h-dvh overflow-hidden bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          className="absolute inset-0 h-full w-full cursor-default"
          onClick={onClose}
          aria-label="Close admin menu"
        />

        <aside
          className={`thin-scrollbar absolute left-0 top-0 flex h-dvh w-[min(86vw,320px)] min-w-0 flex-col overflow-x-hidden overflow-y-auto overscroll-contain bg-white p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="sticky top-0 z-10 mb-4 flex justify-end bg-white pb-1">
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200"
              aria-label="Close admin menu"
            >
              <X size={20} />
            </button>
          </div>
          <SidebarContent
            section={section}
            setSection={setSection}
            onNavigate={onClose}
          />
        </aside>
      </div>
    </>
  );
}
