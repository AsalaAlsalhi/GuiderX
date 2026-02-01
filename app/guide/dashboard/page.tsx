"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/store/auth";

import GuideSidebar from "@/components/guide/dashboard/GuideSidebar";
import GuideProfileTab from "@/components/guide/dashboard/GuideProfileTab";
import TripsTab from "@/components/guide/dashboard/TripsTab";

type TabKey = "profile" | "trips";

export default function GuideDashboardPage() {
  const router = useRouter();
  const { userType, profileCompleted, guideProfile } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabKey>("profile");

  useEffect(() => {
    if (userType !== "guide" || !profileCompleted) {
      router.replace("/profile");
    }
  }, [userType, profileCompleted, router]);

  if (userType !== "guide" || !profileCompleted) return null;

  return (
    <main className="page-bg">
      <div className="container px-4 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-start">
          <GuideSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            profile={guideProfile}
          />

          <section className="flex-1 w-full">
            {activeTab === "profile" ? <GuideProfileTab /> : <TripsTab />}
          </section>
        </div>
      </div>
    </main>
  );
}
