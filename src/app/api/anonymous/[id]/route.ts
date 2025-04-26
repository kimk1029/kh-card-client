import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  req: NextRequest,
) {
  try {
    const { pathname } = new URL(req.url);
    const segments = pathname.split("/");
    const id = segments[segments.length - 1];
    const response = await axios.get(
      `https://kimk1029.synology.me:8080/kh1/api/anonymous/${id}`
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.response?.status || 500 }
    );
  }
} 