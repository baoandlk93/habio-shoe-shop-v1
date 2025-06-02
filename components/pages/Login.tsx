"use client";
export default function Login() {
  return (
    <form className="flex flex-col space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="px-4 py-3 rounded-lg border focus:border-fuchsia-500 outline-none transition"
        required
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        className="px-4 py-3 rounded-lg border focus:border-fuchsia-500 outline-none transition"
        required
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-fuchsia-500 py-3 rounded-lg text-white font-semibold shadow hover:scale-105 transition"
      >
        Đăng nhập
      </button>
      <a
        href="#"
        className="text-sm text-blue-700 text-center hover:underline mt-2"
      >
        Quên mật khẩu?
      </a>
    </form>
  );
}
