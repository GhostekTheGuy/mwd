export default function CtaSection() {
  return (
    <section className="w-full py-10 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-[18px] lg:px-[120px]">
        <div className="relative overflow-hidden rounded-[28px] bg-secondary px-6 py-16 text-center lg:rounded-[37px] lg:px-12 lg:py-28">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-[180px] w-[180px] rounded-full border border-primary/15 lg:-top-12 lg:-right-6 lg:h-[231px] lg:w-[231px]" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-[180px] w-[180px] rounded-full border border-primary/15 lg:-bottom-12 lg:-left-6 lg:h-[231px] lg:w-[231px]" />

          <h2
            className="mx-auto max-w-[536px] text-[32px] font-medium leading-[40px] tracking-[-1.5px] text-[#363636] lg:text-[47px] lg:leading-[60px] lg:tracking-[-2px]"
            style={{ wordSpacing: "3px" }}
          >
            Zadbaj o siebie i swojego maluszka z MyMidwife
          </h2>

          <a
            href="#"
            className="mt-8 inline-flex h-[50px] items-center justify-center rounded-full bg-primary px-8 text-[17px] font-medium tracking-[-0.36px] text-white lg:mt-10"
          >
            Zacznij teraz
          </a>
        </div>
      </div>
    </section>
  );
}
