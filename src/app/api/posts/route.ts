import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://www.koreandummyjson.site/api/posts");
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
