"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowLeft, ChevronLeft, ChevronRight, Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBooking } from "./BookingContext";
import type { Service, ServiceCategory, DaySlots } from "@/lib/data/midwives";

/* ── Constants ── */

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
  return d === 0 ? 6 : d - 1;
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

const PHONE_REGEX = /^(\+48\s?)?(\d{3}\s?\d{3}\s?\d{3}|\d{9})$/;

/* ── Types ── */

type Step = 1 | 2 | 3 | "success";

interface FormData {
  name: string;
  phone: string;
  email: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
}

/* ── Step Indicator ── */

function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={cn(
            "h-2 w-2 rounded-full transition-all duration-200",
            s === step ? "w-6 bg-primary" : s < step ? "bg-primary/60" : "bg-border"
          )}
        />
      ))}
    </div>
  );
}

/* ── Step 1: Service Selection ── */

function StepServices({
  services,
  selectedService,
  onSelect,
}: {
  services: ServiceCategory[];
  selectedService: Service | null;
  onSelect: (service: Service) => void;
}) {
  return (
    <div className="space-y-5">
      {services.map((category) => (
        <div key={category.name}>
          <p className="mb-2.5 text-[13px] font-semibold uppercase tracking-[0.5px] text-muted-foreground">
            {category.name}
          </p>
          <div className="space-y-2">
            {category.services.map((service) => {
              const isSelected =
                selectedService?.name === service.name &&
                selectedService?.price === service.price;
              return (
                <button
                  key={`${service.name}-${service.price}`}
                  onClick={() => onSelect(service)}
                  className={cn(
                    "w-full rounded-[14px] border p-4 text-left transition-all",
                    isSelected
                      ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                      : "border-border/60 bg-card hover:border-border hover:bg-muted/30"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                            isSelected
                              ? "border-primary bg-primary"
                              : "border-muted-foreground/30"
                          )}
                        >
                          {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                        </div>
                        <p className="text-[15px] font-semibold tracking-[-0.3px] text-foreground">
                          {service.name}
                        </p>
                      </div>
                      <p className="mt-1 pl-7 text-[13px] font-medium text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[17px] font-bold tracking-[-0.5px] text-foreground">
                        {service.price} zł
                      </p>
                      <p className="flex items-center gap-1 text-[12px] font-medium text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {service.duration} min
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Step 2: Date & Slot Selection ── */

function StepCalendar({
  availability,
  selectedDate,
  selectedSlot,
  onSelectDate,
  onSelectSlot,
}: {
  availability: DaySlots[];
  selectedDate: string | null;
  selectedSlot: string | null;
  onSelectDate: (date: string | null) => void;
  onSelectSlot: (slot: string | null) => void;
}) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

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
    onSelectDate(null);
    onSelectSlot(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    onSelectDate(null);
    onSelectSlot(null);
  };

  const selectedDaySlots = selectedDate ? (slotsMap.get(selectedDate) ?? []) : [];

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between">
        <span className="text-[16px] font-semibold tracking-[-0.4px] text-foreground">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={prevMonth}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextMonth}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Day labels */}
      <div className="mt-3 grid grid-cols-7 gap-0">
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="py-1.5 text-center text-[11px] font-semibold tracking-[0.5px] text-muted-foreground"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
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
                  onSelectDate(isSelected ? null : dateStr);
                  onSelectSlot(null);
                }}
                className={cn(
                  "relative flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-medium transition-all",
                  isSelected && "bg-primary text-primary-foreground shadow-sm",
                  !isSelected && hasSlots && !isPast && "bg-primary/10 text-primary hover:bg-primary/20",
                  isToday && !isSelected && "ring-1 ring-primary/40",
                  (isPast || !hasSlots) && !isSelected && "text-muted-foreground/40 cursor-default",
                  !isSelected && !hasSlots && !isPast && "text-muted-foreground"
                )}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>

      {/* Time slots */}
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
                    const isActive = selectedSlot === slot;
                    return (
                      <motion.button
                        key={slot}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelectSlot(isActive ? null : slot)}
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
    </div>
  );
}

/* ── Step 3: Form + Summary ── */

function StepForm({
  form,
  errors,
  onChange,
  service,
  date,
  slot,
}: {
  form: FormData;
  errors: FormErrors;
  onChange: (field: keyof FormData, value: string) => void;
  service: Service;
  date: string;
  slot: string;
}) {
  const formattedDate = (() => {
    const [y, m, d] = date.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dayNames = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
    return `${dayNames[dateObj.getDay()]}, ${d}.${String(m).padStart(2, "0")}.${y}`;
  })();

  return (
    <div className="space-y-5">
      {/* Form fields */}
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold text-foreground">
            Imię i nazwisko *
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Jan Kowalski"
            className={cn(
              "w-full rounded-[12px] border bg-background px-4 py-3 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/30",
              errors.name ? "border-red-400" : "border-border/60 focus:border-primary/50"
            )}
          />
          {errors.name && (
            <p className="mt-1 text-[12px] font-medium text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-semibold text-foreground">
            Numer telefonu *
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+48 512 345 678"
            className={cn(
              "w-full rounded-[12px] border bg-background px-4 py-3 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/30",
              errors.phone ? "border-red-400" : "border-border/60 focus:border-primary/50"
            )}
          />
          {errors.phone && (
            <p className="mt-1 text-[12px] font-medium text-red-500">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-semibold text-foreground">
            Email <span className="font-normal text-muted-foreground">(opcjonalnie)</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="jan@example.com"
            className="w-full rounded-[12px] border border-border/60 bg-background px-4 py-3 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-[14px] border border-border/60 bg-muted/30 p-4">
        <p className="text-[13px] font-semibold uppercase tracking-[0.5px] text-muted-foreground">
          Podsumowanie
        </p>
        <div className="mt-3 space-y-1.5">
          <p className="text-[15px] font-semibold tracking-[-0.3px] text-foreground">
            {service.name}
          </p>
          <p className="text-[14px] font-medium text-muted-foreground">
            {service.price} zł · {service.duration} min
          </p>
          <p className="text-[14px] font-medium text-muted-foreground">
            {formattedDate} · {slot}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Success Screen ── */

function SuccessScreen({ midwifeName }: { midwifeName: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
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
        Potwierdzenie zostanie wysłane na Twój telefon.
        <br />
        Do zobaczenia u {midwifeName}!
      </motion.p>
    </div>
  );
}

/* ── Main BookingDrawer ── */

export default function BookingDrawer({
  services,
  availability,
  midwifeName,
}: {
  services: ServiceCategory[];
  availability: DaySlots[];
  midwifeName: string;
}) {
  const { isOpen, closeBooking, preSelectedService } = useBooking();

  const [step, setStep] = useState<Step>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  // Reset state when drawer opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedService(preSelectedService);
      setSelectedDate(null);
      setSelectedSlot(null);
      setForm({ name: "", phone: "", email: "" });
      setErrors({});
    }
  }, [isOpen, preSelectedService]);

  // Auto-close after success
  useEffect(() => {
    if (step !== "success") return;
    const timer = setTimeout(closeBooking, 2000);
    return () => clearTimeout(timer);
  }, [step, closeBooking]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleFormChange = useCallback((field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Wpisz imię i nazwisko";
    if (!form.phone.trim()) {
      newErrors.phone = "Wpisz numer telefonu";
    } else if (!PHONE_REGEX.test(form.phone.trim())) {
      newErrors.phone = "Nieprawidłowy numer telefonu";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && selectedService) setStep(2);
    else if (step === 2 && selectedDate && selectedSlot) setStep(3);
    else if (step === 3 && validateForm()) setStep("success");
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  };

  const canProceed =
    (step === 1 && !!selectedService) ||
    (step === 2 && !!selectedDate && !!selectedSlot) ||
    step === 3;

  const stepTitles: Record<1 | 2 | 3, string> = {
    1: "Umów wizytę",
    2: "Wybierz termin",
    3: "Twoje dane",
  };

  const buttonLabels: Record<1 | 2 | 3, string> = {
    1: "Dalej",
    2: "Dalej",
    3: "Potwierdź wizytę",
  };

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

          {/* Drawer panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 36 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-background shadow-2xl sm:max-w-[440px]"
          >
            {step === "success" ? (
              <SuccessScreen midwifeName={midwifeName} />
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-border/40 px-5 pb-4 pt-5">
                  {step === 1 ? (
                    <button
                      onClick={closeBooking}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleBack}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                  )}
                  <div className="flex-1">
                    <h2 className="text-[17px] font-semibold tracking-[-0.4px] text-foreground">
                      {stepTitles[step]}
                    </h2>
                  </div>
                </div>

                {/* Step indicator */}
                <div className="px-5 pt-4">
                  <StepIndicator step={step} />
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto px-5 py-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      {step === 1 && (
                        <StepServices
                          services={services}
                          selectedService={selectedService}
                          onSelect={setSelectedService}
                        />
                      )}
                      {step === 2 && (
                        <StepCalendar
                          availability={availability}
                          selectedDate={selectedDate}
                          selectedSlot={selectedSlot}
                          onSelectDate={setSelectedDate}
                          onSelectSlot={setSelectedSlot}
                        />
                      )}
                      {step === 3 && selectedService && selectedDate && selectedSlot && (
                        <StepForm
                          form={form}
                          errors={errors}
                          onChange={handleFormChange}
                          service={selectedService}
                          date={selectedDate}
                          slot={selectedSlot}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer button */}
                <div className="border-t border-border/40 px-5 pb-8 pt-4 sm:pb-5">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    disabled={!canProceed}
                    className={cn(
                      "w-full rounded-[14px] py-3.5 text-[15px] font-semibold transition-all",
                      canProceed
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    {buttonLabels[step]}
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
