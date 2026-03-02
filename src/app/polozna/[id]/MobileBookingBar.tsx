"use client";

import { Calendar } from "lucide-react";
import { useBooking } from "@/components/midwife-profile/BookingContext";

export default function MobileBookingBar({
  name,
  price,
}: {
  name: string;
  price: number;
}) {
  const { openBooking } = useBooking();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-[18px] py-3">
        <div>
          <p className="text-[13px] font-medium text-muted-foreground">
            od {price} zł
          </p>
          <p className="text-[14px] font-semibold tracking-[-0.3px] text-foreground">
            {name}
          </p>
        </div>
        <button
          onClick={() => openBooking()}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[14px] font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97]"
        >
          <Calendar className="h-4 w-4" />
          Umów wizytę
        </button>
      </div>
    </div>
  );
}
