"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Star, X } from "lucide-react";
import { LiveMap } from "@/components/map/LiveMap";
import { GUIDES } from "@/app/lib/mock/guides";

export default function MapPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedGuide = useMemo(
    () => GUIDES.find((g) => g.id === selectedId) ?? null,
    [selectedId]
  );

  const isAvailable = selectedGuide?.status === "available";

  return (
    <main className="page-bg">
      <div className="container px-4 py-10">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Top Card (matches brand surface) */}
          <section className="surface p-6 sm:p-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--brand-green)]">
                Find a Tour Guide
              </h1>
              <p className="mt-1 text-sm text-[var(--brand-olive)]">
                Select a guide from the map and book instantly
              </p>
            </div>

            {/* Map */}
            <div className="mt-6">
              <LiveMap
                guides={GUIDES}
                selectedId={selectedId ?? undefined}
                onSelect={setSelectedId}
              />
            </div>
          </section>

          {/* Selected Guide Card */}
          {selectedGuide && (
            <section className="surface max-w-4xl mx-auto p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 shrink-0 rounded-full bg-[var(--brand-cream)] border border-[var(--brand-gold)]/25 flex items-center justify-center overflow-hidden">
                  {selectedGuide.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={selectedGuide.imageUrl}
                      alt={selectedGuide.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-[var(--brand-olive)]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-extrabold text-[var(--brand-green)] truncate">
                        {selectedGuide.name}
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-[var(--brand-olive)]">
                        <span
                          className={[
                            "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
                            isAvailable
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                              : "border-red-200 bg-red-50 text-red-700",
                          ].join(" ")}
                        >
                          {isAvailable ? "Available" : "Busy"}
                        </span>

                        <span className="text-[var(--brand-green)]/20">•</span>

                        <span className="inline-flex items-center gap-1">
                          <Star className="w-4 h-4 text-[var(--brand-gold)] fill-[var(--brand-gold)]" />
                          <span className="font-semibold text-[var(--brand-green)]">
                            {selectedGuide.rating}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* close */}
                    <button
                      type="button"
                      onClick={() => setSelectedId(null)}
                      className="w-10 h-10 rounded-2xl hover:bg-black/5 transition inline-flex items-center justify-center"
                      aria-label="Close"
                      title="Close"
                    >
                      <X className="w-4 h-4 text-black/50" />
                    </button>
                  </div>

                  {/* Trips */}
                  <div className="mt-5 border-t border-[var(--brand-green)]/10 pt-4">
                    <div className="text-sm font-extrabold text-[var(--brand-green)]">
                      Available trip options
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {Array.isArray((selectedGuide as any).trips) &&
                      (selectedGuide as any).trips.length > 0 ? (
                        (selectedGuide as any).trips.map((t: any) => (
                          <span key={t.id ?? t.name} className="chip">
                            {t.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-[var(--brand-olive)]">
                          No trips available for this guide.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* actions */}
                  <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
                    <button
                      onClick={() => router.push("/book")}
                      className="btn-base btn-book w-full sm:w-auto px-6 h-11"
                    >
                      Book
                    </button>
                    
                    
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}