// src/app/api/posts/[id]/route.ts
import { NextResponse } from "next/server";

export interface Author {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: string; // ISO 8601 형식의 날짜 문자열
}

export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string; // ISO 8601 형식의 날짜 문자열
  author: Author;
  views: number;
  comments?: number;
}

// ⚠️ 두 번째 인자(context)는 쓰지 않음!
export async function GET(req: Request) {
  const { pathname } = new URL(req.url);
  const segments = pathname.split("/");
  const id = segments[segments.length - 1];
  console.log("게시글 ID:", id);
  // 실제 API 주소
  try {
    const res = await fetch(
      `http://kimk1029.synology.me:50000/api/posts/${id}`
    );

    if (!res.ok) {
      return NextResponse.json(
        { message: "해당 게시글을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const data: Post = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("외부 API 요청 실패:", error);
    return NextResponse.json(
      { message: "외부 API 요청 실패" },
      { status: 500 }
    );
  }
}
