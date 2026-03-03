import Header from "./components/Header/Header";
import Image from "next/image";
import NewWek from "./components/NewWek/NewWek";
import Footer from "./components/Footer/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[var(--background)] bg-cover bg-center text-[var(--foreground)]">
      <div className="container-custom py-4 sm:py-6 md:py-8">
        <Header />

        <main className="mt-6 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-6">
          <div className="flex min-h-[420px] flex-col justify-between lg:col-span-4 lg:min-h-[550px]">
            <div className="space-y-7 sm:space-y-8 lg:space-y-10">
              <ul className="space-y-2 font-bold">
                <li className="cursor-pointer text-3xl transition hover:opacity-60 sm:text-4xl lg:text-5xl">MEN</li>
                <li className="cursor-pointer text-3xl transition hover:opacity-60 sm:text-4xl lg:text-5xl">WOMEN</li>
                <li className="cursor-pointer text-3xl transition hover:opacity-60 sm:text-4xl lg:text-5xl">KIDS</li>
              </ul>

              <div className="relative group w-full max-w-[280px]">
                <div className="absolute inset-y-0 left-3 flex items-center">&#128269;</div>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full py-3 pl-10 pr-4 text-sm outline-none focus:ring-1 border border-[var(--color-border)] bg-[var(--color-surface)]"
                />
              </div>

              <div className="pt-4">
                <h1 className="text-[44px] font-black uppercase italic leading-[0.8] tracking-tighter opacity-90 sm:text-[64px] lg:text-[85px]">
                  NEW <br /> COLLECTION
                </h1>

                <div className="mt-6 text-[14px] font-medium text-[var(--color-muted)]">
                  Summer <br /> 2024
                </div>
              </div>
            </div>

            <Link href="/products">
              <button className="flex w-full max-w-[240px] items-center justify-between rounded-sm border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-6 py-4 transition hover:opacity-90 sm:py-5">
                <span className="text-[11px] font-bold uppercase tracking-widest">Go To Shop</span>
                &#8594;
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8 lg:gap-8 lg:pt-24 xl:pt-40">
            <div className="relative h-[320px] overflow-hidden bg-[var(--color-surface)] sm:h-[360px] lg:h-[376px]">
              <Image src="/model1.png" alt="Collection 1" fill className="object-cover object-top" priority />
            </div>

            <div className="relative h-[320px] overflow-hidden bg-[var(--color-surface)] sm:h-[360px] lg:h-[376px]">
              <Image src="/model2.png" alt="Collection 2" fill className="object-cover object-top" />
            </div>
          </div>
        </main>

        <div className="mt-8 sm:mt-10">
          <NewWek />
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
