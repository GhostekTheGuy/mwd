"use client";

import { useRef, useState, useEffect } from "react";
import { CheckCircle, Bell, Stethoscope, UserRound } from "lucide-react";
import { motion, useInView } from "motion/react";
import { InteractiveHoverButton } from "./InteractiveHoverButton";

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
      <span className="w-fit rounded-[9px] bg-secondary px-5 py-2 text-sm font-medium text-[#363636]">
        {tag}
      </span>
      <h2
        className="mt-5 whitespace-pre-line text-[31px] font-medium leading-[40px] tracking-[-1.28px] text-[#363636] lg:mt-6 lg:text-[42px] lg:leading-[52px] lg:tracking-[-2px]"
        style={{ wordSpacing: "3px" }}
      >
        {heading}
      </h2>
      <FeatureList features={features} />
      <InteractiveHoverButton className="mt-6 lg:mt-8">
        {cta}
      </InteractiveHoverButton>
    </div>
  );
}

/* ── Typing indicator dots ── */
function TypingDots() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-[5px] w-[5px] rounded-full bg-[#ccc]"
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── Mini stat card inside bg panel ── */
function MiniCard({
  inView,
  delay,
  children,
  className = "",
}: {
  inView: boolean;
  delay: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`rounded-[14px] bg-card/90 p-3 shadow-sm backdrop-blur-sm ${className}`}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Chat message bubble ── */
function ChatBubble({
  children,
  isBot,
  inView,
  delay,
  className = "",
}: {
  children: React.ReactNode;
  isBot: boolean;
  inView: boolean;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`flex ${isBot ? "justify-start" : "justify-end"}`}
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.95 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 ${
          isBot
            ? "rounded-bl-md bg-card shadow-sm"
            : "rounded-br-md bg-[#e352ad] text-white"
        } ${className}`}
      >
        {children}
      </div>
    </motion.div>
  );
}

/* ── Chat-style PatientDashboard ── */
function PatientDashboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [step, setStep] = useState(0);
  // 0: init, 1: emojis in, 2: emoji selected + user reply, 3: bot response, 4: notification popup
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function runCycle(offset: number) {
      timers.push(
        setTimeout(() => { setStep(1); setShowNotif(false); }, offset),
        setTimeout(() => setStep(2), offset + 1600),
        setTimeout(() => setStep(3), offset + 2800),
        setTimeout(() => setShowNotif(true), offset + 4200),
        setTimeout(() => setShowNotif(false), offset + 6500),
      );
    }

    runCycle(800);
    const loop = setInterval(() => runCycle(0), 7500);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [inView]);

  return (
    <div
      ref={ref}
      className="relative flex w-full items-center justify-center lg:w-1/2"
    >
      <motion.div
        className="relative flex h-[380px] w-full flex-col overflow-hidden rounded-[28px] bg-secondary lg:h-[360px] lg:rounded-[24px]"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* ── Chat header ── */}
        <motion.div
          className="relative z-10 flex items-center justify-between border-b border-[#e8e8e8]/60 bg-card/80 px-4 py-2.5 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#e352ad]/12">
              <Stethoscope size={14} className="text-[#e352ad]" />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
            </div>
            <div>
              <p className="text-[12px] font-semibold leading-tight tracking-[-0.2px] text-[#363636]">
                MyMidwife
              </p>
              <p className="text-[9px] text-green-600">online</p>
            </div>
          </div>
          <div className="relative flex items-center gap-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary/80">
              <Bell size={12} className="text-[#363636]/50" />
            </div>
            {/* Notification badge */}
            <motion.span
              className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#e352ad] text-[6px] font-bold text-white"
              initial={{ scale: 0 }}
              animate={{ scale: showNotif ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              1
            </motion.span>
            {/* Notification popup rendered via portal-like approach — see below */}
          </div>
        </motion.div>

        {/* ── Chat messages area ── */}
        <div className="relative z-10 flex flex-1 flex-col gap-2 overflow-hidden px-3 py-3">
          {/* Moving gradient bg */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(227,82,173,0.06) 0%, transparent 60%)",
            }}
            animate={{ x: ["-15%", "15%", "-15%"], y: ["-10%", "10%", "-10%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Bot greeting */}
          <ChatBubble isBot inView={inView} delay={0.2}>
            <p className="text-[11px] leading-relaxed text-[#363636]">
              Cześć Anna! 👋
            </p>
          </ChatBubble>

          {/* Bot mood question with emojis */}
          <ChatBubble isBot inView={inView} delay={0.5}>
            <p className="text-[11px] leading-relaxed text-[#363636]">
              Jak się dziś czujesz?
            </p>
            <div className="mt-2 flex gap-1.5">
              {forPatients.dashboard.emojis.map((emoji, i) => (
                <motion.span
                  key={emoji}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-sm"
                  initial={{ scale: 0 }}
                  animate={
                    inView
                      ? {
                          scale: step >= 2 && i === 0 ? 1.15 : step >= 2 && i !== 0 ? 0.85 : 1,
                          opacity: step >= 2 && i !== 0 ? 0.4 : 1,
                          backgroundColor:
                            step >= 2 && i === 0
                              ? "rgba(227,82,173,0.15)"
                              : "hsl(var(--secondary))",
                        }
                      : { scale: 0 }
                  }
                  transition={
                    step < 2
                      ? { type: "spring", stiffness: 400, damping: 15, delay: 0.7 + i * 0.06 }
                      : { duration: 0.3, ease: "easeOut" }
                  }
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </ChatBubble>

          {/* User reply (after emoji selected) */}
          {step >= 2 && (
            <ChatBubble isBot={false} inView={inView} delay={0}>
              <p className="text-[11px]">Czuję się świetnie! 😊</p>
            </ChatBubble>
          )}

          {/* Bot typing indicator (before response) */}
          {step === 2 && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-2xl rounded-bl-md bg-card px-3 py-2.5 shadow-sm">
                <TypingDots />
              </div>
            </motion.div>
          )}

          {/* Bot response */}
          {step >= 3 && (
            <ChatBubble isBot inView={inView} delay={0}>
              <p className="text-[11px] leading-relaxed text-[#363636]">
                Super! 🎉 Twój nastrój się poprawia — to już 3 dzień z rzędu!
              </p>
            </ChatBubble>
          )}
        </div>

        {/* ── Chat input bar ── */}
        <motion.div
          className="relative z-10 flex items-center gap-2 border-t border-[#e8e8e8]/60 bg-card/80 px-3 py-2.5 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex h-8 flex-1 items-center rounded-full bg-secondary/80 px-3">
            <span className="text-[10px] text-[#bbb]">Napisz wiadomość...</span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e352ad]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Notification popup (outside overflow-hidden, clipped to parent) ── */}
      <motion.div
        className="pointer-events-none absolute right-3 top-[48px] z-30 flex w-[210px] items-start gap-2.5 rounded-2xl border border-[#f0f0f0] bg-card px-3.5 py-3 shadow-xl"
        initial={{ opacity: 0, y: 8, scale: 0.9 }}
        animate={
          showNotif
            ? { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" as const }
            : { opacity: 0, y: 8, scale: 0.9, pointerEvents: "none" as const }
        }
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#e352ad]/10">
          <Bell size={12} className="text-[#e352ad]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[8px] font-semibold uppercase tracking-wider text-[#aaa]">
            Przypomnienie
          </p>
          <p className="mt-0.5 text-[11px] font-semibold leading-snug tracking-[-0.2px] text-[#363636]">
            Wizyta — Śr, 19 lut
          </p>
          <p className="text-[9px] leading-snug text-[#999]">
            dr Kowalska, godz. 10:00
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Animated counter ── */
function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  inView,
  delay,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  inView: boolean;
  delay: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      const duration = 1200;
      const steps = 30;
      const stepTime = duration / steps;
      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(value * eased));
        if (step >= steps) clearInterval(interval);
      }, stepTime);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [inView, value, delay]);

  return (
    <span>
      {prefix}
      {display.toLocaleString("pl-PL")}
      {suffix}
    </span>
  );
}

/* ── Star rating display ── */
function StarRating({ rating, inView }: { rating: number; inView: boolean }) {
  return (
    <div className="flex items-center justify-center gap-[2px]">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.svg
          key={star}
          width="10"
          height="10"
          viewBox="0 0 20 20"
          initial={{ opacity: 0, scale: 0 }}
          animate={
            inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
          }
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15,
            delay: 0.8 + star * 0.06,
          }}
        >
          <path
            d="M10 1l2.47 5.01L18 6.87l-4 3.9.94 5.5L10 13.47l-4.94 2.8.94-5.5-4-3.9 5.53-.86z"
            fill={star <= Math.floor(rating) ? "#e352ad" : "none"}
            stroke="#e352ad"
            strokeWidth="1.5"
          />
        </motion.svg>
      ))}
    </div>
  );
}

/* ── Revenue line chart ── */
function RevenueChart({ inView }: { inView: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(280);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setCw(Math.round(entry.contentRect.width));
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const rawValues = [4.2, 5.1, 4.8, 6.3, 7.0, 8.4];
  const h = 52;
  const padT = 14;
  const padB = 8;
  const padX = 8;
  const chartH = h - padT - padB;
  const chartW = cw - padX * 2;

  const minV = 3;
  const maxV = 10;

  const points = rawValues.map((v, i) => ({
    x: padX + (i / (rawValues.length - 1)) * chartW,
    y: padT + chartH - ((v - minV) / (maxV - minV)) * chartH,
  }));

  function smoothPath(pts: { x: number; y: number }[]) {
    if (pts.length < 2) return "";
    let d = `M${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(pts.length - 1, i + 2)];
      const t = 0.3;
      d += ` C${p1.x + (p2.x - p0.x) * t},${p1.y + (p2.y - p0.y) * t} ${p2.x - (p3.x - p1.x) * t},${p2.y - (p3.y - p1.y) * t} ${p2.x},${p2.y}`;
    }
    return d;
  }

  const linePath = smoothPath(points);
  const bottom = padT + chartH;
  const areaPath = `${linePath} L${points[points.length - 1].x},${bottom} L${points[0].x},${bottom} Z`;
  const gridYs = [4, 6, 8].map((v) => padT + chartH - ((v - minV) / (maxV - minV)) * chartH);
  const lastPt = points[points.length - 1];
  const tooltipW = 42;
  const tooltipH = 12;
  // Keep tooltip inside SVG bounds
  const ttX = Math.min(lastPt.x, cw - tooltipW / 2);

  return (
    <div ref={containerRef} className="mt-1">
      <svg
        width={cw}
        height={h}
        viewBox={`0 0 ${cw} ${h}`}
        className="w-full"
      >
        {gridYs.map((gy, i) => (
          <line
            key={i}
            x1={0}
            y1={gy}
            x2={cw}
            y2={gy}
            stroke="#ececec"
            strokeWidth="0.6"
            strokeDasharray="4,4"
          />
        ))}

        <motion.path
          d={areaPath}
          fill="url(#midwifeRevenueGrad)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        />

        <motion.path
          d={linePath}
          fill="none"
          stroke="#e352ad"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            inView
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
        />

        {points.map((pt, i) => (
          <motion.circle
            key={i}
            cx={pt.x}
            cy={pt.y}
            r="2.5"
            fill="white"
            stroke="#e352ad"
            strokeWidth="1.4"
            initial={{ scale: 0, opacity: 0 }}
            animate={
              inView
                ? { scale: 1, opacity: 1 }
                : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 0.2, delay: 0.8 + i * 0.1 }}
          />
        ))}

        {/* Pulse on last dot */}
        <motion.circle
          cx={lastPt.x}
          cy={lastPt.y}
          r="5"
          fill="#e352ad"
          opacity={0.15}
          initial={{ scale: 0 }}
          animate={inView ? { scale: [1, 1.8, 1] } : { scale: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1.9,
            ease: "easeInOut",
          }}
        />
        <motion.circle
          cx={lastPt.x}
          cy={lastPt.y}
          r="3.2"
          fill="#e352ad"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, delay: 1.8 }}
        />

        {/* Tooltip */}
        <motion.g
          initial={{ opacity: 0, y: 4 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
          transition={{ duration: 0.3, delay: 2.0 }}
        >
          <rect
            x={ttX - tooltipW / 2}
            y={lastPt.y - tooltipH - 5}
            width={tooltipW}
            height={tooltipH}
            rx="4"
            fill="#e352ad"
          />
          <text
            x={ttX}
            y={lastPt.y - tooltipH / 2 - 2}
            textAnchor="middle"
            fontSize="7"
            fontWeight="600"
            fontFamily="system-ui"
            fill="white"
          >
            8 450 zł
          </text>
        </motion.g>

        <defs>
          <linearGradient id="midwifeRevenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e352ad" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#e352ad" stopOpacity="0.01" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ── Animated MidwifeDashboard ── */
function MidwifeDashboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFeedback, setActiveFeedback] = useState(0);

  const feedbacks = [
    { name: "Ola M.", text: "Świetna opieka, polecam!", stars: 5 },
    { name: "Kasia W.", text: "Profesjonalizm i ciepło.", stars: 5 },
    { name: "Ania K.", text: "Najlepsza położna!", stars: 4 },
  ];

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActiveFeedback((prev) => (prev + 1) % feedbacks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [inView, feedbacks.length]);

  const months = ["Wrz", "Paź", "Lis", "Gru", "Sty", "Lut"];

  return (
    <div
      ref={ref}
      className="relative flex w-full items-center justify-center lg:w-1/2"
    >
      <motion.div
        className="relative flex h-[380px] w-full flex-col gap-2 overflow-hidden rounded-[28px] bg-secondary p-3 lg:h-[360px] lg:rounded-[24px]"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Moving gradient overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(227,82,173,0.08) 0%, transparent 60%)",
          }}
          animate={{
            x: ["15%", "-15%", "15%"],
            y: ["10%", "-10%", "10%"],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Header ── */}
        <motion.div
          className="relative z-10 flex items-center justify-between px-0.5"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e352ad]/15">
              <Stethoscope size={12} className="text-[#e352ad]" />
            </div>
            <div>
              <p className="text-[10px] leading-tight text-[#363636]/60">Panel</p>
              <p className="text-[12px] font-semibold leading-tight tracking-[-0.2px] text-[#363636]">
                dr Kowalska
              </p>
            </div>
          </div>
          <motion.div
            className="flex h-7 w-7 items-center justify-center rounded-full bg-card/80"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Bell size={12} className="text-[#363636]/50" />
          </motion.div>
        </motion.div>

        {/* ── 3 KPI cards ── */}
        <div className="relative z-10 flex gap-2">
          {[
            {
              label: "Pacjentki",
              value: 128,
              suffix: "",
              change: "+12 ten mies.",
              delay: 0.3,
              countDelay: 0.5,
            },
            {
              label: "Przychód",
              value: 8450,
              suffix: " zł",
              change: "+23%",
              delay: 0.4,
              countDelay: 0.6,
            },
            {
              label: "Ocena",
              value: 0,
              suffix: "",
              change: "",
              delay: 0.5,
              countDelay: 0,
            },
          ].map((kpi) => (
            <MiniCard
              key={kpi.label}
              inView={inView}
              delay={kpi.delay}
              className="flex-1 py-2 text-center"
            >
              <p className="text-[8px] font-medium uppercase tracking-wider text-[#aaa]">
                {kpi.label}
              </p>
              <p className="mt-0.5 text-[15px] font-bold leading-tight tracking-[-0.5px] text-[#363636]">
                {kpi.value > 0 ? (
                  <AnimatedCounter
                    value={kpi.value}
                    suffix={kpi.suffix}
                    inView={inView}
                    delay={kpi.countDelay}
                  />
                ) : (
                  "4.9"
                )}
              </p>
              {kpi.change ? (
                <motion.p
                  className="mt-px text-[7px] font-medium text-green-600"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  {kpi.change}
                </motion.p>
              ) : (
                <div className="mt-px">
                  <StarRating rating={4.9} inView={inView} />
                </div>
              )}
            </MiniCard>
          ))}
        </div>

        {/* ── Revenue chart ── */}
        <MiniCard inView={inView} delay={0.55} className="relative z-10 flex-shrink-0 pb-1.5 pt-2">
          <div className="flex items-center justify-between">
            <p className="text-[8px] font-medium uppercase tracking-wider text-[#aaa]">
              Przychód (6 mies.)
            </p>
            <motion.span
              className="rounded-full bg-green-500/10 px-1.5 py-[1px] text-[7px] font-semibold text-green-600"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.2 }}
            >
              ↑ 42%
            </motion.span>
          </div>
          <RevenueChart inView={inView} />
          <div className="flex justify-between">
            {months.map((m, i) => (
              <motion.span
                key={m}
                className="text-center text-[7px] text-[#c0c0c0]"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.9 + i * 0.05 }}
              >
                {m}
              </motion.span>
            ))}
          </div>
        </MiniCard>

        {/* ── Bottom row: feedback + schedule ── */}
        <div className="relative z-10 flex min-h-0 flex-1 gap-2">
          {/* Feedback */}
          <MiniCard inView={inView} delay={0.65} className="flex-[1.4] overflow-hidden py-2">
            <p className="text-[8px] font-medium uppercase tracking-wider text-[#aaa]">
              Ostatnie opinie
            </p>
            <div className="mt-1.5 flex flex-col gap-1.5">
              {feedbacks.map((fb, i) => (
                <motion.div
                  key={fb.name}
                  className={`rounded-[6px] border px-2.5 py-1.5 transition-colors ${activeFeedback === i ? "border-[#e352ad]/20 bg-[#e352ad]/5" : "border-transparent bg-[#f5f5f5]/60"}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={
                    inView
                      ? { opacity: activeFeedback === i ? 1 : 0.55, x: 0 }
                      : { opacity: 0, x: -10 }
                  }
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.08, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold leading-tight text-[#363636]">
                      {fb.name}
                    </span>
                    <div className="flex gap-[1px]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg key={s} width="7" height="7" viewBox="0 0 20 20">
                          <path
                            d="M10 1l2.47 5.01L18 6.87l-4 3.9.94 5.5L10 13.47l-4.94 2.8.94-5.5-4-3.9 5.53-.86z"
                            fill={s <= fb.stars ? "#e352ad" : "none"}
                            stroke="#e352ad"
                            strokeWidth="1.5"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="mt-0.5 truncate text-[8px] leading-tight text-[#999]">
                    {fb.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </MiniCard>

          {/* Schedule */}
          <MiniCard inView={inView} delay={0.75} className="flex-1 overflow-hidden py-2">
            <p className="text-[8px] font-medium uppercase tracking-wider text-[#aaa]">
              Dziś
            </p>
            <div className="mt-1 flex flex-col gap-[5px]">
              {[
                { time: "9:00", name: "Ola M.", done: true },
                { time: "11:30", name: "Kasia W.", done: true },
                { time: "14:00", name: "Ania K.", done: false },
              ].map((appt, i) => (
                <motion.div
                  key={appt.time}
                  className="flex items-center gap-1.5"
                  initial={{ opacity: 0, x: 8 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
                  transition={{ duration: 0.3, delay: 0.9 + i * 0.08 }}
                >
                  <span
                    className={`text-[9px] font-semibold tabular-nums ${appt.done ? "text-[#ccc] line-through" : "text-[#e352ad]"}`}
                  >
                    {appt.time}
                  </span>
                  <span
                    className={`text-[9px] ${appt.done ? "text-[#bbb]" : "text-[#363636] font-medium"}`}
                  >
                    {appt.name}
                  </span>
                </motion.div>
              ))}
            </div>
            {/* Progress bar */}
            <div className="mt-auto pt-1.5">
              <motion.div
                className="h-[3px] w-full overflow-hidden rounded-full bg-[#f5d5e8]"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.2 }}
              >
                <motion.div
                  className="h-full rounded-full bg-[#e352ad]"
                  initial={{ width: "0%" }}
                  animate={inView ? { width: "66%" } : { width: "0%" }}
                  transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
                />
              </motion.div>
              <p className="mt-[2px] text-[7px] text-[#bbb]">2/3 wizyt</p>
            </div>
          </MiniCard>
        </div>
      </motion.div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="w-full py-10 lg:py-16">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-[18px] lg:gap-12 lg:px-[120px]">
        {/* Wrapper 1 - Dla Pacjentek */}
        <div id="dla-pacjentek" className="flex flex-col gap-8 rounded-[32px] bg-muted p-6 lg:flex-row lg:gap-10 lg:rounded-[28px] lg:border lg:border-border lg:bg-transparent lg:p-10">
          <TextContent
            tag={forPatients.tag}
            heading={forPatients.heading}
            features={forPatients.features}
            cta={forPatients.cta}
          />
          <PatientDashboard />
        </div>

        {/* Wrapper 2 - Dla Położnych */}
        <div id="dla-poloznych" className="flex flex-col-reverse gap-8 rounded-[32px] bg-muted p-6 lg:flex-row lg:gap-10 lg:rounded-[28px] lg:border lg:border-border lg:bg-transparent lg:p-10">
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
