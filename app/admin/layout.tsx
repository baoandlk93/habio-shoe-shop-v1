"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { useSession } from "next-auth/react";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className="min-h-screen flex bg-gray-50 text-black">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar user={user} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
