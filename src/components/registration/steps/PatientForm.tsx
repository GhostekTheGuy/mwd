"use client";

import { X, ArrowLeft, Heart } from "lucide-react";

export default function PatientForm({
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
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-[24px] font-bold tracking-[-0.8px] text-foreground">
              Utwórz konto
            </h2>
            <p className="mt-2 text-[14px] font-medium text-muted-foreground">
              Zarejestruj się, aby wygodnie rezerwować wizyty.
            </p>
          </div>

          {/* Form fields */}
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

          {/* Submit */}
          <button
            onClick={onSubmit}
            className="w-full rounded-[14px] bg-primary py-3.5 text-[15px] font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            Utwórz konto
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
              onClick={onSubmit}
              className="flex w-full items-center justify-center gap-3 rounded-[14px] border border-border/60 bg-card py-3.5 text-[14px] font-semibold text-foreground transition-all hover:bg-muted/40"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Kontynuuj przez Facebook
            </button>

            <button
              onClick={onSubmit}
              className="flex w-full items-center justify-center gap-3 rounded-[14px] border border-border/60 bg-card py-3.5 text-[14px] font-semibold text-foreground transition-all hover:bg-muted/40"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Kontynuuj z Apple
            </button>

            <button
              onClick={onSubmit}
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
