import { User } from "@/server/entity";
import Link from "next/link";
import { signOut } from "next-auth/react";
export default function AdminNavbar({ user }: { user: User }) {
  return (
    <header className="w-full h-16 px-6 flex items-center justify-between bg-white/80 shadow sticky top-0 z-20 backdrop-blur">
      {/* Logo hoặc tên hệ thống */}
      <div className="flex items-center gap-3">
        <Link href="/admin" className="text-xl font-bold text-blue-600">
          Admin Panel
        </Link>
      </div>
      {/* Thông tin người dùng */}
      <div className="flex items-center gap-4">
        {/* Thêm nút thông báo, cài đặt,… nếu muốn */}
        {/* Hiển thị avatar và tên người dùng nếu có */}
        <div className="flex items-center gap-2">
          <img
            src="/default-avatar.png"
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-semibold">{user?.name || "Admin"}</span>
        </div>
        {/* Nút đăng xuất hoặc menu dropdown */}
        <button
          onClick={() => {
            signOut();
          }}
          className="text-red-500 px-3 py-1 rounded hover:bg-red-50"
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
}
