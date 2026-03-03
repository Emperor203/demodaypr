import React from "react";
import Image from "next/image";

const infoLinks = ["Pricing", "About", "Contacts"];
const languages = ["Eng", "Esp", "Sve"];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-border)] pt-16 pb-20 text-[var(--foreground)]">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr]">
        <div className="space-y-16 text-[12px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
          <div>
            <p className="mb-7">Info</p>
            <ul className="space-y-2 text-[15px] tracking-[0.1em] text-[var(--foreground)]/80">
              {infoLinks.map((item) => (
                <li key={item} className="cursor-pointer transition hover:text-[var(--foreground)]">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-7">Languages</p>
            <ul className="space-y-2 text-[15px] tracking-[0.1em] text-[var(--foreground)]/80">
              {languages.map((lang) => (
                <li key={lang} className="cursor-pointer transition hover:text-[var(--foreground)]">
                  {lang}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(260px,420px)_1fr] md:items-start">
          <div>
            <p className="mb-5 text-[12px] uppercase tracking-[0.18em] text-[var(--color-muted)] ml-20">Technologies</p>

            <div className="space-y-1 leading-[0.82] ml-20">
              <div className="relative mb-2 h-16 w-40">
                <Image
                  src="/footerlogo.svg"
                  alt="Footer logo"
                  fill
                  className="object-contain object-left opacity-40 dark:opacity-50"
                />
              </div>
              <div className="text-[clamp(64px,10vw,102px)] font-black uppercase tracking-[-0.05em]">XIV</div>
              <div className="text-[clamp(64px,10vw,102px)] font-black uppercase tracking-[-0.05em]">QR</div>
            </div>
          </div>

          <div className="pt-0 md:pt-[86px]">
            <p className="inline-flex items-center gap-4 text-[14px] text-[var(--color-muted)]">
              <span>Near-field communication</span>
              <span className="inline-block h-px w-14 bg-[var(--color-border)]" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
