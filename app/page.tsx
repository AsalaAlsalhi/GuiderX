"use client";

import Hero from "@/components/Hero";
import Link from "next/link";
import TripCardSimple from "@/components/TripCardSimple";
import { ArrowRight } from "lucide-react";
import { HiUsers } from "react-icons/hi2";
import { Truck } from "lucide-react";const trips = [
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

      {/* CTA Section */}
      <section className="bg-white">
        <div className="container pt-2 pb-8 md:pb-10">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3">
           <button
  onClick={() => {
    window.location.href = "https://guiderx.co/";
  }}
  className="
    w-full sm:flex-1 h-12
    rounded-2xl
    font-semibold text-white
    bg-[#2563EB]
    hover:bg-[#1D4ED8]
    shadow-[0_10px_24px_rgba(37,99,235,0.20)]
    transition
    flex items-center justify-center gap-2
    text-sm sm:text-base
  "
>
  <Truck className="w-5 h-5" />
  Explore BorderX
</button>

            <button
              onClick={() => {
                window.location.href =
                  "https://guiderx-waitlist.onrender.com/";
              }}
              className="
                w-full sm:flex-1 h-12
                rounded-2xl
                font-semibold text-white
                bg-gradient-to-r from-[var(--brand-gold)] to-orange-400
                shadow-[0_8px_20px_rgba(255,122,26,0.22)]
                hover:brightness-105
                transition
                flex items-center justify-center gap-2
                text-sm sm:text-base
              "
            >
              <HiUsers className="text-lg opacity-90" />
              Join the waitlist
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container py-10 md:py-12">
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-[var(--brand-green)] text-center sm:text-left">
              Popular Destinations
            </h2>

            <div className="flex justify-center sm:justify-end">
              <Link
                href="/search"
                className="
                  inline-flex items-center gap-2
                  px-4 h-10 rounded-full
                  bg-white
                  border border-[var(--brand-green)]/15
                  text-[var(--brand-green)] font-semibold
                  shadow-sm
                  hover:bg-[var(--brand-cream)] transition
                "
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Cards */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((t) => (
              <li key={t.id}>
                <TripCardSimple
                  id={t.id}
                  title={t.title}
                  tag={t.tag}
                  rating={t.rating}
                  image={t.image}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}