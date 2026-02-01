"use client";

import { useAuthStore } from "@/app/lib/store/auth";

const ORDER = ["start", "email", "otp"] as const;

export default function StepProgress() {
  const { step } = useAuthStore();
  const currentIdx = ORDER.indexOf(step);

  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {ORDER.map((s, idx) => {
        const active = idx <= currentIdx;
        return (
          <span
            key={s}
            className={[
              "h-1.5 w-12 rounded-full transition",
              active ? "bg-[var(--brand-gold)]" : "bg-[var(--brand-gold)]/25",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}
