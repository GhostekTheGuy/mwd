import { Suspense } from "react";
import MidwifeSearch from "@/components/MidwifeSearch";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Znajdź położną – MyMidwife",
  description:
    "Wyszukaj idealną położną dopasowaną do Twoich potrzeb. Sprawdź specjalizacje, dostępność i umów wizytę online.",
};

export default function FindMidwifePage() {
  return (
    <Suspense>
      <MidwifeSearch />
    </Suspense>
  );
}
