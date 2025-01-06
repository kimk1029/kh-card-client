import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/account?email=...
 * Authorization 헤더로 인증 토큰 전달
 */
export async function GET(req: NextRequest) {
  try {
    // 1) 쿼리 파라미터에서 email 추출
    const { pathname } = new URL(req.url);
    const segments = pathname.split("/");
    const id = segments[segments.length - 1];
    console.log("유저 ID:", id);

    // 2) 인증 헤더 추출
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "인증 토큰이 필요합니다." },
        { status: 401 }
      );
    }
    // 3) 외부 서버로 GET 요청
    //    여기서 쿼리 파라미터 `email`을 그대로 전달하도록 구성

    const response = await fetch(
      `http://kimk1029.synology.me:50000/api/users/account/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader, // 인증 토큰 전달
        },
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch account (status: ${response.status})`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error in GET /api/account:", error);
    return NextResponse.json(
      { error: "Failed to fetch account" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/account
 * body: { username?: string, password?: string, ... }
 */
export async function PATCH(req: NextRequest) {
  try {
    // 1) body 파싱
    const body = await req.json();

    // 2) 외부 서버에 PATCH /api/account
    //    (인증 헤더가 필요하다면 비슷하게 추출 후 전달)
    const authHeader = req.headers.get("Authorization") ?? "";
    const response = await fetch(
      "http://kimk1029.synology.me:50000/api/users/account"
    );

    if (!response.ok) {
      throw new Error(`Failed to patch account (status: ${response.status})`);
    }
    const result = await response.json();

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Error patching account:", error);
    return NextResponse.json(
      { error: "Failed to patch account" },
      { status: 500 }
    );
  }
}
