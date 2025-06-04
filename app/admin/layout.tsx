"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { useSession } from "next-auth/react";
import { IUser } from "@/server/entity";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const user = session?.user as unknown as IUser;
  return (
    <div className="min-h-screen flex bg-gray-50 text-black overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex-col overflow-hidden">
        <AdminNavbar user={user} />
        <main className="flex-1 pt-2 w-full overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
