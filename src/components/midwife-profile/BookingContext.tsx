"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { Service } from "@/lib/data/midwives";

interface BookingContextValue {
  openBooking: (preSelectedService?: Service) => void;
  closeBooking: () => void;
  isOpen: boolean;
  preSelectedService: Service | null;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState<Service | null>(null);

  const openBooking = useCallback((service?: Service) => {
    setPreSelectedService(service ?? null);
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking, isOpen, preSelectedService }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
