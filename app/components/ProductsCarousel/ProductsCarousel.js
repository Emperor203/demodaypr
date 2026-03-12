"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductsCarousel({ items, title = "Featured" }) {
  const trackRef = useRef(null);

  const scrollByAmount = (direction) => {
    const node = trackRef.current;
    if (!node) {
      return;
    }
    const delta = node.clientWidth * 0.9;
    node.scrollBy({ left: direction * delta, behavior: "smooth" });
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-black uppercase tracking-tight">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            className="h-9 w-9 border border-[var(--color-border)] bg-[var(--color-surface)] text-lg"
            aria-label="Scroll left"
          >
            &#8249;
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            className="h-9 w-9 border border-[var(--color-border)] bg-[var(--color-surface)] text-lg"
            aria-label="Scroll right"
          >
            &#8250;
          </button>
        </div>
      </div>

      <div ref={trackRef} className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2">
        {items.map((item) => (
          <Link
            key={`carousel-${item.id}`}
            href={`/product/${item.id}`}
            className="relative min-w-[220px] snap-start overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] sm:min-w-[260px] md:min-w-[280px]"
          >
            <div className="relative h-[240px] w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 220px, (max-width: 1024px) 260px, 280px"
                className="object-contain p-4"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
