"use client";

const footerLinks = [
  {
    title: "Nawigacja",
    links: ["Strona główna", "O nas", "Kontakt", "FAQ"],
  },
  {
    title: "Dla pacjentek",
    links: ["Znajdź położną", "Baza wiedzy", "Dziennik objawów", "Czat"],
  },
  {
    title: "Dla położnych",
    links: ["Dołącz do nas", "Panel położnej", "Materiały", "Cennik"],
  },
  {
    title: "Informacje",
    links: ["Regulamin", "Polityka prywatności"],
  },
];

export default function Footer() {
  return (
    <footer className="w-full pb-10 pt-6 lg:pb-16 lg:pt-10">
      <div className="mx-auto max-w-[1200px] px-[18px] lg:px-[120px]">
        {/* Newsletter */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <h2
            className="text-[32px] font-medium leading-[40px] tracking-[-1.5px] text-[#363636] lg:text-[48px] lg:leading-[60px] lg:tracking-[-2px]"
            style={{ wordSpacing: "3px" }}
          >
            Zapisz się do
            <br />
            newslettera
          </h2>

          <div className="w-full lg:max-w-[548px]">
            <p className="text-[20px] font-medium tracking-[-0.66px] text-[#363636]">
              Bądź na bieżąco
            </p>
            <div className="mt-4 flex gap-3">
              <input
                type="email"
                placeholder="adres@email.com"
                className="h-14 flex-1 rounded-[14px] bg-muted px-8 text-[16px] text-[#292929] outline-none placeholder:text-[#999]"
              />
              <button className="h-14 rounded-[14px] bg-primary px-6 text-[16px] font-medium text-white lg:px-8">
                Zapisz
              </button>
            </div>
            <p className="mt-3 text-[15px] font-medium tracking-[-0.36px] text-[#858585] lg:text-[17px]">
              Zapisując się akceptujesz regulamin i politykę prywatności
            </p>
          </div>
        </div>

        {/* Separator */}
        <div className="my-10 h-px bg-black/15 lg:my-14" />

        {/* Bottom Grid */}
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          {/* Branding */}
          <div className="lg:max-w-[437px]">
            <a href="/" className="flex items-center">
              <img src="/logos.png" alt="MyMidwife" className="h-7" />
            </a>
            <p className="mt-5 text-[18px] font-medium leading-[32px] tracking-[-0.66px] text-[#787878] lg:text-[21px]">
              Platforma łącząca kobiety z najlepszymi położnymi w Polsce
            </p>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 gap-8 lg:flex lg:gap-14">
            {footerLinks.map((col) => (
              <div key={col.title}>
                <p className="text-[16px] font-medium tracking-[-0.36px] text-[#363636] lg:text-[17px]">
                  {col.title}
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-[15px] font-medium tracking-[-0.48px] text-[#474747]"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
