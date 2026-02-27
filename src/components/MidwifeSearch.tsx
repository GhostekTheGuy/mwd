"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  ChevronDown,
  X,
  ArrowLeft,
  ArrowRight,
  Star,
  Heart,
  MapPin,
  Video,
  Home,
  Building2,
  Baby,
  Sparkles,
  Clock,
  Filter,
  Check,
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { BlurFade } from "./BlurFade";
import Navbar from "./Navbar";
import Footer from "./Footer";

/* ──────────────── DATA ──────────────── */

interface Midwife {
  id: number;
  name: string;
  photo: string;
  match: number;
  specializations: string[];
  tags: string[];
  bio: string;
  nextDate: string;
  price: number;
  duration: number;
  rating: number;
  reviews: number;
  city: string;
  online: boolean;
  homeVisit: boolean;
  office: boolean;
  stages: string[];
}

const midwives: Midwife[] = [
  {
    id: 1,
    name: "Anna Kowalska",
    photo: "/stock/1.png",
    match: 99,
    specializations: ["położnictwo", "laktacja"],
    tags: [
      "Karmienie piersią",
      "Połóg",
      "Ciąża",
      "Masaż niemowląt",
      "Wizyta patronażowa",
    ],
    bio: "Pomagam mamom odnaleźć pewność siebie w nowej roli. Specjalizuję się w laktacji i opiece połogowej w domowym zaciszu.",
    nextDate: "Czw, 6 Mar, 10:00",
    price: 189,
    duration: 60,
    rating: 4.9,
    reviews: 127,
    city: "Warszawa",
    online: true,
    homeVisit: true,
    office: true,
    stages: ["ciąża", "połóg", "laktacja"],
  },
  {
    id: 2,
    name: "Katarzyna Nowak",
    photo: "/stock/2.png",
    match: 97,
    specializations: ["edukacja przedporodowa", "fizjoterapia"],
    tags: [
      "Przygotowanie do porodu",
      "Ćwiczenia w ciąży",
      "Oddychanie",
      "Plan porodu",
    ],
    bio: "Prowadzę przez ciążę krok po kroku. Szkoła rodzenia, ćwiczenia i przygotowanie do porodu — wszystko w jednym miejscu.",
    nextDate: "Pt, 7 Mar, 14:00",
    price: 159,
    duration: 50,
    rating: 4.8,
    reviews: 89,
    city: "Kraków",
    online: true,
    homeVisit: false,
    office: true,
    stages: ["planowanie", "ciąża"],
  },
  {
    id: 3,
    name: "Magdalena Wiśniewska",
    photo: "/stock/3.png",
    match: 95,
    specializations: ["neonatologia", "laktacja"],
    tags: [
      "Opieka nad noworodkiem",
      "Kąpiel noworodka",
      "Kolki",
      "Sen niemowląt",
      "Laktacja",
    ],
    bio: "Towarzyszę rodzicom w pierwszych tygodniach z maluszkiem. Pomagam zrozumieć potrzeby noworodka i budować więź.",
    nextDate: "Pon, 10 Mar, 09:00",
    price: 199,
    duration: 60,
    rating: 4.9,
    reviews: 203,
    city: "Wrocław",
    online: true,
    homeVisit: true,
    office: false,
    stages: ["połóg", "laktacja"],
  },
  {
    id: 4,
    name: "Joanna Kamińska",
    photo: "/stock/1.png",
    match: 93,
    specializations: ["USG", "diagnostyka prenatalna"],
    tags: ["USG ciążowe", "Badania prenatalne", "Monitorowanie ciąży", "KTG"],
    bio: "Specjalizuję się w diagnostyce prenatalnej. Każde badanie to dla mnie okazja, by uspokoić i wyjaśnić.",
    nextDate: "Wt, 11 Mar, 11:00",
    price: 249,
    duration: 45,
    rating: 5.0,
    reviews: 64,
    city: "Poznań",
    online: false,
    homeVisit: false,
    office: true,
    stages: ["planowanie", "ciąża"],
  },
  {
    id: 5,
    name: "Aleksandra Zielińska",
    photo: "/stock/2.png",
    match: 91,
    specializations: ["psychologia perinantalna", "doula"],
    tags: [
      "Wsparcie emocjonalne",
      "Strata ciąży",
      "Depresja poporodowa",
      "Lęki w ciąży",
    ],
    bio: "Wspieram kobiety emocjonalnie na każdym etapie macierzyństwa. Bezpieczna przestrzeń do rozmowy i zrozumienia.",
    nextDate: "Śr, 12 Mar, 16:00",
    price: 179,
    duration: 50,
    rating: 4.7,
    reviews: 156,
    city: "Gdańsk",
    online: true,
    homeVisit: true,
    office: true,
    stages: ["planowanie", "ciąża", "połóg"],
  },
  {
    id: 6,
    name: "Natalia Dąbrowska",
    photo: "/stock/3.png",
    match: 89,
    specializations: ["położnictwo", "edukacja zdrowotna"],
    tags: [
      "Dieta w ciąży",
      "Suplementacja",
      "Ćwiczenia dna miednicy",
      "Powrót do formy",
    ],
    bio: "Łączę wiedzę medyczną z praktycznym podejściem. Pomagam zadbać o siebie w ciąży i po porodzie.",
    nextDate: "Czw, 13 Mar, 08:00",
    price: 169,
    duration: 50,
    rating: 4.8,
    reviews: 91,
    city: "Łódź",
    online: true,
    homeVisit: false,
    office: true,
    stages: ["ciąża", "połóg", "laktacja"],
  },
  {
    id: 7,
    name: "Paulina Majewska",
    photo: "/stock/2.png",
    match: 96,
    specializations: ["laktacja", "opieka połogowa"],
    tags: [
      "Karmienie piersią",
      "Odciąganie pokarmu",
      "Zapalenie piersi",
      "Dokarmianie",
    ],
    bio: "Konsultantka laktacyjna IBCLC. Pomagam rozwiązywać trudności z karmieniem — cierpliwie i bez oceniania.",
    nextDate: "Pt, 7 Mar, 11:00",
    price: 209,
    duration: 60,
    rating: 5.0,
    reviews: 184,
    city: "Warszawa",
    online: true,
    homeVisit: true,
    office: true,
    stages: ["połóg", "laktacja"],
  },
  {
    id: 8,
    name: "Marta Lewandowska",
    photo: "/stock/3.png",
    match: 94,
    specializations: ["edukacja przedporodowa", "położnictwo"],
    tags: [
      "Szkoła rodzenia",
      "Plan porodu",
      "Oddychanie",
      "Techniki relaksacji",
      "Poród naturalny",
    ],
    bio: "Prowadzę kameralne szkoły rodzenia w centrum Warszawy. Wierzę, że świadomy poród zaczyna się od wiedzy.",
    nextDate: "Sob, 8 Mar, 10:00",
    price: 149,
    duration: 90,
    rating: 4.9,
    reviews: 112,
    city: "Warszawa",
    online: true,
    homeVisit: false,
    office: true,
    stages: ["planowanie", "ciąża"],
  },
  {
    id: 9,
    name: "Izabela Wójcik",
    photo: "/stock/1.png",
    match: 92,
    specializations: ["neonatologia", "położnictwo"],
    tags: [
      "Wizyta patronażowa",
      "Opieka nad noworodkiem",
      "Pielęgnacja pępka",
      "Żółtaczka",
      "Szczepienia",
    ],
    bio: "15 lat doświadczenia w neonatologii. Pierwsza wizyta patronażowa to moja specjalność — spokojnie i profesjonalnie.",
    nextDate: "Pon, 10 Mar, 08:00",
    price: 199,
    duration: 60,
    rating: 4.8,
    reviews: 237,
    city: "Warszawa",
    online: false,
    homeVisit: true,
    office: false,
    stages: ["połóg"],
  },
  {
    id: 10,
    name: "Agnieszka Szymańska",
    photo: "/stock/2.png",
    match: 90,
    specializations: ["USG", "diagnostyka prenatalna"],
    tags: [
      "USG ciążowe",
      "USG 3D/4D",
      "Badania prenatalne",
      "KTG",
      "Monitorowanie ciąży",
    ],
    bio: "Wykonuję badania USG z pasją i uwagą. Każda wizyta to czas dla Ciebie — bez pośpiechu, z dokładnym omówieniem.",
    nextDate: "Wt, 11 Mar, 09:30",
    price: 259,
    duration: 45,
    rating: 5.0,
    reviews: 98,
    city: "Warszawa",
    online: false,
    homeVisit: false,
    office: true,
    stages: ["ciąża"],
  },
  {
    id: 11,
    name: "Dorota Kaczmarek",
    photo: "/stock/3.png",
    match: 88,
    specializations: ["psychologia perinantalna", "położnictwo"],
    tags: [
      "Depresja poporodowa",
      "Lęk przed porodem",
      "Wsparcie emocjonalne",
      "Trauma porodowa",
    ],
    bio: "Łączę opiekę położniczą ze wsparciem psychologicznym. Bo macierzyństwo to nie tylko ciało — to też emocje.",
    nextDate: "Śr, 12 Mar, 13:00",
    price: 189,
    duration: 50,
    rating: 4.7,
    reviews: 143,
    city: "Warszawa",
    online: true,
    homeVisit: true,
    office: true,
    stages: ["ciąża", "połóg"],
  },
  {
    id: 12,
    name: "Weronika Grabowska",
    photo: "/stock/1.png",
    match: 87,
    specializations: ["fizjoterapia", "edukacja zdrowotna"],
    tags: [
      "Ćwiczenia w ciąży",
      "Dno miednicy",
      "Rozejście mięśni",
      "Powrót do formy",
      "Joga prenatalna",
    ],
    bio: "Fizjoterapeutka uroginekologiczna. Pomagam ciału w ciąży i po porodzie — od dna miednicy po rozejście kresy białej.",
    nextDate: "Czw, 13 Mar, 15:00",
    price: 179,
    duration: 50,
    rating: 4.9,
    reviews: 76,
    city: "Warszawa",
    online: true,
    homeVisit: false,
    office: true,
    stages: ["ciąża", "połóg"],
  },
];

