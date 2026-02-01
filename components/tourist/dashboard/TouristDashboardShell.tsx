"use client";

import Link from "next/link";
import { useAuthStore } from "@/app/lib/store/auth";
import { MapPin, Phone, Calendar, ShieldCheck } from "lucide-react";

export default function TouristDashboardShell() {
  const { touristProfile, profileCompleted } = useAuthStore();

  return (
    <main className="page-bg">
      <div className="container px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="surface p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-[var(--brand-green)]">
                  Tourist Dashboard
                </h1>
                <p className="text-sm text-[var(--brand-olive)] mt-1">
                  Manage your profile and start booking tours.
                </p>
              </div>

              <Link href="/profile" className="btn-base btn-outline">
                View Profile
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="surface p-6">
              <h2 className="text-sm font-extrabold text-[var(--brand-green)] mb-4">
                Profile Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-[var(--brand-green)]">
                  <MapPin className="w-4 h-4 text-[var(--brand-olive)]" />
                  <span className="font-semibold">Country:</span>
                  <span className="text-[var(--brand-olive)]">
                    {touristProfile.countryOfResidence || "—"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[var(--brand-green)]">
                  <Calendar className="w-4 h-4 text-[var(--brand-olive)]" />
                  <span className="font-semibold">DOB:</span>
                  <span className="text-[var(--brand-olive)]">
                    {touristProfile.dateOfBirth || "—"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[var(--brand-green)]">
                  <Phone className="w-4 h-4 text-[var(--brand-olive)]" />
                  <span className="font-semibold">Phone:</span>
                  <span className="text-[var(--brand-olive)]">
                    {touristProfile.phoneNumber || "—"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[var(--brand-green)]">
                  <ShieldCheck className="w-4 h-4 text-[var(--brand-olive)]" />
                  <span className="font-semibold">Emergency:</span>
                  <span className="text-[var(--brand-olive)]">
                    {touristProfile.emergencyContact || "—"}
                  </span>
                </div>
              </div>
            </section>

            <section className="surface p-6">
              <h2 className="text-sm font-extrabold text-[var(--brand-green)] mb-4">
                Booking
              </h2>

              <p className="text-sm text-[var(--brand-olive)]">
                Browse available tours and book your next trip.
              </p>

              <div className="mt-5">
                <Link
                  href="/book"
                  className={[
                    "btn-base btn-book w-full justify-center",
                    !profileCompleted ? "pointer-events-none opacity-60" : "",
                  ].join(" ")}
                  aria-disabled={!profileCompleted}
                  title={!profileCompleted ? "Complete profile to proceed" : ""}
                >
                  Go to Booking
                </Link>

                {!profileCompleted && (
                  <div className="mt-2 text-xs text-[var(--brand-olive)]">
                    Complete profile to proceed.
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
