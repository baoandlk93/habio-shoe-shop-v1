"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Modal from "./Modal";
import AuthForm from "./AuthForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<null | string>(null);
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      setShowModal(false);
      if (session.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [session, router]);

  return (
    <>
      <nav className="bg-gradient-to-tr from-blue-600 via-indigo-500 to-fuchsia-500 fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/img/logo.png"
                className="h-10 w-10 mr-3"
                alt="HABIO Shop"
              />
              <span className="text-white text-2xl font-bold">HABIO SHOP</span>
            </div>

            {/* Menu */}
            <div className="flex space-x-5">
              <Link
                href="/"
                className="text-white px-3 py-2 rounded transition hover:text-fuchsia-200 hover:bg-white/10"
              >
                Trang chủ
              </Link>

              {/* Dropdown Sản phẩm */}
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => {
                  setDropdownOpen(false);
                  setSubmenuOpen(null);
                }}
              >
                <button className="text-white px-3 py-2 rounded transition hover:text-fuchsia-200 hover:bg-white/10 flex items-center">
                  Sản phẩm
                </button>
                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute left-0 top-full w-56 bg-gradient-to-tr from-blue-600 via-indigo-500 to-fuchsia-500 text-white rounded-2xl shadow-2xl z-50 border border-indigo-200">
                    {/* Sneaker có submenu */}
                    <div
                      className="relative group"
                      onMouseEnter={() => setSubmenuOpen("sneaker")}
                      onMouseLeave={() => setSubmenuOpen(null)}
                    >
                      <button className="w-full flex items-center gap-2 px-5 py-3 transition hover:bg-indigo-700 rounded-xl">
                        Sneaker
                        <svg
                          className="w-3 h-3 ml-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                      {/* Submenu cho Sneaker */}
                      {submenuOpen === "sneaker" && (
                        <div className="absolute left-full top-0 w-48 bg-gradient-to-tr from-blue-600 via-indigo-500 to-fuchsia-500 text-white shadow-lg rounded-xl z-50 border border-indigo-200">
                          <Link
                            href="/shoes/sneakers/men"
                            className="block px-4 py-2 rounded transition hover:bg-white/10 hover:text-fuchsia-200"
                          >
                            Nam
                          </Link>
                          <Link
                            href="/shoes/sneakers/women"
                            className="block px-4 py-2 rounded transition hover:bg-white/10 hover:text-indigo-200"
                          >
                            Nữ
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Sandal có submenu */}
                    <div
                      className="relative group"
                      onMouseEnter={() => setSubmenuOpen("sandal")}
                      onMouseLeave={() => setSubmenuOpen(null)}
                    >
                      <button className="w-full flex items-center gap-2 px-5 py-3 transition hover:bg-indigo-700 rounded-xl">
                        Sandal
                        <svg
                          className="w-3 h-3 ml-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                      {submenuOpen === "sandal" && (
                        <div className="absolute left-full top-0 w-48 bg-gradient-to-tr from-blue-600 via-indigo-500 to-fuchsia-500 text-white shadow-lg rounded-xl z-50">
                          <Link
                            href="/shoes/sandals/men"
                            className="block px-4 py-2 rounded transition hover:bg-white/10 hover:text-fuchsia-200"
                          >
                            Nam
                          </Link>
                          <Link
                            href="/shoes/sandals/women"
                            className="block px-4 py-2 rounded transition hover:bg-white/10 hover:text-indigo-200"
                          >
                            Nữ
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Boot không có submenu */}
                    <Link
                      href="/shoes/boots"
                      className="flex items-center gap-2 px-5 py-3 transition hover:bg-indigo-700 rounded-xl"
                    >
                      Boot
                    </Link>
                  </div>
                )}
              </div>

              {/* Giới thiệu */}
              <Link
                href="/about"
                className="text-white px-3 py-2 rounded transition hover:text-fuchsia-200 hover:bg-white/10"
              >
                Giới thiệu
              </Link>

              {/* Liên hệ */}
              <Link
                href="/contact"
                className="text-white px-3 py-2 rounded transition hover:text-fuchsia-200 hover:bg-white/10"
              >
                Liên hệ
              </Link>
              {session?.user ? (
                <div className="flex items-center gap-2">
                  <img
                    src={session.user.image}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                    onError={(e) =>
                      (e.currentTarget.src = "/default-avatar.png")
                    }
                    width={32}
                    height={32}
                    title={session.user.name}
                  />
                  <button
                    onClick={() => signOut()}
                    className="px-5 py-2 bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white rounded-lg font-semibold shadow hover:scale-105"
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="px-5 py-2 bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white rounded-lg font-semibold shadow hover:scale-105"
                >
                  Đăng nhập / Đăng ký
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <AuthForm />
      </Modal>
    </>
  );
}
