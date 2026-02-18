"use client";

import { ShieldCheck, BookOpen, Star, Search } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full pt-12 pb-8">
      <div className="mx-auto max-w-[1200px] px-[120px]">
        <div className="flex gap-10">
          {/* Left Column - Text Content */}
          <div className="flex w-1/2 flex-col justify-between py-6">
            {/* Rating Tag */}
            <div className="flex items-center gap-3">
              <Star size={18} fill="#e69fcd" stroke="#e69fcd" />
              <span className="text-[19px] font-medium tracking-[-0.2px] text-muted-foreground">
                4.8 &nbsp;| &nbsp;1000+ pozytywnych opinii
              </span>
            </div>

            {/* Heading */}
            <div className="mt-10">
              <h1 className="text-[44px] font-medium leading-[62px] tracking-[-2.2px] text-[#363636]" style={{ wordSpacing: "4px" }}>
                Bezpieczeństwo{" "}
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary align-[4px]">
                  <ShieldCheck size={22} stroke="#363636" strokeWidth={2.5} />
                </span>
                <br />
                wiedza{" "}
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary align-[4px]">
                  <BookOpen size={22} stroke="#363636" strokeWidth={2.5} />
                </span>{" "}
                i wsparcie
                <br />
                w jednej aplikacji
              </h1>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex items-center gap-4">
              <a
                href="#"
                className="flex h-[50px] items-center justify-center rounded-full bg-primary px-8 text-[17px] font-medium tracking-[-0.36px] text-white"
              >
                Znajdź położną
              </a>
              <a
                href="#"
                className="flex h-[50px] items-center justify-center rounded-full border border-black/25 px-8 text-[17px] font-medium tracking-[-0.36px] text-accent"
              >
                Dowiedz się więcej
              </a>
            </div>
          </div>

          {/* Right Column - Image Content */}
          <div className="relative w-1/2">
            {/* Main image */}
            <div className="relative">
              <img
                src="/hero_png.png"
                alt="Położna z pacjentką"
                className="h-auto w-full object-contain"
              />
            </div>

            {/* Dashboard Overlay */}
            <div className="absolute bottom-6 left-0 w-[200px] rounded-[18px] bg-white p-4 shadow-lg">
              <p className="text-[13px] font-medium tracking-[-0.28px] text-black">
                Dostępne położne
              </p>

              <div className="mt-4 flex flex-col gap-3">
                {/* Midwife 1 */}
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 flex-shrink-0 rounded-[5px] bg-secondary" />
                  <div>
                    <p className="text-[10px] font-medium tracking-[-0.22px] text-black">
                      Anna Kowalska
                    </p>
                    <p className="text-[8px] tracking-[-0.18px] text-[#a3a3a3]">
                      Położna środowiskowa
                    </p>
                  </div>
                </div>

                {/* Midwife 2 */}
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 flex-shrink-0 rounded-[5px] bg-secondary" />
                  <div>
                    <p className="text-[10px] font-medium tracking-[-0.22px] text-black">
                      Maria Nowak
                    </p>
                    <p className="text-[8px] tracking-[-0.18px] text-[#a3a3a3]">
                      Położna laktacyjna
                    </p>
                  </div>
                </div>
              </div>

              {/* Search Field */}
              <div className="mt-4 flex items-center gap-2 rounded-full border border-[#d9d9d9] px-4 py-2">
                <Search size={14} stroke="#ababab" strokeWidth={1.5} />
                <span className="text-[10px] font-medium tracking-[-0.22px] text-[#ababab]">
                  Szukaj położnej
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
