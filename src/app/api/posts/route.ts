import { NextRequest, NextResponse } from "next/server";
const posts: any[] = []; // 실제론 데이터베이스 접근
export async function GET() {
  try {
    const response = await fetch(
      "https://kimk1029.synology.me:8080/kh1/api/posts"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  console.log("{{{}}}", req);
  try {
    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: "title, content are required" },
        { status: 400 }
      );
    }

    // 새로운 글 생성 (DB에 저장)
    const newPost = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toISOString(),
      userId: 1, // 실제론 session.userId 등을 할당
      views: 0,
      comments: 0,
      tag: "notice", // 임의
    };
    posts.push(newPost);

    return NextResponse.json(
      { message: "Post created", post: newPost },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
