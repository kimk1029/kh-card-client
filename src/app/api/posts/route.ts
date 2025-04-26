import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
const posts: any[] = []; // 실제론 데이터베이스 접근

export async function GET() {
  try {
    const response = await axios.get(
      "https://kimk1029.synology.me:8080/kh1/api/posts"
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
    const body = await req.json();
    const response = await axios.post(
      "https://kimk1029.synology.me:8080/kh1/api/posts",
      body,
      {
        headers: {
          Authorization: req.headers.get("authorization") || "",
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
