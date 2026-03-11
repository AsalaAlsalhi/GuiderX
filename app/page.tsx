"use client";

import Hero from "@/components/Hero";
import Link from "next/link";
import TripCardSimple from "@/components/TripCardSimple";
import { ArrowRight } from "lucide-react";
import { HiUsers } from "react-icons/hi2";

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

      {/* BorderX Section */}
      <section className="bg-white">
        <div className="container pt-6 pb-4">
          <div className="max-w-xl mx-auto">

            {/* Card */}
            <div className="rounded-[28px] border border-black/5 bg-white py-10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] text-center">

              <div className="px-8">

                {/* Available Now */}
                <div className="flex justify-center mb-4">
                  <span
                    className="
                    inline-flex items-center
                    rounded-full
                    border border-[#2563EB]
                    bg-white
                    px-4 py-1.5
                    text-sm font-bold
                    text-[#2563EB]
                    animate-pulse
                  "
                  >
                    Available Now!
                  </span>
                </div>

                {/* Text */}
                <p className="text-base sm:text-lg font-semibold text-[var(--brand-green)] leading-relaxed">
                  Book your luxury & reliable stress-free border crossing
                  <br />
                  Door-to-door service with BorderX
                </p>

              </div>

              {/* BorderX Button */}
              <div className="mt-6 px-6">
                <button
                  onClick={() => {
                    window.location.href = "https://guiderx.co/";
                  }}
                  className="
                    w-full h-12
                    rounded-2xl
                                      font-semibold text-white

                    text-white
                    bg-[#2563EB]
                    hover:bg-[#1D4ED8]
                    shadow-[0_8px_20px_rgba(37,99,235,0.18)]
                    transition
                    cursor-pointer
                    text-sm sm:text-base
                  "
                >
                  BorderX
                </button>
              </div>

            </div>

            {/* Waitlist Button */}
            <div className="mt-4 px-6">
              <button
                onClick={() => {
                  window.location.href =
                    "https://guiderx-waitlist.onrender.com/";
                }}
               className="
w-full h-12
rounded-2xl
font-semibold text-white
bg-gradient-to-r from-[var(--brand-gold)] to-orange-400
shadow-[0_8px_20px_rgba(255,122,26,0.22)]
hover:brightness-105
transition
cursor-pointer
flex items-center justify-center gap-2
text-sm sm:text-base
"
              >
                <HiUsers className="text-lg opacity-90" />
                Join the waitlist
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="bg-white">
        <div className="container py-10 md:py-12">

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
                  cursor-pointer
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