const specializationGroups = [
  {
    label: "OPIEKA POŁOŻNICZA",
    items: [
      "położnictwo",
      "laktacja",
      "opieka połogowa",
      "wizyta patronażowa",
    ],
  },
  {
    label: "EDUKACJA I PRZYGOTOWANIE",
    items: [
      "edukacja przedporodowa",
      "szkoła rodzenia",
      "przygotowanie do porodu",
    ],
  },
  {
    label: "DIAGNOSTYKA",
    items: ["USG", "diagnostyka prenatalna", "KTG"],
  },
  {
    label: "WSPARCIE DODATKOWE",
    items: [
      "fizjoterapia",
      "psychologia perinantalna",
      "doula",
      "dietetyka ciążowa",
    ],
  },
];

const stages = [
  {
    id: "planowanie",
    label: "Planowanie ciąży",
    icon: Sparkles,
    color: "text-purple-500",
  },
  { id: "ciąża", label: "Jestem w ciąży", icon: Baby, color: "text-pink-500" },
  {
    id: "połóg",
    label: "Po porodzie",
    icon: Heart,
    color: "text-rose-500",
  },
  {
    id: "laktacja",
    label: "Karmienie piersią",
    icon: Star,
    color: "text-amber-500",
  },
];

const visitModes = [
  { id: "online", label: "Online", icon: Video },
  { id: "home", label: "W domu", icon: Home },
  { id: "office", label: "W gabinecie", icon: Building2 },
];

