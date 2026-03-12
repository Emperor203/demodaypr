import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const slug = typeof params?.slug === "string" ? params.slug.trim() : "";
  if (!slug) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const skip = searchParams.get("skip");

  const query = new URLSearchParams();
  if (limit) query.set("limit", limit);
  if (skip) query.set("skip", skip);

  const target = `https://dummyjson.com/products/category/${encodeURIComponent(slug)}${
    query.toString() ? `?${query}` : ""
  }`;

  try {
    const response = await fetch(target, { cache: "no-store" });
    if (!response.ok) {
      return NextResponse.json({ error: "Upstream error" }, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 502 });
  }
}
