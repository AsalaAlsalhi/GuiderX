"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";

import { emailSchema, type EmailInput } from "@/app/lib/validators/otp";
import { useAuthStore } from "@/app/lib/store/auth";

export default function EmailStep() {
  const { setStep, setIdentifier, identifier } = useAuthStore();
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailInput>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: identifier || "" },
  });

  const onSubmit = (data: EmailInput) => {
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setIdentifier(data.email);
      setStep("otp");
    }, 500);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-[var(--brand-gold)]/25 bg-[var(--brand-cream)]/60 p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white border border-[var(--brand-gold)]/25 flex items-center justify-center">
          <Mail className="w-5 h-5 text-[var(--brand-green)]" />
        </div>
        <div className="text-sm text-[var(--brand-green)]/70">
          Enter your email (or phone) to receive OTP.
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-[var(--brand-green)] mb-2">
            Email / Phone
          </label>
          <input
            {...register("email")}
            placeholder="e.g. asala@example.com or +9689xxxxxxx"
            className="w-full h-12 rounded-2xl bg-white border border-[var(--brand-gold)]/35 px-4 outline-none
                       focus:ring-2 focus:ring-[var(--brand-gold)]/30"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSending}
          className="w-full h-12 rounded-2xl bg-[var(--brand-green)] text-white font-semibold shadow-md
                     hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed transition"
        >
          {isSending ? "Sending..." : "Send OTP"}
        </button>

        <button
          type="button"
          onClick={() => setStep("start")}
          className="w-full h-12 rounded-2xl border border-[var(--brand-gold)]/35 bg-white text-[var(--brand-green)] font-semibold
                     hover:bg-[var(--brand-cream)]/70 transition"
        >
          Back
        </button>
      </form>
    </div>
  );
}
