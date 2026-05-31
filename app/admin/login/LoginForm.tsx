"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff, LockKeyhole, LogIn } from "lucide-react";
import { loginAdmin, type AdminActionState } from "../actions";

const initialState: AdminActionState = {
  message: "",
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
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
          <div className="flex h-12 items-center rounded-xl border border-gray-200 px-4 transition focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-700/15">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              className="min-w-0 flex-1 text-gray-900 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              className="ml-3 text-gray-500 transition hover:text-green-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
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
