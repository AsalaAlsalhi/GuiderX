"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search as SearchIcon, X, Tag } from "lucide-react";
import TripCardSimple from "@/components/TripCardSimple";

/** Temporary mock data (بدليه بالداتا الحقيقية لاحقاً) */
const ALL_TRIPS = [
  {
    id: "sultan-qaboos-grand-mosque",
    title: "Sultan Qaboos Grand Mosque",
    rating: 4.9,
    tag: "Landmark",
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
  {
    id: "jebel-shams",
    title: "Jebel Shams",
    rating: 4.8,
    tag: "Mountains",
    image: "/oman/04.jpg",
  },
  {
    id: "wahiba-sands-sunset",
    title: "Wahiba Sands – Sunset Tour",
    rating: 4.6,
    tag: "Safari",
    image: "/oman/05.jpg",
  },
  {
    id: "wahiba-sands-adventure",
    title: "Wahiba Sands – Desert Adventure",
    rating: 4.6,
    tag: "Safari",
    image: "/oman/06.jpg",
  },
];

const TAGS = ["All", "Landmark", "Waterfront", "Souq", "Mountains", "Beaches", "Hiking", "Safari"] as const;
type TagType = (typeof TAGS)[number];

export default function SearchPage() {
  const router = useRouter();
  const params = useSearchParams();

  // ✅ خليها متوافقة مع Hero عندك: /search?query=...
  const qFromUrl = params.get("query") ?? "";
  const tagFromUrl = (params.get("tag") as TagType) ?? "All";

  const [q, setQ] = useState(qFromUrl);
  const [tag, setTag] = useState<TagType>(tagFromUrl);

  // keep query + tag in URL (بدون ريفرش)
  useEffect(() => {
    const sp = new URLSearchParams();

    const trimmed = q.trim();
    if (trimmed) sp.set("query", trimmed);
    if (tag !== "All") sp.set("tag", tag);

    const url = sp.toString() ? `/search?${sp.toString()}` : "/search";
    router.replace(url);
  }, [q, tag, router]);

  const results = useMemo(() => {
    let list = ALL_TRIPS;

    if (tag !== "All") list = list.filter((t) => t.tag === tag);

    const trimmed = q.trim().toLowerCase();
    if (trimmed) list = list.filter((t) => t.title.toLowerCase().includes(trimmed));

    return list;
  }, [q, tag]);

  return (
    <main className="page-bg">
      <div className="container py-10">
        {/* Search bar */}
        <section className="mb-5">
          <div className="max-w-3xl mx-auto">
            <div className="surface px-3 py-2 flex items-center gap-2">
              <SearchIcon className="w-5 h-5 text-[var(--brand-olive)]" />

              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setQ((v) => v.trim())}
                placeholder="Search trips, places, activities..."
                aria-label="Search trips"
                autoComplete="off"
                className="flex-1 bg-transparent outline-none text-[var(--brand-green)] placeholder:text-[var(--brand-olive)]/70 text-sm md:text-base"
              />

              {q && (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="w-10 h-10 rounded-2xl hover:bg-black/5 transition inline-flex items-center justify-center"
                  aria-label="Clear search"
                  title="Clear"
                >
                  <X className="w-4 h-4 text-black/50" />
                </button>
              )}

              <button
                type="button"
                onClick={() => setQ((v) => v.trim())}
                className="w-10 h-10 rounded-2xl border border-[var(--brand-gold)]/40 bg-white hover:bg-black/[0.03] transition inline-flex items-center justify-center"
                aria-label="Search"
                title="Search"
              >
                <SearchIcon className="w-5 h-5 text-[var(--brand-green)]" />
              </button>
            </div>
          </div>
        </section>

        {/* Tags */}
        <section className="mb-10">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2">
            {TAGS.map((t) => {
              const active = t === tag;

              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(t)}
                  className={[
                    "chip transition",
                    active ? "ring-2 ring-[var(--brand-gold)]/35" : "hover:bg-white",
                  ].join(" ")}
                >
                  {t !== "All" ? (
                    <>
                      <Tag className="w-3.5 h-3.5 text-[var(--brand-olive)]" />
                      <span>{t}</span>
                    </>
                  ) : (
                    <span>{t}</span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Results */}
        {results.length === 0 ? (
          <EmptyState q={q} onReset={() => { setQ(""); setTag("All"); }} />
        ) : (
          <section>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((t) => (
                <li key={t.id}>
                  <TripCardSimple id={t.id} title={t.title} tag={t.tag} rating={t.rating} image={t.image} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}

function EmptyState({ q, onReset }: { q: string; onReset: () => void }) {
  return (
    <div className="surface max-w-xl mx-auto p-8 text-center">
      {q ? (
        <>
          <p className="font-extrabold text-[var(--brand-green)] mb-1">
            No results for “{q}”.
          </p>
          <p className="text-sm text-[var(--brand-olive)]">
            Try different keywords or choose another category.
          </p>
        </>
      ) : (
        <>
          <p className="font-extrabold text-[var(--brand-green)] mb-1">
            Start exploring.
          </p>
          <p className="text-sm text-[var(--brand-olive)]">
            Type a name or choose a category above.
          </p>
        </>
      )}

      <button onClick={onReset} className="btn-mini mt-5">
        Reset
      </button>
    </div>
  );
}
