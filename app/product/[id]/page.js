"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header/Header";
import kidsProducts from "../../Products";
import { addToCart } from "../../lib/cart";

function normalizeProduct(raw) {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const id = Number(raw.id);
  if (!id || Number.isNaN(id)) {
    return null;
  }

  return {
    id,
    title: typeof raw.title === "string" && raw.title.trim() ? raw.title : "Untitled product",
    price: Number(raw.price) || 0,
    description:
      typeof raw.description === "string" && raw.description.trim()
        ? raw.description
        : "No description available.",
    category: typeof raw.category === "string" && raw.category.trim() ? raw.category : "uncategorized",
    image:
      (typeof raw.image === "string" && raw.image.trim()) ||
      (typeof raw.thumbnail === "string" && raw.thumbnail.trim()) ||
      "/next.svg",
    rating: {
      rate: Number(raw?.rating?.rate) || Number(raw?.rating) || 0,
      count: Number(raw?.rating?.count) || Number(raw?.stock) || 0,
    },
  };
}

export default function ProductDetailsPage() {
  const params = useParams();
  const numericId = useMemo(() => Number(params?.id), [params?.id]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      if (!numericId || Number.isNaN(numericId)) {
        if (active) {
          setProduct(null);
          setLoading(false);
        }
        return;
      }

      const localKidsProduct = kidsProducts.find((item) => Number(item.id) === numericId);
      if (localKidsProduct) {
        if (active) {
          setProduct(normalizeProduct(localKidsProduct));
          setLoading(false);
        }
        return;
      }

      try {
        const response = await fetch(`https://dummyjson.com/products/${numericId}`);
        if (response.ok) {
          const direct = normalizeProduct(await response.json());
          if (direct && active) {
            setProduct(direct);
            setLoading(false);
            return;
          }
        }
      } catch {}

      try {
        const listResponse = await fetch("https://dummyjson.com/products?limit=0");
        if (listResponse.ok) {
          const payload = await listResponse.json();
          const products = Array.isArray(payload?.products) ? payload.products : [];
          if (Array.isArray(products)) {
            const found = products.find((item) => Number(item?.id) === numericId);
            if (found && active) {
              setProduct(normalizeProduct(found));
              setLoading(false);
              return;
            }
          }
        }
      } catch {}

      if (active) {
        setProduct(null);
        setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [numericId]);

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="w-full bg-[var(--background)] p-6 md:p-10 text-[var(--foreground)] container-custom min-h-screen">
      <Header />

      <div className="mb-6">
        <p className="text-sm text-[var(--color-muted)]">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/products" className="hover:underline">
            Products
          </Link>{" "}
          / Product
        </p>
      </div>

      {loading ? (
        <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <p className="text-sm uppercase">Loading product...</p>
        </div>
      ) : product ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="relative w-full h-[460px] border border-[var(--color-border)] bg-[var(--color-surface)]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-8"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="space-y-5">
            <p className="text-xs uppercase tracking-wide text-[var(--color-muted)]">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-black leading-tight">{product.title}</h1>
            <p className="text-2xl font-bold">${product.price}</p>

            <div className="text-sm text-[var(--color-muted)]">
              Rating: {product.rating?.rate ?? "-"} ({product.rating?.count ?? 0} reviews)
            </div>

            <p className="text-base leading-7 max-w-[700px]">{product.description}</p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="px-5 py-3 border border-[var(--color-border)] bg-[var(--color-surface-soft)] hover:opacity-90"
              >
                {added ? "Added" : "Add to cart"}
              </button>
              <Link
                href="/products"
                className="px-5 py-3 border border-[var(--color-border)] bg-[var(--color-surface)] hover:opacity-90"
              >
                Back to products
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h1 className="text-2xl font-black uppercase">Product unavailable</h1>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Could not load this product right now. Please try again or open products list.
          </p>
          <div className="mt-5">
            <Link
              href="/products"
              className="px-5 py-3 border border-[var(--color-border)] bg-[var(--color-surface)] hover:opacity-90"
            >
              Open products
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
