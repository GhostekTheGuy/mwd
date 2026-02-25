"use client";

import { HalftoneDots } from "@paper-design/shaders-react";
import { InteractiveHoverButton } from "./InteractiveHoverButton";

const halftoneImage = "/stock/banner22.png";

export default function CtaSection() {
  return (
    <section className="w-full py-10 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-[18px] lg:px-[120px]">
        <div className="relative overflow-hidden rounded-[28px] px-6 py-16 text-center lg:rounded-[37px] lg:px-12 lg:py-28">
          {/* Shader background */}
          <div className="absolute inset-0">
            <HalftoneDots
              image={halftoneImage}
              colorBack="#ffffff"
              colorFront="#e354af"
              originalColors={false}
              type="gooey"
              grid="hex"
              inverted={false}
              size={0.62}
              radius={1.25}
              contrast={0.4}
              grainMixer={0.2}
              grainOverlay={0.2}
              grainSize={0.5}
              scale={1}
              fit="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h2
              className="mx-auto max-w-[536px] text-[32px] font-medium leading-[40px] tracking-[-1.5px] text-[#363636] lg:text-[47px] lg:leading-[60px] lg:tracking-[-2px]"
              style={{ wordSpacing: "3px" }}
            >
              Zadbaj o siebie i swojego maluszka z MyMidwife
            </h2>

            <InteractiveHoverButton className="mt-8 lg:mt-10">
              Zacznij teraz
            </InteractiveHoverButton>
          </div>
        </div>
      </div>
    </section>
  );
}
