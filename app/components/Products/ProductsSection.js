"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import CardProducts from "../CardProducts/CardProducts";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import kidsProducts from "../../Products";
const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "2XL"];
const AUDIENCE_OPTIONS = new Set(["men", "women", "kids"]);
const MEN_CATEGORIES = new Set(["men's clothing", "mens-shirts", "mens-shoes", "mens-watches"]);
const WOMEN_CATEGORIES = new Set([
  "women's clothing",
  "womens-dresses",
  "womens-shoes",
  "womens-bags",
  "womens-jewellery",
  "womens-watches",
  "tops",
]);
const KIDS_CATEGORIES = new Set([
  "boys clothing",
  "girls clothing",
  "toddler clothing",
  "baby clothing",
  "unisex kids clothing",
]);

const getSizeById = (id) => SIZE_OPTIONS[id % SIZE_OPTIONS.length];
const isInStock = (product) => (product?.rating?.count ?? 0) >= 120;
const uniqueById = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    const id = Number(item?.id);
    if (!id || seen.has(id)) {
      return false;
    }
    seen.add(id);
    return true;
  });
};

const normalizeExternalProduct = (item) => {
  if (!item || typeof item !== "object") {
    return null;
  }

  const id = Number(item.id);
  if (!id || Number.isNaN(id)) {
    return null;
  }

  const image =
    typeof item.image === "string" && item.image.trim()
      ? item.image
      : typeof item.thumbnail === "string" && item.thumbnail.trim()
      ? item.thumbnail
      : "/next.svg";

  return {
    id,
    title: typeof item.title === "string" && item.title.trim() ? item.title : "Untitled product",
    price: Number(item.price) || 0,
    description:
      typeof item.description === "string" && item.description.trim() ? item.description : "No description available.",
    category: typeof item.category === "string" && item.category.trim() ? item.category : "uncategorized",
    image,
    rating: {
      rate: Number(item?.rating) || Number(item?.rating?.rate) || 0,
      count: Number(item?.stock) || Number(item?.rating?.count) || 0,
    },
  };
};

export default function ProductsSection() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedSize, setSelectedSize] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const selectedAudience = useMemo(() => {
    const raw = (searchParams.get("audience") || "").toLowerCase();
    return AUDIENCE_OPTIONS.has(raw) ? raw : "all";
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products?limit=0");
        const data = await response.json();
        const apiProducts = Array.isArray(data?.products)
          ? data.products.map(normalizeExternalProduct).filter(Boolean)
          : [];
        setProducts(uniqueById([...apiProducts, ...kidsProducts]));
      } catch (fetchError) {
        setError("Failed to load products");
        console.error(fetchError);
        setProducts(kidsProducts);
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
      const normalizedCategory = (product.category || "").toLowerCase();
      const audienceMatch =
        selectedAudience === "all" ||
        (selectedAudience === "men" && MEN_CATEGORIES.has(normalizedCategory)) ||
        (selectedAudience === "women" && WOMEN_CATEGORIES.has(normalizedCategory)) ||
        (selectedAudience === "kids" && KIDS_CATEGORIES.has(normalizedCategory));

      return titleMatch && sizeMatch && availabilityMatch && categoryMatch && audienceMatch;
    });
  }, [products, search, selectedSize, availability, selectedCategory, selectedAudience]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const pagedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);
  const rangeStart = filteredProducts.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const rangeEnd = filteredProducts.length === 0 ? 0 : Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length);
  const visiblePages = useMemo(() => {
    const pages = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }

    return pages;
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedSize, availability, selectedCategory, selectedAudience]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="container-custom w-full bg-[var(--background)] py-4 text-[var(--foreground)] sm:py-6 md:py-10">
      <Header />
      <div className="mb-6">
        <p className="text-sm text-[var(--color-muted)]">Home / Products</p>
        <h1 className="mt-1 text-3xl font-black uppercase tracking-tight sm:text-4xl">Products</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="space-y-8 lg:col-span-3">
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
                    className={`px-3 py-2 border text-[11px] uppercase sm:text-xs ${
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
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
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

          {!loading && filteredProducts.length === 0 && (
            <p className="text-sm text-[var(--color-muted)]">No products found for selected filters.</p>
          )}

          {!loading && filteredProducts.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {pagedProducts.map((product, index) => (
                <CardProducts
                  key={`${product.id}-${product.category}-${product.title}-${currentPage}-${index}`}
                  product={product}
                />
              ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <p className="text-lg font-medium text-[var(--foreground)]">
                    {rangeStart}-{rangeEnd} of {filteredProducts.length} items
                  </p>

                  <div className="inline-flex overflow-hidden rounded-md border border-[#b9bdc4] bg-[#f0f1f3] text-[#1f2a3a]">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-2xl border-r border-[#b9bdc4] disabled:opacity-45"
                      aria-label="Previous page"
                    >
                      &#8249;
                    </button>

                    {visiblePages.map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-11 px-4 py-2 text-3xl border-r border-[#b9bdc4] ${
                          page === currentPage ? "bg-[#b6b8bd] text-white" : "bg-transparent"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-2xl disabled:opacity-45"
                      aria-label="Next page"
                    >
                      &#8250;
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </div>
      <Footer/>
    </div>
  );
}
