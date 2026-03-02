"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { Service } from "@/lib/data/midwives";

interface BookingModalContextValue {
  isOpen: boolean;
  selectedService: Service | null;
  openBooking: (service: Service) => void;
  closeBooking: () => void;
}

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const openBooking = useCallback((service: Service) => {
    setSelectedService(service);
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <BookingModalContext.Provider value={{ isOpen, selectedService, openBooking, closeBooking }}>
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) throw new Error("useBookingModal must be used within BookingModalProvider");
  return ctx;
}
