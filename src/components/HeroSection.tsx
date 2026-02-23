"use client";

import { useEffect, useRef, useState } from "react";
import { Star, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlurFade } from "./BlurFade";
import { InteractiveHoverButton } from "./InteractiveHoverButton";
import { GridPattern } from "./ui/grid-pattern";

const SEARCHES = [
  {
    query: "położna laktacyjna",
    results: [
      { name: "Anna Kowalska", role: "Konsultant laktacyjny IBCLC" },
      { name: "Katarzyna Zielińska", role: "Położna laktacyjna" },
    ],
  },
  {
    query: "położna środowiskowa",
    results: [
      { name: "Maria Nowak", role: "Położna środowiskowa" },
      { name: "Joanna Wiśniewska", role: "Położna rodzinna" },
    ],
  },
  {
    query: "przygotowanie do porodu",
    results: [
      { name: "Ewa Kamińska", role: "Edukator przedporodowy" },
      { name: "Magdalena Lewandowska", role: "Położna perinatalna" },
    ],
  },
];

const TYPING_SPEED = 70;
const PAUSE_AFTER_TYPING = 350;
const RESULT_STAGGER = 250;
const HOLD_DURATION = 3000;
const FADE_OUT_DURATION = 400;

type AnimState = {
  typedText: string;
  showResult1: boolean;
  showResult2: boolean;
  searchIndex: number;
  fading: boolean;
};

function useDashboardAnimation(started: boolean) {
  const [state, setState] = useState<AnimState>({
    typedText: "",
    showResult1: false,
    showResult2: false,
    searchIndex: 0,
    fading: false,
  });

  useEffect(() => {
    if (!started) return;

    let cancelled = false;
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const runLoop = async () => {
      let index = 0;
      while (!cancelled) {
        const search = SEARCHES[index % SEARCHES.length];

        // Reset for new cycle
        setState({
          typedText: "",
          showResult1: false,
          showResult2: false,
          searchIndex: index % SEARCHES.length,
          fading: false,
        });

        // Type query
        for (let i = 1; i <= search.query.length; i++) {
          if (cancelled) return;
          await wait(TYPING_SPEED);
          setState((s) => ({ ...s, typedText: search.query.slice(0, i) }));
        }

        // Show results
        await wait(PAUSE_AFTER_TYPING);
        if (cancelled) return;
        setState((s) => ({ ...s, showResult1: true }));

        await wait(RESULT_STAGGER);
        if (cancelled) return;
        setState((s) => ({ ...s, showResult2: true }));

        // Hold
        await wait(HOLD_DURATION);
        if (cancelled) return;

        // Fade out
        setState((s) => ({ ...s, fading: true }));
        await wait(FADE_OUT_DURATION);

        index++;
      }
    };

    runLoop();
    return () => { cancelled = true; };
  }, [started]);

  return { ...state, currentSearch: SEARCHES[state.searchIndex] };
}

export default function HeroSection() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const { typedText, showResult1, showResult2, currentSearch, fading } =
    useDashboardAnimation(started);

  useEffect(() => {
    if (!overlayRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(overlayRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full overflow-hidden pt-8 pb-6 lg:pt-12 lg:pb-8">
      <GridPattern
        width={36}
        height={36}
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [14, 12],
        ]}
        className={cn(
          "fill-primary/[0.08] stroke-primary/[0.15]",
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
      <div className="relative mx-auto max-w-[1200px] px-[18px] lg:px-[120px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          {/* Left Column - Text Content */}
          <div className="flex w-full flex-col justify-between lg:w-1/2 lg:py-6">
            {/* Rating Tag */}
            <BlurFade delay={0.1} direction="up" blur="4px">
              <div className="flex items-center gap-3">
                <Star size={18} fill="#e69fcd" stroke="#e69fcd" />
                <span className="text-[17px] font-medium tracking-[-0.18px] text-muted-foreground lg:text-[19px] lg:tracking-[-0.2px]">
                  4.8 &nbsp;| &nbsp;1000+ pozytywnych opinii
                </span>
              </div>
            </BlurFade>

            {/* Heading */}
            <BlurFade delay={0.25} direction="up" blur="4px">
              <div className="mt-8 lg:mt-10">
                <h1
                  className="text-[34px] font-medium leading-[42px] tracking-[-1.5px] text-[#363636] lg:text-[54px] lg:leading-[68px] lg:tracking-[-2.5px]"
                  style={{ wordSpacing: "4px" }}
                >
                  Bezpieczeństwo
                  <br />
                  wiedza i wsparcie
                  <br />
                  <span className="text-primary">w jednej aplikacji</span>
                </h1>
              </div>
            </BlurFade>

            {/* Search CTA */}
            <BlurFade delay={0.45} direction="up" blur="4px">
              <div className="mt-8 flex items-center gap-2 lg:mt-10">
                <div className="relative flex-1">
                  <Search
                    size={16}
                    stroke="#999"
                    strokeWidth={1.8}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                  />
                  <input
                    type="text"
                    placeholder="specjalizacja, miasto lub nazwisko..."
                    className="h-[50px] w-full rounded-[11px] border border-border bg-white pl-10 pr-5 text-[15px] text-[#363636] outline-none transition-colors duration-300 placeholder:text-[#999] focus:border-[#f0c6dd]"
                  />
                </div>
                <InteractiveHoverButton className="flex-shrink-0">
                  Znajdź położną
                </InteractiveHoverButton>
              </div>
            </BlurFade>
          </div>

          {/* Right Column - Image Content */}
          <BlurFade delay={0.3} direction="up" blur="4px" className="relative w-full lg:w-1/2">
            <div className="relative">
              <img
                src="/hero_png.png"
                alt="Położna z pacjentką"
                className="h-auto w-full rounded-none object-contain"
              />
            </div>

            {/* Animated Dashboard Overlay */}
            <div
              ref={overlayRef}
              className="absolute bottom-4 left-2 w-[200px] rounded-[18px] bg-card p-4 shadow-lg lg:bottom-6 lg:left-0"
              style={{
                transition: "opacity 0.4s ease",
                opacity: fading ? 0 : 1,
              }}
            >
              {/* Search Field with typing */}
              <div className="flex items-center gap-2 rounded-full border border-[#d9d9d9] px-3 py-2">
                <Search size={12} stroke="#ababab" strokeWidth={1.5} className="flex-shrink-0" />
                <div className="min-h-[12px] overflow-hidden text-[9px] font-medium tracking-[-0.22px] text-[#363636]">
                  {typedText}
                  <span className="ml-[1px] inline-block h-[9px] w-[0.5px] animate-pulse bg-[#999] align-middle" />
                </div>
              </div>

              {/* Results */}
              <div className="mt-3 flex flex-col gap-2.5">
                {currentSearch.results.map((result, i) => {
                  const visible = i === 0 ? showResult1 : showResult2;
                  return (
                    <div
                      key={`${currentSearch.query}-${i}`}
                      className="flex items-center gap-2.5"
                      style={{
                        transition: "opacity 0.4s ease, transform 0.4s ease",
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(6px)",
                      }}
                    >
                      <div className="h-8 w-8 flex-shrink-0 rounded-[5px] bg-secondary" />
                      <div>
                        <p className="text-[10px] font-medium tracking-[-0.22px] text-black">
                          {result.name}
                        </p>
                        <p className="text-[8px] tracking-[-0.18px] text-[#a3a3a3]">
                          {result.role}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
