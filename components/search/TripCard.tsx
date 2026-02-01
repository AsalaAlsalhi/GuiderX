"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, BadgeCheck } from "lucide-react";

type Props = {
  id?: string;
  title: string;
  tag?: string;
  rating?: number;
  image: string;
};

export default function TripCardSimple({ id, title, tag, rating, image }: Props) {
  return (
    <article className="group rounded-3xl overflow-hidden border border-[var(--brand-green)]/10 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">
      <div className="relative h-36 sm:h-40 bg-[var(--brand-cream)]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        {typeof rating === "number" && (
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/55 backdrop-blur px-3 py-1.5 text-white">
            <span className="inline-flex items-center gap-1 text-xs font-semibold">
              <Star className="w-4 h-4 fill-[var(--brand-gold)] text-[var(--brand-gold)]" />
              {rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-base sm:text-lg font-extrabold text-[var(--brand-green)] line-clamp-1">
          {title}
        </h3>

        {tag ? (
          <span className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-[var(--brand-green)]/80 bg-[var(--brand-cream)] border border-[var(--brand-gold)]/35 px-2.5 py-1 rounded-full">
            <BadgeCheck className="w-4 h-4 text-[var(--brand-olive)]" />
            {tag}
          </span>
        ) : null}

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => alert("Details coming soon")}
            className="btn-base btn-outline w-full"
          >
            Details
          </button>

          <Link
            href={id ? `/book?trip=${encodeURIComponent(id)}` : "/book"}
            className="btn-base btn-book w-full"
          >
            Book
          </Link>
        </div>
      </div>
    </article>
  );
}
