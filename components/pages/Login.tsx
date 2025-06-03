"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function Login({
  onLoginSuccess,
}: {
  onLoginSuccess?: () => void;
}) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    setLoading(false);
    if (res?.ok) {
      onLoginSuccess?.();
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      console.log(session.user?.role);
      if (session.user?.role === "admin") {
        toast.success("Đăng nhập thành công!");
        router.push("/admin");
      } else {
        toast.success("Đăng nhập thành công!");
        router.push("/");
      }
    } else {
      toast.error("Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.");
    }
  };
  return (
    <form
      className="flex flex-col space-y-4 text-black"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Tài khoản"
        className="px-4 py-3 rounded-lg border focus:border-fuchsia-500 outline-none transition"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        className="px-4 py-3 rounded-lg border focus:border-fuchsia-500 outline-none transition"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white rounded px-4 py-2 w-full"
      >
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
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
