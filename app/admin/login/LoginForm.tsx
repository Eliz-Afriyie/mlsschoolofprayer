"use client";

import { useActionState } from "react";
import { LockKeyhole, LogIn } from "lucide-react";
import { loginAdmin, type AdminActionState } from "../actions";

const initialState: AdminActionState = {
  message: "",
};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAdmin,
    initialState
  );

  return (
    <form
      action={formAction}
      className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
    >
      <div className="mb-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-800">
          <LockKeyhole size={24} />
        </div>
        <h1 className="text-3xl font-bold text-gray-950">Admin Login</h1>
        <p className="mt-2 text-gray-600">
          Sign in to upload books and devotionals.
        </p>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-medium text-gray-700">
          Username
          <input
            name="username"
            required
            autoComplete="username"
            className="h-12 rounded-xl border border-gray-200 px-4 text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-gray-700">
          Password
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="h-12 rounded-xl border border-gray-200 px-4 text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15"
          />
        </label>

        {state.message ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {state.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-green-700 px-5 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogIn size={18} />
          {pending ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </form>
  );
}
