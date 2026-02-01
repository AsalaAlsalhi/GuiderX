"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/store/auth";
import TouristDashboardShell from "@/components/tourist/dashboard/TouristDashboardShell";

export default function TouristDashboardPage() {
  const router = useRouter();
  const { userType, profileCompleted } = useAuthStore();

  useEffect(() => {
    if (userType !== "tourist" || !profileCompleted) {
      router.replace("/profile");
    }
  }, [userType, profileCompleted, router]);

  if (userType !== "tourist" || !profileCompleted) return null;

  return <TouristDashboardShell />;
}
