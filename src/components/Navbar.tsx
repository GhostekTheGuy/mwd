export default function Navbar() {
  return (
    <nav className="w-full py-5">
      <div className="mx-auto max-w-[1200px] px-[120px]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src="/logos.png" alt="MyMidwife" className="h-7" />
          </a>

          {/* Nav Links */}
          <div className="flex items-center gap-8">
            <a
              href="#"
              className="text-[17px] font-medium text-[#363636] tracking-[-0.54px]"
            >
              Wyzwanie
            </a>
            <a
              href="#"
              className="text-[16px] font-medium text-[#363636] tracking-[-0.54px]"
            >
              Położne
            </a>
            <a
              href="#"
              className="text-[17px] font-medium text-[#363636] tracking-[-0.54px]"
            >
              Baza wiedzy
            </a>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            {/* Search Button */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-muted"
              aria-label="Szukaj"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.25 12.5C10.1495 12.5 12.5 10.1495 12.5 7.25C12.5 4.35051 10.1495 2 7.25 2C4.35051 2 2 4.35051 2 7.25C2 10.1495 4.35051 12.5 7.25 12.5Z"
                  stroke="#363636"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 11L14 14"
                  stroke="#363636"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Get Started Button */}
            <a
              href="#"
              className="flex h-[50px] items-center justify-center rounded-full bg-accent px-7 text-[17px] font-medium tracking-[-0.36px] text-white"
            >
              Dołącz teraz
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
