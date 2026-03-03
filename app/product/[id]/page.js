import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header/Header";

async function getProduct(id) {
  const numericId = Number(id);
  if (!numericId || Number.isNaN(numericId)) {
    return null;
  }

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${numericId}`, {
      next: { revalidate: 300 },
    });

    if (response.ok) {
      const product = await response.json();
      if (product && product.id) {
        return product;
      }
    }
  } catch {}

  // Fallback for intermittent upstream failures on serverless deploys.
  try {
    const listResponse = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 300 },
    });
    if (!listResponse.ok) {
      return null;
    }

    const products = await listResponse.json();
    if (!Array.isArray(products)) {
      return null;
    }

    return products.find((item) => Number(item.id) === numericId) ?? null;
  } catch {
    return null;
  }
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

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

      {product ? (
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
            <p className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
              {product.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-black leading-tight">
              {product.title}
            </h1>
            <p className="text-2xl font-bold">${product.price}</p>

            <div className="text-sm text-[var(--color-muted)]">
              Rating: {product.rating?.rate ?? "-"} ({product.rating?.count ?? 0} reviews)
            </div>

            <p className="text-base leading-7 max-w-[700px]">{product.description}</p>

            <div className="flex gap-3">
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
