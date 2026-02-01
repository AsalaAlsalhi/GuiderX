import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().min(3, "Required").max(100, "Too long"),
});

export type EmailInput = z.infer<typeof emailSchema>;

export const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, "Enter the 6-digit code"),
});

export type OtpInput = z.infer<typeof otpSchema>;
