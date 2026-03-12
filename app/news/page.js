"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const highlights = [
  {
    id: "hl-1",
    label: "Лукбук",
    title: "Фокус на силуэт",
    copy: "Структурные силуэты с мягкой драпировкой. Чистые линии, плотная фактура.",
  },
  {
    id: "hl-2",
    label: "Мастерство",
    title: "Материалы важнее всего",
    copy: "Переработанные смеси, водные красители, бережная отделка.",
  },
  {
    id: "hl-3",
    label: "Сообщество",
    title: "Создано с локальными студиями",
    copy: "Малые партии в коллаборации с ташкентскими ателье.",
  },
];

const LOCAL_NEWS = [
  {
    id: "local-1",
    title: "Мы обновили ассортимент недели",
    excerpt: "Добавили новые позиции в одежде и обуви, а также свежие аксессуары. Проверьте раздел «Новинки».",
  },
  {
    id: "local-2",
    title: "Быстрая доставка по городу",
    excerpt: "Теперь доставляем заказы по городу в течение 24 часов. Подробности — в корзине при оформлении.",
  },
  {
    id: "local-3",
    title: "Скидки на избранные категории",
    excerpt: "До конца недели действует акция на куртки, худи и спортивные комплекты.",
  },
  {
    id: "local-4",
    title: "Новые размеры в наличии",
    excerpt: "Пополнены размеры XS и XL на самые популярные модели. Успейте забронировать.",
  },
  {
    id: "local-5",
    title: "Коллекция XIV 23–24 уже в продаже",
    excerpt: "Лимитированные вещи с акцентом на посадку и материалы уже доступны в каталоге.",
  },
  {
    id: "local-6",
    title: "Советы по уходу за тканями",
    excerpt: "Мы собрали простые рекомендации, чтобы ваши вещи дольше сохраняли форму и цвет.",
  },
];

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setNewsItems(LOCAL_NEWS);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--foreground)]">
      <div className="container-custom py-4 sm:py-6 md:py-8">
        <Header />

        <section className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Новости</p>
            <h1 className="mt-4 text-[42px] font-black uppercase leading-[0.85] tracking-tighter sm:text-[52px] md:text-[64px]">
              Свежие обновления
              <br />
              от XIV
            </h1>
            <p className="mt-6 max-w-[420px] text-sm text-[var(--color-muted)]">
              Дропы, заметки студии и события сообщества. Еженедельные обновления с акцентом на материалы и посадку.
            </p>

            <div className="mt-8 space-y-4">
              {highlights.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4"
                >
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">{item.label}</p>
                <h3 className="mt-2 text-lg font-bold uppercase tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Этот сезон</p>
                <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[11px] uppercase tracking-[0.2em]">
                  2026
                </span>
              </div>

              {loading ? (
                <p className="mt-8 text-sm uppercase">Загрузка новостей...</p>
              ) : (
                <div className="mt-6 space-y-6">
                  {newsItems.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-5 py-5 transition hover:translate-y-[-2px]"
                    >
                      <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                        <span>Обновление</span>
                        <span className="h-px w-10 bg-[var(--color-border)]" />
                        <span>Пост №{item.id}</span>
                      </div>
                      <h2 className="mt-3 text-2xl font-black uppercase leading-tight">{item.title}</h2>
                      <p className="mt-3 text-sm text-[var(--color-muted)]">{item.excerpt}</p>
                      <div className="mt-4 text-xs uppercase tracking-[0.2em]">Читать</div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
