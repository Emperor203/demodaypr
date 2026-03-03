import Header from "./components/Header/Header";
import Image from "next/image";
import NewWek from "./components/NewWek/NewWek";
import Footer from "./components/Footer/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[var(--background)] bg-cover bg-center text-[var(--foreground)] container-custom">
      <div className="p-6 md:p-12">
        <Header />

        <main className="mt-10 grid grid-cols-12 gap-4 container-custom">
          <div className="col-span-4 flex flex-col justify-between min-h-[550px]">
            <div className="space-y-10">
              <ul className="space-y-2 font-bold">
                <li className="cursor-pointer hover:opacity-60 transition text-5xl">MEN</li>
                <li className="cursor-pointer hover:opacity-60 transition text-5xl">WOMEN</li>
                <li className="cursor-pointer hover:opacity-60 transition text-5xl">KIDS</li>
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
                <h1 className="text-[85px] font-black leading-[0.8] tracking-tighter uppercase italic opacity-90">
                  NEW <br /> COLLECTION
                </h1>

                <div className="mt-6 text-[14px] font-medium text-[var(--color-muted)]">
                  Summer <br /> 2024
                </div>
              </div>
            </div>

            <Link href="/products">
              <button className="flex items-center justify-between w-[240px] transition px-6 py-5 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface-soft)] hover:opacity-90">
                <span className="text-[11px] font-bold uppercase tracking-widest">Go To Shop</span>
                &#8594;
              </button>
            </Link>
          </div>

          <div className="col-span-8 flex items-start gap-8 pt-40 pl-50">
            <div className="relative w-[366px] h-[376px] overflow-hidden bg-[var(--color-surface)]">
              <Image src="/model1.png" alt="Collection 1" fill className="object-cover object-top" priority />
            </div>

            <div className="relative w-[366px] h-[376px] overflow-hidden bg-[var(--color-surface)]">
              <Image src="/model2.png" alt="Collection 2" fill className="object-cover object-top" />
            </div>
          </div>
        </main>

        <div className="mt-10 container-custom">
          <NewWek />
        </div>

        <div className="container-custom">
          <Footer />
        </div>
      </div>
    </div>
  );
}
