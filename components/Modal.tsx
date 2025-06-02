"use client";
import { useEffect, useState } from "react";

function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  // Trạng thái hỗ trợ delay remove khỏi DOM để cho chạy hết animation
  const [show, setShow] = useState(open);

  useEffect(() => {
    if (open) {
      setShow(true); // render lên
    } else {
      // Delay 300ms cho hiệu ứng đóng
      const timeout = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!show) return null;

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center">
      {/* Overlay: Làm mờ và tối nền */}
      <div
        className={`
          absolute inset-0 bg-black/50 backdrop-blur-sm
          transition-opacity duration-300
          ${open ? "opacity-100" : "opacity-0"}
        `}
        onClick={onClose}
        aria-label="Đóng modal"
      />
      <div className="relative z-10 w-full max-w-md mx-auto">
        <div
          className={`
            bg-white/70 backdrop-blur-lg rounded-xl shadow-xl w-full p-0
            transform transition-all duration-300
            ${
              open
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4"
            }
          `}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-transparent hover:bg-blue-50 rounded-full p-2 text-lg text-gray-600"
            aria-label="Đóng"
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
