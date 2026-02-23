"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Dzięki MyMidwife znalazłam wspaniałą położną, która była ze mną na każdym etapie ciąży. Czuję się bezpiecznie i zaopiekowana.",
    name: "Katarzyna M.",
    role: "Mama Zosi, 3 miesiące",
  },
  {
    quote:
      "Czat z położną o 2 w nocy, kiedy nie wiedziałam co robić z gorączką maluszka. Bezcenne! Polecam każdej mamie.",
    name: "Anna W.",
    role: "Mama Jasia, 6 miesięcy",
  },
  {
    quote:
      "Platforma pomogła mi zbudować praktykę od zera. Teraz mam stały kontakt z pacjentkami i mogę dzielić się wiedzą.",
    name: "Magdalena K.",
    role: "Położna środowiskowa",
  },
  {
    quote:
      "Dzienniczek objawów i regularne wizyty patronażowe w jednym miejscu. Wreszcie wszystko jest poukładane.",
    name: "Joanna P.",
    role: "Mama bliźniaków, 8 miesięcy",
  },
];

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const item = testimonials[current];

  return (
    <section className="w-full py-10 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-[18px] lg:px-[120px]">
        {/* Heading */}
        <div className="flex flex-col">
          <span className="w-fit rounded-[9px] bg-secondary px-5 py-2 text-[15px] font-medium tracking-[-0.32px] text-[#363636]">
            Opinie
          </span>
          <h2
            className="mt-6 text-[32px] font-medium leading-[40px] tracking-[-1.5px] text-[#363636] lg:text-[48px] lg:leading-[60px] lg:tracking-[-2px]"
            style={{ wordSpacing: "3px" }}
          >
            Pomagamy ponad 1000+ rodzinom
            <br className="hidden lg:block" />{" "}
            w całej Polsce
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="relative mt-8 overflow-hidden rounded-[24px] bg-primary p-6 lg:mt-12 lg:rounded-[30px] lg:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
            {/* Image */}
            <div className="aspect-[4/3] w-full flex-shrink-0 overflow-hidden rounded-[20px] bg-primary/80 lg:aspect-auto lg:h-[415px] lg:w-[504px] lg:rounded-[28px]">
              <img
                src="/hero_png.png"
                alt={item.name}
                className="h-full w-full object-cover object-top"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center">
              {/* Quote mark */}
              <span className="text-[48px] leading-none text-white/40 lg:text-[64px]">
                &ldquo;
              </span>

              <p className="mt-2 text-[20px] font-medium leading-[30px] tracking-[-0.56px] text-white lg:mt-4 lg:text-[26px] lg:leading-[36px]">
                {item.quote}
              </p>

              <div className="mt-6 lg:mt-8">
                <p className="text-[18px] font-medium tracking-[-0.72px] text-[#fafafa] lg:text-[22px]">
                  {item.name}
                </p>
                <p className="mt-1 text-[14px] font-medium tracking-[-0.36px] text-[#cccccc] lg:text-[17px]">
                  {item.role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-[11px] bg-white/20 transition-colors hover:bg-white/30 lg:left-5 lg:h-11 lg:w-11"
            aria-label="Poprzednia opinia"
          >
            <ChevronLeft size={20} stroke="white" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-[11px] bg-white/20 transition-colors hover:bg-white/30 lg:right-5 lg:h-11 lg:w-11"
            aria-label="Następna opinia"
          >
            <ChevronRight size={20} stroke="white" />
          </button>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2 lg:mt-0 lg:absolute lg:bottom-6 lg:left-1/2 lg:-translate-x-1/2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current
                    ? "w-6 bg-white"
                    : "w-2 bg-white/40"
                }`}
                aria-label={`Opinia ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
