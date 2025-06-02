import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Đăng nhập trước đã nhé!" });
  }
  if (session.user.role !== "admin") {
    return res.status(403).json({ error: "Không có quyền truy cập!" });
  }
  // Trả dữ liệu chỉ dành cho admin
  res.status(200).json({ secret: "Dữ liệu admin đây!" });
}
