"use client";

import { useState } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 py-3 backdrop-blur-md lg:py-4">
      <div className="mx-auto max-w-[1200px] px-[18px] lg:px-[120px]">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="flex flex-shrink-0 items-center">
            <img src="/logos.png" alt="MyMidwife" className="h-7" />
          </a>

          {/* Search Bar - Desktop */}
          <div className="hidden flex-1 items-center justify-center lg:flex">
            <div className="flex items-center gap-3 rounded-full bg-muted p-1.5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="specjalizacja, badanie lub nazwisko"
                  className="h-11 w-[280px] rounded-full bg-card px-5 pr-10 text-[15px] text-[#363636] outline-none placeholder:text-[#999]"
                />
                <ChevronDown
                  size={16}
                  stroke="#999"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="miasto lub dzielnica"
                  className="h-11 w-[220px] rounded-full bg-card px-5 pr-10 text-[15px] text-[#363636] outline-none placeholder:text-[#999]"
                />
                <ChevronDown
                  size={16}
                  stroke="#999"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                />
              </div>
              <button className="flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-white">
                <Search size={16} />
                Szukaj
              </button>
            </div>
          </div>

          {/* CTA - Desktop */}
          <a
            href="#"
            className="hidden flex-shrink-0 items-center justify-center rounded-full bg-accent px-6 py-2.5 text-[15px] font-medium tracking-[-0.36px] text-white lg:flex"
          >
            Dołącz teraz
          </a>

          {/* Hamburger - Mobile */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted lg:hidden"
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={20} stroke="#363636" />
            ) : (
              <Menu size={20} stroke="#363636" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-3 flex flex-col gap-3 rounded-[20px] bg-muted p-5 lg:hidden">
            {/* Search inputs - Mobile */}
            <div className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="specjalizacja, badanie lub nazwisko"
                  className="h-12 w-full rounded-full bg-card px-5 pr-10 text-[15px] text-[#363636] outline-none placeholder:text-[#999]"
                />
                <ChevronDown
                  size={16}
                  stroke="#999"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="miasto lub dzielnica"
                  className="h-12 w-full rounded-full bg-card px-5 pr-10 text-[15px] text-[#363636] outline-none placeholder:text-[#999]"
                />
                <ChevronDown
                  size={16}
                  stroke="#999"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                />
              </div>
              <button className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-[15px] font-medium text-white">
                <Search size={16} />
                Szukaj
              </button>
            </div>

            <div className="h-px bg-black/10" />

            {/* Nav links */}
            <a
              href="#"
              className="text-[17px] font-medium tracking-[-0.54px] text-[#363636]"
            >
              Wyzwanie
            </a>
            <a
              href="#"
              className="text-[16px] font-medium tracking-[-0.54px] text-[#363636]"
            >
              Położne
            </a>
            <a
              href="#"
              className="text-[17px] font-medium tracking-[-0.54px] text-[#363636]"
            >
              Baza wiedzy
            </a>
            <a
              href="#"
              className="mt-1 flex h-[50px] w-full items-center justify-center rounded-full bg-accent text-[17px] font-medium tracking-[-0.36px] text-white"
            >
              Dołącz teraz
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
