import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Tài khoản", type: "text" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials) {
        // Nên load user từ DB, demo cứng như sau:
        const user = {
          id: 1,
          name: "Admin",
          username: "admin",
          role: "admin",
        };
        if (
          credentials.username === "admin" &&
          credentials.password === "123456"
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/", // tuỳ chỉnh trang đăng nhập của bạn
  },
  callbacks: {
    async session({ session, token, user }) {
      // Thêm role vào session để check phân quyền phía client
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
