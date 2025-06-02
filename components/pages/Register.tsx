export default function Register() {
  return (
    <form className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Họ và tên"
        className="px-4 py-3 rounded-lg border focus:border-blue-500 outline-none transition"
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="px-4 py-3 rounded-lg border focus:border-blue-500 outline-none transition"
        required
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        className="px-4 py-3 rounded-lg border focus:border-fuchsia-500 outline-none transition"
        required
      />
      <input
        type="password"
        placeholder="Nhập lại mật khẩu"
        className="px-4 py-3 rounded-lg border focus:border-fuchsia-500 outline-none transition"
        required
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-fuchsia-500 py-3 rounded-lg text-white font-semibold shadow hover:scale-105 transition"
      >
        Đăng ký
      </button>
    </form>
  );
}
