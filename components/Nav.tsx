"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { User, UserCircle2, Menu, X } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search" },
  { href: "/map", label: "Map" },
  { href: "/book", label: "Book" },
];

export default function Nav() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  return (
 <header
  className="fixed top-0 left-0 right-0 z-50 bg-white"
  style={{
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
  }}
>

      <div className="container h-20 md:h-24 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1 select-none"
          onClick={() => setOpen(false)}
        >
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="text-[var(--brand-gold)]">Guider</span>
            <span className="text-[var(--brand-green)]">X</span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden lg:block absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center gap-10">
            {LINKS.map((l) => {
              const active = pathname === l.href;

              return (
                <li key={l.href} className="relative">
                  <Link
                    href={l.href}
                    className={[
                      "px-1 py-2 text-base font-semibold transition",
                      active
                        ? "text-[var(--brand-green)]"
                        : "text-black/60 hover:text-black",
                    ].join(" ")}
                  >
                    {l.label}
                  </Link>

                  {active && (
                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-3 h-[3px] w-8 rounded-full bg-[var(--brand-gold)]" />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Link
            href="/profile"
            className="hidden lg:inline-flex w-10 h-10 rounded-full border border-black/10 items-center justify-center hover:bg-black/5 transition"
          >
            <User className="w-5 h-5 text-[var(--brand-green)]" />
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 rounded-full border border-black/10 flex items-center justify-center"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden border-t"
          style={{ backgroundColor: "#FEF3E2", borderColor: "rgba(0,0,0,0.06)" }}
        >
          <div className="container py-4 flex flex-col gap-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl font-semibold text-black/70 hover:bg-black/5"
              >
                {l.label}
              </Link>
            ))}

            <Link
              href="/profile"
              className="mt-2 px-4 py-3 rounded-xl border border-black/10 font-semibold flex items-center gap-2"
            >
              <UserCircle2 className="w-5 h-5" />
              Profile
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
