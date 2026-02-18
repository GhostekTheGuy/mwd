import { CheckCircle } from "lucide-react";

const forPatients = {
  tag: "Dla Pacjentek",
  heading: "Znajdź swoją idealną\nPołożną",
  features: [
    "Przeglądaj zweryfikowane profile położnych",
    "Wsparcie 24/7 na czacie",
    "Dzienniczek objawów i samopoczucia",
  ],
  cta: "Dołącz teraz",
  dashboard: {
    line1: "Jak się",
    line2: "dziś czujesz?",
    emojis: ["😊", "😐", "😔", "😴", "🤒"],
  },
};

const forMidwives = {
  tag: "Dla Położnych",
  heading: "Rozwijaj praktykę\nz MyMidwife",
  features: [
    "Zwiększ widoczność wśród pacjentek",
    "Zarządzaj kalendarzem wizyt",
    "Udostępniaj materiały edukacyjne",
  ],
  cta: "Sprawdź demo",
  stats: {
    title: "Twój profil:",
    items: [
      { label: "wizyty", value: "24", color: "#e352ad" },
      { label: "opinie", value: "47", color: "#e69fcd" },
      { label: "materiały", value: "12", color: "#f5d5e8" },
    ],
  },
};

function FeatureList({
  features,
}: {
  features: string[];
}) {
  return (
    <div className="mt-6 flex flex-col gap-4 lg:mt-8">
      {features.map((feature) => (
        <div key={feature} className="flex items-start gap-3">
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
            <CheckCircle size={16} stroke="#e352ad" strokeWidth={2} />
          </span>
          <span className="text-[17px] font-medium leading-[27px] tracking-[-0.18px] text-[#787878] lg:text-[18px] lg:leading-normal lg:tracking-[-0.3px] lg:text-[#363636]">
            {feature}
          </span>
        </div>
      ))}
    </div>
  );
}

function TextContent({
  tag,
  heading,
  features,
  cta,
}: {
  tag: string;
  heading: string;
  features: string[];
  cta: string;
}) {
  return (
    <div className="flex w-full flex-col justify-center lg:w-1/2">
      <span className="w-fit rounded-full bg-secondary px-5 py-2 text-sm font-medium text-[#363636]">
        {tag}
      </span>
      <h2
        className="mt-5 whitespace-pre-line text-[31px] font-medium leading-[40px] tracking-[-1.28px] text-[#363636] lg:mt-6 lg:text-[42px] lg:leading-[52px] lg:tracking-[-2px]"
        style={{ wordSpacing: "3px" }}
      >
        {heading}
      </h2>
      <FeatureList features={features} />
      <a
        href="#"
        className="mt-6 flex h-[50px] w-fit items-center justify-center rounded-full bg-primary px-8 text-[17px] font-medium tracking-[-0.36px] text-white lg:mt-8"
      >
        {cta}
      </a>
    </div>
  );
}

function PatientDashboard() {
  return (
    <div className="relative flex w-full items-center justify-center lg:w-1/2">
      <div className="h-[380px] w-full rounded-[28px] bg-secondary lg:h-[360px] lg:rounded-[24px]" />
      <div className="absolute bottom-8 left-4 w-[200px] rounded-[18px] bg-card p-5 shadow-lg">
        <p className="text-[17px] font-medium tracking-[-0.3px] text-[#363636]">
          {forPatients.dashboard.line1}
        </p>
        <p className="text-[17px] font-medium tracking-[-0.3px] text-[#363636]">
          {forPatients.dashboard.line2}
        </p>
        <div className="mt-4 flex gap-3">
          {forPatients.dashboard.emojis.map((emoji) => (
            <span
              key={emoji}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-lg"
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MidwifeDashboard() {
  return (
    <div className="relative flex w-full items-center justify-center lg:w-1/2">
      <div className="h-[380px] w-full rounded-[28px] bg-secondary lg:h-[360px] lg:rounded-[24px]" />
      <div className="absolute bottom-8 left-4 w-[200px] rounded-[18px] bg-card p-5 shadow-lg lg:left-auto lg:right-4">
        <p className="text-[14px] font-medium tracking-[-0.2px] text-[#363636]">
          {forMidwives.stats.title}
        </p>
        <div className="mt-4 flex flex-col gap-3">
          {forMidwives.stats.items.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[12px] text-muted-foreground">
                  {item.label}
                </span>
              </div>
              <span className="text-[12px] font-medium text-[#363636]">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="w-full py-10 lg:py-16">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-[18px] lg:gap-12 lg:px-[120px]">
        {/* Wrapper 1 - Dla Pacjentek */}
        <div className="flex flex-col gap-8 rounded-[32px] bg-muted p-6 lg:flex-row lg:gap-10 lg:rounded-[28px] lg:border lg:border-border lg:bg-transparent lg:p-10">
          <TextContent
            tag={forPatients.tag}
            heading={forPatients.heading}
            features={forPatients.features}
            cta={forPatients.cta}
          />
          <PatientDashboard />
        </div>

        {/* Wrapper 2 - Dla Położnych */}
        <div className="flex flex-col-reverse gap-8 rounded-[32px] bg-muted p-6 lg:flex-row lg:gap-10 lg:rounded-[28px] lg:border lg:border-border lg:bg-transparent lg:p-10">
          <MidwifeDashboard />
          <TextContent
            tag={forMidwives.tag}
            heading={forMidwives.heading}
            features={forMidwives.features}
            cta={forMidwives.cta}
          />
        </div>
      </div>
    </section>
  );
}
