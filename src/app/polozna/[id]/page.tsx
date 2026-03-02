import { notFound } from "next/navigation";
import { getMidwifeProfile, midwives } from "@/lib/data/midwives";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHero from "@/components/midwife-profile/ProfileHero";
import ProfileTabs from "@/components/midwife-profile/ProfileTabs";
import ProfileAvailability from "@/components/midwife-profile/ProfileAvailability";
import ProfileContact from "@/components/midwife-profile/ProfileContact";
import MobileBookingBar from "./MobileBookingBar";
import BookingWrapper from "./BookingWrapper";

export async function generateStaticParams() {
  return midwives.map((m) => ({ id: String(m.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = getMidwifeProfile(Number(id));
  if (!profile) return { title: "Nie znaleziono – MyMidwife" };
  return {
    title: `${profile.name} – Położna | MyMidwife`,
    description: profile.bio,
  };
}

export default async function MidwifeProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = getMidwifeProfile(Number(id));
  if (!profile) notFound();

  return (
    <BookingWrapper
      services={profile.services}
      availability={profile.availability}
      midwifeName={profile.name}
    >
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="mx-auto max-w-[1200px] px-[18px] pt-6 pb-8 lg:px-[120px] lg:pt-8 lg:pb-12">
          <div className="grid lg:grid-cols-[1fr_380px] lg:gap-x-12">
            {/* ── Row 1: Hero ── */}
            <ProfileHero midwife={profile} />

            {/* ── Right sidebar (spans all rows) ── */}
            <div className="mt-6 lg:row-span-2 lg:mt-12">
              <div className="sticky top-[80px] space-y-6">
                <ProfileAvailability availability={profile.availability} />
                <div className="hidden lg:block">
                  <ProfileContact
                    address={profile.address}
                    phone={profile.phone}
                    email={profile.email}
                    workingHours={profile.workingHours}
                  />
                </div>
              </div>
            </div>

            {/* ── Row 2: Tabs (Usługi / Opinie / O mnie) ── */}
            <div className="mt-8 lg:mt-10">
              <ProfileTabs
                services={profile.services}
                reviews={profile.reviewsList}
                averageRating={profile.rating}
                totalReviews={profile.reviews}
                fullBio={profile.fullBio}
                education={profile.education}
                certificates={profile.certificates}
              />
            </div>
          </div>

          {/* Mobile-only contact */}
          <div className="mt-12 lg:hidden">
            <h2 className="mb-4 text-[22px] font-semibold tracking-[-0.8px] text-foreground">
              Kontakt
            </h2>
            <ProfileContact
              address={profile.address}
              phone={profile.phone}
              email={profile.email}
              workingHours={profile.workingHours}
            />
          </div>
        </main>

        <Footer />
        <MobileBookingBar name={profile.name} price={profile.price} />
      </div>
    </BookingWrapper>
  );
}
