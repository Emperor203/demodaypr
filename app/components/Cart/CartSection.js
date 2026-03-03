"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getCartCount, getCartTotal, readCart, removeFromCart, updateCartQty } from "../../lib/cart";
import Header from "../Header/Header";

export default function CartSection() {
  const [items, setItems] = useState(() => readCart());

  useEffect(() => {
    const sync = () => setItems(readCart());
    window.addEventListener("cart:updated", sync);

    return () => {
      window.removeEventListener("cart:updated", sync);
    };
  }, []);

  const count = useMemo(() => getCartCount(items), [items]);
  const subtotal = useMemo(() => getCartTotal(items), [items]);

  const handleIncrease = (id, qty) => {
    setItems(updateCartQty(id, qty + 1));
  };

  const handleDecrease = (id, qty) => {
    if (qty <= 1) {
      setItems(removeFromCart(id));
      return;
    }

    setItems(updateCartQty(id, qty - 1));
  };

  const handleRemove = (id) => {
    setItems(removeFromCart(id));
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] container-custom p-6 md:p-10">
      <Header />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-8">
          <h1 className="text-3xl font-black uppercase mb-2">Shopping Bag</h1>
          <p className="text-sm text-[var(--color-muted)] mb-6">Items: {count}</p>

          {items.length === 0 ? (
            <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-sm">
              Cart is empty.
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="grid grid-cols-[120px_1fr_auto] gap-4 border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
                >
                  <div className="relative h-[120px] w-[120px]">
                    <Image src={item.image} alt={item.title} fill className="object-contain" />
                  </div>

                  <div>
                    <p className="text-[11px] uppercase text-[var(--color-muted)]">{item.category}</p>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-1 font-semibold">${item.price}</p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="text-xs underline text-[var(--color-muted)]"
                    >
                      Remove
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDecrease(item.id, item.qty)}
                        className="h-7 w-7 border border-[var(--color-border)]"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => handleIncrease(item.id, item.qty)}
                        className="h-7 w-7 border border-[var(--color-border)]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="lg:col-span-4">
          <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <h2 className="text-xl font-bold uppercase mb-4">Order Summary</h2>
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span>Shipping</span>
              <span>${items.length > 0 ? "10.00" : "0.00"}</span>
            </div>
            <div className="h-px bg-[var(--color-border)] mb-4" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${(subtotal + (items.length > 0 ? 10 : 0)).toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
