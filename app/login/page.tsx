"use client";

import StartStep from "@/components/auth/StartStep";
import EmailStep from "@/components/auth/EmailStep";
import OtpStep from "@/components/auth/OtpStep";
import StepHeader from "@/components/auth/StepHeader";
import StepProgress from "@/components/auth/StepProgress";
import { useAuthStore } from "@/app/lib/store/auth";

export default function LoginPage() {
  const { step } = useAuthStore();

  return (
    <main className="min-h-[calc(100vh-80px-280px)] bg-[var(--brand-cream)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white/75 backdrop-blur rounded-3xl border border-[var(--brand-gold)]/25 shadow-xl p-6 sm:p-8">
          <StepHeader />
          <StepProgress />

          {step === "start" && <StartStep />}
          {step === "email" && <EmailStep />}
          {step === "otp" && <OtpStep />}
        </div>
      </div>
    </main>
  );
}
