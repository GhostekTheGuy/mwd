"use client";

import { BookingModalProvider } from "@/components/midwife-profile/BookingModalContext";
import BookingModal from "@/components/midwife-profile/BookingModal";
import type { ServiceCategory, DaySlots } from "@/lib/data/midwives";

export default function BookingWrapper({
  services,
  availability,
  midwifeName,
  midwifePhoto,
  children,
}: {
  services: ServiceCategory[];
  availability: DaySlots[];
  midwifeName: string;
  midwifePhoto: string;
  children: React.ReactNode;
}) {
  return (
    <BookingModalProvider>
      {children}
      <BookingModal
        services={services}
        availability={availability}
        midwifeName={midwifeName}
        midwifePhoto={midwifePhoto}
      />
    </BookingModalProvider>
  );
}
