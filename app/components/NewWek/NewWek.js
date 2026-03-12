"use client";
import React, { useEffect, useState } from "react";
import CardProducts from "../CardProducts/CardProducts";
import Link from "next/link";
import kidsProducts from "../../Products";

export default function NewWek() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const normalizeProduct = (item) => ({
    id: Number(item?.id),
    title: typeof item?.title === "string" && item.title.trim() ? item.title : "Untitled product",
    price: Number(item?.price) || 0,
    description: typeof item?.description === "string" ? item.description : "",
    category: typeof item?.category === "string" ? item.category : "uncategorized",
    image:
      (typeof item?.thumbnail === "string" && item.thumbnail.trim()) ||
      (typeof item?.image === "string" && item.image.trim()) ||
      "/next.svg",
    rating: {
      rate: Number(item?.rating) || 0,
      count: Number(item?.stock) || 0,
    },
  });

  useEffect(() => {
    const fetchClothing = async () => {
      try {
        setError("");
        const [mensRes, womensRes] = await Promise.all([
          fetch("/api/products/category/mens-shirts?limit=20"),
          fetch("/api/products/category/womens-dresses?limit=20"),
        ]);
        const mensData = mensRes.ok ? await mensRes.json() : null;
        const womensData = womensRes.ok ? await womensRes.json() : null;
        const mens = Array.isArray(mensData?.products) ? mensData.products.map(normalizeProduct) : [];
        const womens = Array.isArray(womensData?.products) ? womensData.products.map(normalizeProduct) : [];
        const merged = [...mens, ...womens].filter((item) => item.id);
        if (merged.length === 0) {
          setProducts(kidsProducts.slice(0, 7));
          setError("Products are temporarily unavailable.");
          return;
        }
        setProducts(merged);
      } catch (err) {
        console.error(err);
        setProducts(kidsProducts.slice(0, 7));
        setError("Products are temporarily unavailable.");
      } finally {
        setLoading(false);
      }
    };
    fetchClothing();
  }, []);

  if (loading) {
    return <div className="p-10 text-center uppercase">Loading...</div>;
  }

  return (
    <div className="mt-10 w-full p-4 sm:p-6 md:mt-14 md:p-10">
      <div className="mb-8 flex items-end justify-between md:mb-10">
        <h1 className="text-3xl font-black uppercase leading-none tracking-tighter sm:text-4xl">
          New <br /> This Week
        </h1>
        <Link href="/products" className="cursor-pointer text-xs font-bold uppercase text-[var(--foreground)] underline sm:text-sm">
          See All
        </Link>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <div className="mb-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mb-24 md:grid-cols-4 md:gap-6">
        {products.slice(0, 4).map((item) => (
          <CardProducts key={item.id} product={item} />
        ))}
      </div>

      <h1 className="mb-8 text-4xl font-black uppercase italic leading-[0.78] tracking-tighter sm:text-6xl md:mb-12 md:text-7xl">
        XIV <br /> Collections <br /> 23-24
      </h1>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
        {products.slice(0, 3).map((item) => (
          <CardProducts key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
