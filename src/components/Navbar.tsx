"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { InteractiveHoverButton } from "./InteractiveHoverButton";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 150);
    }
  }, [searchOpen]);

  return (
    <div className="sticky top-0 z-50 w-full">
      <motion.nav
        initial={{ opacity: 0, y: -40 }}
        animate={{
          opacity: mounted ? 1 : 0,
          y: mounted ? 0 : -40,
        }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full"
      >
        {/* Outer wrapper that handles compression */}
        <motion.div
          animate={{
            maxWidth: scrolled ? 800 : 960,
            paddingTop: scrolled ? 8 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative mx-auto w-full"
        >
          {/* Background pill */}
          <motion.div
            animate={{
              backgroundColor: scrolled
                ? "rgba(255,255,255,0.75)"
                : "var(--background)",
              backdropFilter: scrolled ? "blur(40px)" : "blur(0px)",
              borderRadius: scrolled ? 16 : 0,
              boxShadow: scrolled
                ? "0 4px 30px -4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)"
                : "0 0px 0px 0px rgba(0,0,0,0)",
              borderColor: scrolled ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="border"
            style={{ borderWidth: 1 }}
          >
            <motion.div
              animate={{
                paddingLeft: scrolled ? 28 : 0,
                paddingRight: scrolled ? 28 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="mx-auto max-w-[1200px] px-[18px] lg:px-[120px]"
            >
              <motion.div
                animate={{ height: scrolled ? 52 : 60 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex items-center justify-between gap-6"
              >
                {/* Logo */}
                <a href="/" className="flex flex-shrink-0 items-center">
                  <img src="/logos.png" alt="MyMidwife" className="h-7" />
                </a>

                {/* Nav links - Desktop */}
                <div className="hidden items-center gap-8 lg:flex">
                  <a
                    href="#dla-pacjentek"
                    className="text-[14px] font-medium tracking-[-0.2px] text-muted-foreground transition-colors duration-300 hover:text-[#363636]"
                  >
                    Dla pacjentek
                  </a>
                  <a
                    href="#dla-poloznych"
                    className="text-[14px] font-medium tracking-[-0.2px] text-muted-foreground transition-colors duration-300 hover:text-[#363636]"
                  >
                    Dla położnych
                  </a>
                  <a
                    href="#baza-wiedzy"
                    className="text-[14px] font-medium tracking-[-0.2px] text-muted-foreground transition-colors duration-300 hover:text-[#363636]"
                  >
                    Baza wiedzy
                  </a>
                </div>

                {/* Right side - Desktop */}
                <div className="hidden items-center gap-3 lg:flex">
                  <button
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="flex h-[36px] w-[36px] items-center justify-center rounded-[10px] border border-border transition-colors duration-300 hover:border-[#f0c6dd] hover:bg-white"
                    aria-label="Szukaj"
                  >
                    <Search size={15} stroke="#787878" strokeWidth={1.8} />
                  </button>
                  <InteractiveHoverButton size="sm">
                    Dołącz teraz
                  </InteractiveHoverButton>
                </div>

                {/* Hamburger - Mobile */}
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-white/60 lg:hidden"
                  aria-label="Menu"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? (
                    <X size={20} stroke="#363636" />
                  ) : (
                    <Menu size={20} stroke="#363636" />
                  )}
                </button>
              </motion.div>

              {/* Mobile Menu */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="overflow-hidden lg:hidden"
                  >
                    <div className="border-t border-border/30 pb-5 pt-4">
                      <div className="flex flex-col gap-3">
                        <a
                          href="#dla-pacjentek"
                          onClick={() => setMenuOpen(false)}
                          className="text-[16px] font-medium tracking-[-0.3px] text-[#363636]"
                        >
                          Dla pacjentek
                        </a>
                        <a
                          href="#dla-poloznych"
                          onClick={() => setMenuOpen(false)}
                          className="text-[16px] font-medium tracking-[-0.3px] text-[#363636]"
                        >
                          Dla położnych
                        </a>
                        <a
                          href="#baza-wiedzy"
                          onClick={() => setMenuOpen(false)}
                          className="text-[16px] font-medium tracking-[-0.3px] text-[#363636]"
                        >
                          Baza wiedzy
                        </a>

                        <div className="mt-2 flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="specjalizacja, miasto lub nazwisko..."
                              className="h-[46px] flex-1 rounded-[11px] border border-border bg-white px-5 text-[15px] text-[#363636] outline-none placeholder:text-[#999]"
                            />
                            <button
                              className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-[11px] bg-primary"
                              aria-label="Szukaj"
                            >
                              <Search size={18} stroke="white" />
                            </button>
                          </div>
                          <a
                            href="#"
                            className="flex h-[46px] w-full items-center justify-center rounded-[11px] bg-primary text-[15px] font-medium tracking-[-0.2px] text-white"
                          >
                            Dołącz teraz
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Search modal - slides from under the pill */}
          <AnimatePresence>
            {searchOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 z-[-1]"
                  onClick={() => setSearchOpen(false)}
                />
                <div className="absolute left-1/2 z-10 hidden w-full max-w-[600px] -translate-x-1/2 px-4 lg:block">
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.97 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="mt-2 rounded-[14px] border border-black/[0.06] bg-white/90 p-4 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1">
                        <Search
                          size={15}
                          stroke="#999"
                          strokeWidth={1.8}
                          className="absolute left-4 top-1/2 -translate-y-1/2"
                        />
                        <input
                          ref={searchInputRef}
                          type="text"
                          placeholder="specjalizacja, miasto lub nazwisko..."
                          className="h-[44px] w-full rounded-[11px] border border-border bg-white pl-10 pr-5 text-[14px] text-[#363636] outline-none transition-colors duration-300 placeholder:text-[#999] focus:border-[#f0c6dd]"
                        />
                      </div>
                      <button className="flex h-[44px] items-center gap-2 rounded-[11px] bg-primary px-6 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-primary/90">
                        <Search size={14} />
                        Szukaj
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-2 px-1">
                      <span className="text-[12px] text-muted-foreground">
                        Popularne:
                      </span>
                      {["położna laktacyjna", "Warszawa", "wizyta patronażowa"].map(
                        (tag) => (
                          <button
                            key={tag}
                            className="rounded-[8px] bg-secondary px-3 py-1 text-[12px] font-medium text-[#555] transition-colors duration-200 hover:bg-[#f0c6dd]/30"
                          >
                            {tag}
                          </button>
                        )
                      )}
                    </div>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.nav>
    </div>
  );
}
