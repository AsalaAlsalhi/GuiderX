"use client";

import { useRef } from "react";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function OTPBoxes({ value, onChange }: Props) {
  const refs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

  const setChar = (i: number, ch: string) => {
    const digits = (value ?? "").split("");
    digits[i] = ch.replace(/\D/g, "").slice(0, 1);
    onChange(digits.join("").slice(0, 6));
  };

  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, "");
    if (!v) {
      setChar(i, "");
      return;
    }
    setChar(i, v[0]);
    if (i < 5) refs[i + 1].current?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const digits = (value ?? "").split("");
      if (!digits[i] && i > 0) {
        refs[i - 1].current?.focus();
        digits[i - 1] = "";
      } else {
        digits[i] = "";
      }
      onChange(digits.join("").slice(0, 6));
    }
    if (e.key === "ArrowLeft" && i > 0) refs[i - 1].current?.focus();
    if (e.key === "ArrowRight" && i < 5) refs[i + 1].current?.focus();
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={refs[i]}
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ""}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-12 h-14 text-center text-xl font-bold rounded-2xl
                     bg-white border border-[var(--brand-gold)]/35 outline-none
                     focus:ring-2 focus:ring-[var(--brand-gold)]/30 text-[var(--brand-green)]"
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </div>
  );
}
