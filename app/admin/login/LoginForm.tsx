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
      className="relative z-10 w-full min-w-0 max-w-md rounded-2xl border border-white/35 bg-green-950/35 p-5 text-white shadow-2xl shadow-green-950/50 backdrop-blur-2xl sm:p-8"
    >
      <div className="mb-7">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/20 text-amber-200 shadow-sm">
          <LockKeyhole size={24} />
        </div>
        <h1 className="text-3xl font-bold text-white">Admin Login</h1>
        <p className="mt-2 text-white/75">
          Sign in to upload books and devotionals.
        </p>
      </div>

      <div className="grid gap-3.5">
        <label className="grid min-w-0 gap-2 text-sm font-medium text-white/85">
          Username
          <input
            name="username"
            required
            autoComplete="username"
            placeholder="Enter admin username"
            className="h-12 w-full min-w-0 rounded-xl border border-white/35 bg-white/25 px-4 text-white outline-none shadow-inner shadow-green-950/10 transition placeholder:text-white/55 focus:border-amber-200 focus:bg-white/30 focus:ring-2 focus:ring-amber-200/30"
          />
        </label>

        <label className="grid min-w-0 gap-2 text-sm font-medium text-white/85">
          Password
          <div className="flex h-12 items-center rounded-xl border border-white/35 bg-white/25 px-4 shadow-inner shadow-green-950/10 transition focus-within:border-amber-200 focus-within:bg-white/30 focus-within:ring-2 focus-within:ring-amber-200/30">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="Enter admin password"
              className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/55"
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              className="ml-3 text-white/65 transition hover:text-amber-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </label>

        {state.message ? (
          <p className="rounded-xl border border-red-200/40 bg-red-500/20 px-4 py-3 text-sm text-red-50">
            {state.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-amber-300 px-5 font-semibold text-green-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogIn size={18} />
          {pending ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </form>
  );
}
