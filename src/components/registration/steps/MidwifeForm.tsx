"use client";

import { X, ArrowLeft, Stethoscope, Upload } from "lucide-react";

export default function MidwifeForm({
  onBack,
  onClose,
  onSubmit,
}: {
  onBack: () => void;
  onClose: () => void;
  onSubmit: () => void;
}) {
  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-background px-5 py-4">
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
      <div className="px-8 pb-8">
        <div className="mx-auto max-w-[340px] space-y-6 pt-4">
          {/* Title with role badge */}
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-pink-50">
              <Stethoscope className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-[24px] font-bold tracking-[-0.8px] text-foreground">
              Dołącz jako położna
            </h2>
            <p className="mt-2 text-[14px] font-medium text-muted-foreground">
              Utwórz profil specjalistki i docieraj do pacjentek.
            </p>
          </div>

          {/* Personal info */}
          <div className="space-y-2.5">
            <div className="flex gap-2.5">
              <input
                type="text"
                placeholder="Imię"
                className="w-full rounded-[14px] border border-border/60 bg-background px-4 py-3.5 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
              />
              <input
                type="text"
                placeholder="Nazwisko"
                className="w-full rounded-[14px] border border-border/60 bg-background px-4 py-3.5 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <input
              type="email"
              placeholder="Adres e-mail"
              className="w-full rounded-[14px] border border-border/60 bg-background px-4 py-3.5 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="tel"
              placeholder="Numer telefonu"
              className="w-full rounded-[14px] border border-border/60 bg-background px-4 py-3.5 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="password"
              placeholder="Hasło"
              className="w-full rounded-[14px] border border-border/60 bg-background px-4 py-3.5 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Professional info — grouped in a card */}
          <div className="rounded-[16px] bg-muted/40 p-4 space-y-3">
            <p className="text-[13px] font-semibold tracking-[-0.2px] text-foreground">
              Dane zawodowe
            </p>
            <input
              type="text"
              placeholder="Numer PWZ"
              className="w-full rounded-[14px] border border-border/60 bg-background px-4 py-3.5 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="text"
              placeholder="Specjalizacje (np. laktacyjna, patronażowa)"
              className="w-full rounded-[14px] border border-border/60 bg-background px-4 py-3.5 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="text"
              placeholder="Miasto"
              className="w-full rounded-[14px] border border-border/60 bg-background px-4 py-3.5 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
            />

            {/* File upload mockup */}
            <button
              type="button"
              className="flex w-full flex-col items-center gap-1.5 rounded-[14px] border-2 border-dashed border-border/60 bg-background/60 px-4 py-5 text-center transition-all hover:border-primary/40 hover:bg-primary/[0.02]"
            >
              <Upload className="h-5 w-5 text-muted-foreground/50" />
              <p className="text-[13px] font-medium text-muted-foreground">
                Prześlij skan legitimacji PWZ
              </p>
              <p className="text-[11px] text-muted-foreground/50">
                PDF, JPG lub PNG — maks. 5 MB
              </p>
            </button>
          </div>

          {/* Submit */}
          <button
            onClick={onSubmit}
            className="w-full rounded-[14px] bg-primary py-3.5 text-[15px] font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            Zarejestruj się
          </button>

          {/* Terms */}
          <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
            Rejestrując się, akceptujesz{" "}
            <span className="text-primary">Regulamin</span>{" "}
            oraz{" "}
            <span className="text-primary">Politykę prywatności</span>.
          </p>
        </div>
      </div>
    </>
  );
}
