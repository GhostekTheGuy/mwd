"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Zweryfikowane położne",
    description:
      "Każda położna przechodzi weryfikację kwalifikacji i doświadczenia, abyś miała pewność najwyższej jakości opieki.",
  },
  {
    title: "Kontakt 24/7",
    description:
      "Czat z Twoją położną dostępny o każdej porze, bo pytania i wątpliwości nie czekają do godzin pracy.",
  },
  {
    title: "Wiedza od ekspertek",
    description:
      "Sprawdzone materiały edukacyjne tworzone przez doświadczone położne, dopasowane do etapu Twojej ciąży.",
  },
];

export default function VisionSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        { threshold: 0.6, rootMargin: "-20% 0px -20% 0px" }
      );
      observer.observe(card);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="w-full py-10 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-[18px] lg:px-[120px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
          {/* Left Column - Sticky on desktop */}
          <div className="flex w-full flex-col lg:sticky lg:top-24 lg:w-5/12 lg:self-start">
            <span className="w-fit rounded-full bg-secondary px-5 py-2 text-sm font-medium text-[#363636]">
              Nasza misja
            </span>

            <h2
              className="mt-6 text-[32px] font-medium leading-[40px] tracking-[-1.5px] text-[#363636] lg:mt-8 lg:text-[40px] lg:leading-[50px] lg:tracking-[-2px]"
              style={{ wordSpacing: "3px" }}
            >
              Łączymy kobiety
              <br />
              z najlepszymi
              <br />
              ekspertkami
            </h2>

            <a
              href="#"
              className="mt-8 flex h-[50px] w-fit items-center justify-center rounded-full bg-primary px-8 text-[17px] font-medium tracking-[-0.36px] text-white lg:mt-10"
            >
              O nas
            </a>
          </div>

          {/* Right Column - Cards */}
          <div className="flex w-full flex-col gap-4 lg:w-7/12 lg:gap-5">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`rounded-[20px] border p-6 transition-colors duration-300 lg:p-8 ${
                  activeIndex === index
                    ? "border-primary"
                    : "border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                    <CheckCircle
                      size={20}
                      stroke="#e352ad"
                      strokeWidth={2}
                    />
                  </span>
                  <h3 className="text-[20px] font-medium tracking-[-0.5px] text-[#363636] lg:text-[22px]">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-3 text-[15px] leading-[24px] tracking-[-0.2px] text-muted-foreground lg:mt-4 lg:text-[17px] lg:leading-[28px]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
