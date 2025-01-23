// src/app/api/posts/[id]/comments/route.ts

import { NextResponse } from "next/server";

export interface Author {
  id: number;
  username: string;
}

export interface Comment {
  id: number;
  content: string;
  created_at: string;
  author: Author;
}

// GET /api/posts/[id]/comments
export async function GET(req: Request) {
  const { pathname } = new URL(req.url);
  const segments = pathname.split("/");
  const id = segments[segments.length - 2]; // 게시글 ID 추출

  console.log("게시글 ID:", id);

  try {
    const res = await fetch(
      `https://kimk1029.synology.me:8080/api/api/posts/${id}/comments`
    );

    if (!res.ok) {
      return NextResponse.json(
        { message: "댓글을 찾을 수 없습니다." },
        { status: res.status }
      );
    }

    const data: Comment[] = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("외부 API 요청 실패:", error);
    return NextResponse.json(
      { message: "외부 API 요청 실패" },
      { status: 500 }
    );
  }
}

// POST /api/posts/[id]/comments
export async function POST(req: Request) {
  const { pathname } = new URL(req.url);
  const segments = pathname.split("/");
  const id = segments[segments.length - 2]; // 게시글 ID 추출

  console.log("게시글 ID:", id);

  try {
    // 요청 본문에서 댓글 내용 추출
    const { content, parentId } = await req.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { message: "내용을 제공해야 합니다." },
        { status: 400 }
      );
    }

    // 인증 헤더 추출
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "인증 헤더가 필요합니다." },
        { status: 401 }
      );
    }
    // 외부 API에 댓글 추가 요청
    const res = await fetch(
      `https://kimk1029.synology.me:8080/api/api/posts/${id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader, // 인증 헤더 전달
        },
        body: JSON.stringify({ content, parentId }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { message: errorData.message || "댓글 추가에 실패했습니다." },
        { status: res.status }
      );
    }

    const data: Comment = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("댓글 추가 중 오류 발생:", error);
    return NextResponse.json(
      { message: "댓글 추가 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
