"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<null | string>(null);

  return (
    <nav className="bg-gradient-to-tr from-blue-600 via-indigo-500 to-fuchsia-500 fixed top-0 left-0 w-full z-10 shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/img/logo.png" className="h-10 w-10 mr-3" />
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
            {/* Dropdown sản phẩm */}
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
              {dropdownOpen && (
                <div className="absolute left-0 top-full w-56 bg-gradient-to-tr from-blue-600 via-indigo-500 to-fuchsia-500 text-white rounded-2xl shadow-2xl z-20 border border-indigo-200">
                  {/* Sneaker có submenu */}
                  <div
                    className="relative"
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
                    {/* Submenu cho sneaker */}
                    {submenuOpen === "sneaker" && (
                      <div className="absolute left-full top-0 w-48 bg-gradient-to-tr from-blue-600 via-indigo-500 to-fuchsia-500 text-white shadow-lg rounded-xl z-30 border border-indigo-200">
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
                    className="relative"
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
                      <div className="absolute left-full top-0 w-48 bg-gradient-to-tr from-blue-600 via-indigo-500 to-fuchsia-500 text-white shadow-lg rounded-xl z-30">
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
            <Link
              href="/about"
              className="text-white px-3 py-2 rounded transition hover:text-fuchsia-200 hover:bg-white/10"
            >
              Giới thiệu
            </Link>
            <Link
              href="/contact"
              className="text-white px-3 py-2 rounded transition hover:text-fuchsia-200 hover:bg-white/10"
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
