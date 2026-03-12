import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const NEWS_POSTS = [
  {
    id: 1,
    title: "Мы обновили ассортимент недели",
    body: "Добавили новые позиции в одежде и обуви, а также свежие аксессуары. Проверьте раздел «Новинки».",
  },
  {
    id: 2,
    title: "Быстрая доставка по городу",
    body: "Теперь доставляем заказы по городу в течение 24 часов. Подробности — в корзине при оформлении.",
  },
  {
    id: 3,
    title: "Скидки на избранные категории",
    body: "До конца недели действует акция на куртки, худи и спортивные комплекты.",
  },
  {
    id: 4,
    title: "Новые размеры в наличии",
    body: "Пополнены размеры XS и XL на самые популярные модели. Успейте забронировать.",
  },
  {
    id: 5,
    title: "Коллекция XIV 23–24 уже в продаже",
    body: "Лимитированные вещи с акцентом на посадку и материалы уже доступны в каталоге.",
  },
  {
    id: 6,
    title: "Советы по уходу за тканями",
    body: "Мы собрали простые рекомендации, чтобы ваши вещи дольше сохраняли форму и цвет.",
  },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.max(1, Number(searchParams.get("limit")) || 6);

  return NextResponse.json(
    {
      posts: NEWS_POSTS.slice(0, limit),
      total: NEWS_POSTS.length,
      limit,
    },
    { status: 200 }
  );
}
