"use client";
import React, { useEffect, useState } from "react";
import CardProducts from "../CardProducts/CardProducts";

export default function NewWek() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClothing = async () => {
      try {
        const [mensRes, womensRes] = await Promise.all([
          fetch("https://fakestoreapi.com/products/category/men's clothing"),
          fetch("https://fakestoreapi.com/products/category/women's clothing"),
        ]);
        const mens = await mensRes.json();
        const womens = await womensRes.json();
        setProducts([...mens, ...womens]);
      } catch (err) {
        console.error(err);
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
    <div className="w-full p-10 mt-20">
      <div className="flex justify-between items-end mb-10">
        <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">
          New <br /> This Week
        </h1>
        <span className="text-sm underline cursor-pointer uppercase font-bold text-[var(--foreground)]">
          See All
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-24">
        {products.slice(0, 4).map((item) => (
          <CardProducts key={item.id} product={item} />
        ))}
      </div>

      <h1 className="text-7xl font-black uppercase italic leading-[0.75] tracking-tighter mb-12">
        XIV <br /> Collections <br /> 23-24
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.slice(0, 3).map((item) => (
          <CardProducts key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
