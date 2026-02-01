"use client";

import Hero from "@/components/Hero";
import Link from "next/link";
import TripCardSimple from "@/components/TripCardSimple";

const trips = [
  {
    id: "sultan-qaboos-mosque",
    title: "Sultan Qaboos Grand Mosque",
    rating: 4.9,
    tag: "Cultural",
    image: "/oman/01.jpg",
  },
  {
    id: "muttrah-corniche",
    title: "Muttrah Corniche",
    rating: 4.7,
    tag: "Waterfront",
    image: "/oman/02.jpg",
  },
  {
    id: "muttrah-souq",
    title: "Muttrah Souq",
    rating: 4.8,
    tag: "Souq",
    image: "/oman/03.jpg",
  },
];

export default function HomePage() {
  return (
    <main className="w-full">
      <Hero />

<section className="bg-white">
        <div className="container py-10 md:py-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-extrabold text-[var(--brand-green)] mx-auto">
              Popular Destinations
            </h2>

            {/* View All */}
            <Link
              href="/search"
              className="hidden md:inline-flex items-center justify-center w-11 h-11 rounded-full
                         border border-[var(--brand-green)]/15 text-[var(--brand-green)] hover:bg-[var(--brand-cream)] transition shadow-sm"
              aria-label="View all"
              title="View all"
            >
              <span aria-hidden className="text-lg">→</span>
            </Link>
          </div>

          <div className="md:hidden flex justify-center mb-5">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-4 h-10 rounded-full border border-[var(--brand-green)]/15
                         text-[var(--brand-green)] hover:bg-[var(--brand-cream)] transition shadow-sm"
            >
              <span>View All</span> <span aria-hidden>→</span>
            </Link>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((t) => (
              <li key={t.id}>
                <TripCardSimple title={t.title} tag={t.tag} rating={t.rating} image={t.image} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
