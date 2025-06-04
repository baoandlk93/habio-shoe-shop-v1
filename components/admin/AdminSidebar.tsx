import Link from "next/link";
import { CiSettings } from "react-icons/ci";
export default function AdminSidebar() {
  return (
    <aside className="w-60  max-h-screen  bg-gradient-to-b from-blue-500 to-fuchsia-500 text-white shadow-md flex flex-col justify-between px-4 py-8">
      {/* Phần trên: tiêu đề và navigation */}
      <div className="flex flex-col gap-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-8">Admin Dashboard</h2>
        <nav className="flex flex-col gap-4 overflow-y-auto">
          <Link
            href="/admin/home"
            className="hover:bg-white/10 px-3 py-2 rounded-full"
          >
            Trang chủ
          </Link>
          <Link
            href="/admin/products"
            className="hover:bg-white/10 px-3 py-2 rounded-full"
          >
            Quản lý sản phẩm
          </Link>
          <Link
            href="/admin/orders"
            className="hover:bg-white/10 px-3 py-2 rounded-full"
          >
            Quản lý đơn hàng
          </Link>
          <Link
            href="/admin/users"
            className="hover:bg-white/10 px-3 py-2 rounded-full"
          >
            Quản lý người dùng
          </Link>
        </nav>
      </div>
      {/* Phần dưới: các nút luôn nằm cuối */}
      <div className="flex flex-col gap-2 mt-8">
        <Link
          href="/admin/settings"
          className="w-full bg-white/10 hover:bg-white/20 px-3 py-2 rounded-full flex items-center gap-2 justify-center"
        >
          <CiSettings />
          Cài đặt
        </Link>
      </div>
    </aside>
  );
}
