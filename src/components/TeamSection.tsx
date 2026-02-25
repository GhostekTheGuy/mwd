"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const midwives = [
  {
    name: "Anna Kowalska",
    specialty: "Położna środowiskowa",
    bgColor: "#f5e6f0",
    image: "/stock/1.png",
  },
  {
    name: "Maria Nowak",
    specialty: "Położna laktacyjna",
    bgColor: "#e6eef5",
    image: "/stock/2.png",
  },
  {
    name: "Katarzyna Wiśniewska",
    specialty: "Edukatorka prenatalna",
    bgColor: "#f0e6f5",
    image: "/stock/3.png",
  },
];

export default function TeamSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="w-full py-10 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-[18px] lg:px-[120px]">
        {/* Heading */}
        <div className="flex flex-col items-center">
          <span className="w-fit rounded-[9px] bg-secondary px-5 py-2 text-[15px] font-medium tracking-[-0.3px] text-[#363636]">
            Położne
          </span>
          <h2
            className="mt-6 text-center text-[33px] font-medium leading-[42px] tracking-[-1.4px] text-[#363636] lg:text-[47px] lg:leading-[60px] lg:tracking-[-2px]"
            style={{ wordSpacing: "3px" }}
          >
            Poznaj nasze sprawdzone
            <br />
            ekspertki od opieki położniczej
          </h2>
        </div>

        {/* Cards Grid */}
        <div
          ref={ref}
          className="mt-10 flex flex-col gap-5 lg:mt-12 lg:grid lg:grid-cols-3"
        >
          {midwives.map((midwife, i) => (
            <motion.div
              key={midwife.name}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="relative overflow-hidden rounded-[26px]"
              style={{ height: 420 }}
            >
              {/* Background */}
              <div
                className="absolute inset-x-0 bottom-0 h-[294px] rounded-[22px]"
                style={{ backgroundColor: midwife.bgColor }}
              />

              {/* Portrait image */}
              <img
                src={midwife.image}
                alt={midwife.name}
                className="absolute inset-0 h-full w-full rounded-[26px] object-cover object-top"
              />

              {/* Info Wrapper */}
              <div className="absolute inset-x-4 bottom-4 rounded-[24px] bg-[#fafafa] px-6 py-5">
                <p className="text-[13px] font-medium text-[#363636]">
                  {midwife.specialty}
                </p>
                <p className="mt-2 text-[22px] font-medium leading-[31px] tracking-[-0.48px] text-[#1f1f1f] lg:text-[26px] lg:leading-[36px] lg:tracking-[-0.56px]">
                  {midwife.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
