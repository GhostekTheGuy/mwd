"use client";

import { BookingProvider } from "@/components/midwife-profile/BookingContext";
import BookingDrawer from "@/components/midwife-profile/BookingDrawer";
import type { ServiceCategory, DaySlots } from "@/lib/data/midwives";

export default function BookingWrapper({
  services,
  availability,
  midwifeName,
  children,
}: {
  services: ServiceCategory[];
  availability: DaySlots[];
  midwifeName: string;
  children: React.ReactNode;
}) {
  return (
    <BookingProvider>
      {children}
      <BookingDrawer
        services={services}
        availability={availability}
        midwifeName={midwifeName}
      />
    </BookingProvider>
  );
}
