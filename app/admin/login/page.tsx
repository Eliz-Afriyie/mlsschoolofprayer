import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { isAdminAuthenticated } from "@/app/lib/admin-auth";
import LoginForm from "./LoginForm";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-3 py-20 sm:px-6"
      style={{
        backgroundImage: "url('/devotional/devo-hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-950/95 via-emerald-900/75 to-amber-600/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(3,7,18,0.34),transparent_34%),radial-gradient(circle_at_top_left,rgba(250,204,21,0.28),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.28),transparent_34%)]" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      <Link
        href="/"
        className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-white/25 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-green-950/25 backdrop-blur-xl transition hover:bg-amber-200 hover:text-green-950 sm:left-8 sm:top-8"
      >
        <ArrowLeft size={18} />
        Back to website
      </Link>

      <LoginForm />
    </main>
  );
}
