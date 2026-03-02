/* ──────────────── INTERFACES ──────────────── */

export interface Midwife {
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

export interface ServiceCategory {
  name: string;
  services: Service[];
}

export interface Service {
  name: string;
  description: string;
  price: number;
  duration: number;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

export interface DaySlots {
  date: string;
  dayName: string;
  slots: string[];
}

export interface WorkingHour {
  day: string;
  open: string;
  close: string;
}

export interface MidwifeProfile extends Midwife {
  address: string;
  phone: string;
  email: string;
  education: string[];
  certificates: string[];
  gallery: string[];
  services: ServiceCategory[];
  reviewsList: Review[];
  availability: DaySlots[];
  workingHours: WorkingHour[];
  fullBio: string;
}

/* ──────────────── BASE DATA ──────────────── */

export const midwives: Midwife[] = [
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

/* ──────────────── EXTENDED PROFILE DATA ──────────────── */

const profileExtensions: Record<number, Omit<MidwifeProfile, keyof Midwife>> = {
  1: {
    address: "ul. Mokotowska 27/3, 00-560 Warszawa",
    phone: "+48 512 345 678",
    email: "anna.kowalska@mymidwife.pl",
    education: [
      "Magister położnictwa — Warszawski Uniwersytet Medyczny (2012)",
      "Studia podyplomowe — Edukacja perinatalna (2015)",
    ],
    certificates: [
      "Certyfikat IBCLC — Konsultant laktacyjny",
      "Certyfikat masażu Shantala niemowląt",
      "Kurs KTG — interpretacja zapisu",
    ],
    gallery: ["/stock/1.png", "/stock/2.png", "/stock/3.png", "/stock/1.png"],
    fullBio:
      "Jestem położną z 12-letnim doświadczeniem. Ukończyłam Warszawski Uniwersytet Medyczny i od tamtej pory nieustannie poszerzam swoją wiedzę. Specjalizuję się w opiece laktacyjnej i połogowej — pomagam mamom odnaleźć pewność siebie w nowej roli.\n\nWierzę, że każda mama zasługuje na indywidualne podejście i spokojne wsparcie. Moje wizyty to czas dla Ciebie — bez pośpiechu, z pełnym zaangażowaniem. Pracuję zarówno online, jak i w domu pacjentki oraz w gabinecie na Mokotowie.",
    services: [
      {
        name: "Konsultacje",
        services: [
          {
            name: "Konsultacja online",
            description: "Rozmowa wideo — omówienie bieżących potrzeb i pytań",
            price: 149,
            duration: 45,
          },
          {
            name: "Wizyta domowa",
            description:
              "Pełna konsultacja w zaciszu Twojego domu",
            price: 219,
            duration: 60,
          },
          {
            name: "Wizyta w gabinecie",
            description: "Konsultacja w gabinecie na Mokotowie",
            price: 189,
            duration: 60,
          },
        ],
      },
      {
        name: "Opieka w ciąży",
        services: [
          {
            name: "Prowadzenie ciąży",
            description:
              "Regularne wizyty kontrolne, monitoring stanu zdrowia mamy i dziecka",
            price: 199,
            duration: 60,
          },
          {
            name: "Plan porodu",
            description:
              "Wspólne opracowanie indywidualnego planu porodu",
            price: 179,
            duration: 50,
          },
        ],
      },
      {
        name: "Opieka połogowa",
        services: [
          {
            name: "Wizyta patronażowa",
            description:
              "Pierwsza wizyta po porodzie — ocena stanu mamy i noworodka",
            price: 199,
            duration: 60,
          },
          {
            name: "Pakiet połogowy (5 wizyt)",
            description:
              "Kompleksowa opieka w pierwszych tygodniach po porodzie",
            price: 849,
            duration: 60,
          },
        ],
      },
      {
        name: "Karmienie i laktacja",
        services: [
          {
            name: "Konsultacja laktacyjna",
            description:
              "Ocena karmienia, pomoc w prawidłowym przystawieniu, rozwiązywanie problemów",
            price: 209,
            duration: 60,
          },
          {
            name: "Pakiet laktacyjny (3 wizyty)",
            description:
              "Cykl konsultacji zapewniający ciągłość wsparcia w karmieniu",
            price: 549,
            duration: 60,
          },
        ],
      },
      {
        name: "Szkoła rodzenia",
        services: [
          {
            name: "Kurs indywidualny (4 spotkania)",
            description:
              "Przygotowanie do porodu i rodzicielstwa — kameralna formuła dla pary",
            price: 799,
            duration: 120,
          },
        ],
      },
    ],
    reviewsList: [
      {
        id: 1,
        author: "Marta K.",
        rating: 5,
        date: "2025-02-15",
        text: "Pani Anna to anioł cierpliwości! Pomogła mi z karmieniem piersią, gdy byłam już na skraju załamania. Po jednej wizycie wszystko się zmieniło. Gorąco polecam!",
        verified: true,
      },
      {
        id: 2,
        author: "Karolina W.",
        rating: 5,
        date: "2025-01-28",
        text: "Fantastyczna położna. Wizyta patronażowa przebiegła spokojnie, Pani Anna dokładnie zbadała Lenkę i odpowiedziała na milion moich pytań.",
        verified: true,
      },
      {
        id: 3,
        author: "Joanna M.",
        rating: 5,
        date: "2025-01-10",
        text: "Korzystałam z pakietu połogowego — 5 wizyt, które dały mi pewność siebie jako mamie. Pani Anna jest ciepła, profesjonalna i zawsze dostępna telefonicznie między wizytami.",
        verified: true,
      },
      {
        id: 4,
        author: "Agnieszka P.",
        rating: 4,
        date: "2024-12-20",
        text: "Bardzo miła i kompetentna. Jedyny minus — ciężko dostać termin, bo jest bardzo popularna. Ale warto czekać!",
        verified: true,
      },
      {
        id: 5,
        author: "Natalia S.",
        rating: 5,
        date: "2024-12-05",
        text: "Konsultacja online na najwyższym poziomie. Pani Anna przygotowała się do rozmowy, przejrzała moje wyniki i zaproponowała konkretny plan działania.",
        verified: false,
      },
      {
        id: 6,
        author: "Ewa R.",
        rating: 5,
        date: "2024-11-18",
        text: "Trzecia ciąża i pierwszy raz miałam położną, która naprawdę słucha. Pani Anna to skarb!",
        verified: true,
      },
    ],
    availability: [
      { date: "2026-03-02", dayName: "Pon", slots: ["09:00", "10:00", "14:00", "15:00"] },
      { date: "2026-03-03", dayName: "Wt", slots: ["08:00", "09:00", "11:00"] },
      { date: "2026-03-04", dayName: "Śr", slots: ["10:00"] },
      { date: "2026-03-05", dayName: "Czw", slots: ["10:00", "11:00", "13:00", "16:00"] },
      { date: "2026-03-06", dayName: "Pt", slots: ["09:00", "14:00"] },
      { date: "2026-03-07", dayName: "Sob", slots: ["10:00"] },
      { date: "2026-03-09", dayName: "Pon", slots: ["08:00", "09:00", "14:00"] },
      { date: "2026-03-10", dayName: "Wt", slots: ["09:00", "10:00"] },
      { date: "2026-03-11", dayName: "Śr", slots: ["11:00", "15:00"] },
      { date: "2026-03-12", dayName: "Czw", slots: ["08:00", "10:00", "13:00"] },
      { date: "2026-03-13", dayName: "Pt", slots: ["09:00"] },
      { date: "2026-03-16", dayName: "Pon", slots: ["09:00", "11:00", "14:00", "16:00"] },
      { date: "2026-03-17", dayName: "Wt", slots: ["08:00", "10:00"] },
      { date: "2026-03-18", dayName: "Śr", slots: ["09:00", "13:00"] },
      { date: "2026-03-19", dayName: "Czw", slots: ["10:00", "11:00", "15:00"] },
      { date: "2026-03-20", dayName: "Pt", slots: ["09:00", "14:00"] },
      { date: "2026-03-23", dayName: "Pon", slots: ["08:00", "09:00", "10:00", "14:00"] },
      { date: "2026-03-24", dayName: "Wt", slots: ["09:00", "11:00"] },
      { date: "2026-03-25", dayName: "Śr", slots: ["10:00", "13:00", "16:00"] },
      { date: "2026-03-26", dayName: "Czw", slots: ["08:00", "14:00"] },
      { date: "2026-03-27", dayName: "Pt", slots: ["09:00", "10:00"] },
      { date: "2026-03-30", dayName: "Pon", slots: ["09:00", "11:00", "14:00"] },
      { date: "2026-03-31", dayName: "Wt", slots: ["08:00", "10:00"] },
    ],
    workingHours: [
      { day: "Poniedziałek", open: "08:00", close: "17:00" },
      { day: "Wtorek", open: "08:00", close: "17:00" },
      { day: "Środa", open: "—", close: "—" },
      { day: "Czwartek", open: "09:00", close: "18:00" },
      { day: "Piątek", open: "08:00", close: "15:00" },
      { day: "Sobota", open: "09:00", close: "13:00" },
      { day: "Niedziela", open: "—", close: "—" },
    ],
  },
};

/* ──────────────── HELPERS ──────────────── */

function generateDefaultProfile(m: Midwife): Omit<MidwifeProfile, keyof Midwife> {
  return {
    address: `ul. Przykładowa 10, ${m.city}`,
    phone: "+48 500 000 000",
    email: `${m.name.toLowerCase().replace(/ /g, ".").replace(/ą/g,"a").replace(/ę/g,"e").replace(/ó/g,"o").replace(/ś/g,"s").replace(/ł/g,"l").replace(/ż/g,"z").replace(/ź/g,"z").replace(/ć/g,"c").replace(/ń/g,"n")}@mymidwife.pl`,
    education: [
      "Magister położnictwa — Uniwersytet Medyczny",
      "Studia podyplomowe — Edukacja perinatalna",
    ],
    certificates: [
      "Certyfikat ukończenia kursu specjalistycznego",
      "Szkolenie z zakresu opieki neonatologicznej",
    ],
    gallery: ["/stock/1.png", "/stock/2.png", "/stock/3.png"],
    fullBio: `${m.bio}\n\nPosiadam wieloletnie doświadczenie w pracy z pacjentkami na różnych etapach macierzyństwa. Moim celem jest zapewnienie profesjonalnej, ciepłej opieki dostosowanej do indywidualnych potrzeb każdej kobiety. Pracuję w ${m.city} i okolicach.`,
    services: [
      {
        name: "Konsultacje",
        services: [
          ...(m.online
            ? [
                {
                  name: "Konsultacja online",
                  description: "Rozmowa wideo — omówienie bieżących potrzeb i pytań",
                  price: Math.round(m.price * 0.8),
                  duration: 45,
                },
              ]
            : []),
          ...(m.homeVisit
            ? [
                {
                  name: "Wizyta domowa",
                  description: "Pełna konsultacja w zaciszu Twojego domu",
                  price: Math.round(m.price * 1.15),
                  duration: 60,
                },
              ]
            : []),
          ...(m.office
            ? [
                {
                  name: "Wizyta w gabinecie",
                  description: `Konsultacja w gabinecie w ${m.city}`,
                  price: m.price,
                  duration: m.duration,
                },
              ]
            : []),
        ],
      },
      {
        name: "Opieka w ciąży",
        services: [
          {
            name: "Prowadzenie ciąży",
            description: "Regularne wizyty kontrolne, monitoring stanu zdrowia",
            price: Math.round(m.price * 1.05),
            duration: 60,
          },
        ],
      },
      {
        name: "Opieka połogowa",
        services: [
          {
            name: "Wizyta patronażowa",
            description: "Pierwsza wizyta po porodzie — ocena stanu mamy i noworodka",
            price: m.price,
            duration: 60,
          },
        ],
      },
    ],
    reviewsList: [
      {
        id: 1,
        author: "Mama M.",
        rating: 5,
        date: "2025-02-10",
        text: "Wspaniała specjalistka! Ciepła, profesjonalna i zawsze dostępna. Polecam z całego serca.",
        verified: true,
      },
      {
        id: 2,
        author: "Kasia P.",
        rating: 5,
        date: "2025-01-15",
        text: "Bardzo dobra komunikacja i fachowa wiedza. Czułam się zaopiekowana na każdym etapie.",
        verified: true,
      },
      {
        id: 3,
        author: "Ola T.",
        rating: 4,
        date: "2024-12-28",
        text: "Solidna i rzetelna. Drobny minus za dostępność terminów, ale jakość wizyt na najwyższym poziomie.",
        verified: true,
      },
    ],
    availability: [
      { date: "2026-03-02", dayName: "Pon", slots: ["09:00", "10:00", "14:00"] },
      { date: "2026-03-03", dayName: "Wt", slots: ["08:00", "11:00", "15:00"] },
      { date: "2026-03-04", dayName: "Śr", slots: ["10:00", "12:00"] },
      { date: "2026-03-06", dayName: "Pt", slots: ["09:00", "13:00", "16:00"] },
      { date: "2026-03-07", dayName: "Sob", slots: ["10:00"] },
      { date: "2026-03-09", dayName: "Pon", slots: ["08:00", "11:00"] },
      { date: "2026-03-10", dayName: "Wt", slots: ["09:00", "14:00"] },
      { date: "2026-03-11", dayName: "Śr", slots: ["10:00", "13:00", "16:00"] },
      { date: "2026-03-13", dayName: "Pt", slots: ["09:00", "15:00"] },
      { date: "2026-03-16", dayName: "Pon", slots: ["08:00", "10:00", "14:00"] },
      { date: "2026-03-17", dayName: "Wt", slots: ["09:00", "11:00"] },
      { date: "2026-03-18", dayName: "Śr", slots: ["10:00"] },
      { date: "2026-03-20", dayName: "Pt", slots: ["09:00", "14:00", "16:00"] },
      { date: "2026-03-23", dayName: "Pon", slots: ["09:00", "10:00"] },
      { date: "2026-03-24", dayName: "Wt", slots: ["08:00", "11:00", "14:00"] },
      { date: "2026-03-25", dayName: "Śr", slots: ["10:00", "13:00"] },
      { date: "2026-03-27", dayName: "Pt", slots: ["09:00"] },
      { date: "2026-03-30", dayName: "Pon", slots: ["08:00", "10:00", "14:00"] },
      { date: "2026-03-31", dayName: "Wt", slots: ["09:00", "11:00"] },
    ],
    workingHours: [
      { day: "Poniedziałek", open: "08:00", close: "17:00" },
      { day: "Wtorek", open: "08:00", close: "17:00" },
      { day: "Środa", open: "09:00", close: "16:00" },
      { day: "Czwartek", open: "—", close: "—" },
      { day: "Piątek", open: "08:00", close: "15:00" },
      { day: "Sobota", open: "09:00", close: "13:00" },
      { day: "Niedziela", open: "—", close: "—" },
    ],
  };
}

export function getMidwifeProfile(id: number): MidwifeProfile | null {
  const base = midwives.find((m) => m.id === id);
  if (!base) return null;

  const ext = profileExtensions[id] ?? generateDefaultProfile(base);
  return { ...base, ...ext };
}

export function getAllMidwives(): Midwife[] {
  return midwives;
}

/* ──────────────── SEARCH PAGE CONSTANTS ──────────────── */

export const specializationGroups = [
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
