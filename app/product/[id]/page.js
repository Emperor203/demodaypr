import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header/Header";

async function getProduct(id) {
  if (!id) {
    return null;
  }

  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const body = await response.text();
  if (!body) {
    return null;
  }

  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

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
    </div>
  );
}
