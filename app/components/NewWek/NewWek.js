"use client";
import React, { useEffect, useState } from "react";
import CardProducts from "../CardProducts/CardProducts";
import Link from "next/link";
import ProductsCarousel from "../ProductsCarousel/ProductsCarousel";
import kidsProducts from "../../Products";

export default function NewWek() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const shuffleProducts = (items) => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const normalizeProduct = (item) => ({
    id: Number(item?.id),
    title: typeof item?.title === "string" && item.title.trim() ? item.title : "Без названия",
    price: Number(item?.price) || 0,
    description: typeof item?.description === "string" ? item.description : "",
    category: typeof item?.category === "string" ? item.category : "без категории",
    image:
      (typeof item?.thumbnail === "string" && item.thumbnail.trim()) ||
      (typeof item?.image === "string" && item.image.trim()) ||
      "/next.svg",
    rating: {
      rate: Number(item?.rating) || 0,
      count: Number(item?.stock) || 0,
    },
  });

  const isFashionCategory = (value) => {
    const category = String(value || "").toLowerCase();
    if (!category) return false;
    const excluded = [
      "fragrance",
      "beauty",
      "skincare",
      "cosmetics",
      "makeup",
      "perfume",
      "kitchen",
      "home",
      "furniture",
      "groceries",
      "electronics",
      "lighting",
      "automotive",
      "sports",
    ];
    if (excluded.some((word) => category.includes(word))) {
      return false;
    }
    const allowed = new Set([
      "mens-shirts",
      "mens-shoes",
      "mens-watches",
      "womens-dresses",
      "womens-shoes",
      "womens-bags",
      "womens-jewellery",
      "womens-watches",
      "tops",
      "boys clothing",
      "girls clothing",
      "toddler clothing",
      "baby clothing",
      "unisex kids clothing",
    ]);
    if (allowed.has(category)) {
      return true;
    }
    const keywords = [
      "shirt",
      "t-shirt",
      "tshirt",
      "top",
      "dress",
      "skirt",
      "jeans",
      "pants",
      "shorts",
      "jacket",
      "coat",
      "hoodie",
      "sweater",
      "mens",
      "women",
      "kids",
      "clothing",
      "apparel",
      "shoes",
      "sneakers",
      "boots",
      "heels",
      "sandals",
      "slippers",
      "bags",
      "handbags",
      "watch",
      "watches",
      "sunglasses",
      "jewelry",
      "jewelery",
    ];
    return keywords.some((word) => category.includes(word));
  };

  useEffect(() => {
    const fetchClothing = async () => {
      try {
        setError("");
        const sources = [
          { label: "api", url: "/api/products?limit=0" },
          { label: "dummyjson", url: "https://dummyjson.com/products?limit=0" },
        ];
        let data = null;
        let lastError = "";
        let lastSource = "";
        let lastStatus = "";

        for (const source of sources) {
          const res = await fetch(source.url);
          if (res.ok) {
            data = await res.json();
            lastSource = source.label;
            lastStatus = String(res.status);
            break;
          }
          lastError = `${source.label}: ответ ${res.status}`;
        }

        const items = Array.isArray(data?.products) ? data.products.map(normalizeProduct) : [];
        const filtered = items.filter((item) => item.id && isFashionCategory(item.category));
        const merged = [...filtered, ...kidsProducts].filter((item) => item && item.id);
        if (merged.length === 0) {
          setProducts([]);
          const detail = lastError
            ? lastError
            : lastSource
            ? `${lastSource}: ок (${lastStatus}), товаров=${Array.isArray(data?.products) ? data.products.length : "н/д"}`
            : "нет данных";
          setError(`Товары временно недоступны (${detail}).`);
          return;
        }
        setProducts(shuffleProducts(merged));
      } catch (err) {
        console.error(err);
        setProducts(shuffleProducts([...kidsProducts]));
        setError("");
      } finally {
        setLoading(false);
      }
    };
    fetchClothing();
  }, []);

  if (loading) {
    return <div className="p-10 text-center uppercase">Загрузка...</div>;
  }

  return (
    <div className="mt-10 w-full p-4 sm:p-6 md:mt-14 md:p-10">
      <div className="mb-8 flex items-end justify-between md:mb-10">
        <h1 className="text-3xl font-black uppercase leading-none tracking-tighter sm:text-4xl">
          Новинки <br /> этой недели
        </h1>
        <Link href="/products" className="cursor-pointer text-xs font-bold uppercase text-[var(--foreground)] underline sm:text-sm">
          Смотреть все
        </Link>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <div className="mb-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mb-24 md:grid-cols-4 md:gap-6">
        {products.slice(0, 4).map((item) => (
          <CardProducts key={item.id} product={item} />
        ))}
      </div>

      <ProductsCarousel items={products.slice(4, 12)} title="В тренде" />

      <h1 className="mb-8 text-4xl font-black uppercase italic leading-[0.78] tracking-tighter sm:text-6xl md:mb-12 md:text-7xl">
        Коллекция XIV <br /> 23-24
      </h1>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
        {products.slice(0, 3).map((item) => (
          <CardProducts key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
