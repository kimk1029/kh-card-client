// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// NextAuth 핸들러 생성
const handler = NextAuth({
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "이메일", type: "email", placeholder: "이메일 입력" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("CredentialsProvider authorize called with:", credentials);

        if (!credentials?.email || !credentials.password) {
          throw new Error("이메일과 비밀번호를 모두 입력해주세요.");
        }

        try {
          const res = await fetch(
            "http://kimk1029.synology.me:50000/api/auth/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "로그인에 실패했습니다.");
          }

          const user = await res.json();

          // 사용자 객체에 필수 필드 포함
          if (user && user.id && user.username && user.email) {
            return {
              id: user.id,
              username: user.username, // API 응답에 nickname 필드가 있는지 확인
              email: user.email,
            };
          } else {
            throw new Error("사용자 정보를 불러오는 데 실패했습니다.");
          }
        } catch (error: any) {
          console.error("Authorize Error:", error);
          throw new Error(error.message || "로그인 중 오류가 발생했습니다.");
        }
      },
    }),
    // 추가적인 프로바이더 (예: GitHub) 필요 시 추가 가능
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  callbacks: {
    // JWT 콜백에서 사용자 정보를 토큰에 포함
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    // 세션 콜백에서 토큰 정보를 세션에 포함
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});

// GET과 POST 메서드로 핸들러 내보내기
export { handler as GET, handler as POST };
