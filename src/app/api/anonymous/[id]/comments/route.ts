import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import axios from "axios";

const authOptions = {
  providers: [],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
};

export async function GET(req: NextRequest) {
  try {
    const { pathname } = new URL(req.url);
    const segments = pathname.split("/");
    const id = segments[segments.length - 2]; // 게시글 ID 추출

    const response = await axios.get(
      `https://kimk1029.synology.me:8080/kh1/api/anonymous/${id}/comments`
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.response?.status || 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }

    const { pathname } = new URL(req.url);
    const segments = pathname.split("/");
    const id = segments[segments.length - 2]; // 게시글 ID 추출

    const body = await req.json();
    const response = await axios.post(
      `https://kimk1029.synology.me:8080/kh1/api/anonymous/${id}/comments`,
      body,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.response?.status || 500 }
    );
  }
} 