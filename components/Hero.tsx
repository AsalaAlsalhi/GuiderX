"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoLocationOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMapPin, HiUsers } from "react-icons/hi2";
export default function Hero() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function goSearch() {
    const query = q.trim();
    if (!query) return router.push("/search");
    router.push(`/search?query=${encodeURIComponent(query)}`);
  }

  return (
    <section className="hero-fade hero-gradient-sides relative overflow-hidden">
      <div className="container relative">
        <div className="pt-8 sm:pt-12 md:pt-20 pb-10 sm:pb-12 md:pb-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight">
              <span className="text-[var(--brand-green)]">Find your </span>
              <span className="text-[var(--brand-gold)]">guide!</span>
            </h1>

            {/* Search */}
            <div className="mt-6 sm:mt-8 max-w-3xl mx-auto">
              <div className="search-shell border border-black/5 bg-white/85 backdrop-blur-sm rounded-[24px] p-3 sm:p-4 shadow-[0_14px_34px_rgba(0,0,0,0.08)] sm:shadow-[0_18px_45px_rgba(0,0,0,0.10)]">
                <div className="flex flex-col lg:flex-row items-stretch gap-3">
                  {/* Input */}
                  <div
                    className="
                      flex-1 flex items-center gap-2
                      rounded-2xl bg-white px-4 h-12
                      border border-black/10
                      shadow-sm
                      
                      focus-within:ring-4
                      focus-within:ring-[var(--brand-gold)]/15
                    "
                  >
                    <IoLocationOutline className="text-[var(--brand-olive)] text-lg shrink-0" />
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && goSearch()}
                      type="text"
                      placeholder="Where do you want to go?"
                      className="w-full outline-none text-sm sm:text-base bg-transparent text-[var(--brand-green)] placeholder:text-[var(--brand-olive)]/70"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                    {/* Search button */}
                    <button
                      onClick={goSearch}
                      className="
                        h-12 px-5 rounded-2xl
                        bg-[var(--brand-gold)] text-white font-semibold
                        flex items-center justify-center gap-2
                        transition hover:brightness-105
                        shadow-[0_8px_18px_rgba(255,122,26,0.18)]
                        text-sm sm:text-base
                        whitespace-nowrap
                        cursor-pointer
                        w-full sm:w-auto
                      "
                    >
                      <FiSearch className="text-base" />
                      Let’s go
                    </button>

                    {/* Map button */}
                    <button
                      onClick={() => router.push("/map")}
                      className="
                        h-12 px-5 rounded-2xl
                        border border-[var(--brand-gold)]/40
                        text-[var(--brand-gold)]
                        bg-white
                        font-semibold
                        flex items-center justify-center gap-2
                        transition
                        hover:bg-orange-50
                        hover:border-[var(--brand-gold)]
                        text-sm sm:text-base
                        whitespace-nowrap
                        cursor-pointer
                        w-full sm:w-auto
                      "
                    >
                      <HiOutlineMapPin className="text-lg text-[var(--brand-gold)]" />
                      Find a guide nearby
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