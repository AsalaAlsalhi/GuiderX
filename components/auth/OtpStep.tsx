"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { otpSchema, type OtpInput } from "@/app/lib/validators/otp";
import OTPBoxes from "@/components/auth/OTPBoxes";
import { useAuthStore } from "@/app/lib/store/auth";

function formatSeconds(s: number) {
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function OtpStep() {
  const { identifier, otp, setOtp, setStep, resetLoginFlow } = useAuthStore();

  const [isVerifying, setIsVerifying] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // ✅ timer
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    setSeconds(60);
  }, [identifier]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const canResend = seconds <= 0;

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: otp || "" },
  });

  useEffect(() => {
    setValue("otp", otp || "", { shouldValidate: true });
  }, [otp, setValue]);

  const onSubmit = (data: OtpInput) => {
    setServerError(null);
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);

      // ✅ demo: اقبلي أي كود 6 أرقام
      alert("OTP verified (frontend demo) ✅");

      // بعد النجاح (اختياري): رجّعي للستارت أو روحي بروفايل
      resetLoginFlow();
      // window.location.href = "/profile"; // لو حابة
    }, 600);
  };

  const subtitle = useMemo(() => {
    if (!identifier) return "We sent a 6-digit code to your email.";
    return `We sent a 6-digit code to ${identifier}`;
  }, [identifier]);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-[var(--brand-gold)]/25 bg-[var(--brand-cream)]/60 p-4">
        <div className="text-sm font-bold text-[var(--brand-green)]">Verify OTP</div>
        <div className="text-sm text-[var(--brand-green)]/70 mt-1">{subtitle}</div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-center">
          <OTPBoxes value={otp} onChange={(v) => setOtp(v)} />
        </div>

        {(errors.otp || serverError) && (
          <p className="text-sm text-center text-red-600">
            {errors.otp?.message || serverError}
          </p>
        )}

        <div className="text-center text-sm text-[var(--brand-green)]/60">
          {canResend ? (
            <span>You can resend now.</span>
          ) : (
            <span>Resend code in {formatSeconds(seconds)}</span>
          )}
        </div>

        <button
          type="button"
          disabled={!canResend}
          onClick={() => {
            // Frontend demo: reset timer + clear otp
            setOtp("");
            setSeconds(60);
            alert("OTP resent (frontend demo) 📩");
          }}
          className="w-full h-12 rounded-2xl border border-[var(--brand-gold)]/35 bg-white text-[var(--brand-green)] font-semibold
                     hover:bg-[var(--brand-cream)]/70 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Resend OTP
        </button>

        <button
          type="submit"
          disabled={isVerifying}
          className="w-full h-12 rounded-2xl bg-[var(--brand-green)] text-white font-semibold shadow-md
                     hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed transition"
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </button>

        <button
          type="button"
          onClick={() => setStep("email")}
          className="w-full h-12 rounded-2xl border border-[var(--brand-gold)]/35 bg-white text-[var(--brand-green)] font-semibold
                     hover:bg-[var(--brand-cream)]/70 transition"
        >
          Back
        </button>
      </form>
    </div>
  );
}
