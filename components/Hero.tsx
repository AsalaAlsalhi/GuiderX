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
        <div className="pt-10 sm:pt-14 md:pt-24 pb-8 sm:pb-10 md:pb-16">
          <div className="max-w-5xl mx-auto text-center">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
              <span className="text-[var(--brand-green)]">Find your </span>
              <span className="text-[var(--brand-gold)]">guide!</span>
            </h1>

            {/* Search */}
            <div className="mt-6 sm:mt-8 max-w-2xl mx-auto">
              {/* خففنا padding + shadow بالموبايل */}
              <div className="search-shell border-0 p-3 sm:p-4 shadow-[0_14px_34px_rgba(0,0,0,0.08)] sm:shadow-[0_18px_45px_rgba(0,0,0,0.10)]">
                <div className="flex flex-col md:flex-row items-stretch gap-2">
                  {/* Input (NO BORDER) */}
                  <div
                    className="
                      flex-1 flex items-center gap-2
                      rounded-xl bg-white px-3 h-11
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
                      className="w-full outline-none text-sm bg-transparent text-[var(--brand-green)] placeholder:text-[var(--brand-olive)]/70"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 w-full md:w-auto">
                    <button
                      onClick={goSearch}
                      className="
                        h-11 px-5 rounded-xl
                        bg-[var(--brand-gold)] text-white font-semibold
                        flex items-center justify-center gap-2
                        transition hover:brightness-105
                        flex-1 md:flex-none
                        text-sm sm:text-base
                      "
                    >
                      <FiSearch />
                      Let’s go
                    </button>

                    <button
                      onClick={() => router.push("/map")}
                      className="
                        h-11 px-5 rounded-xl
                        bg-[var(--brand-green)] text-white font-semibold
                        flex items-center justify-center gap-2
                        transition hover:brightness-105
                        flex-1 md:flex-none
                        text-sm sm:text-base
                        whitespace-nowrap
                      "
                    >
                      <HiOutlineMapPin className="text-lg" />
                      Find a guide nearby
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* /Search */}

            {/* Waitlist */}
            <div className="mt-5 sm:mt-6 max-w-2xl mx-auto">
              <button
                onClick={() =>
                  (window.location.href =
                    "https://guiderx-waitlist.onrender.com/")
                }
                className="
                  w-full h-11
                  rounded-xl
                  font-semibold text-white
                  bg-gradient-to-r from-[var(--brand-gold)] to-orange-400
                  shadow-[0_8px_20px_rgba(255,122,26,0.22)]
                  hover:shadow-[0_10px_26px_rgba(255,122,26,0.28)]
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
            {/* /Waitlist */}
          </div>
        </div>
      </div>
    </section>
  );
}