"use client";

import { useRef } from "react";
import { CheckCircle } from "lucide-react";
import { InteractiveHoverButton } from "./InteractiveHoverButton";
import { motion, useScroll, useTransform } from "motion/react";

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

function StickyCard({
  i,
  title,
  description,
  progress,
  range,
  targetScale,
}: {
  i: number;
  title: string;
  description: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  targetScale: number;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-[30vh] flex items-center justify-center">
      <motion.div
        style={{
          scale,
          top: `${i * 24}px`,
        }}
        className="relative w-full origin-top rounded-[20px] border border-border bg-background p-6 shadow-sm lg:p-8"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
            <CheckCircle size={20} stroke="#e352ad" strokeWidth={2} />
          </span>
          <h3 className="text-[20px] font-medium tracking-[-0.5px] text-[#363636] lg:text-[22px]">
            {title}
          </h3>
        </div>
        <p className="mt-3 text-[15px] leading-[24px] tracking-[-0.2px] text-muted-foreground lg:mt-4 lg:text-[17px] lg:leading-[28px]">
          {description}
        </p>
      </motion.div>
    </div>
  );
}

export default function VisionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="w-full">
      <div
        ref={containerRef}
        className="relative mx-auto max-w-[1200px] px-[18px] pb-[40vh] pt-10 lg:px-[120px] lg:pt-16"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
          {/* Left Column - CSS sticky works fine with Lenis */}
          <div className="flex w-full flex-col lg:sticky lg:top-[30vh] lg:w-5/12 lg:self-start">
            <span className="w-fit rounded-[9px] bg-secondary px-5 py-2 text-sm font-medium text-[#363636]">
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

            <InteractiveHoverButton className="mt-8 lg:mt-10">
              O nas
            </InteractiveHoverButton>
          </div>

          {/* Right Column - Card Stack */}
          <div className="flex w-full flex-col lg:w-7/12">
            {features.map((feature, i) => {
              const targetScale = Math.max(
                0.85,
                1 - (features.length - i - 1) * 0.05
              );
              return (
                <StickyCard
                  key={feature.title}
                  i={i}
                  title={feature.title}
                  description={feature.description}
                  progress={scrollYProgress}
                  range={[i * (1 / features.length), 1]}
                  targetScale={targetScale}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
