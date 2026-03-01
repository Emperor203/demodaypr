"use client";

import { useEffect, useMemo, useState } from "react";
import CardProducts from "../CardProducts/page";
import Header from "../Header/Header";

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "2XL"];

const getSizeById = (id) => SIZE_OPTIONS[id % SIZE_OPTIONS.length];
const isInStock = (product) => (product?.rating?.count ?? 0) >= 120;

export default function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedSize, setSelectedSize] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (fetchError) {
        setError("Failed to load products");
        console.error(fetchError);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const allCategories = products.map((item) => item.category).filter(Boolean);
    return ["all", ...new Set(allCategories)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const titleMatch = product.title.toLowerCase().includes(search.trim().toLowerCase());
      const sizeMatch = selectedSize === "all" || getSizeById(product.id) === selectedSize;
      const availabilityMatch =
        availability === "all" ||
        (availability === "in" && isInStock(product)) ||
        (availability === "out" && !isInStock(product));
      const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;

      return titleMatch && sizeMatch && availabilityMatch && categoryMatch;
    });
  }, [products, search, selectedSize, availability, selectedCategory]);

  return (
    <div className="w-full bg-[var(--background)] p-6 md:p-10 text-[var(--foreground)] container-custom">
      <Header />
      <div className="mb-6">
        <p className="text-sm text-[var(--color-muted)]">Home / Products</p>
        <h1 className="text-4xl font-black uppercase tracking-tight mt-1">Products</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3 space-y-8">
          <h2 className="text-xl font-bold">Filters</h2>

          <div>
            <h3 className="text-sm font-bold uppercase mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedSize("all")}
                className={`px-3 py-2 border text-sm ${
                  selectedSize === "all"
                    ? "bg-[var(--color-accent)] text-[var(--color-on-accent)] border-[var(--color-accent)]"
                    : "bg-[var(--color-surface)] border-[var(--color-border)]"
                }`}
              >
                All
              </button>
              {SIZE_OPTIONS.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-2 border text-sm ${
                    selectedSize === size
                      ? "bg-[var(--color-accent)] text-[var(--color-on-accent)] border-[var(--color-accent)]"
                      : "bg-[var(--color-surface)] border-[var(--color-border)]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase mb-3">Availability</h3>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="availability" checked={availability === "all"} onChange={() => setAvailability("all")} />
                All
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="availability" checked={availability === "in"} onChange={() => setAvailability("in")} />
                In Stock
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="availability" checked={availability === "out"} onChange={() => setAvailability("out")} />
                Out Of Stock
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-2 border text-xs uppercase ${
                    selectedCategory === category
                      ? "bg-[var(--color-accent)] text-[var(--color-on-accent)] border-[var(--color-accent)]"
                      : "bg-[var(--color-surface)] border-[var(--color-border)]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="lg:col-span-9">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search"
              className="w-full md:max-w-md px-4 py-3 border outline-none bg-[var(--color-surface)] border-[var(--color-border)]"
            />
            <p className="text-sm text-[var(--color-muted)]">Found: {filteredProducts.length}</p>
          </div>

          {loading && <p className="uppercase text-sm">Loading products...</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {!loading && !error && filteredProducts.length === 0 && (
            <p className="text-sm text-[var(--color-muted)]">No products found for selected filters.</p>
          )}

          {!loading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <CardProducts key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
