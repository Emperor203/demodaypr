import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || "6";

  const target = `https://dummyjson.com/posts?limit=${encodeURIComponent(limit)}`;

  try {
    const response = await fetch(target, { cache: "no-store" });
    if (!response.ok) {
      return NextResponse.json({ error: "Upstream error" }, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 502 });
  }
}
