import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const id = Number(params?.id);
  if (!id || Number.isNaN(id)) {
    return NextResponse.json({ error: "Некорректный идентификатор товара" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`, { cache: "no-store" });
    if (!response.ok) {
      return NextResponse.json({ error: "Ошибка внешнего сервиса" }, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Не удалось получить товар" }, { status: 502 });
  }
}
