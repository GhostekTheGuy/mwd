import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Zweryfikowane położne",
    description:
      "Każda położna przechodzi weryfikację kwalifikacji i doświadczenia, abyś miała pewność najwyższej jakości opieki.",
  },
  {
    title: "Kontakt 24/7",
    description:
      "Czat z Twoją położną dostępny o każdej porze — bo pytania i wątpliwości nie czekają do godzin pracy.",
  },
  {
    title: "Wiedza od ekspertek",
    description:
      "Sprawdzone materiały edukacyjne tworzone przez doświadczone położne, dopasowane do etapu Twojej ciąży.",
  },
];

export default function VisionSection() {
  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-[1200px] px-[120px]">
        <div className="flex gap-16">
          {/* Left Column */}
          <div className="flex w-5/12 flex-col">
            <span className="w-fit rounded-full bg-secondary px-5 py-2 text-sm font-medium text-[#363636]">
              Nasza misja
            </span>

            <h2
              className="mt-8 text-[40px] font-medium leading-[50px] tracking-[-2px] text-[#363636]"
              style={{ wordSpacing: "3px" }}
            >
              Łączymy kobiety
              <br />
              z najlepszymi
              <br />
              ekspertkami
            </h2>

            <a
              href="#"
              className="mt-10 flex h-[50px] w-fit items-center justify-center rounded-full bg-primary px-8 text-[17px] font-medium tracking-[-0.36px] text-white"
            >
              O nas
            </a>
          </div>

          {/* Right Column - Cards */}
          <div className="flex w-7/12 flex-col gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[20px] border border-border p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                    <CheckCircle
                      size={20}
                      stroke="#e352ad"
                      strokeWidth={2}
                    />
                  </span>
                  <h3 className="text-[22px] font-medium tracking-[-0.5px] text-[#363636]">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-4 text-[17px] leading-[28px] tracking-[-0.2px] text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
