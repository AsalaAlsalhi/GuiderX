"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoLocationOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMapPin } from "react-icons/hi2"; 

export default function Hero() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function goSearch() {
    const query = q.trim();
    if (!query) return router.push("/search");
    router.push(`/search?query=${encodeURIComponent(query)}`);
  }

  return (
    <section className="hero-fade relative bg-white">
      <div className="container">
        <div className="pt-14 sm:pt-16 md:pt-24 pb-10 sm:pb-12 md:pb-16">
          <div className="max-w-5xl mx-auto text-center">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
              <span className="text-[var(--brand-green)]">Find your </span>
              <span className="text-[var(--brand-gold)]">guide!</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base md:text-lg text-[var(--brand-olive)] max-w-2xl mx-auto">
              Explore. Choose a guide. Book instantly
            </p>

            {/* Search bar (responsive) */}
            <div className="mt-7 sm:mt-8 max-w-3xl mx-auto">
              <div className="rounded-2xl bg-white px-3 py-3 border border-[var(--brand-gold)]/30">
                <div className="flex flex-col md:flex-row items-stretch gap-2">
                  {/* Input */}
                  <div className="flex-1 flex items-center gap-2 rounded-xl bg-white px-3 h-11 ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-[var(--brand-gold)]">
                    <IoLocationOutline className="text-[var(--brand-olive)] text-lg shrink-0" />
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && goSearch()}
                      type="text"
                      placeholder="Search for area, place, landmark..."
                      className="w-full outline-none text-sm bg-transparent text-[var(--brand-green)] placeholder:text-[var(--brand-olive)]/70"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 md:justify-end">
                    <button
                      onClick={goSearch}
                      className="
                        h-11 px-5 rounded-xl bg-[var(--brand-gold)] hover:opacity-95
                        text-white font-semibold transition flex items-center justify-center gap-2 text-sm
                        w-full md:w-auto
                      "
                    >
                      <FiSearch />
                      Let’s go
                    </button>

                    <button
                      onClick={() => router.push("/map")}
                      className="
                        h-11 px-5 rounded-xl bg-[var(--brand-green)] hover:opacity-95
                        text-white font-semibold transition flex items-center justify-center gap-2 text-sm
                        w-full md:w-auto
                      "
                    >
                      <HiOutlineMapPin className="text-lg" />
                      Nearby
                    </button>
                  </div>
                </div>
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
