// types/next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      // 추가적인 사용자 정의 필드가 있다면 여기에 추가
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    username: string;
    email: string;
    // 추가적인 사용자 정의 필드가 있다면 여기에 추가
  }
}
