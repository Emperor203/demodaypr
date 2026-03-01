"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { addToCart } from "../../lib/cart";

export default function CardProducts({ product }) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="flex flex-col gap-3 group">
      <Link
        href={`/product/${product.id}`}
        className="relative block w-full h-[313px] border border-[var(--color-border)] flex items-center justify-center bg-[var(--color-surface)] overflow-hidden"
      >
        <div className="relative w-[240px] h-[280px]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="240px"
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </Link>

      <button
        type="button"
        onClick={handleAddToCart}
        className="h-10 px-3 rounded border border-[var(--color-border)] bg-[var(--color-surface-soft)] text-[11px] font-bold uppercase tracking-wide hover:opacity-90 self-end -mt-14 mr-3 z-10"
      >
        {added ? "Added" : "Add"}
      </button>

      <div className="space-y-1">
        <div className="text-[10px] text-[var(--color-muted)] uppercase tracking-tight">
          {product.category}
        </div>
        <div className="flex justify-between items-center">
          <Link href={`/product/${product.id}`} className="mr-2 min-w-0">
            <h3 className="text-[12px] font-bold text-[var(--foreground)] truncate hover:underline">
              {product.title}
            </h3>
          </Link>
          <span className="text-[12px] font-bold text-[var(--foreground)]">${product.price}</span>
        </div>
      </div>
    </div>
  );
}