/* ──────────────── COMPONENT ──────────────── */

export default function MidwifeSearch() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  // Filters
  const [activeVisitMode, setActiveVisitMode] = useState<string>("online");
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    string[]
  >([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchOpen, setSearchOpen] = useState(!!initialQuery);

  // Dropdowns
  const [specOpen, setSpecOpen] = useState(false);
  const [stageOpen, setStageOpen] = useState(false);

  // Quiz + Mobile filter
  const [quizOpen, setQuizOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null);
  const specRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const isResultsInView = useInView(resultsRef, { once: true });

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (specRef.current && !specRef.current.contains(e.target as Node)) {
        setSpecOpen(false);
      }
      if (stageRef.current && !stageRef.current.contains(e.target as Node)) {
        setStageOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Focus search
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 150);
  }, [searchOpen]);

  // Filter midwives
  const filtered = midwives.filter((m) => {
    if (
      activeVisitMode === "online" && !m.online
    )
      return false;
    if (activeVisitMode === "home" && !m.homeVisit) return false;
    if (activeVisitMode === "office" && !m.office) return false;
    if (
      selectedSpecializations.length > 0 &&
      !selectedSpecializations.some((s) => m.specializations.includes(s))
    )
      return false;
    if (
      selectedStages.length > 0 &&
      !selectedStages.some((s) => m.stages.includes(s))
    )
      return false;
    if (
      searchQuery &&
      !m.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !m.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
      !m.city.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const toggleSpec = useCallback((spec: string) => {
    setSelectedSpecializations((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  }, []);

  const toggleStage = useCallback((stage: string) => {
    setSelectedStages((prev) =>
      prev.includes(stage) ? prev.filter((s) => s !== stage) : [...prev, stage]
    );
  }, []);

  const clearFilters = () => {
    setSelectedSpecializations([]);
    setSelectedStages([]);
    setSearchQuery("");
    setActiveVisitMode("online");
  };

  const activeFilterCount =
    selectedSpecializations.length +
    selectedStages.length +
    (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-[1200px] px-[18px] pb-16 pt-6 lg:px-[120px] lg:pt-10">
        {/* Breadcrumb */}
        <BlurFade delay={0} direction="down" inView>
          <nav className="flex items-center gap-2 text-[13px] lg:text-[14px]">
            <a
              href="/"
              className="flex items-center gap-1.5 text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              <ArrowLeft size={14} strokeWidth={1.8} />
              Strona główna
            </a>
            <span className="text-muted-foreground/50">/</span>
            <span className="font-medium text-foreground">
              Znajdź położną
            </span>
          </nav>
        </BlurFade>

        {/* Header */}
        <BlurFade delay={0.05} direction="down" inView>
          <div className="mt-8 flex flex-col gap-6 lg:mt-10 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1
                className="text-[30px] font-medium leading-[1.15] tracking-[-1.2px] text-foreground lg:text-[44px] lg:tracking-[-2px]"
                style={{ wordSpacing: "2px" }}
              >
                Dopasowałyśmy do Ciebie
                <br className="hidden lg:block" />{" "}
                <span className="text-primary">najlepsze położne</span>
              </h1>
              <p className="mt-3 max-w-[480px] text-[15px] leading-[1.6] text-muted-foreground lg:text-[16px]">
                Wybierz specjalistkę, która odpowiada Twoim potrzebom. Każda
                z nich jest zweryfikowana i gotowa pomóc.
              </p>
            </div>

            {/* Quiz CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex-shrink-0 rounded-[20px] border border-border bg-card p-5 lg:max-w-[320px]"
            >
              <p className="text-[14px] leading-[1.5] text-muted-foreground">
                Nie wiesz, jakiej położnej potrzebujesz? Odpowiedz na kilka
                pytań i pomożemy Ci wybrać.
              </p>
              <button
                onClick={() => setQuizOpen(true)}
                className="group/quiz mt-3 inline-flex items-center gap-2 rounded-[10px] border border-primary/20 bg-primary/5 px-4 py-2.5 text-[13px] font-medium text-primary transition-all duration-300 hover:border-primary/40 hover:bg-primary/10"
              >
                Pomóż mi wybrać
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover/quiz:translate-x-0.5"
                />
              </button>
            </motion.div>

          </div>
        </BlurFade>

        {/* Quiz Modal — rendered outside flex container for proper fixed positioning */}
        <QuizModal
          isOpen={quizOpen}
          onClose={() => setQuizOpen(false)}
          onComplete={(results) => {
            if (results.stage) setSelectedStages([results.stage]);
            if (results.visitMode) setActiveVisitMode(results.visitMode);
            if (results.needs.length > 0) {
              const needToSpec: Record<string, string[]> = {
                karmienie: ["laktacja"],
                porod: ["edukacja przedporodowa"],
                noworodek: ["neonatologia", "opieka połogowa"],
                usg: ["USG", "diagnostyka prenatalna"],
                emocje: ["psychologia perinantalna", "doula"],
                cwiczenia: ["fizjoterapia"],
              };
              const specs = results.needs.flatMap((n) => needToSpec[n] ?? []);
              if (specs.length > 0) setSelectedSpecializations(specs);
            }
            setQuizOpen(false);
          }}
        />

        {/* ──── FILTER BAR ──── */}
        <BlurFade delay={0.1} direction="down" inView className="relative z-20">
          {/* Desktop Filters */}
          <div className="relative z-20 mt-8 hidden items-center gap-3 lg:flex">
            {/* Visit Mode Toggle */}
            <div className="flex items-center rounded-[12px] border border-border bg-card p-1">
              {visitModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveVisitMode(mode.id)}
                  className={`relative flex items-center gap-1.5 rounded-[9px] px-4 py-2 text-[13px] font-medium tracking-[-0.2px] transition-all duration-300 ${
                    activeVisitMode === mode.id
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <mode.icon size={14} strokeWidth={1.8} />
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Specialization Dropdown */}
            <div ref={specRef} className="relative">
              <button
                onClick={() => {
                  setSpecOpen(!specOpen);
                  setStageOpen(false);
                }}
                className={`flex items-center gap-2 rounded-[12px] border px-4 py-2.5 text-[13px] font-medium tracking-[-0.2px] transition-all duration-300 ${
                  selectedSpecializations.length > 0
                    ? "border-primary/30 bg-primary/5 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/20 hover:text-foreground"
                }`}
              >
                <Sparkles size={14} strokeWidth={1.8} />
                Specjalizacja
                {selectedSpecializations.length > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] text-white">
                    {selectedSpecializations.length}
                  </span>
                )}
                <ChevronDown
                  size={14}
                  strokeWidth={1.8}
                  className={`transition-transform duration-300 ${specOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {specOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute left-0 top-full z-50 mt-2 w-[400px] rounded-[18px] border border-black/[0.06] bg-white p-5 shadow-[0_12px_48px_-8px_rgba(0,0,0,0.12)]"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-[15px] font-semibold tracking-[-0.3px] text-foreground">
                        Specjalizacja
                      </p>
                      <p className="text-[12px] text-muted-foreground">
                        możesz wybrać kilka
                      </p>
                    </div>

                    <div className="mt-4 flex max-h-[360px] flex-col gap-5 overflow-y-auto" data-lenis-prevent>
                      {specializationGroups.map((group) => (
                        <div key={group.label}>
                          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.5px] text-muted-foreground/70">
                            {group.label}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {group.items.map((item) => (
                              <button
                                key={item}
                                onClick={() => toggleSpec(item)}
                                className={`rounded-[10px] border px-3.5 py-2 text-[13px] font-medium transition-all duration-200 ${
                                  selectedSpecializations.includes(item)
                                    ? "border-primary bg-primary text-white"
                                    : "border-border bg-muted/50 text-muted-foreground hover:border-primary/30 hover:bg-primary/5"
                                }`}
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4">
                      <button
                        onClick={() => setSelectedSpecializations([])}
                        className="text-[13px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
                      >
                        Wyczyść
                      </button>
                      <button
                        onClick={() => setSpecOpen(false)}
                        className="rounded-[10px] bg-primary px-6 py-2.5 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-primary/90"
                      >
                        Zastosuj
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Stage Dropdown — replaces "Termin sesji" */}
            <div ref={stageRef} className="relative">
              <button
                onClick={() => {
                  setStageOpen(!stageOpen);
                  setSpecOpen(false);
                }}
                className={`flex items-center gap-2 rounded-[12px] border px-4 py-2.5 text-[13px] font-medium tracking-[-0.2px] transition-all duration-300 ${
                  selectedStages.length > 0
                    ? "border-primary/30 bg-primary/5 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/20 hover:text-foreground"
                }`}
              >
                <Baby size={14} strokeWidth={1.8} />
                Etap macierzyństwa
                {selectedStages.length > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] text-white">
                    {selectedStages.length}
                  </span>
                )}
                <ChevronDown
                  size={14}
                  strokeWidth={1.8}
                  className={`transition-transform duration-300 ${stageOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {stageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute left-0 top-full z-50 mt-2 w-[340px] rounded-[18px] border border-black/[0.06] bg-white p-5 shadow-[0_12px_48px_-8px_rgba(0,0,0,0.12)]"
                  >
                    <p className="text-[15px] font-semibold tracking-[-0.3px] text-foreground">
                      Na jakim jesteś etapie?
                    </p>
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      Dopasujemy położne do Twojej sytuacji
                    </p>

                    <div className="mt-4 flex flex-col gap-2">
                      {stages.map((stage) => {
                        const Icon = stage.icon;
                        const isSelected = selectedStages.includes(stage.id);
                        return (
                          <button
                            key={stage.id}
                            onClick={() => toggleStage(stage.id)}
                            className={`flex items-center gap-3 rounded-[12px] border p-3.5 text-left transition-all duration-200 ${
                              isSelected
                                ? "border-primary/30 bg-primary/5"
                                : "border-border bg-muted/30 hover:border-primary/20 hover:bg-primary/5"
                            }`}
                          >
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-[10px] ${
                                isSelected
                                  ? "bg-primary/10"
                                  : "bg-secondary/60"
                              }`}
                            >
                              <Icon
                                size={18}
                                className={
                                  isSelected ? "text-primary" : stage.color
                                }
                                strokeWidth={1.8}
                              />
                            </div>
                            <span
                              className={`flex-1 text-[14px] font-medium ${isSelected ? "text-primary" : "text-foreground"}`}
                            >
                              {stage.label}
                            </span>
                            {isSelected && (
                              <Check
                                size={16}
                                className="text-primary"
                                strokeWidth={2}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
                      <button
                        onClick={() => setSelectedStages([])}
                        className="text-[13px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
                      >
                        Wyczyść
                      </button>
                      <button
                        onClick={() => setStageOpen(false)}
                        className="rounded-[10px] bg-primary px-6 py-2.5 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-primary/90"
                      >
                        Gotowe
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Availability Quick Filter */}
            <button className="flex items-center gap-2 rounded-[12px] border border-border bg-card px-4 py-2.5 text-[13px] font-medium tracking-[-0.2px] text-muted-foreground transition-all duration-300 hover:border-primary/20 hover:text-foreground">
              <Clock size={14} strokeWidth={1.8} />
              Najbliższy termin
            </button>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex h-[40px] w-[40px] items-center justify-center rounded-[11px] border border-border bg-card transition-all duration-300 hover:border-primary/20 hover:bg-primary/5"
              aria-label="Szukaj"
            >
              <Search size={16} strokeWidth={1.8} className="text-muted-foreground" />
            </button>
          </div>

          {/* Mobile Filters */}
          <div className="mt-6 flex flex-col gap-3 lg:hidden">
            {/* Visit Mode - horizontal scroll */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {visitModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveVisitMode(mode.id)}
                  className={`flex flex-shrink-0 items-center gap-1.5 rounded-[10px] border px-3.5 py-2 text-[13px] font-medium transition-all duration-300 ${
                    activeVisitMode === mode.id
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  <mode.icon size={14} strokeWidth={1.8} />
                  {mode.label}
                </button>
              ))}

              <button
                onClick={() => setMobileFilterOpen(true)}
                className={`relative flex flex-shrink-0 items-center gap-1.5 rounded-[10px] border px-3.5 py-2 text-[13px] font-medium transition-all duration-300 ${
                  activeFilterCount > 0
                    ? "border-primary/30 bg-primary/5 text-primary"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                <Filter size={14} strokeWidth={1.8} />
                Filtry
                {activeFilterCount > 0 && (
                  <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-1 text-[10px] text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-[10px] border border-border bg-card"
                aria-label="Szukaj"
              >
                <Search size={15} strokeWidth={1.8} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Mobile Filter Sheet */}
          <AnimatePresence>
            {mobileFilterOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
                  onClick={() => setMobileFilterOpen(false)}
                />
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 300,
                  }}
                  className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-[24px] bg-white pb-8 pt-3"
                >
                  {/* Handle */}
                  <div className="mb-4 flex justify-center">
                    <div className="h-1 w-10 rounded-full bg-muted-foreground/20" />
                  </div>

                  <div className="px-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[18px] font-semibold tracking-[-0.5px]">
                        Filtry
                      </h3>
                      <button
                        onClick={() => setMobileFilterOpen(false)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-muted"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Stage Filter */}
                    <div className="mt-6">
                      <p className="text-[14px] font-semibold text-foreground">
                        Etap macierzyństwa
                      </p>
                      <div className="mt-3 flex flex-col gap-2">
                        {stages.map((stage) => {
                          const Icon = stage.icon;
                          const isSelected = selectedStages.includes(stage.id);
                          return (
                            <button
                              key={stage.id}
                              onClick={() => toggleStage(stage.id)}
                              className={`flex items-center gap-3 rounded-[12px] border p-3 text-left transition-all duration-200 ${
                                isSelected
                                  ? "border-primary/30 bg-primary/5"
                                  : "border-border bg-muted/30"
                              }`}
                            >
                              <Icon
                                size={18}
                                className={
                                  isSelected ? "text-primary" : stage.color
                                }
                              />
                              <span
                                className={`flex-1 text-[14px] font-medium ${isSelected ? "text-primary" : "text-foreground"}`}
                              >
                                {stage.label}
                              </span>
                              {isSelected && (
                                <Check size={16} className="text-primary" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Specialization Filter */}
                    <div className="mt-6">
                      <p className="text-[14px] font-semibold text-foreground">
                        Specjalizacja
                      </p>
                      <div className="mt-3 flex flex-col gap-4">
                        {specializationGroups.map((group) => (
                          <div key={group.label}>
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.5px] text-muted-foreground/70">
                              {group.label}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {group.items.map((item) => (
                                <button
                                  key={item}
                                  onClick={() => toggleSpec(item)}
                                  className={`rounded-[10px] border px-3 py-2 text-[13px] font-medium transition-all duration-200 ${
                                    selectedSpecializations.includes(item)
                                      ? "border-primary bg-primary text-white"
                                      : "border-border bg-muted/50 text-muted-foreground"
                                  }`}
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex gap-3">
                      <button
                        onClick={clearFilters}
                        className="flex-1 rounded-[12px] border border-border py-3 text-[14px] font-medium text-muted-foreground"
                      >
                        Wyczyść
                      </button>
                      <button
                        onClick={() => setMobileFilterOpen(false)}
                        className="flex-1 rounded-[12px] bg-primary py-3 text-[14px] font-medium text-white"
                      >
                        Pokaż wyniki ({filtered.length})
                      </button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </BlurFade>

        {/* ──── SEARCH BAR (expandable) ──── */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 flex items-center gap-3 rounded-[14px] border border-border bg-card p-2 lg:p-3">
                <Search
                  size={18}
                  className="ml-2 flex-shrink-0 text-muted-foreground"
                  strokeWidth={1.8}
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Szukaj po nazwisku, specjalizacji lub mieście..."
                  className="h-[40px] flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted-foreground/60 lg:text-[15px]"
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[8px] bg-muted transition-colors duration-200 hover:bg-muted-foreground/10"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ──── Active Filter Pills ──── */}
        <AnimatePresence>
          {activeFilterCount > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 flex flex-wrap items-center gap-2 overflow-hidden"
            >
              {selectedStages.map((s) => (
                <motion.button
                  key={s}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={() => toggleStage(s)}
                  className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[12px] font-medium text-primary"
                >
                  {stages.find((st) => st.id === s)?.label}
                  <X size={12} />
                </motion.button>
              ))}
              {selectedSpecializations.map((s) => (
                <motion.button
                  key={s}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={() => toggleSpec(s)}
                  className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[12px] font-medium text-primary"
                >
                  {s}
                  <X size={12} />
                </motion.button>
              ))}
              <button
                onClick={clearFilters}
                className="text-[12px] text-muted-foreground underline decoration-muted-foreground/30 underline-offset-2 transition-colors duration-200 hover:text-foreground"
              >
                Wyczyść wszystko
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ──── RESULTS ──── */}
        <div ref={resultsRef} className="mt-8">
          {/* Results count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isResultsInView ? 1 : 0 }}
            transition={{ delay: 0.2 }}
            className="mb-5 text-[13px] text-muted-foreground"
          >
            {filtered.length}{" "}
            {filtered.length === 1
              ? "położna"
              : filtered.length < 5
                ? "położne"
                : "położnych"}{" "}
            {activeFilterCount > 0 ? "pasujących do filtrów" : "dostępnych"}
          </motion.p>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((midwife, idx) => (
              <MidwifeCard
                key={midwife.id}
                midwife={midwife}
                index={idx}
              />
            ))}
          </div>

          {/* Empty State */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center py-20 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <Search size={24} className="text-primary" />
              </div>
              <p className="mt-4 text-[17px] font-medium text-foreground">
                Nie znaleziono położnych
              </p>
              <p className="mt-2 max-w-[300px] text-[14px] text-muted-foreground">
                Spróbuj zmienić filtry lub wyszukaj po innym kryterium
              </p>
              <button
                onClick={clearFilters}
                className="mt-5 rounded-[10px] bg-primary px-6 py-2.5 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-primary/90"
              >
                Wyczyść filtry
              </button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ──────────────── QUIZ MODAL ──────────────── */

interface QuizResults {
  stage: string;
  needs: string[];
  visitMode: string;
  budget: string;
}

const quizSteps = [
  {
    id: "stage",
    question: "Na jakim jesteś etapie?",
    subtitle: "To pomoże nam dopasować specjalistkę do Twojej sytuacji",
    multi: false,
    options: [
      { id: "planowanie", label: "Planuję ciążę", icon: Sparkles },
      { id: "ciąża", label: "Jestem w ciąży", icon: Baby },
      { id: "połóg", label: "Po porodzie", icon: Heart },
      { id: "laktacja", label: "Karmię piersią", icon: Star },
    ],
  },
  {
    id: "needs",
    question: "Czego szukasz?",
    subtitle: "Możesz wybrać kilka opcji naraz",
    multi: true,
    options: [
      { id: "karmienie", label: "Pomoc z karmieniem piersią", icon: Heart },
      { id: "porod", label: "Przygotowanie do porodu", icon: Baby },
      { id: "noworodek", label: "Opieka nad noworodkiem", icon: Star },
      { id: "usg", label: "USG / badania prenatalne", icon: Search },
      { id: "emocje", label: "Wsparcie emocjonalne", icon: Sparkles },
      { id: "cwiczenia", label: "Ćwiczenia / fizjoterapia", icon: ArrowRight },
    ],
  },
  {
    id: "visitMode",
    question: "Jak chcesz się spotkać?",
    subtitle: "Wybierz najwygodniejszą dla Ciebie formę",
    multi: false,
    options: [
      { id: "online", label: "Online — videocall", icon: Video },
      { id: "home", label: "W domu — wizyta domowa", icon: Home },
      { id: "office", label: "W gabinecie", icon: Building2 },
    ],
  },
  {
    id: "budget",
    question: "Jaki budżet Ci odpowiada?",
    subtitle: "Orientacyjna cena za jedną wizytę",
    multi: false,
    options: [
      { id: "low", label: "Do 170 PLN", icon: Clock },
      { id: "mid", label: "170–220 PLN", icon: Clock },
      { id: "high", label: "Powyżej 220 PLN", icon: Clock },
      { id: "any", label: "Bez znaczenia", icon: Check },
    ],
  },
];

function QuizModal({
  isOpen,
  onClose,
  onComplete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (results: QuizResults) => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({
    stage: "",
    needs: [],
    visitMode: "",
    budget: "",
  });
  const [direction, setDirection] = useState(1);

  const currentStep = quizSteps[step];
  const totalSteps = quizSteps.length;
  const progress = ((step + 1) / totalSteps) * 100;

  const canProceed = currentStep.multi
    ? (answers[currentStep.id] as string[]).length > 0
    : !!answers[currentStep.id];

  const selectOption = (optionId: string) => {
    if (currentStep.multi) {
      setAnswers((prev) => {
        const current = prev[currentStep.id] as string[];
        return {
          ...prev,
          [currentStep.id]: current.includes(optionId)
            ? current.filter((id) => id !== optionId)
            : [...current, optionId],
        };
      });
    } else {
      setAnswers((prev) => ({ ...prev, [currentStep.id]: optionId }));
    }
  };

  const isSelectedOpt = (optionId: string) => {
    if (currentStep.multi) {
      return (answers[currentStep.id] as string[]).includes(optionId);
    }
    return answers[currentStep.id] === optionId;
  };

  const goNext = () => {
    if (step < totalSteps - 1) {
      setDirection(1);
      setStep(step + 1);
    } else {
      onComplete({
        stage: answers.stage as string,
        needs: answers.needs as string[],
        visitMode: answers.visitMode as string,
        budget: answers.budget as string,
      });
      // Reset for next open
      setStep(0);
      setAnswers({ stage: "", needs: [], visitMode: "", budget: "" });
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setStep(0);
      setAnswers({ stage: "", needs: [], visitMode: "", budget: "" });
    }, 300);
  };

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Desktop modal — fixed height */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 mx-4 flex h-[560px] w-full max-w-[520px] flex-col rounded-[24px] bg-white shadow-[0_24px_80px_-12px_rgba(0,0,0,0.15)] max-lg:hidden"
          >
            {/* Header */}
            <div className="flex-shrink-0 px-8 pt-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {step > 0 ? (
                    <button
                      onClick={goBack}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors duration-200 hover:bg-muted"
                    >
                      <ArrowLeft size={15} strokeWidth={2} />
                    </button>
                  ) : (
                    <div className="h-9 w-9" />
                  )}
                  <span className="text-[14px] font-medium text-muted-foreground">
                    Krok {step + 1} z {totalSteps}
                  </span>
                </div>
                <button
                  onClick={handleClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors duration-200 hover:bg-muted"
                >
                  <X size={15} strokeWidth={2} />
                </button>
              </div>
              <div className="mt-4 h-[3px] overflow-hidden rounded-full bg-border/40">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
            </div>

            {/* Question title — fixed */}
            <div className="flex-shrink-0 px-8 pt-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`title-${step}`}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <h2 className="text-[24px] font-semibold tracking-[-0.8px] text-foreground">
                    {currentStep.question}
                  </h2>
                  <p className="mt-1.5 text-[15px] text-muted-foreground">
                    {currentStep.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Scrollable options with fade gradients */}
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-white to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-white to-transparent" />

              <div
                key={`scroll-${step}`}
                className="absolute inset-0 overflow-y-auto px-8 py-5"
                data-lenis-prevent
              >
                <div
                  className={`grid gap-3 ${
                    currentStep.options.length <= 4 && !currentStep.multi
                      ? "grid-cols-2"
                      : "grid-cols-1"
                  }`}
                >
                  {currentStep.options.map((option, i) => {
                    const Icon = option.icon;
                    const selected = isSelectedOpt(option.id);
                    return (
                      <button
                        key={option.id}
                        onClick={() => selectOption(option.id)}
                        style={{ animationDelay: `${i * 50}ms` }}
                        className={`quiz-option-in flex items-center gap-3.5 rounded-[16px] border-2 p-4 text-left transition-all duration-200 ${
                          selected
                            ? "border-primary bg-primary/[0.04] shadow-[0_0_0_1px_rgba(227,82,173,0.1)]"
                            : "border-border/60 bg-white hover:border-primary/25 hover:bg-primary/[0.02]"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[12px] transition-colors duration-200 ${
                            selected ? "bg-primary/10" : "bg-secondary/50"
                          }`}
                        >
                          <Icon
                            size={18}
                            className={selected ? "text-primary" : "text-muted-foreground"}
                            strokeWidth={1.8}
                          />
                        </div>
                        <span
                          className={`flex-1 text-[15px] font-medium ${
                            selected ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {option.label}
                        </span>
                        <div
                          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                            selected ? "border-primary bg-primary" : "border-border/60"
                          }`}
                        >
                          {selected && (
                            <Check size={13} className="text-white" strokeWidth={2.5} />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTA — fixed bottom */}
            <div className="flex-shrink-0 px-8 pb-8">
              <motion.button
                onClick={goNext}
                disabled={!canProceed}
                initial={false}
                animate={{ opacity: canProceed ? 1 : 0.35 }}
                className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-primary py-4 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:hover:bg-primary"
              >
                {step < totalSteps - 1 ? "Dalej" : "Pokaż dopasowane położne"}
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </motion.div>

          {/* Mobile bottom sheet — fixed height */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-10 flex h-[85vh] flex-col rounded-t-[24px] bg-white pt-3 lg:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="mb-3 flex flex-shrink-0 justify-center">
              <div className="h-1 w-10 rounded-full bg-muted-foreground/20" />
            </div>

            {/* Header */}
            <div className="flex flex-shrink-0 items-center justify-between px-5">
              <div className="flex items-center gap-2.5">
                {step > 0 ? (
                  <button
                    onClick={goBack}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border"
                  >
                    <ArrowLeft size={14} strokeWidth={2} />
                  </button>
                ) : (
                  <div className="h-8 w-8" />
                )}
                <span className="text-[13px] font-medium text-muted-foreground">
                  Krok {step + 1} z {totalSteps}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border"
              >
                <X size={14} strokeWidth={2} />
              </button>
            </div>

            {/* Progress */}
            <div className="mx-5 mt-3 h-[3px] flex-shrink-0 overflow-hidden rounded-full bg-border/40">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>

            {/* Question title — fixed */}
            <div className="flex-shrink-0 px-5 pt-5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`m-title-${step}`}
                  initial={{ opacity: 0, x: direction * 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -30 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <h2 className="text-[20px] font-semibold tracking-[-0.6px] text-foreground">
                    {currentStep.question}
                  </h2>
                  <p className="mt-1 text-[14px] text-muted-foreground">
                    {currentStep.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Scrollable options with fade gradients */}
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-5 bg-gradient-to-b from-white to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-white to-transparent" />

              <div
                key={`m-scroll-${step}`}
                className="absolute inset-0 overflow-y-auto px-5 py-4"
                data-lenis-prevent
              >
                <div className="flex flex-col gap-2.5">
                  {currentStep.options.map((option, i) => {
                    const Icon = option.icon;
                    const selected = isSelectedOpt(option.id);
                    return (
                      <button
                        key={option.id}
                        onClick={() => selectOption(option.id)}
                        style={{ animationDelay: `${i * 40}ms` }}
                        className={`quiz-option-in flex items-center gap-3 rounded-[14px] border-2 p-3.5 text-left transition-all duration-200 ${
                          selected
                            ? "border-primary bg-primary/[0.04]"
                            : "border-border/60 bg-white"
                        }`}
                      >
                        <div
                          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] ${
                            selected ? "bg-primary/10" : "bg-secondary/50"
                          }`}
                        >
                          <Icon
                            size={16}
                            className={selected ? "text-primary" : "text-muted-foreground"}
                            strokeWidth={1.8}
                          />
                        </div>
                        <span
                          className={`flex-1 text-[14px] font-medium ${
                            selected ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {option.label}
                        </span>
                        <div
                          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                            selected ? "border-primary bg-primary" : "border-border/60"
                          }`}
                        >
                          {selected && (
                            <Check size={12} className="text-white" strokeWidth={2.5} />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTA — fixed bottom */}
            <div className="flex-shrink-0 px-5 pb-8 pt-3">
              <motion.button
                onClick={goNext}
                disabled={!canProceed}
                initial={false}
                animate={{ opacity: canProceed ? 1 : 0.35 }}
                className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-primary py-3.5 text-[14px] font-medium text-white disabled:cursor-not-allowed"
              >
                {step < totalSteps - 1 ? "Dalej" : "Pokaż dopasowane położne"}
                <ArrowRight size={15} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ──────────────── MIDWIFE CARD ──────────────── */

function MidwifeCard({
  midwife,
  index,
}: {
  midwife: Midwife;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 24 }
      }
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group/card relative flex flex-col rounded-[22px] border border-border bg-card p-5 transition-all duration-500 hover:border-primary/20 hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.06)]"
    >
      {/* Heart */}
      <button
        onClick={() => setLiked(!liked)}
        className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-muted/60 transition-all duration-300 hover:bg-secondary"
        aria-label="Polub"
      >
        <Heart
          size={15}
          className={`transition-all duration-300 ${liked ? "fill-primary text-primary" : "text-muted-foreground"}`}
          strokeWidth={1.8}
        />
      </button>

      {/* Profile Header */}
      <div className="flex items-start gap-3.5">
        <div className="relative flex-shrink-0">
          <div className="h-[60px] w-[60px] overflow-hidden rounded-full border-[2.5px] border-accent">
            <img
              src={midwife.photo}
              alt={midwife.name}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Match Badge */}
          <div className="absolute -right-1 -top-1 flex h-7 min-w-7 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-white shadow-sm">
            {midwife.match}%
          </div>
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="truncate text-[17px] font-semibold tracking-[-0.4px] text-foreground">
            {midwife.name}
          </h3>
          <p className="mt-0.5 text-[13px] leading-[1.3] text-muted-foreground">
            {midwife.specializations.join(" · ")}
          </p>
          <div className="mt-1.5 flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star
                size={12}
                className="fill-amber-400 text-amber-400"
              />
              <span className="text-[12px] font-medium text-foreground">
                {midwife.rating}
              </span>
              <span className="text-[12px] text-muted-foreground">
                ({midwife.reviews})
              </span>
            </div>
            <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
              <MapPin size={11} strokeWidth={1.8} />
              {midwife.city}
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {midwife.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-[8px] border border-border bg-muted/50 px-2.5 py-1 text-[12px] font-medium text-muted-foreground transition-colors duration-200 group-hover/card:border-primary/10 group-hover/card:bg-primary/[0.03]"
          >
            {tag}
          </span>
        ))}
        {midwife.tags.length > 4 && (
          <span className="rounded-[8px] px-2 py-1 text-[12px] text-muted-foreground">
            +{midwife.tags.length - 4}
          </span>
        )}
      </div>

      {/* Bio */}
      <p className="mt-3.5 line-clamp-3 flex-1 text-[13px] leading-[1.6] text-muted-foreground">
        {midwife.bio}
      </p>

      {/* Visit modes */}
      <div className="mt-3.5 flex items-center gap-2">
        {midwife.online && (
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Video size={11} strokeWidth={1.8} />
            Online
          </span>
        )}
        {midwife.homeVisit && (
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Home size={11} strokeWidth={1.8} />
            W domu
          </span>
        )}
        {midwife.office && (
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Building2 size={11} strokeWidth={1.8} />
            Gabinet
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-border/60" />

      {/* Next available + CTA */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] text-muted-foreground">
            najbliższy termin:
          </p>
          <p className="mt-0.5 text-[13px] font-semibold tracking-[-0.2px] text-foreground">
            {midwife.nextDate}
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <button className="mt-4 flex w-full items-center justify-between rounded-[14px] bg-primary px-5 py-3.5 transition-all duration-500 hover:bg-primary/90">
        <span className="text-[14px] font-medium text-white">
          Umów wizytę
        </span>
        <span className="text-[13px] font-medium text-white/80">
          {midwife.price} PLN / {midwife.duration}min
        </span>
      </button>
    </motion.div>
  );
}
