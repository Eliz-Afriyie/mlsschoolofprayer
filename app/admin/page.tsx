import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/app/lib/admin-auth";
import { getUploadedContent } from "@/app/lib/content";
import { getSiteContent } from "@/app/lib/site-content";
import AdminDashboard from "./components/AdminDashboard";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const [uploads, site, home, about, contact] = await Promise.all([
    getUploadedContent(),
    getSiteContent("site"),
    getSiteContent("home"),
    getSiteContent("about"),
    getSiteContent("contact"),
  ]);

  return (
    <AdminDashboard
      books={uploads.books}
      devotionals={uploads.devotionals}
      siteContent={site}
      homeContent={home}
      aboutContent={about}
      contactContent={contact}
    />
  );
}
