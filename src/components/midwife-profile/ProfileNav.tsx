"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "uslugi", label: "Usługi" },
  { id: "opinie", label: "Opinie" },
  { id: "o-mnie", label: "O mnie" },
  { id: "dostepnosc", label: "Dostępność" },
];

export default function ProfileNav() {
  const [activeTab, setActiveTab] = useState("uslugi");
  const navRef = useRef<HTMLDivElement>(null);

  const getNavBottom = useCallback(() => {
    if (!navRef.current) return 130;
    const rect = navRef.current.getBoundingClientRect();
    return rect.bottom + 20;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.scrollY + getNavBottom();

      const sections = tabs
        .map((t) => ({ id: t.id, el: document.getElementById(t.id) }))
        .filter((s) => s.el);

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el!;
        if (el.offsetTop <= threshold) {
          setActiveTab(sections[i].id);
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [getNavBottom]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navBottom = getNavBottom();
    const y = el.getBoundingClientRect().top + window.scrollY - navBottom;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActiveTab(id);
  };

  return (
    <div
      ref={navRef}
      className="sticky top-[68px] z-40 border-b border-border/60 bg-background/95 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-[1200px] px-[18px] lg:px-[120px]">
        <nav className="-mb-px flex gap-1 overflow-x-auto" data-lenis-prevent>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              className={cn(
                "relative whitespace-nowrap px-4 py-3.5 text-[14px] font-medium tracking-[-0.3px] transition-colors lg:text-[15px]",
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="profile-tab-indicator"
                  className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
