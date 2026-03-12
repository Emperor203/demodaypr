import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const newsItems = [
  {
    id: "drop-01",
    title: "XIV Drop 23-24 lands this week",
    date: "March 12, 2026",
    tag: "Collection",
    excerpt:
      "A tight edit of statement knits, oversized outerwear, and hardware-forward accessories built for late season layering.",
  },
  {
    id: "studio-02",
    title: "Studio log: material lab update",
    date: "March 4, 2026",
    tag: "Studio",
    excerpt:
      "We tested new recycled blends and stress-washed finishes to keep structure without the heavy hand feel.",
  },
  {
    id: "collab-03",
    title: "City capsule pop-up schedule",
    date: "February 28, 2026",
    tag: "Events",
    excerpt:
      "Tashkent and Samarkand pop-ups with limited quantities, custom on-site fit adjustments, and early access pieces.",
  },
  {
    id: "guides-04",
    title: "Styling guide: winter to spring",
    date: "February 18, 2026",
    tag: "Guides",
    excerpt:
      "Three layering systems that keep the silhouette sharp while staying breathable through temperature shifts.",
  },
];

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

export default function NewsPage() {
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
              <div className="mt-6 space-y-6">
                {newsItems.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-5 py-5 transition hover:translate-y-[-2px]"
                  >
                    <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                      <span>{item.tag}</span>
                      <span className="h-px w-10 bg-[var(--color-border)]" />
                      <span>{item.date}</span>
                    </div>
                    <h2 className="mt-3 text-2xl font-black uppercase leading-tight">{item.title}</h2>
                    <p className="mt-3 text-sm text-[var(--color-muted)]">{item.excerpt}</p>
                    <div className="mt-4 text-xs uppercase tracking-[0.2em]">Read story</div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
