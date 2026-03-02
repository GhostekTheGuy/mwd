"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useBooking } from "./BookingContext";
import type { DaySlots } from "@/lib/data/midwives";

const DAY_LABELS = ["PON", "WT", "ŚR", "CZW", "PT", "SOB", "NIEDZ"];

const MONTH_NAMES = [
  "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
  "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1; // Monday = 0
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function ProfileAvailability({
  availability,
}: {
  availability: DaySlots[];
}) {
  const { openBooking } = useBooking();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const slotsMap = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const day of availability) {
      map.set(day.date, day.slots);
    }
    return map;
  }, [availability]);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfWeek(currentYear, currentMonth);

  const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const selectedDaySlots = selectedDate ? (slotsMap.get(selectedDate) ?? []) : [];

  return (
    <section id="dostepnosc" className="scroll-mt-[120px]">
      <div className="rounded-[22px] border border-border/60 bg-card p-5">
        {/* Header */}
        <h3 className="text-[18px] font-semibold tracking-[-0.5px] text-foreground">
          Umów wizytę
        </h3>

        {/* Month nav */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[17px] font-semibold tracking-[-0.4px] text-foreground">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={prevMonth}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextMonth}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Day labels */}
        <div className="mt-4 grid grid-cols-7 gap-0">
          {DAY_LABELS.map((d) => (
            <div
              key={d}
              className="py-2 text-center text-[11px] font-semibold tracking-[0.5px] text-muted-foreground"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-0">
          {/* Empty cells for offset */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = formatDate(currentYear, currentMonth, day);
            const slots = slotsMap.get(dateStr);
            const hasSlots = slots && slots.length > 0;
            const isPast = dateStr < todayStr;
            const isToday = dateStr === todayStr;
            const isSelected = dateStr === selectedDate;

            return (
              <div key={day} className="flex items-center justify-center p-0.5">
                <button
                  disabled={isPast || !hasSlots}
                  onClick={() => {
                    setSelectedDate(isSelected ? null : dateStr);
                    setSelectedSlot(null);
                  }}
                  className={cn(
                    "relative flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-medium transition-all",
                    // Selected state
                    isSelected && "bg-primary text-primary-foreground shadow-sm",
                    // Has available slots (not selected)
                    !isSelected && hasSlots && !isPast &&
                      "bg-primary/10 text-primary hover:bg-primary/20",
                    // Today ring
                    isToday && !isSelected && "ring-1 ring-primary/40",
                    // Past or no slots
                    (isPast || !hasSlots) && !isSelected &&
                      "text-muted-foreground/40 cursor-default",
                    // Regular day (future, no slots data but not disabled look)
                    !isSelected && !hasSlots && !isPast &&
                      "text-muted-foreground"
                  )}
                >
                  {day}
                </button>
              </div>
            );
          })}
        </div>

        {/* Time slots for selected day */}
        <AnimatePresence mode="wait">
          {selectedDate && (
            <motion.div
              key={selectedDate}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 border-t border-border/40 pt-4">
                <p className="text-[14px] font-semibold tracking-[-0.3px] text-foreground">
                  Wolne terminy
                </p>

                {selectedDaySlots.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedDaySlots.map((slot) => {
                      const isActive = selectedSlot === `${selectedDate}-${slot}`;
                      return (
                        <motion.button
                          key={slot}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            setSelectedSlot(
                              isActive ? null : `${selectedDate}-${slot}`
                            )
                          }
                          className={cn(
                            "rounded-full px-4 py-2 text-[13px] font-semibold transition-all",
                            isActive
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "bg-primary/10 text-primary hover:bg-primary/20"
                          )}
                        >
                          {slot}
                        </motion.button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="mt-2 text-[13px] text-muted-foreground">
                    Brak wolnych terminów w tym dniu
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Book button */}
        <AnimatePresence>
          {selectedSlot && (
            <motion.button
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              onClick={() => openBooking()}
              className="mt-4 w-full rounded-[14px] bg-primary py-3 text-[15px] font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              Umów wizytę — {selectedSlot.split("-").pop()}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
