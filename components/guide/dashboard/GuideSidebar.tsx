"use client";

import { FiUser, FiMapPin } from "react-icons/fi";
import type { GuideProfile } from "@/app/lib/store/auth";

type TabKey = "profile" | "trips";

type Props = {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  profile: GuideProfile;
};

export default function GuideSidebar({ activeTab, onTabChange, profile }: Props) {
  const photo = profile?.profilePhotoDataUrl;

  const tabBtn = (active: boolean) =>
    [
      "w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition border",
      active
        ? "bg-[color-mix(in_oklab,var(--brand-cream)_65%,white)] border-[color-mix(in_oklab,var(--brand-gold)_35%,white)] text-[var(--brand-green)] shadow-sm"
        : "bg-white border-[color-mix(in_oklab,var(--brand-gold)_18%,white)] text-[var(--brand-green)] hover:bg-[color-mix(in_oklab,var(--brand-cream)_60%,white)]",
    ].join(" ");

  return (
    <aside className="w-full md:w-72 shrink-0 surface p-5">
      <div className="mb-6 text-center">
        <div className="mx-auto h-20 w-20 rounded-full bg-white border border-[color-mix(in_oklab,var(--brand-gold)_35%,white)] overflow-hidden flex items-center justify-center">
          {photo ? (
            <img src={photo} alt="Guide profile" className="h-full w-full object-cover" />
          ) : (
            <span className="text-[var(--brand-green)] font-extrabold text-2xl">G</span>
          )}
        </div>

        <div className="mt-3 font-bold text-[var(--brand-green)] text-lg">Tour Guide</div>
        <div className="text-sm text-[var(--brand-olive)]">
          {profile?.companyName?.trim() ? profile.companyName : "Independent Guide"}
        </div>
      </div>

      <nav className="space-y-2">
        <button type="button" onClick={() => onTabChange("profile")} className={tabBtn(activeTab === "profile")}>
          <FiUser className="text-lg" />
          Edit Profile
        </button>

        <button type="button" onClick={() => onTabChange("trips")} className={tabBtn(activeTab === "trips")}>
          <FiMapPin className="text-lg" />
          Trips
        </button>
      </nav>
    </aside>
  );
}
