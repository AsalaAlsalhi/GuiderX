"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoLocationOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMapPin } from "react-icons/hi2";
import { HiUsers } from "react-icons/hi2";


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
        <div className="pt-14 sm:pt-16 md:pt-24 pb-10 sm:pb-12 md:pb-16">
          <div className="max-w-5xl mx-auto text-center">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
              <span className="text-[var(--brand-green)]">Find your </span>
              <span className="text-[var(--brand-gold)]">guide!</span>
            </h1>

            

            {/* Search */}
            <div className="mt-7 sm:mt-8 max-w-3xl mx-auto">
              <div className="search-shell">
                <div className="flex flex-col md:flex-row items-stretch gap-2">
                  {/* Input */}
                  <div className="flex-1 flex items-center gap-2 rounded-xl bg-white px-3 h-11 ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-[var(--brand-gold)]">
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
                  <div className="flex gap-2">
                    <button
                      onClick={goSearch}
                      className="h-11 px-5 rounded-xl bg-[var(--brand-gold)] text-white font-semibold flex items-center gap-2"
                    >
                      <FiSearch />
                      Let’s go
                    </button>

                    <button
                      onClick={() => router.push("/map")}
                      className="h-11 px-5 rounded-xl bg-[var(--brand-green)] text-white font-semibold flex items-center gap-2"
                    >
                      <HiOutlineMapPin />
                      Find a guid nearby
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* /Search */}

{/* Waitlist CTA */}
<div className="mt-6 flex justify-center">
  <button
    onClick={() =>
      window.location.href =
        "https://guiderx-waitlist.onrender.com/"
    }
    className="
      h-11 px-7
      rounded-xl
      font-semibold
      text-white
      bg-gradient-to-r
      from-[var(--brand-gold)]
      to-orange-400
      shadow-md
      hover:shadow-lg
      hover:brightness-105
      transition
      flex items-center gap-2
    "
  >
    <HiUsers className="text-lg opacity-90" />
    Join the waitlist
  </button>
</div>




          </div>
        </div>
      </div>
    </section>
  );
}
