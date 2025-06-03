import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/server/entity";
 const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const userAdmin: User = { id: "1", name: "admin", password: "123456", role: "admin", username: "admin" };
        const userCustomer: User = { id: "1", name: "customer", password: "123456", role: "customer", username: "customer" };
        if (
          credentials?.username === "admin" && 
          credentials?.password === "123456"
        ) {
          return userAdmin;
        }
        if (
          credentials?.username === "customer" && 
          credentials?.password === "123456"
        ) {
          return userCustomer;
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      // Khi user vừa đăng nhập, lưu role vào token
      if (user && user.role) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      // Khi lấy session phía client, truyền role từ token sang session.user
      if (token?.role) {
        session.user.role = token.role;
      }
      return session;
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
