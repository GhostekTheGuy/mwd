"use client";

import { X, Heart, Stethoscope } from "lucide-react";

type Role = "patient" | "midwife";

export default function RoleSelection({
  onSelectRole,
  onClose,
}: {
  onSelectRole: (role: Role) => void;
  onClose: () => void;
}) {
  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-background px-5 py-4">
        <div />
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="px-8 pb-8">
        <div className="mx-auto max-w-[380px] space-y-6 pt-2">
          <div className="text-center">
            <h2 className="text-[24px] font-bold tracking-[-0.8px] text-foreground">
              Dołącz do MyMidwife
            </h2>
            <p className="mt-2 text-[14px] font-medium text-muted-foreground">
              Wybierz swój profil, aby kontynuować
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => onSelectRole("patient")}
              className="group flex w-full items-center gap-4 rounded-[16px] border border-border/60 bg-card p-5 text-left transition-all hover:border-primary/40 hover:bg-primary/[0.03] hover:shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-50 text-primary transition-colors group-hover:bg-pink-100">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[16px] font-bold tracking-[-0.3px] text-foreground">
                  Pacjentka
                </p>
                <p className="mt-0.5 text-[13px] font-medium text-muted-foreground">
                  Znajdź położną i umów wizytę
                </p>
              </div>
            </button>

            <button
              onClick={() => onSelectRole("midwife")}
              className="group flex w-full items-center gap-4 rounded-[16px] border border-border/60 bg-card p-5 text-left transition-all hover:border-primary/40 hover:bg-primary/[0.03] hover:shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-50 text-primary transition-colors group-hover:bg-pink-100">
                <Stethoscope className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[16px] font-bold tracking-[-0.3px] text-foreground">
                  Położna
                </p>
                <p className="mt-0.5 text-[13px] font-medium text-muted-foreground">
                  Dołącz jako specjalistka
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
