"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { getCartCount, readCart } from "../../lib/cart";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  const isAuthenticated = Boolean(session?.user);

  useEffect(() => {
    const sync = () => setCartCount(getCartCount(readCart()));
    sync();
    window.addEventListener("cart:updated", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("cart:updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <nav
      className={`sticky top-2 z-40 grid w-full grid-cols-[auto_1fr_auto] items-center gap-2 rounded-2xl px-3 py-3 text-[var(--foreground)] transition-all duration-300 sm:gap-4 sm:px-4 sm:py-4 ${
        isScrolled
          ? "bg-liquid-glass border border-[var(--color-border)] shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
          : "border border-transparent"
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-6">
        <button
          type="button"
          className="cursor-pointer hover:opacity-50 md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Открыть меню навигации"
          aria-expanded={isMobileMenuOpen}
        >
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1H22M0 9H15M0 17H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-5 text-[11px] font-medium tracking-[0.1em] uppercase lg:gap-10 lg:text-[13px]">
          <Link href="/" className="hover:opacity-50 transition-opacity">Главная</Link>
          <Link href="/news" className="hover:opacity-50 transition-opacity">Новости</Link>
          <Link href="/cart"  className="hover:opacity-50 transition-opacity">Корзина</Link>
        </div>
      </div>

      <div className="flex justify-center">
        <Image src="/kvadrad.svg" alt="Логотип" width={40} height={40} className="sm:h-12 sm:w-12" />
      </div>

      <div className="flex items-center justify-end gap-2 sm:gap-3">
        <Link href="/cart" className="flex items-center cursor-pointer group">
          <div className="flex h-[40px] items-center rounded-full bg-[var(--color-accent)] px-4 pr-10 text-[var(--color-on-accent)] transition-all sm:h-[50px] sm:pl-8 sm:pr-12">
            <span className="text-[13px] font-medium tracking-wide sm:text-[17px]">Корзина ({cartCount})</span>
          </div>

          <div className="z-10 -ml-8 flex h-[40px] w-[40px] items-center justify-center rounded-full border-[4px] border-[var(--color-accent)] bg-[var(--color-surface)] transition-transform group-hover:scale-105 sm:-ml-10 sm:h-[50px] sm:w-[50px] sm:border-[6px]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:h-[22px] sm:w-[22px]">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
        </Link>

        {isAuthenticated ? (
          <button
            type="button"
            onClick={handleLogout}
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-on-accent)] transition-opacity hover:opacity-90 sm:h-[50px] sm:w-[50px]"
            aria-label="Выйти"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="m16 17 5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
          </button>
        ) : (
          <Link
            href="/login"
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-on-accent)] transition-opacity hover:opacity-90 sm:h-[50px] sm:w-[50px]"
            aria-label="Перейти к входу"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        )}
      </div>

      {isMobileMenuOpen ? (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 border border-[var(--color-border)] bg-[var(--color-surface)] p-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium uppercase tracking-[0.08em]">
            <Link href="/" className="hover:opacity-60" onClick={() => setIsMobileMenuOpen(false)}>
              Главная
            </Link>
            <Link href="/news" className="hover:opacity-60" onClick={() => setIsMobileMenuOpen(false)}>
              Новости
            </Link>
            <Link href="/cart" className="hover:opacity-60" onClick={() => setIsMobileMenuOpen(false)}>
              Корзина
            </Link>
            {isAuthenticated ? (
              <button
                type="button"
                className="text-left hover:opacity-60"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
              >
                Выйти
              </button>
            ) : (
              <Link href="/login" className="hover:opacity-60" onClick={() => setIsMobileMenuOpen(false)}>
                Войти
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
