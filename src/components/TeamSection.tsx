const midwives = [
  {
    name: "Anna Kowalska",
    specialty: "Położna środowiskowa",
    bgColor: "#f5e6f0",
  },
  {
    name: "Maria Nowak",
    specialty: "Położna laktacyjna",
    bgColor: "#e6eef5",
  },
  {
    name: "Katarzyna Wiśniewska",
    specialty: "Edukatorka prenatalna",
    bgColor: "#f0e6f5",
  },
];

export default function TeamSection() {
  return (
    <section className="w-full py-10 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-[18px] lg:px-[120px]">
        {/* Heading */}
        <div className="flex flex-col items-center">
          <span className="w-fit rounded-full bg-secondary px-5 py-2 text-[15px] font-medium tracking-[-0.3px] text-[#363636]">
            Położne
          </span>
          <h2
            className="mt-6 text-center text-[33px] font-medium leading-[42px] tracking-[-1.4px] text-[#363636] lg:text-[47px] lg:leading-[60px] lg:tracking-[-2px]"
            style={{ wordSpacing: "3px" }}
          >
            Poznaj nasze sprawdzone
            <br />
            ekspertki od opieki położniczej
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="mt-10 flex flex-col gap-5 lg:mt-12 lg:grid lg:grid-cols-3">
          {midwives.map((midwife) => (
            <div
              key={midwife.name}
              className="relative overflow-hidden rounded-[26px]"
              style={{ height: 420 }}
            >
              {/* Background */}
              <div
                className="absolute inset-x-0 bottom-0 h-[294px] rounded-[22px]"
                style={{ backgroundColor: midwife.bgColor }}
              />

              {/* Portrait image */}
              <img
                src="/hero_png.png"
                alt={midwife.name}
                className="absolute inset-0 h-full w-full rounded-[26px] object-cover object-top"
              />

              {/* Info Wrapper */}
              <div className="absolute inset-x-4 bottom-4 rounded-[24px] bg-[#fafafa] px-6 py-5">
                <p className="text-[13px] font-medium text-[#363636]">
                  {midwife.specialty}
                </p>
                <p className="mt-2 text-[22px] font-medium leading-[31px] tracking-[-0.48px] text-[#1f1f1f] lg:text-[26px] lg:leading-[36px] lg:tracking-[-0.56px]">
                  {midwife.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
