"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import ProfileServices from "./ProfileServices";
import ProfileReviews from "./ProfileReviews";
import ProfileAbout from "./ProfileAbout";
import type { ServiceCategory, Review } from "@/lib/data/midwives";

const tabs = [
  { id: "uslugi", label: "Usługi" },
  { id: "opinie", label: "Opinie" },
  { id: "o-mnie", label: "O mnie" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function ProfileTabs({
  services,
  reviews,
  averageRating,
  totalReviews,
  fullBio,
  education,
  certificates,
}: {
  services: ServiceCategory[];
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  fullBio: string;
  education: string[];
  certificates: string[];
}) {
  const [activeTab, setActiveTab] = useState<TabId>("uslugi");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 rounded-[14px] bg-muted/60 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative flex-1 rounded-[10px] py-2.5 text-[14px] font-medium tracking-[-0.3px] transition-colors",
              activeTab === tab.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="profile-tab-bg"
                className="absolute inset-0 rounded-[10px] bg-card shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab panels — stacked via grid, tallest sets height */}
      <div className="mt-6 grid [&>*]:col-start-1 [&>*]:row-start-1">
        <div
          className={cn(
            "transition-opacity duration-200",
            activeTab === "uslugi"
              ? "visible opacity-100"
              : "invisible opacity-0"
          )}
        >
          <ProfileServices services={services} />
        </div>
        <div
          className={cn(
            "transition-opacity duration-200",
            activeTab === "opinie"
              ? "visible opacity-100"
              : "invisible opacity-0"
          )}
        >
          <ProfileReviews
            reviews={reviews}
            averageRating={averageRating}
            totalReviews={totalReviews}
          />
        </div>
        <div
          className={cn(
            "transition-opacity duration-200",
            activeTab === "o-mnie"
              ? "visible opacity-100"
              : "invisible opacity-0"
          )}
        >
          <ProfileAbout
            fullBio={fullBio}
            education={education}
            certificates={certificates}
          />
        </div>
      </div>
    </div>
  );
}
