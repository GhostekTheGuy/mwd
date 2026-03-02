"use client";

import { Star, MapPin, Video, Home, Building2, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { MidwifeProfile } from "@/lib/data/midwives";

export default function ProfileHero({ midwife }: { midwife: MidwifeProfile }) {
  return (
    <section>
      <div className="pb-2">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/znajdz-polozna"
            className="mb-6 inline-flex items-center gap-2 text-[14px] font-medium tracking-[-0.3px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Wróć do wyszukiwania
          </Link>
        </motion.div>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex-shrink-0"
          >
            <div className="relative h-[120px] w-[120px] overflow-hidden rounded-[24px] border-4 border-white shadow-lg lg:h-[150px] lg:w-[150px] lg:rounded-[30px]">
              <img
                src={midwife.photo}
                alt={midwife.name}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex-1"
          >
            <h1 className="text-[26px] font-semibold leading-tight tracking-[-1px] text-foreground lg:text-[32px] lg:tracking-[-1.5px]">
              {midwife.name}
            </h1>

            <p className="mt-1 text-[14px] font-medium tracking-[-0.3px] text-muted-foreground lg:text-[15px]">
              {midwife.specializations.join(" · ")}
            </p>

            {/* Rating + Location */}
            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1">
              <div className="flex items-center gap-1.5">
                <Star className="h-[16px] w-[16px] fill-amber-400 text-amber-400" />
                <span className="text-[15px] font-semibold tracking-[-0.3px] text-foreground">
                  {midwife.rating}
                </span>
                <span className="text-[13px] font-medium text-muted-foreground">
                  ({midwife.reviews} opinii)
                </span>
              </div>
              <div className="flex items-center gap-1 text-[13px] font-medium text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>{midwife.address}</span>
              </div>
            </div>

            {/* Badges */}
            <div className="mt-3 flex flex-wrap gap-2">
              {midwife.online && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[12px] font-medium text-emerald-700">
                  <Video className="h-3.5 w-3.5" />
                  Online
                </span>
              )}
              {midwife.homeVisit && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-[12px] font-medium text-blue-700">
                  <Home className="h-3.5 w-3.5" />
                  Wizyty domowe
                </span>
              )}
              {midwife.office && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1.5 text-[12px] font-medium text-purple-700">
                  <Building2 className="h-3.5 w-3.5" />
                  Gabinet
                </span>
              )}
              {midwife.match >= 90 && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-[12px] font-semibold text-primary">
                  {midwife.match}% dopasowania
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
