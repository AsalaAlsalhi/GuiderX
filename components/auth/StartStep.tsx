"use client";

import { useAuthStore } from "@/app/lib/store/auth";
import { FcGoogle } from "react-icons/fc";
import { Mail } from "lucide-react";

export default function StartStep() {
  const { setStep } = useAuthStore();

  return (
    <div className="space-y-6 text-center">
      <button
        type="button"
        onClick={() => alert("Google OAuth later (frontend only)")}
        className="w-full h-12 rounded-2xl border border-[var(--brand-gold)]/35 bg-white/80 hover:bg-white
                   text-[var(--brand-green)] font-semibold shadow-sm transition flex items-center justify-center gap-3"
      >
        <FcGoogle className="text-2xl" />
        <span>Login with Google</span>
      </button>

      <div className="text-[var(--brand-green)]/50 text-sm font-semibold">OR</div>

      <button
        type="button"
        onClick={() => setStep("email")}
        className="w-full h-12 rounded-2xl bg-[var(--brand-green)] text-white
                   font-semibold shadow-md hover:opacity-95 transition flex items-center justify-center gap-3"
      >
        <Mail className="w-5 h-5" />
        <span>Login with Email</span>
      </button>

      <div className="text-sm text-[var(--brand-green)]/70">
        Don’t have an account?{" "}
        <a href="/signup" className="text-[var(--brand-green)] font-bold underline underline-offset-4">
          Sign Up
        </a>
      </div>

      <button
        type="button"
        onClick={() => alert("Guest later")}
        className="text-sm text-[var(--brand-green)]/60 hover:text-[var(--brand-green)] underline underline-offset-4"
      >
        Continue as Guest
      </button>
    </div>
  );
}
