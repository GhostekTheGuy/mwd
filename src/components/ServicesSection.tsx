"use client";

import { useEffect, useRef } from "react";
import {
  MessageCircleHeart,
  BookOpenCheck,
  CalendarHeart,
  Baby,
  Stethoscope,
  NotebookPen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const services: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Stethoscope,
    title: "Opieka w ciąży",
    description:
      "Znajdź położną, która poprowadzi Cię przez ciążę, od pierwszych tygodni aż do rozwiązania.",
  },
  {
    icon: MessageCircleHeart,
    title: "Czat z położną",
    description:
      "Napisz do swojej położnej o każdej porze. Szybka odpowiedź na pytania i wątpliwości, bez czekania.",
  },
  {
    icon: CalendarHeart,
    title: "Wizyty patronażowe",
    description:
      "Umawiaj wizyty domowe po porodzie. Kontrola zdrowia mamy i noworodka w jednym miejscu.",
  },
  {
    icon: Baby,
    title: "Opieka nad noworodkiem",
    description:
      "Wsparcie w kąpieli, pielęgnacji i karmieniu maluszka. Ekspertki dostępne na wyciągnięcie ręki.",
  },
  {
    icon: BookOpenCheck,
    title: "Baza wiedzy",
    description:
      "Sprawdzone artykuły i materiały od doświadczonych położnych, dopasowane do Twojego etapu.",
  },
  {
    icon: NotebookPen,
    title: "Dziennik objawów",
    description:
      "Monitoruj wagę, ciśnienie i samopoczucie. Twoja położna widzi postępy i reaguje na czas.",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${index * 80}ms`;
          el.classList.add("svc-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="svc-card group flex flex-col rounded-[20px] border border-border p-6 transition-[border-color,box-shadow] duration-500 ease-out hover:border-[#f0c6dd] hover:shadow-[0_4px_20px_-6px_rgba(227,82,173,0.08)] lg:p-7"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary transition-colors duration-500 group-hover:bg-[#f5d5e8]">
        <service.icon size={22} stroke="#e352ad" strokeWidth={2} />
      </span>

      <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.4px] text-[#363636] lg:mt-6">
        {service.title}
      </h3>
      <p className="mt-2 text-[15px] leading-[24px] tracking-[-0.2px] text-muted-foreground">
        {service.description}
      </p>
    </div>
  );
}

export default function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("svc-header-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full py-10 lg:py-16">
      <style>{`
        .svc-header {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .svc-header-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .svc-card {
          opacity: 0;
          transform: translateY(16px);
          transition-property: opacity, transform, border-color, box-shadow;
          transition-duration: 0.6s, 0.6s, 0.5s, 0.5s;
          transition-timing-function: ease;
        }
        .svc-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="mx-auto max-w-[1200px] px-[18px] lg:px-[120px]">
        {/* Header */}
        <div
          ref={headerRef}
          className="svc-header flex flex-col items-center text-center"
        >
          <span className="w-fit rounded-[9px] bg-secondary px-5 py-2 text-sm font-medium text-[#363636]">
            Funkcje
          </span>
          <h2
            className="mt-6 text-[32px] font-medium leading-[40px] tracking-[-1.5px] text-[#363636] lg:text-[40px] lg:leading-[50px] lg:tracking-[-2px]"
            style={{ wordSpacing: "3px" }}
          >
            Wszystko, czego potrzebujesz
            <br />
            w jednej aplikacji
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 lg:mt-12 lg:grid-cols-3 lg:gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
