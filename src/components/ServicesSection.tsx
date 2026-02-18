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
      "Znajdź położną, która poprowadzi Cię przez ciążę, od pierwszych tygodni aż do rozwiązania.",
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
      "Umawiaj wizyty domowe po porodzie. Kontrola zdrowia mamy i noworodka w jednym miejscu.",
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
    <section className="w-full py-10 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-[18px] lg:px-[120px]">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <span className="w-fit rounded-full bg-secondary px-5 py-2 text-sm font-medium text-[#363636]">
            Funkcje
          </span>
          <h2
            className="mt-6 text-[32px] font-medium leading-[40px] tracking-[-1.5px] text-[#363636] lg:text-[40px] lg:leading-[50px] lg:tracking-[-2px]"
            style={{ wordSpacing: "3px" }}
          >
            Wszystko, czego potrzebujesz
            <br />
            w jednej aplikacji
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 lg:mt-12 lg:grid-cols-3 lg:gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col rounded-[20px] border border-border p-6 lg:p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                <service.icon size={22} stroke="#e352ad" strokeWidth={2} />
              </span>

              <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.4px] text-[#363636] lg:mt-6">
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
