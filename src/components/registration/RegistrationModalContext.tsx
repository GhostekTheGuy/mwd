"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface RegistrationModalContextValue {
  isOpen: boolean;
  openRegistration: () => void;
  closeRegistration: () => void;
}

const RegistrationModalContext = createContext<RegistrationModalContextValue | null>(null);

export function RegistrationModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openRegistration = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeRegistration = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <RegistrationModalContext.Provider value={{ isOpen, openRegistration, closeRegistration }}>
      {children}
    </RegistrationModalContext.Provider>
  );
}

export function useRegistrationModal() {
  const ctx = useContext(RegistrationModalContext);
  if (!ctx) throw new Error("useRegistrationModal must be used within RegistrationModalProvider");
  return ctx;
}
