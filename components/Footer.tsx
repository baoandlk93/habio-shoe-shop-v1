import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-tr from-blue-600 via-indigo-500 to-fuchsia-500 text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cột 1: Logo và Giới thiệu */}
          <div>
            <img src="/img/logo.png" alt="HABIO Shop" className="h-12 mb-3" />
            <p className="text-sm">
              HABIO SHOP - nơi bạn tìm thấy những đôi giày hoàn hảo, mang lại
              phong cách và sự thoải mái cho bạn.
            </p>
          </div>

          {/* Cột 2: Liên kết */}
          <div>
            <h3 className="text-lg font-bold mb-3">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-fuchsia-200">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-fuchsia-200">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-fuchsia-200">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-fuchsia-200">
                  Điều khoản dịch vụ
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Mạng xã hội */}
          <div>
            <h3 className="text-lg font-bold mb-3">Theo dõi chúng tôi</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="hover:text-blue-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8H6v4h3v12h5V12h3.642l.358-4H14V6.667C14 5.746 14.187 5 15 5h2V1h-3c-3.285 0-5 1.79-5 4.798V8z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                className="hover:text-blue-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.972 9.972 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3c-.951.555-2.005.959-3.127 1.184A4.92 4.92 0 0 0 16.616 3c-2.72 0-4.937 2.2-4.937 4.917 0 .385.045.762.126 1.124A13.978 13.978 0 0 1 1.671 3.149a4.922 4.922 0 0 0-.667 2.478c0 1.708.87 3.217 2.188 4.097a4.935 4.935 0 0 1-2.228-.615v.062c0 2.384 1.693 4.372 3.946 4.827a4.936 4.936 0 0 1-2.224.083 4.94 4.94 0 0 0 4.604 3.391A9.868 9.868 0 0 1 .977 18c-.129 0-.259-.004-.387-.013A13.936 13.936 0 0 0 7.548 21c9.056 0 14.006-7.413 14.006-13.846 0-.216-.005-.431-.013-.646A10.002 10.002 0 0 0 24 4.557z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                className="hover:text-pink-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.36 3.608 1.335.974.975 1.272 2.241 1.333 3.608.059 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.36 2.633-1.334 3.608-.975.974-2.241 1.272-3.608 1.333-1.265.059-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.36-3.608-1.334-.974-.974-1.272-2.241-1.333-3.608-.059-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.36-2.633 1.334-3.608.974-.973 2.241-1.272 3.608-1.333C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.743 0 8.332.012 7.052.07 5.747.127 4.611.357 3.522.973 2.404 1.598 1.598 2.405.973 3.522.356 4.61.127 5.747.07 7.052.012 8.331 0 8.743 0 12c0 3.257.012 3.667.07 4.948.057 1.305.357 2.442.974 3.522.625 1.117 1.432 1.923 2.55 2.548 1.08.617 2.217.917 3.522.974 1.279.058 1.69.07 4.948.07s3.667-.012 4.948-.07c1.305-.057 2.442-.357 3.522-.974 1.117-.625 1.923-1.432 2.548-2.55.617-1.08.917-2.217.974-3.522.059-1.279.071-1.69.071-4.948s-.012-3.667-.07-4.948c-.057-1.305-.357-2.442-.974-3.522-.625-1.117-1.432-1.924-2.55-2.549-1.08-.617-2.217-.917-3.522-.974C15.667.012 15.257 0 12 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-4 text-center text-sm">
          © 2025 HABIO SHOP. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
