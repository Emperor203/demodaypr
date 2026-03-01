"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCartCount, readCart } from "../../lib/cart";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const sync = () => setCartCount(getCartCount(readCart()));
    sync();
    window.addEventListener("cart:updated", sync);

    return () => {
      window.removeEventListener("cart:updated", sync);
    };
  }, []);

  return (
    <nav className="grid grid-cols-3 items-center w-full h-[117px] px-[50px] text-[var(--foreground)]">
      <div className="flex items-center gap-10">
        <button className="cursor-pointer hover:opacity-50">
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1H22M0 9H15M0 17H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="hidden lg:flex items-center gap-10 text-[13px] font-medium tracking-[0.1em] uppercase">
          <Link href="/" className="hover:opacity-50 transition-opacity">Home</Link>
          <a href="#" className="hover:opacity-50 transition-opacity">Collections</a>
          <a href="#" className="hover:opacity-50 transition-opacity">New</a>
        </div>
      </div>

      <div className="flex justify-center">
        <Image src="/kvadrad.svg" alt="logo" width={48} height={48} />
      </div>

      <div className="flex items-center justify-end gap-3">
        <button className="flex items-center justify-center rounded-full h-[50px] w-[50px] bg-[var(--color-accent)] text-[var(--color-on-accent)] hover:opacity-90 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <Link href="/cart" className="flex items-center cursor-pointer group">
          <div className="h-[50px] pl-8 pr-12 flex items-center rounded-full bg-[var(--color-accent)] text-[var(--color-on-accent)] transition-all">
            <span className="text-[17px] font-medium tracking-wide">Cart ({cartCount})</span>
          </div>

          <div className="h-[50px] w-[50px] rounded-full flex items-center justify-center -ml-10 z-10 transition-transform group-hover:scale-105 bg-[var(--color-surface)] border-[6px] border-[var(--color-accent)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
        </Link>

        <button className="flex items-center justify-center rounded-full h-[50px] w-[50px] bg-[var(--color-accent)] text-[var(--color-on-accent)] hover:opacity-90 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
