"use client";

import { useAuthStore } from "@/app/lib/store/auth";
import { LogIn, Mail, ShieldCheck } from "lucide-react";

const meta = {
  start: {
    icon: LogIn,
    title: "Welcome back",
    subtitle: "Choose how you want to sign in.",
  },
  email: {
    icon: Mail,
    title: "Enter Email",
    subtitle: "Enter your email address to receive an OTP code.",
  },
  otp: {
    icon: ShieldCheck,
    title: "Verify OTP",
    subtitle: "Enter the 6-digit code sent to your email.",
  },
} as const;

export default function StepHeader() {
  const { step } = useAuthStore();

  const safeStep = (step in meta ? step : "start") as keyof typeof meta;
  const { icon: Icon, title, subtitle } = meta[safeStep];

  return (
    <div className="text-center mb-4">
      <div className="mx-auto mb-3 w-14 h-14 rounded-2xl bg-[var(--brand-gold)] text-white flex items-center justify-center shadow-md">
        <Icon className="w-7 h-7" />
      </div>

      <h2 className="text-xl font-extrabold text-[var(--brand-green)]">{title}</h2>
      <p className="text-sm text-[var(--brand-green)]/70">{subtitle}</p>
    </div>
  );
}
