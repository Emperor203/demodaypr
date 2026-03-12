import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const skip = searchParams.get("skip");

  const query = new URLSearchParams();
  if (limit) query.set("limit", limit);
  if (skip) query.set("skip", skip);

  const target = `https://dummyjson.com/products${query.toString() ? `?${query}` : ""}`;

  try {
    const response = await fetch(target, { cache: "no-store" });
    if (!response.ok) {
      return NextResponse.json({ error: "Ошибка внешнего сервиса" }, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Не удалось получить товары" }, { status: 502 });
  }
}
