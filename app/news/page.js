"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const highlights = [
  {
    id: "hl-1",
    label: "Lookbook",
    title: "Focus on form",
    copy: "Structured silhouettes with soft drape. Clean lines, heavy texture.",
  },
  {
    id: "hl-2",
    label: "Craft",
    title: "Materials first",
    copy: "Recycled blends, water-based dye, low-impact finishing.",
  },
  {
    id: "hl-3",
    label: "Community",
    title: "Built with local studios",
    copy: "Small-batch collaborations across Tashkent ateliers.",
  },
];

const normalizeNews = (item) => ({
  id: String(item?.id ?? ""),
  title: typeof item?.title === "string" ? item.title : "Untitled",
  excerpt: typeof item?.body === "string" ? item.body : "",
});

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setError("");
        const res = await fetch("/api/news?limit=6");
        const data = await res.json();
        const items = Array.isArray(data?.posts) ? data.posts.map(normalizeNews) : [];
        if (items.length === 0) {
          setError("News is temporarily unavailable.");
        }
        setNewsItems(items);
      } catch (err) {
        console.error(err);
        setError("News is temporarily unavailable.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--foreground)]">
      <div className="container-custom py-4 sm:py-6 md:py-8">
        <Header />

        <section className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Newsroom</p>
            <h1 className="mt-4 text-[42px] font-black uppercase leading-[0.85] tracking-tighter sm:text-[52px] md:text-[64px]">
              Latest updates
              <br />
              from XIV
            </h1>
            <p className="mt-6 max-w-[420px] text-sm text-[var(--color-muted)]">
              Drops, studio notes, and community events. Fresh updates every week with a focus on materials and fit.
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
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">This season</p>
                <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[11px] uppercase tracking-[0.2em]">
                  2026
                </span>
              </div>

              {loading ? (
                <p className="mt-8 text-sm uppercase">Loading news...</p>
              ) : error ? (
                <p className="mt-8 text-sm text-red-500">{error}</p>
              ) : (
                <div className="mt-6 space-y-6">
                  {newsItems.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-5 py-5 transition hover:translate-y-[-2px]"
                    >
                      <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                        <span>Update</span>
                        <span className="h-px w-10 bg-[var(--color-border)]" />
                        <span>Post #{item.id}</span>
                      </div>
                      <h2 className="mt-3 text-2xl font-black uppercase leading-tight">{item.title}</h2>
                      <p className="mt-3 text-sm text-[var(--color-muted)]">{item.excerpt}</p>
                      <div className="mt-4 text-xs uppercase tracking-[0.2em]">Read story</div>
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
