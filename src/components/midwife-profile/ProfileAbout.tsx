"use client";

import { GraduationCap, Award } from "lucide-react";

export default function ProfileAbout({
  fullBio,
  education,
  certificates,
}: {
  fullBio: string;
  education: string[];
  certificates: string[];
}) {
  return (
    <section>
      <div className="space-y-6">
        {/* Bio */}
        <div className="rounded-[18px] border border-border/60 bg-card p-5 lg:p-6">
          {fullBio.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              className="mt-3 first:mt-0 text-[15px] leading-[1.7] text-foreground/80"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Education & Certificates */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[18px] border border-border/60 bg-card p-5">
            <div className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.3px] text-foreground">
              <GraduationCap className="h-5 w-5 text-primary" />
              Wykształcenie
            </div>
            <ul className="mt-3 space-y-2">
              {education.map((item, i) => (
                <li
                  key={i}
                  className="text-[14px] leading-relaxed text-foreground/70"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[18px] border border-border/60 bg-card p-5">
            <div className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.3px] text-foreground">
              <Award className="h-5 w-5 text-primary" />
              Certyfikaty
            </div>
            <ul className="mt-3 space-y-2">
              {certificates.map((item, i) => (
                <li
                  key={i}
                  className="text-[14px] leading-relaxed text-foreground/70"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
