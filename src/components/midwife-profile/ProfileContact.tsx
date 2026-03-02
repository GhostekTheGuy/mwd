import { Clock, MapPin, Phone, Mail } from "lucide-react";
import type { WorkingHour } from "@/lib/data/midwives";

export default function ProfileContact({
  address,
  phone,
  email,
  workingHours,
}: {
  address: string;
  phone: string;
  email: string;
  workingHours: WorkingHour[];
}) {
  return (
    <div className="space-y-4">
      {/* Working hours */}
      <div className="rounded-[18px] border border-border/60 bg-card p-5">
        <div className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.3px] text-foreground">
          <Clock className="h-5 w-5 text-primary" />
          Godziny przyjęć
        </div>
        <div className="mt-3 space-y-1.5">
          {workingHours.map((wh) => (
            <div
              key={wh.day}
              className="flex items-center justify-between text-[14px]"
            >
              <span className="font-medium text-foreground/70">{wh.day}</span>
              <span className="font-semibold text-foreground">
                {wh.open === "—" ? "Nieczynne" : `${wh.open} – ${wh.close}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Map placeholder */}
      <div className="overflow-hidden rounded-[18px] border border-border/60">
        <div className="flex h-[160px] items-center justify-center bg-muted/40">
          <div className="text-center">
            <MapPin className="mx-auto h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 max-w-[200px] text-[13px] font-medium leading-snug text-muted-foreground">
              {address}
            </p>
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="rounded-[18px] border border-border/60 bg-card p-5">
        <div className="space-y-3">
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-3 text-[14px] font-medium text-foreground/80 transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4 text-primary" />
            {phone}
          </a>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3 text-[14px] font-medium text-foreground/80 transition-colors hover:text-primary"
          >
            <Mail className="h-4 w-4 text-primary" />
            {email}
          </a>
        </div>
      </div>
    </div>
  );
}
