"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowLeft, ChevronLeft, ChevronRight, Check, Clock, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookingModal } from "./BookingModalContext";
import type { Service, ServiceCategory, DaySlots } from "@/lib/data/midwives";

/* ── Helpers ── */

const DAY_NAMES_SHORT = ["Ndz", "Pon", "Wt", "Śr", "Czw", "Pt", "Sob"];
const MONTH_NAMES = [
  "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
  "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień",
];
const MONTH_NAMES_GEN = [
  "Stycznia", "Lutego", "Marca", "Kwietnia", "Maja", "Czerwca",
  "Lipca", "Sierpnia", "Września", "Października", "Listopada", "Grudnia",
];
const DAY_NAMES_FULL = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

function formatDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function parseDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function getMonday(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

type TimeOfDay = "all" | "rano" | "popoludnie" | "wieczor";

function filterSlotsByTime(slots: string[], filter: TimeOfDay): string[] {
  if (filter === "all") return slots;
  return slots.filter((s) => {
    const hour = parseInt(s.split(":")[0], 10);
    if (filter === "rano") return hour < 12;
    if (filter === "popoludnie") return hour >= 12 && hour < 17;
    return hour >= 17;
  });
}

function addMinutes(time: string, mins: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + mins;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/* ── Types ── */

type Step = "calendar" | "auth" | "confirm" | "success";

/* ── Week Strip ── */

function WeekStrip({
  weekStart,
  onPrev,
  onNext,
  selectedDate,
  onSelectDate,
  slotsMap,
}: {
  weekStart: Date;
  onPrev: () => void;
  onNext: () => void;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  slotsMap: Map<string, string[]>;
}) {
  const today = new Date();
  const todayStr = formatDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    const dateStr = formatDateStr(d.getFullYear(), d.getMonth(), d.getDate());
    const slots = slotsMap.get(dateStr) ?? [];
    const isPast = dateStr < todayStr;
    return { date: d, dateStr, dayName: DAY_NAMES_SHORT[d.getDay()], dayNum: d.getDate(), slots, isPast };
  });

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={onPrev}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex flex-1 gap-1">
        {days.map((day) => {
          const hasSlots = day.slots.length > 0;
          const isSelected = day.dateStr === selectedDate;
          const disabled = day.isPast || !hasSlots;

          const dotColor = !hasSlots || day.isPast
            ? ""
            : day.slots.length >= 4
              ? "bg-green-500"
              : day.slots.length >= 2
                ? "bg-amber-400"
                : "bg-amber-400";

          return (
            <button
              key={day.dateStr}
              disabled={disabled}
              onClick={() => onSelectDate(day.dateStr)}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 rounded-[12px] border py-2 transition-all",
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                  : "border-border/50 bg-card hover:border-border",
                disabled && "opacity-40 cursor-default"
              )}
            >
              <span className={cn(
                "text-[11px] font-medium",
                isSelected ? "text-primary" : "text-muted-foreground"
              )}>
                {day.dayName}
              </span>
              <span className={cn(
                "text-[16px] font-bold tracking-[-0.3px]",
                isSelected ? "text-primary" : "text-foreground"
              )}>
                {day.dayNum}
              </span>
              {hasSlots && !day.isPast && (
                <div className={cn("h-1.5 w-1.5 rounded-full", dotColor)} />
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={onNext}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

/* ── Time Slots Row ── */

function TimeSlotsRow({
  slots,
  selectedSlot,
  onSelectSlot,
}: {
  slots: string[];
  selectedSlot: string | null;
  onSelectSlot: (slot: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  if (slots.length === 0) {
    return (
      <p className="py-4 text-center text-[13px] text-muted-foreground">
        Brak wolnych terminów w wybranym przedziale
      </p>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => scrollBy(-1)}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <div ref={scrollRef} className="flex flex-1 gap-2 overflow-x-auto scrollbar-none">
        {slots.map((slot) => {
          const isActive = selectedSlot === slot;
          return (
            <button
              key={slot}
              onClick={() => onSelectSlot(slot)}
              className={cn(
                "shrink-0 rounded-[10px] border px-4 py-2.5 text-[14px] font-semibold transition-all",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 bg-card text-foreground hover:border-border hover:bg-muted/30"
              )}
            >
              {slot}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => scrollBy(1)}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ── Main Modal ── */

export default function BookingModal({
  services,
  availability,
  midwifeName,
  midwifePhoto,
}: {
  services: ServiceCategory[];
  availability: DaySlots[];
  midwifeName: string;
  midwifePhoto: string;
}) {
  const { isOpen, selectedService, closeBooking } = useBookingModal();

  const [step, setStep] = useState<Step>("calendar");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<TimeOfDay>("all");
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));
  const [note, setNote] = useState("");

  const slotsMap = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const day of availability) {
      map.set(day.date, day.slots);
    }
    return map;
  }, [availability]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setStep("calendar");
      setSelectedDate(null);
      setSelectedSlot(null);
      setTimeFilter("all");
      setWeekStart(getMonday(new Date()));
      setNote("");
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const filteredSlots = selectedDate
    ? filterSlotsByTime(slotsMap.get(selectedDate) ?? [], timeFilter)
    : [];

  const handleBack = useCallback(() => {
    if (step === "auth") setStep("calendar");
    else if (step === "confirm") setStep("auth");
    else closeBooking();
  }, [step, closeBooking]);

  const handleNext = useCallback(() => {
    if (step === "calendar") setStep("auth");
    else if (step === "auth") setStep("confirm");
    else if (step === "confirm") setStep("success");
  }, [step]);

  const weekMonth = MONTH_NAMES[weekStart.getMonth()];
  const weekYear = weekStart.getFullYear();

  const canProceedCalendar = !!selectedDate && !!selectedSlot && !!selectedService;

  const selectedDateObj = selectedDate ? parseDate(selectedDate) : null;
  const endTime = selectedSlot && selectedService
    ? addMinutes(selectedSlot, selectedService.duration)
    : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeBooking}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div
              className="flex max-h-[90vh] w-full max-w-[520px] flex-col overflow-hidden rounded-[22px] bg-background shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {step === "success" ? (
                <SuccessContent midwifeName={midwifeName} onClose={closeBooking} />
              ) : step === "calendar" ? (
                <CalendarStep
                  weekMonth={weekMonth}
                  weekYear={weekYear}
                  weekStart={weekStart}
                  onPrevWeek={() => setWeekStart((d) => { const n = new Date(d); n.setDate(n.getDate() - 7); return n; })}
                  onNextWeek={() => setWeekStart((d) => { const n = new Date(d); n.setDate(n.getDate() + 7); return n; })}
                  selectedDate={selectedDate}
                  onSelectDate={(d) => { setSelectedDate(d); setSelectedSlot(null); }}
                  slotsMap={slotsMap}
                  timeFilter={timeFilter}
                  onSetTimeFilter={setTimeFilter}
                  filteredSlots={filteredSlots}
                  selectedSlot={selectedSlot}
                  onSelectSlot={setSelectedSlot}
                  service={selectedService}
                  midwifeName={midwifeName}
                  midwifePhoto={midwifePhoto}
                  endTime={endTime}
                  canProceed={canProceedCalendar}
                  onNext={handleNext}
                  onClose={closeBooking}
                />
              ) : step === "auth" ? (
                <AuthStep onBack={handleBack} onClose={closeBooking} onContinue={handleNext} />
              ) : (
                <ConfirmStep
                  service={selectedService!}
                  date={selectedDateObj!}
                  slot={selectedSlot!}
                  endTime={endTime!}
                  midwifeName={midwifeName}
                  midwifePhoto={midwifePhoto}
                  note={note}
                  onNoteChange={setNote}
                  onBack={handleBack}
                  onClose={closeBooking}
                  onConfirm={handleNext}
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Step: Calendar ── */

function CalendarStep({
  weekMonth, weekYear, weekStart, onPrevWeek, onNextWeek,
  selectedDate, onSelectDate, slotsMap,
  timeFilter, onSetTimeFilter,
  filteredSlots, selectedSlot, onSelectSlot,
  service, midwifeName, midwifePhoto, endTime,
  canProceed, onNext, onClose,
}: {
  weekMonth: string; weekYear: number;
  weekStart: Date; onPrevWeek: () => void; onNextWeek: () => void;
  selectedDate: string | null; onSelectDate: (d: string) => void;
  slotsMap: Map<string, string[]>;
  timeFilter: TimeOfDay; onSetTimeFilter: (t: TimeOfDay) => void;
  filteredSlots: string[]; selectedSlot: string | null; onSelectSlot: (s: string) => void;
  service: Service | null;
  midwifeName: string; midwifePhoto: string; endTime: string | null;
  canProceed: boolean; onNext: () => void; onClose: () => void;
}) {
  const timeFilters: { id: TimeOfDay; label: string }[] = [
    { id: "all", label: "Wszystkie" },
    { id: "rano", label: "Rano" },
    { id: "popoludnie", label: "Popołudnie" },
    { id: "wieczor", label: "Wieczór" },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/40 px-5 py-4">
        <h2 className="text-[18px] font-bold tracking-[-0.5px] text-foreground">
          {weekMonth} {weekYear}
        </h2>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {/* Week strip */}
        <WeekStrip
          weekStart={weekStart}
          onPrev={onPrevWeek}
          onNext={onNextWeek}
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
          slotsMap={slotsMap}
        />

        {/* Time of day filter */}
        {selectedDate && (
          <div className="flex gap-1 rounded-[12px] bg-muted/50 p-1">
            {timeFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => onSetTimeFilter(f.id)}
                className={cn(
                  "flex-1 rounded-[8px] py-2 text-[13px] font-medium transition-all",
                  timeFilter === f.id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* Time slots */}
        {selectedDate && (
          <TimeSlotsRow
            slots={filteredSlots}
            selectedSlot={selectedSlot}
            onSelectSlot={onSelectSlot}
          />
        )}

        {/* Service summary card */}
        {service && selectedSlot && endTime && (
          <div className="rounded-[14px] bg-muted/40 p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[14px] font-bold tracking-[-0.3px] text-foreground uppercase">
                {service.name}
              </p>
              <div className="shrink-0 text-right">
                <p className="text-[15px] font-bold text-foreground">{service.price} zł</p>
                <p className="text-[12px] font-medium text-muted-foreground">
                  {selectedSlot} - {endTime}
                </p>
              </div>
            </div>
            <div className="border-t border-border/40 pt-3 flex items-center gap-2">
              <img src={midwifePhoto} alt="" className="h-7 w-7 rounded-full object-cover" />
              <span className="text-[13px] font-medium text-muted-foreground">
                {midwifeName}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border/40 px-5 py-4 space-y-3">
        {service && selectedSlot && (
          <div className="flex items-center justify-end gap-2">
            <span className="text-[13px] text-muted-foreground">Łącznie:</span>
            <span className="text-[22px] font-bold tracking-[-0.5px] text-foreground">
              {service.price} zł
            </span>
          </div>
        )}
        {service && selectedSlot && (
          <p className="text-right text-[12px] text-muted-foreground">
            {service.duration} min
          </p>
        )}
        <button
          disabled={!canProceed}
          onClick={onNext}
          className={cn(
            "w-full rounded-[14px] py-3.5 text-[15px] font-semibold transition-all",
            canProceed
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          Dalej
        </button>
      </div>
    </>
  );
}

/* ── Step: Auth ── */

function AuthStep({
  onBack,
  onClose,
  onContinue,
}: {
  onBack: () => void;
  onClose: () => void;
  onContinue: () => void;
}) {
  const [email, setEmail] = useState("");

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <button
          onClick={onBack}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 pb-8">
        <div className="mx-auto max-w-[340px] space-y-6 pt-4">
          <div className="text-center">
            <h2 className="text-[24px] font-bold tracking-[-0.8px] text-foreground">
              Zacznij korzystać
            </h2>
            <p className="mt-2 text-[14px] font-medium text-muted-foreground">
              Utwórz konto lub zaloguj się, aby wygodnie rezerwować wizyty.
            </p>
          </div>

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Adres e-mail"
            className="w-full rounded-[14px] border border-border/60 bg-background px-4 py-3.5 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
          />

          {/* Continue button */}
          <button
            onClick={onContinue}
            className="w-full rounded-[14px] bg-primary py-3.5 text-[15px] font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            Kontynuuj
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border/60" />
            <span className="text-[12px] font-medium text-muted-foreground">LUB</span>
            <div className="h-px flex-1 bg-border/60" />
          </div>

          {/* Social buttons */}
          <div className="space-y-2.5">
            <button
              onClick={onContinue}
              className="flex w-full items-center justify-center gap-3 rounded-[14px] border border-border/60 bg-card py-3.5 text-[14px] font-semibold text-foreground transition-all hover:bg-muted/40"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Kontynuuj przez Facebook
            </button>

            <button
              onClick={onContinue}
              className="flex w-full items-center justify-center gap-3 rounded-[14px] border border-border/60 bg-card py-3.5 text-[14px] font-semibold text-foreground transition-all hover:bg-muted/40"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Kontynuuj z Apple
            </button>

            <button
              onClick={onContinue}
              className="flex w-full items-center justify-center gap-3 rounded-[14px] border border-border/60 bg-card py-3.5 text-[14px] font-semibold text-foreground transition-all hover:bg-muted/40"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Kontynuuj z Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Step: Confirm ── */

function ConfirmStep({
  service, date, slot, endTime, midwifeName, midwifePhoto,
  note, onNoteChange,
  onBack, onClose, onConfirm,
}: {
  service: Service;
  date: Date;
  slot: string;
  endTime: string;
  midwifeName: string;
  midwifePhoto: string;
  note: string;
  onNoteChange: (v: string) => void;
  onBack: () => void;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/40 px-5 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-[17px] font-bold tracking-[-0.5px] text-foreground">
            Sprawdź i potwierdź
          </h2>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        {/* Date/time summary */}
        <div className="text-center space-y-1">
          <p className="text-[18px] font-bold tracking-[-0.5px] text-foreground">
            {MONTH_NAMES_GEN[date.getMonth()]}, {DAY_NAMES_FULL[date.getDay()]} {date.getDate()} {date.getFullYear()}
          </p>
          <p className="text-[16px] font-medium text-muted-foreground">
            {slot} - {endTime} ({service.duration}min)
          </p>
          <p className="text-[14px] text-muted-foreground">{midwifeName}</p>
        </div>

        {/* Service card */}
        <div className="rounded-[14px] bg-muted/40 p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="text-[14px] font-bold tracking-[-0.3px] text-foreground">
                {service.name}
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[15px] font-bold text-foreground">{service.price} zł</p>
              <p className="text-[12px] font-medium text-muted-foreground">
                {slot} - {endTime}
              </p>
            </div>
          </div>
          <div className="border-t border-border/40 pt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={midwifePhoto} alt="" className="h-7 w-7 rounded-full object-cover" />
              <span className="text-[13px] font-medium text-muted-foreground">{midwifeName}</span>
            </div>
            <p className="text-[14px] font-bold text-foreground">Łącznie: {service.price} zł</p>
          </div>
        </div>

        {/* Note */}
        <div className="flex items-center gap-3 rounded-[14px] border border-border/60 bg-card px-4 py-3">
          <Mail className="h-5 w-5 shrink-0 text-muted-foreground/50" />
          <input
            type="text"
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            placeholder="Dodaj notatkę (opcjonalnie)"
            className="flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted-foreground/50"
          />
        </div>

        {/* Payment breakdown */}
        <div className="border-t border-border/40 pt-4 space-y-2">
          <div className="flex items-center justify-between text-[14px]">
            <span className="font-medium text-muted-foreground">Do zapłaty teraz:</span>
            <span className="font-bold text-foreground">0,00 zł</span>
          </div>
          <div className="flex items-center justify-between text-[14px]">
            <span className="font-medium text-muted-foreground">Do zapłaty na miejscu:</span>
            <span className="font-semibold text-foreground">{service.price},00 zł</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border/40 px-5 py-4 space-y-3">
        <button
          onClick={onConfirm}
          className="w-full rounded-[14px] bg-primary py-3.5 text-[15px] font-semibold text-primary-foreground transition-all hover:bg-primary/90"
        >
          Potwierdź i umów
        </button>
        <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
          Klikając „Potwierdź i umów", akceptujesz{" "}
          <span className="text-primary">Zasady anulowania rezerwacji</span>{" "}
          i zgadzasz się na pobranie opłaty na miejscu.
        </p>
      </div>
    </>
  );
}

/* ── Success ── */

function SuccessContent({ midwifeName, onClose }: { midwifeName: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="flex flex-col items-center justify-center px-8 py-16">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
      >
        <Check className="h-10 w-10 text-green-600" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-[22px] font-bold tracking-[-0.5px] text-foreground"
      >
        Wizyta umówiona!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mt-2 text-center text-[14px] font-medium text-muted-foreground"
      >
        Potwierdzenie zostanie wysłane na Twój e-mail.
        <br />
        Do zobaczenia u {midwifeName}!
      </motion.p>
    </div>
  );
}
