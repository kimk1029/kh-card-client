import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get(
      "https://kimk1029.synology.me:8080/kh1/api/anonymous"
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
    const response = await axios.post(
      "https://kimk1029.synology.me:8080/kh1/api/anonymous",
      {},
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