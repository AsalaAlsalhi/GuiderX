"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { registerSchema, type RegisterInput } from "@/app/lib/validators/auth";
import { useAuthStore } from "@//app/lib/store/auth";

export default function SignUpForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const router = useRouter();
  const { setUserType, setProfileCompleted } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const role = watch("role");

  const onSubmit = async (data: RegisterInput) => {
    setServerError(null);
    setServerSuccess(null);

    try {
      const userType = data.role === "guide" ? "guide" : "tourist";
      setUserType(userType);
      setProfileCompleted(false);

      setServerSuccess(
        "Account created (frontend only). Please complete your profile."
      );

      reset();
      router.push("/profile");
    } catch (err) {
      console.error(err);
      setServerError("Unexpected error on client.");
    }
  };

  const inputClass = (hasError?: boolean) =>
    hasError ? "input input-error" : "input";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* First & Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">First Name</label>
          <input
            {...register("firstName")}
            className={inputClass(!!errors.firstName)}
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Last Name</label>
          <input
            {...register("lastName")}
            className={inputClass(!!errors.lastName)}
          />
          {errors.lastName && (
            <p className="text-red-600 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold mb-1">Email</label>
        <input
          type="email"
          {...register("email")}
          className={inputClass(!!errors.email)}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-semibold mb-1">Phone Number</label>
        <input
          type="text"
          {...register("phoneNumber")}
          className={inputClass(!!errors.phoneNumber)}
        />
        {errors.phoneNumber && (
          <p className="text-red-600 text-sm mt-1">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-semibold mb-1">Password</label>
        <input
          type="password"
          {...register("password")}
          className={inputClass(!!errors.password)}
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-semibold mb-2">User Type</label>
        <div className="flex flex-wrap gap-3">
          <label
            className={[
              "tag-chip cursor-pointer select-none px-4 py-2",
              role === "tourist" ? "ring-2 ring-[var(--brand-gold)]/50" : "",
            ].join(" ")}
          >
            <input
              type="radio"
              value="tourist"
              {...register("role")}
              className="mr-2"
            />
            Tourist
          </label>

          <label
            className={[
              "tag-chip cursor-pointer select-none px-4 py-2",
              role === "guide" ? "ring-2 ring-[var(--brand-gold)]/50" : "",
            ].join(" ")}
          >
            <input
              type="radio"
              value="guide"
              {...register("role")}
              className="mr-2"
            />
            Tour Guide / Operator
          </label>
        </div>

        {errors.role && (
          <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>
        )}
      </div>

      {/* Terms */}
      <label className="flex items-center gap-3 text-sm">
        <input type="checkbox" {...register("terms")} />
        <span>I agree to the Terms & Conditions</span>
      </label>
      {errors.terms && (
        <p className="text-red-600 text-sm -mt-2">{errors.terms.message}</p>
      )}

      {serverError && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl px-4 py-2">
          {serverError}
        </p>
      )}
      {serverSuccess && (
        <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-2">
          {serverSuccess}
        </p>
      )}

      {/* ✅ نفس الثيم: زر غامق */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-base btn-book w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
}
