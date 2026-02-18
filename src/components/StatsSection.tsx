const stats = [
  { value: "98", suffix: "%", label: "Zadowolonych mam" },
  { value: "500", suffix: "+", label: "Zweryfikowanych położnych" },
  { value: "3000", suffix: "+", label: "Pacjentek w opiece" },
  { value: "24", suffix: "/7", label: "Dostęp do czatu" },
];

export default function StatsSection() {
  return (
    <section className="w-full pb-8">
      <div className="mx-auto max-w-[1200px] px-[120px]">
        <div className="flex items-center justify-center rounded-[32px] bg-muted py-16">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex items-center">
              {/* Stat */}
              <div className="flex flex-col items-center px-8">
                <div className="flex items-baseline">
                  <span className="text-[62px] font-medium leading-[1.2] text-accent">
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="text-[64px] font-medium leading-[1.2] text-accent">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <span className="mt-1 text-[18px] font-medium tracking-[-0.2px] text-muted-foreground">
                  {stat.label}
                </span>
              </div>

              {/* Pink dot separator */}
              {index < stats.length - 1 && (
                <div className="h-[7px] w-[7px] flex-shrink-0 rounded-full bg-accent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
