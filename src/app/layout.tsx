import type { Metadata } from "next";
import { Inter_Tight, Lora, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";

const interTight = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "MyMidwife – Znajdź swoją położną",
  description:
    "Platforma łącząca kobiety z najlepszymi położnymi w Polsce. Zweryfikowane specjalistki, czat 24/7, baza wiedzy.",
  icons: {
    icon: "/fav.png",
    apple: "/fav.png",
  },
  openGraph: {
    title: "MyMidwife – Znajdź swoją położną",
    description:
      "Platforma łącząca kobiety z najlepszymi położnymi w Polsce.",
    images: [{ url: "/fav.png", width: 512, height: 512 }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${interTight.variable} ${lora.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
