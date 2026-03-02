"use client";

import { useState } from "react";
import { ChevronDown, Clock, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useBooking } from "./BookingContext";
import type { ServiceCategory } from "@/lib/data/midwives";

export default function ProfileServices({
  services,
}: {
  services: ServiceCategory[];
}) {
  const { openBooking } = useBooking();
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set([services[0]?.name])
  );

  const toggle = (name: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <section>
      <div className="space-y-3">
        {services.map((category) => {
          const isOpen = openCategories.has(category.name);

          return (
            <div
              key={category.name}
              className="overflow-hidden rounded-[18px] border border-border/60 bg-card"
            >
              {/* Category header */}
              <button
                onClick={() => toggle(category.name)}
                className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-muted/40"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[16px] font-semibold tracking-[-0.4px] text-foreground">
                    {category.name}
                  </span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[12px] font-medium text-muted-foreground">
                    {category.services.length}
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Services list */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className="border-t border-border/40">
                      {category.services.map((service, i) => (
                        <div
                          key={service.name}
                          className={cn(
                            "flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between",
                            i !== category.services.length - 1 &&
                              "border-b border-border/30"
                          )}
                        >
                          <div className="flex-1">
                            <p className="text-[15px] font-semibold tracking-[-0.3px] text-foreground">
                              {service.name}
                            </p>
                            <p className="mt-0.5 text-[13px] font-medium leading-relaxed text-muted-foreground">
                              {service.description}
                            </p>
                            <div className="mt-1.5 flex items-center gap-3 text-[13px] font-medium text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {service.duration} min
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
                            <span className="text-[18px] font-bold tracking-[-0.5px] text-foreground">
                              {service.price} zł
                            </span>
                            <button
                              onClick={() => openBooking(service)}
                              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97]"
                            >
                              <Calendar className="h-3.5 w-3.5" />
                              Umów
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
