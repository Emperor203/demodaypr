import React from "react";
import Image from "next/image";

const infoLinks = ["Цены", "О нас", "Контакты"];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--color-border)] pb-14 pt-10 text-[var(--foreground)] sm:mt-20 sm:pt-12 md:mt-24 md:pb-20 md:pt-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[180px_1fr] md:gap-12 lg:grid-cols-[220px_1fr]">
        <div className="grid grid-cols-2 gap-8 text-[12px] uppercase tracking-[0.18em] text-[var(--color-muted)] md:grid-cols-1 md:space-y-16 md:gap-0">
          <div>
            <p className="mb-4 md:mb-7">Инфо</p>
            <ul className="space-y-2 text-[15px] tracking-[0.1em] text-[var(--foreground)]/80">
              {infoLinks.map((item) => (
                <li key={item} className="cursor-pointer transition hover:text-[var(--foreground)]">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 md:mb-7">Контакты</p>
            <ul className="space-y-2 text-[15px] tracking-[0.04em] normal-case text-[var(--foreground)]/80">
              <li className="break-all">farmonovabdurahmon7gmail@.com</li>
              <li>+998 94 236 67 05</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(260px,420px)_1fr] md:items-start">
          <div>
            <p className="mb-5 text-[12px] uppercase tracking-[0.18em] text-[var(--color-muted)] md:ml-28 lg:ml-36">Технологии</p>

            <div className="space-y-1 leading-[0.82] md:ml-28 lg:ml-36">
              <div className="relative mb-2 h-16 w-40">
                <Image
                  src="/footerlogo.svg"
                  alt="Логотип футера"
                  fill
                  className="object-contain object-left opacity-40 dark:opacity-50"
                />
              </div>
              <div className="text-[clamp(64px,10vw,102px)] font-black uppercase tracking-[-0.05em]">XIV</div>
              <div className="text-[clamp(64px,10vw,102px)] font-black uppercase tracking-[-0.05em]">QR</div>
            </div>
          </div>

          <div className="pt-0 md:pt-[86px]">
            <p className="inline-flex items-center gap-3 text-[13px] text-[var(--color-muted)] sm:gap-4 sm:text-[14px]">
              <span>Ближняя бесконтактная связь</span>
              <span className="inline-block h-px w-14 bg-[var(--color-border)]" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
