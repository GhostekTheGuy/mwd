import {
  MessageCircleHeart,
  BookOpenCheck,
  CalendarHeart,
  Baby,
  Stethoscope,
  NotebookPen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const services: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Stethoscope,
    title: "Opieka w ciąży",
    description:
      "Znajdź położną, która poprowadzi Cię przez ciążę — od pierwszych tygodni aż do rozwiązania.",
  },
  {
    icon: MessageCircleHeart,
    title: "Czat z położną",
    description:
      "Napisz do swojej położnej o każdej porze. Szybka odpowiedź na pytania i wątpliwości, bez czekania.",
  },
  {
    icon: CalendarHeart,
    title: "Wizyty patronażowe",
    description:
      "Umawiaj wizyty domowe po porodzie — kontrola zdrowia mamy i noworodka w jednym miejscu.",
  },
  {
    icon: Baby,
    title: "Opieka nad noworodkiem",
    description:
      "Wsparcie w kąpieli, pielęgnacji i karmieniu maluszka. Ekspertki dostępne na wyciągnięcie ręki.",
  },
  {
    icon: BookOpenCheck,
    title: "Baza wiedzy",
    description:
      "Sprawdzone artykuły i materiały od doświadczonych położnych, dopasowane do Twojego etapu.",
  },
  {
    icon: NotebookPen,
    title: "Dziennik objawów",
    description:
      "Monitoruj wagę, ciśnienie i samopoczucie. Twoja położna widzi postępy i reaguje na czas.",
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-[1200px] px-[120px]">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <span className="w-fit rounded-full bg-secondary px-5 py-2 text-sm font-medium text-[#363636]">
            Funkcje
          </span>
          <h2
            className="mt-6 text-[40px] font-medium leading-[50px] tracking-[-2px] text-[#363636]"
            style={{ wordSpacing: "3px" }}
          >
            Wszystko, czego potrzebujesz
            <br />
            w jednej aplikacji
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col rounded-[20px] border border-border p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                <service.icon size={22} stroke="#e352ad" strokeWidth={2} />
              </span>

              <h3 className="mt-6 text-[20px] font-semibold tracking-[-0.4px] text-[#363636]">
                {service.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[24px] tracking-[-0.2px] text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
