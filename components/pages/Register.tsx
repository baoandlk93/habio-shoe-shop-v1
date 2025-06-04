import { IRole, IUser } from "@/server/entity";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
interface IFormInput {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: IRole;
}
export default function Register() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const user: IUser = {
      id: "",
      name: data.name,
      username: data.username,
      password: data.password,
      role: IRole.USER,
    };
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 text-black"
    >
      <input
        {...register("name")}
        type="text"
        placeholder="Họ và tên"
        name="name"
        className="px-4 py-3 rounded-lg border focus:border-blue-500 outline-none transition"
        required
      />
      <input
        {...register("username", { required: true })}
        type="text"
        placeholder="Tên đăng nhập"
        name="username"
        className="px-4 py-3 rounded-lg border focus:border-blue-500 outline-none transition"
        required
      />
      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="Mật khẩu"
        name="password"
        className="px-4 py-3 rounded-lg border focus:border-fuchsia-500 outline-none transition"
        required
      />
      <input
        {...register("confirmPassword", { required: true })}
        type="password"
        placeholder="Nhập lại mật khẩu"
        name="confirmPassword"
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
