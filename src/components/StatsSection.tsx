"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 98, suffix: "%", label: "Zadowolonych mam" },
  { value: 500, suffix: "+", label: "Zweryfikowanych położnych" },
  { value: 3000, suffix: "+", label: "Pacjentek w opiece" },
  { value: 24, suffix: "/7", label: "Dostęp do czatu" },
];

function useCountUp(target: number, started: boolean, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return count;
}

function AnimatedStat({
  value,
  suffix,
  label,
  started,
}: {
  value: number;
  suffix: string;
  label: string;
  started: boolean;
}) {
  const count = useCountUp(value, started);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-baseline justify-center">
        <span className="text-[50px] font-medium leading-[1] text-accent lg:text-[56px] xl:text-[62px]">
          {count}
        </span>
        {suffix && (
          <span className="text-[50px] font-medium leading-[1] text-accent lg:text-[56px] xl:text-[62px]">
            {suffix}
          </span>
        )}
      </div>
      <span className="mt-2 text-[16px] font-medium tracking-[-0.18px] text-muted-foreground lg:mt-3 lg:text-[17px] xl:text-[18px]">
        {label}
      </span>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full pb-6 lg:pb-8">
      <div className="mx-auto max-w-[1200px] px-[18px] lg:px-[120px]">
        <div
          ref={sectionRef}
          className="overflow-hidden rounded-[32px] bg-muted px-6 py-10 lg:px-10 lg:py-16"
        >
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between lg:gap-0">
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex items-center">
                {index > 0 && (
                  <div className="mr-6 hidden h-[7px] w-[7px] flex-shrink-0 rounded-full bg-accent lg:block xl:mr-8" />
                )}
                <AnimatedStat
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  started={started}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
