import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/app/lib/admin-auth";
import LoginForm from "./LoginForm";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F8F5] px-6 py-20">
      <LoginForm />
    </main>
  );
}
