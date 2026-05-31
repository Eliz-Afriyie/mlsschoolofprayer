import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/app/lib/admin-auth";
import { getUploadedContent } from "@/app/lib/content";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const uploads = await getUploadedContent();

  return (
    <AdminDashboard
      books={uploads.books}
      devotionals={uploads.devotionals}
    />
  );
}
